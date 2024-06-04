import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import LeftMenu from "../Components/LeftMenu";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useParams, useNavigate } from 'react-router-dom';

import { db } from "../../firebase";
import { collection, onSnapshot, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import KOTBillModal from "../Components/KOTBillModal";
import { getCreatorShopId } from "../Controllers/ReastaurantID";

const Orders = () => {
    const pageID = "orders";

    const [allOrders, setAllOrders] = useState([]);
    const [idOrderCountMap, setIdOrderCountMap] = useState({});

    const [showKOTBillModal, setShowKOTBillModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState({})
    const [totalPrice, setTotalPrice] = useState(0);

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

        console.log("NOW UPDATED : ", pending);
        setPendingOrders(pending);
        setCompletedOrders(completed);
    }, [allOrders]);

    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const handleCheckboxChange = async (orderId) => {
        // Find the order to be updated
        setAllOrders((prevOrders) => {
            const updatedOrders = prevOrders.map((order) => {
                if (order.id === orderId) {
                    const updatedOrder = { ...order, paymentCompleted: !order.paymentCompleted };

                    // Update Firestore
                    const orderRef = doc(db, `Orders${creatorShopId}`, orderId);
                    updateDoc(orderRef, { paymentCompleted: updatedOrder.paymentCompleted });
                    console.log("doc updated");

                    return updatedOrder;
                }
                return order;
            });

            return updatedOrders;
        });
    };

    const handleKotClick = (order) => {
        setShowKOTBillModal(true);
        console.log(order.orderDetails);
        setOrderDetails(order.orderDetails);
        console.log("order.totalPrice : ", order.totalPrice);
        setTotalPrice(order.totalPrice);
    };

    return (
        <Container>
            <LeftMenu pageID={pageID} />
            <Navbar />
            {showKOTBillModal ? <KOTBillModal setShowKOTBillModal={setShowKOTBillModal} orderDetails={orderDetails} totalPrice={totalPrice} /> : null}
            <h1>All Orders</h1>
            {/* <div className="search">
                <div className="options"></div>
                <input type="text" placeholder="Search"/>
                <button>Submit</button>
            </div> */}
            <h3>Pending Payments</h3>
            <div className="orders unpaid-orders">
                {
                    allOrders.length > 0 && allOrders.map((order, index) => (
                        order.paymentCompleted == false ? (
                            <div className="order" key={order.id}>
                                <div className="order-no">Order: {idOrderCountMap[order.id]}</div>
                                <div className="order-top-btns">
                                    {/* <div className="btn edit-btn"><EditIcon /></div> */}
                                    {/* <div className="btn cancel-btn">
                                        Cancel Order
                                        <DeleteForeverIcon />
                                    </div> */}
                                </div>
                                <div className="main-info">
                                    <div className="info">
                                        <p>Name: <b>{order.userDetails.name}</b></p>
                                        <p>Phone: <b>{order.userDetails.phone}</b></p>
                                        <p>Email: <b>{order.userDetails.email}</b></p>
                                        <div className="table-no">Table: <b>{order.tableName}</b></div>
                                    </div>
                                    <div className="label">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={order.paymentCompleted}
                                                onChange={() => handleCheckboxChange(order.id)}
                                            />
                                            Payment Completed
                                        </label>
                                    </div>
                                </div>
                                <div className="options">
                                    <div className="gen kot" onClick={() => handleKotClick(order)}>KOT</div>
                                    <div className="gen bill" onClick={() => handleKotClick(order)}>Bill</div>
                                </div>
                            </div>
                        ) : null
                    ))
                }
            </div>
            <h3>Completed Payments</h3>
            <div className="orders zigzag paid-orders">
                {
                    allOrders.length > 0 && allOrders.map((order, index) => (
                        order.paymentCompleted == true ? (
                            <div className="order" key={order.id}>
                                <div className="order-no">Order: {idOrderCountMap[order.id]}</div>
                                <div className="main-info">
                                    <div className="info">
                                        <p>Name: <b>{order.userDetails.name}</b></p>
                                        <p>Phone: <b>{order.userDetails.phone}</b></p>
                                        <p>Email: <b>{order.userDetails.email}</b></p>
                                        <div className="table-no">Table: <b>{order.tableName}</b></div>
                                    </div>
                                    <div className="label">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={order.paymentCompleted}
                                                onChange={() => handleCheckboxChange(order.id)}
                                            />
                                            Payment Completed
                                        </label>
                                    </div>
                                </div>
                                <div className="options">
                                    <div className="gen kot" onClick={() => handleKotClick(order)}>KOT</div>
                                    <div className="gen bill" onClick={() => handleKotClick(order)}>Bill</div>
                                </div>
                            </div>
                        ) : null
                    ))
                }
            </div>
        </Container>
    );
};

export default Orders;

const Container = styled.div`
    background-color: #fff6e659;
    width: 100vw;
    min-height: 100vh;

    padding-left: 300px;
    padding-top: 100px;
    padding-right: 40px;

    h1{
      font-size: 2rem;
      font-weight: 500;
    }

    h3{
        font-size: 1.25rem;
        font-weight: 500;
        margin-top: 50px;
    }

    .orders{
        margin: 10px 0 20px 0;
        width: 100%;

        display: flex;
        flex-wrap: wrap;

        .order{
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            width: calc(25% - 10px);
            background-color: white;
            border: 2.5px solid #6cba6c;
            margin: 10px 10px 0 0;
            position: relative;

            padding: 45px 10px 45px 10px;
            box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;

            .order-no{
                background-color: #8bd28b;
                color: white;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;

                text-align: center;
                padding: 5px;
                font-size: 1rem;
                letter-spacing: 0.05rem;
                font-weight: 500;

                border-bottom: 2px solid #6cba6c;
            }   

            .order-top-btns{
                display: flex;
                align-items: center;
                position: absolute;
                top: 2.5px;
                right: 2.5px;

                .btn{
                    height: 27.5px;
                    /* aspect-ratio: 1/1; */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #d77171;
                    border-radius: 100px;
                    margin-left: 2.5px;
                    padding: 0 10px;

                    font-size: 0.6rem;
                    color: #e0cece;
                    font-weight: 500;

                    svg{
                        font-size: 1rem;
                        fill: whitesmoke;
                        margin: 0 -3px 0 3px;
                    }
                }
            }

            .main-info{
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .info{
                    p{
                        font-size: 0.8rem;
                        font-weight: 200;
                        margin-bottom: 5px;
    
                        b{
                            font-weight: 400;
                        }
                    }
    
                    .table-no{
                        margin-top: 20px;
                        font-weight: 500;
                        margin-bottom: 7.5px;
                        font-size: 0.8rem;
                        
                        b{
                            font-weight: 500;
                            padding: 1.5px 5px;
                            background-color: #d6d1d1;
                            border-radius: 5px;
                        }
                    }
    
                    .order-time{
                        font-size: 0.8rem;
                        font-weight: 500;
                    }
                }
    
                .label{
                    margin-top: 15px;
                    cursor: pointer;
    
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
            }

            .options{
                width: 100%;
                display: flex;
                justify-content: space-between;

                position: absolute;
                left: 0;
                bottom: 0;

                .gen{
                    width: 50%;
                    text-align: center;
                    padding: 5px;
                    font-size: 0.85rem;
                    letter-spacing: 0.05rem;
                    font-weight: 500;
                    border-top: 2px solid #6cba6c;
                    cursor: pointer;
                }

                .kot{
                    background-color: #8bd28b;
                    border-right: 1px solid #6cba6c; 
                    color: white;
                }

                .bill{
                    background-color: #f1d7d7;
                    border-left: 1px solid #6cba6c; 
                }
            }

            &:hover{
                box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
                transition-duration: 250ms;
            }
        }

        .zigzag{
            position: relative;
            width: 100%;
            /* height: 700px; */
            background: #e5e5e5;
            padding: 20px 10px;
            /* background-color: white; */
        }

        .zigzag::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(135deg,#fff 5px,
            transparent 0%), linear-gradient(-135deg,#fff 5px,
            transparent 0%);
            background-size: 15px;
        }
        
        .zigzag::after{
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(45deg,#fff 5px,
            transparent 0%), linear-gradient(-45deg,#fff 5px,
            transparent 0%);
            background-size: 15px;
        }
    }

    .unpaid-orders{
        .order{
        border-color: red;

        .order-no{
            background-color: #f88888;
            border-bottom: 2px solid red;
            text-align: left;
        }

        .options{
          .gen{
            border-top: 2px solid red;
          }

          .kot{
            border-right: 1px solid red; 
            background-color: #e1adad;
          }

          .bill{
            border-left: 1px solid red; 
          }
        }
      }
            
    }

`