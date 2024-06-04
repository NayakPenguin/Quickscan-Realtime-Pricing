import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import LeftMenu from "../Components/LeftMenu";
import CloseIcon from '@material-ui/icons/Close';

import { useParams, useNavigate } from 'react-router-dom';

import { db } from "../../firebase";
import { collection, onSnapshot, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { getCreatorShopId } from "../Controllers/ReastaurantID";

const KotUpdates = () => {
    const [pageID, setPageID] = useState("kot-updates");

    const [allOrders, setAllOrders] = useState([]);
    const [idOrderCountMap, setIdOrderCountMap] = useState({});

    const [parts, setParts] = useState({ part1: [], part2: [], part3: [] });
    const [ordersInRow, setOrdersInRow] = useState(1);

    const creatorShopId = getCreatorShopId();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (creatorShopId == null) navigate("/restaurant/login");
    }, []);

    const ordersCollectionRef = collection(db, `Orders${creatorShopId}`);
    const ordersNoCollectionRef = collection(db, `OrderNumbers${creatorShopId}`);

    useEffect(() => {
        const getOrderNos = async () => {
            try {
                const unsubscribe = onSnapshot(ordersNoCollectionRef, (snapshot) => {
                    const idOrderCountMapLocal = {};

                    snapshot.docs.forEach((doc) => {
                        const { orderId, orderCount } = doc.data();
                        idOrderCountMapLocal[orderId] = orderCount;
                    });

                    console.log(idOrderCountMapLocal);
                    setIdOrderCountMap(idOrderCountMapLocal);
                });

                return () => unsubscribe();
            } catch (error) {
                console.log(error);
            }
        };

        const getOrders = async () => {
            await getOrderNos();

            try {
                const unsubscribe = onSnapshot(ordersCollectionRef, async (snapshot) => {
                    const updatedData = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));

                    const sortedData = await processOrders(updatedData);

                    console.log(sortedData);
                    setAllOrders(sortedData);
                });

                return () => unsubscribe();
            } catch (error) {
                console.log(error);
            }
        };

        getOrders();
    }, []);

    const processOrders = async (orders) => {
        // Sort the data based on timeOfOrder
        const sortedOrders = orders.sort((a, b) => new Date(a.timeOfOrder.seconds * 1000) - new Date(b.timeOfOrder.seconds * 1000)); // FIFO

        // Log the timeOfOrder for each order
        sortedOrders.forEach(order => {
            console.log(`Order ID: ${order.id}, Time of Order: ${order.timeOfOrder.toDate()}`);
        });

        return sortedOrders;
    };

    useEffect(() => {
        const pending = allOrders
            .filter(order => !order.orderReady)
            .sort((a, b) => new Date(a.timeOfOrder.seconds * 1000) - new Date(b.timeOfOrder.seconds * 1000)); // FIFO

        const completed = allOrders
            .filter(order => order.orderReady)
            .sort((a, b) => new Date(b.timeOfOrder.seconds * 1000) - new Date(a.timeOfOrder.seconds * 1000)); // LIFO

        console.log("NOW UPDATED");
        setPendingOrders(pending);
        setCompletedOrders(completed);
    }, [allOrders]);

    const handleOrderReadyToggle = async (orderId) => {
        // Find the order to be updated
        setAllOrders((prevOrders) => {
            const updatedOrders = prevOrders.map((order) => {
                if (order.id === orderId) {
                    const updatedOrder = { ...order, orderReady: !order.orderReady };

                    // Update Firestore
                    const orderRef = doc(db, `Orders${creatorShopId}`, orderId);
                    updateDoc(orderRef, { orderReady: updatedOrder.orderReady });

                    return updatedOrder;
                }
                return order;
            });

            return updatedOrders;
        });
    };

    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
    };

    return (
        <Container>
            <LeftMenu pageID={pageID} />
            <Navbar />
            <div className="flex-seperate">
                <div>
                    <h1>Pending KOTs</h1>
                    <div className="all-bills">
                        <div className="one-column">
                            {pendingOrders.map((order, orderIndex) => (
                                <div className="bill-container" key={order.id}>
                                    <div className="table">Table {order.tableName}</div>
                                    <div className="order-detail">Order No. {idOrderCountMap[order.id]}</div>
                                    <div className="order-time">{formatTimestamp(order.timeOfOrder)}</div>
                                    {/* Mapping through orderDetails */}
                                    {order.orderDetails.map((item, index) => (
                                        <div className="order-item" key={index}>
                                            <div className="about-item">
                                                <div className="item-name">{item.itemName}</div>
                                                <div className="item-more">{item.extraWithItem}</div>
                                            </div>
                                            <div className="item-count">
                                                <CloseIcon />
                                                <div className="val">{item.count}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="prepare-status">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={order.orderReady}
                                                onChange={() => handleOrderReadyToggle(order.id)}
                                            />
                                            Order Ready
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Completed KOTs</h1>
                    <div className="all-bills">
                        <div className="one-column">
                            {completedOrders.map((order, orderIndex) => (
                                <div className="bill-container" key={order.id}>
                                    <div className="table">Table {order.tableName}</div>
                                    <div className="order-detail">Order No. {idOrderCountMap[order.id]}</div>
                                    <div className="order-time">{formatTimestamp(order.timeOfOrder)}</div>
                                    {/* Mapping through orderDetails */}
                                    {order.orderDetails.map((item, index) => (
                                        <div className="order-item" key={index}>
                                            <div className="about-item">
                                                <div className="item-name">{item.itemName}</div>
                                                <div className="item-more">{item.extraWithItem}</div>
                                            </div>
                                            <div className="item-count">
                                                <CloseIcon />
                                                <div className="val">{item.count}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="prepare-status">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={order.orderReady}
                                                onChange={() => handleOrderReadyToggle(order.id)}
                                            />
                                            Order Ready
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </Container>
    )
}

export default KotUpdates

const Container = styled.div`
    background-color: #fff6e659;
    width: 100vw;
    min-height: 100vh;

    padding-left: 300px;
    padding-top: 100px;
    padding-right: 40px;

    position: relative;

    button{
        font-size: 0.75rem;
        padding: 5px 12.5px;
        border: none;
        background-color: #f2f2f2;
        border: 2px solid black;
        box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;
        
        &:hover{
            transition-duration: 250ms;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
        }
    }

    .flex-seperate{
        display: flex;
        justify-content: space-between;
    }

    h1{
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .all-bills{
        display: flex;
        /* justify-content: center; */
        margin-bottom: 50px;
        
        .one-column{
            width: 450px;
            display: flex;
            flex-direction: column;
            
            .bill-container{
                width: 100%;
                background-color: white;
                overflow: hidden;
                border: 2.5px solid black;
                padding: 40px;
                margin-bottom: 10px;
                box-shadow: rgba(0, 0, 0, 0.20) 1px 1px 10px 0px;
    
                .done-img{
                    display: flex;
                    justify-content: center;
    
                    img{
                        height: 100px;
                        /* border: 1px solid black; */
                        margin-top: -20px;
                    }
                }
    
                .table{
                    font-size: 1.35rem;
                    font-weight: 600;
                    letter-spacing: 0.25rem;
                    text-transform: uppercase;
                    text-align: center;
                    color: #474747;
                    margin-bottom: 10px;
                }
    
                .order-placed{
                    font-size: 1.15rem;
                    font-weight: 600;
                    letter-spacing: 0.25rem;
                    text-transform: uppercase;
                    text-align: center;
                    /* color: #e5ae71; */
                    margin-bottom: 10px;
    
                    svg{
                        /* fill: #e5ae71; */
                    }
                }
    
                .order-detail{
                    font-size: 1rem;
                    font-weight: 500;
                    letter-spacing: 0.25rem;
                    text-transform: uppercase;
                    text-align: center;
                    color: #474747;
                }
                
                .order-time{
                    font-size: 0.75rem;
                    font-weight: 300;
                    text-align: center;
                    color: #474747;
                    letter-spacing: 0.15rem;

                    margin: 10px 0 40px 0;
                }


                .prepare-status{
                    margin-top: 20px;
                    
                    label{
                        font-size: 0.8rem;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        -webkit-user-select: none; /* Safari */
                        -ms-user-select: none; /* IE 10 and IE 11 */
                        user-select: none; /* Standard syntax */
    
                        input{
                            margin-right: 5px;
                        }
                    }
                }

    
                .order-item{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #dadada;
    
                    .about-item{
                        .item-name{
                            font-size: 0.85rem;
                            font-weight: 500;
                            letter-spacing: 0.1rem;
        
                            span{
                                font-size: 0.85rem;
                                font-weight: 300;
                                letter-spacing: 0.1rem;
                            }
                        }
                        .item-more{
                            font-size: 0.7rem;
                            font-weight: 300;
                            letter-spacing: 0.03rem;
                            margin-top: 5px;
                        }
                    }
                    
                    .item-count{
                        margin: 0 0 0 15px;
                        display: flex;
                        align-items: center;
                        
                        svg{
                            font-size: 0.8rem;
                            letter-spacing: 0.1rem;
                            margin-right: 5px;
                        }
    
                        .val{
                            font-size: 1rem;
                            font-weight: 500;
                            margin-right: 10px;
                            letter-spacing: 0.1rem;
                        }
                    }
                }
    
                .total-price{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 25px 0;
                    border-bottom: 1px solid #dadada;
    
                    .left{
                        font-size: 0.95rem;
                        font-weight: 600;
                        letter-spacing: 0.1rem;
                    }
    
                    .right{
                        font-size: 1rem;
                        font-weight: 600;
                        letter-spacing: 0.1rem;
                    }
                }
    
                .place-order{
                    display: flex;
                    
                    .payment-btn{
                        color: #333;
                        text-decoration: none;
                        padding: 10px 20px;
                        background-color: #ebf0df;
                        font-size: 0.8rem;
                        font-weight: 500;
                        letter-spacing: 0.1rem;
                        border-radius: 5px;
                        white-space: nowrap;
                        
                        display: flex;
                        align-items: center;
    
                        svg{
                            font-size: 1rem;
                            margin: -3px 3px 0 0;
                        }
                    }
    
                    .download-btn{
                        color: #333;
                        text-decoration: none;
                        padding: 10px 20px;
                        background-color: whitesmoke;
                        font-size: 0.8rem;
                        font-weight: 500;
                        letter-spacing: 0.1rem;
                        border-radius: 5px;
                        margin-right: 10px;
                        white-space: nowrap;
                        margin-top: 25px;
                    }
                }
    
                .cancel-order{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    /* margin-top: 20px; */
                    
                    .cancel-order-time-fill{
                        flex: 1;
                        background-color: whitesmoke;
                        border-radius: 100px;
                        height: 6px;
                        overflow: hidden;
    
                        .fill{
                            width: 60%;
                            background-color: orange;
                            height: 100%;
                        }
                    }
                    
                    .cancel-btn{
                        color: #fff;
                        text-decoration: none;
                        padding: 5px 10px;
                        background-color: #f96a6a;
                        font-size: 0.65rem;
                        font-weight: 500;
                        letter-spacing: 0.1rem;
                        border-radius: 5px;
                        margin-left: 10px;
                        
                        display: flex;
                        align-items: center;
                        text-align: center;
    
                        svg{
                            font-size: 1rem;
                            margin: -3px 3px 0 0;
                        }
                    }
                }
            }    
        }

    }        
`