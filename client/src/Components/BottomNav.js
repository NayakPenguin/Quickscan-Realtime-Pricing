import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "../CustomerCSS.css";

// Material Ui Icons
import ListIcon from '@material-ui/icons/List';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';

// Firebase
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, doc, query, where } from "firebase/firestore";

const BottomNav = ({ menuData, currPage, realTimeOrderedItemCount }) => {
    const [isOrderExpanded, setIsOrderExpanded] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderedMenuState, setOrderedMenuState] = useState([])
    const [showPage, setShowPage] = useState(1);
    const [fillWidth, setFillWidth] = useState(0);
    const [showCancelOrder, setShowCancelOrder] = useState(false);
    const [orderDone, setOrderDone] = useState(false);
    const [finalOrderCount, setFinalOrderCount] = useState(-1);

    const [notifySections, setNotifySections] = useState(false);

    const [creatorShopId, setCreatorShopId] = useState(() => {
        return localStorage.getItem('creatorShopId') || null;
    });

    const [scanId, setScanId] = useState(() => {
        return localStorage.getItem('scanId') || null;
    });

    const [orderedItemCount, setOrderedItemCount] = useState(() => {
        const savedOrderedItemCount = localStorage.getItem('orderedItemCount');
        return savedOrderedItemCount ? JSON.parse(savedOrderedItemCount).data : null;
    });

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            updateLocalStorageOrderedItemCount(orderedItemCount);
        }
    }, [orderedItemCount]);

    const updateLocalStorageOrderedItemCount = (orderedItemCount) => {
        const updatedOrderedItemCount = {
            data: orderedItemCount,
            timestamp: new Date().toISOString(),
            orderCompleted: false,
        };

        console.log(updatedOrderedItemCount);
        localStorage.setItem('orderedItemCount', JSON.stringify(updatedOrderedItemCount));
    };

    useEffect(() => {
        console.log(orderedItemCount);
    }, [orderedItemCount]);

    useEffect(() => {
        setOrderedItemCount(realTimeOrderedItemCount);
    }, [realTimeOrderedItemCount]);

    // useEffect(() => {
    //     console.log(menuData);
    // }, [menuData])


    const handleOrderClick = () => {
        setIsOrderExpanded(!isOrderExpanded);
    };

    // ----------------- CONTROL 1 (Start) -----------------

    let orderedMenu = [];

    useEffect(() => {
        orderedMenu = [];
        let count = 0, price = 0;

        console.log(orderedItemCount);

        Object.keys(orderedItemCount).forEach((encodedValue) => {
            // keyDecoder(encodedValue);
            console.log("encodedValue : ", encodedValue);

            let itemPrice = 0;
            const { itemIndex, detailsKeyArray } = keyDecoder(encodedValue);
            console.log(itemIndex, detailsKeyArray);

            const options = detailsKeyArray;

            console.log(menuData);

            console.log(itemIndex, options);

            const orderedItemCountValue = orderedItemCount[encodedValue];

            console.log(itemIndex, options, orderedItemCountValue);

            count += orderedItemCountValue;

            const menuItem = menuData[itemIndex];

            itemPrice += menuItem.price * orderedItemCountValue;

            let tempOrder = {
                count: orderedItemCountValue,
                price: 0,  // Adjust this line based on your requirements
                itemName: `${menuItem.name}`,
                extraWithItem: "",
                encodedValue: encodedValue,
            };

            if (menuItem.details_options && menuItem.details_options.length > 0 && options.length > 0) {
                options.forEach((option, idx) => {
                    const optionIndex = option;  // Use option as index, assuming it's a valid index
                    const optionValue = menuItem.details_options[idx].extra[optionIndex];

                    console.log(optionValue);

                    // Add option value to the total price
                    itemPrice += optionValue * orderedItemCountValue;
                });

                const selectedOptionValues = options.map((option, idx) => menuItem.details_options[idx].options[option]);

                console.log(selectedOptionValues);

                // Combine item name and selected option values
                const extraWithItem = options.map((option, idx) => {
                    if (menuItem.details_options[idx] && menuItem.details_options[idx].options[option]) {
                        return menuItem.details_options[idx].options[option];
                    }
                    return null; // or some default value if the option is not selected
                }).filter(value => value !== null).join(', ');

                tempOrder.extraWithItem = extraWithItem;
            }

            tempOrder.price = itemPrice;

            orderedMenu.push(tempOrder);

            price += itemPrice;
        });

        // Update total count and price
        setTotalCount(count);
        setTotalPrice(price);

        console.log(orderedMenu);
        setOrderedMenuState(orderedMenu);
    }, [orderedItemCount]);

    const keyDecoder = (key) => {
        // console.log("MARK1 : ", key);
        // const [itemId, ...detailsKeyArray] = key.split('-').map((value) => parseInt(value));

        const splitArray = key.split('-');

        console.log("splitArray:", splitArray);

        const itemId = splitArray[0];
        const itemIndex = menuData.findIndex(item => item.id === itemId);
        let detailsKeyArray = [];

        for (let i = 1; i < splitArray.length; i++) {
            detailsKeyArray.push(parseInt(splitArray[i]));
        }

        console.log(itemId);
        console.log(detailsKeyArray);

        return { itemIndex, detailsKeyArray };
    };

    // ----------------- CONTROL 1 (Complete) -----------------




    //  ----------------- CONTROL 2 (Start) -----------------

    const increaseCount = (encodedValue) => {
        setOrderedItemCount(prev => {
            const newCount = (prev[encodedValue] || 0) + 1;
            return { ...prev, [encodedValue]: newCount };
        });
    };

    const decreaseCount = (encodedValue) => {
        setOrderedItemCount(prev => {
            const newCount = (prev[encodedValue] || 1) - 1;
            if (newCount < 1) return prev;
            return { ...prev, [encodedValue]: newCount };
        });
    };

    const deleteItem = (encodedValue) => {
        setOrderedItemCount(prev => {
            const { [encodedValue]: _, ...rest } = prev;
            return rest;
        });
    };

    // ----------------- CONTROL 2 (Complete) -----------------





    // ----------------- CONTROL 3 (Start) -----------------

    const navigate = useNavigate();

    useEffect(() => {
        if (orderDone == true) {
            localStorage.removeItem('orderedItemCount');
            setNotifySections(true);

            if (isOrderExpanded == false) {
                window.location.reload();
                setOrderedItemCount({});
                setOrderDone(false);
            }
        }
    }, [isOrderExpanded, orderDone, navigate]);


    // ----------------- CONTROL 3 (Complete) -----------------


    // ----------------- CONTROL 4 (Start) -----------------

    const handleConfirmOrderClick = () => {
        setShowCancelOrder(true);

        const totalTime = 5000; // 5 seconds
        const interval = 10; // Update every 10 milliseconds
        const steps = totalTime / interval;

        let step = 1;

        const updateFillWidth = () => {
            setFillWidth((step / steps) * 100);
            step += 1;

            if (step <= steps) {
                setTimeout(updateFillWidth, interval);
            }
        };

        updateFillWidth();

        // After 5 seconds, perform setShowPage(3) or any other logic
        setTimeout(() => {
            setShowPage(2);

            const updatedOrderedItemCount = {
                data: orderedItemCount,
                timestamp: new Date().toISOString(),
                orderCompleted: true,
            };

            console.log(updatedOrderedItemCount);
            localStorage.setItem('orderedItemCount', JSON.stringify(updatedOrderedItemCount));
            pushOrderToFirebase(orderedMenuState);
        }, 5000);
    };


    const userDetails = {
        name: localStorage.getItem('name'),
        phone: localStorage.getItem('mobile'),
        email: "not-taking-currently-from-user",
    }

    const tableName = localStorage.getItem('scanId');

    const pushOrderToFirebase = async (orderedMenuState) => {
        setOrderDone(false);
        console.log("orderedMenuState : ", orderedMenuState);

        const currentTime = new Date();
        try {
            const ordersCollectionRef = collection(db, `Orders${creatorShopId}`);

            const newOrderItemDoc = await addDoc(ordersCollectionRef, {
                orderDetails: orderedMenuState,
                userDetails: userDetails,
                tableName: tableName,
                timeOfOrder: currentTime,
                paymentCompleted: false,
                canceledOrder: false,
                totalPrice: totalPrice,
            });

            console.log('Order item added successfully with ID: ', newOrderItemDoc.id);

            // Find how many orders have timeOfOrder less than the current order
            const orderQuery = query(ordersCollectionRef, where('timeOfOrder', '<', currentTime));
            const orderSnapshot = await getDocs(orderQuery);
            // console.log(orderSnapshot.docs);
            const orderCount = orderSnapshot.size;

            const ordersNoCollectionRef = collection(db, `OrderNumbers${creatorShopId}`);

            const newOrderNoItemDoc = await addDoc(ordersNoCollectionRef, {
                orderId: newOrderItemDoc.id,
                orderCount: orderCount + 1,
            });

            console.log(orderCount + 1);
            setFinalOrderCount(orderCount + 1);

            console.log("newOrderNoItemDoc pushed!");

            setOrderDone(true);
        } catch (error) {
            console.error('Error adding menu item: ', error);
        }

        console.log("orderedMenuState : ", orderedMenuState);
    }



    return (
        <Container>
            {isOrderExpanded && <div className="dark" onClick={handleOrderClick}></div>}

            <div className="order-container">
                <div className={`upper-layer-text ${isOrderExpanded ? 'expanded-layer-text' : ''}`} onClick={handleOrderClick}>
                    Added {totalCount} items for ₹{totalPrice.toFixed(2)}.
                    {
                        isOrderExpanded ? <b>Click to Close</b> : <b>Show Order</b>
                    }
                </div>

                <div className={`content ${isOrderExpanded ? 'expanded' : ''}`}>
                    {
                        showPage == 1 ? (
                            <div className="middle">
                                <div className="table">Table {scanId}</div>
                                {/* <div className="order-detail"></div> */}
                                {orderedMenuState.map((item, index) => (
                                    <div className="order-item" key={index}>
                                        <div className="update-count">
                                            <ArrowDropUpIcon style={{ fill: 'orange' }} onClick={() => increaseCount(item.encodedValue)} />
                                            <ArrowDropDownIcon style={{ fill: 'red' }} onClick={() => decreaseCount(item.encodedValue)} />
                                        </div>
                                        <div className="left">
                                            <div className="item-count">
                                                <div className="val">{item.count}</div>
                                                {/* Assuming you have a CloseIcon component */}
                                                <CloseIcon />
                                            </div>
                                            <div className="about-item">
                                                <div className="item-name">{item.itemName}</div>
                                                <div className="item-more">{item.extraWithItem}</div>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="price">₹ {item.price.toFixed(2)}</div>
                                        </div>
                                        <div className="remove-item" onClick={() => deleteItem(item.encodedValue)}>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                ))}

                                <div className="total-price">
                                    <div className="left">Total Amount</div>
                                    <div className="right">₹ {totalPrice.toFixed(2)}</div>
                                </div>

                                <div className="info-text">
                                    <InfoIcon />
                                    Under GST, restaurants are subject to a 5% GST rate, so <b>a basic standard tax will be added in this amount</b>.
                                </div>

                                {showCancelOrder ? (
                                    <div className="cancel-order">
                                        <div className="cancel-order-time-fill">
                                            <div className="fill" style={{ width: `${fillWidth}%` }}></div>
                                        </div>
                                        <div className="cancel-btn">Cancel</div>
                                    </div>
                                ) : <div className="place-order">
                                    {
                                        totalPrice > 0 ? <div className="payment-btn" onClick={handleConfirmOrderClick}>
                                            Confirm Order
                                        </div> : <div className="fake payment-btn">
                                            Confirm Order
                                        </div>
                                    }

                                </div>}
                            </div>
                        ) :
                            showPage == 2 ? (
                                <div className="middle">
                                    <div className="done-img"><img src="https://i.gifer.com/7efs.gif" alt="" /></div>
                                    <div className="order-placed">Order Placed</div>
                                    <div className="order-detail-after-placed">
                                        Table 14, Order No. {finalOrderCount}
                                    </div>
                                    <div className="zigzag bill">
                                        {orderedMenuState.map((item, index) => (
                                            <div className="order-item" key={index}>
                                                <div className="left">
                                                    <div className="item-count">
                                                        <div className="val">{item.count}</div>
                                                        {/* Assuming you have a CloseIcon component */}
                                                        <CloseIcon />
                                                    </div>
                                                    <div className="about-item">
                                                        <div className="item-name">{item.itemName}</div>
                                                        <div className="item-more">{item.extraWithItem}</div>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <div className="price">₹ {item.price.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="total-price">
                                            <div className="left">Total Amount</div>
                                            <div className="right">₹ {totalPrice.toFixed(2)}</div>
                                        </div>
                                    </div>
                                    {/* <div className="place-order center">
                                    <div className="download-btn">
                                        Download Bill
                                    </div>
                                </div> */}
                                    {/* <div className="info-text-2">
                                        <InfoIcon />
                                        <i onClick={() => { scrollToTop(); expanded && showPage == 3 && scrollToTopMenuMain(); handleToggleExpand(); setShowPage(1); }}>Click this to go back to Menu Page</i>
                                        All the updates and bill will be sent on your <b>Whatsapp</b> Number, (<b>+91 9306191179</b>).
                                        — For any assistance during your dining experience, simply click the <b>top-right icon</b>.
                                    </div> */}
                                </div>
                            ) : (
                                <div className="middle">
                                    {/* <div className="back-btn center" onClick={() => setShowPage(2)}>
                                    <ArrowBackIosIcon/>
                                    Temp Back
                                </div> */}
                                    <div className="done-img"><img src="https://i.gifer.com/7efs.gif" alt="" /></div>
                                    <div className="order-placed">Order Placed</div>
                                    <div className="order-detail-after-placed">
                                        Table 14, Order No. 54
                                    </div>
                                    <div className="zigzag bill">

                                    </div>
                                    {/* <div className="place-order center">
                                    <div className="download-btn">
                                        Download Bill
                                    </div>
                                </div> */}
                                    {/* <div className="info-text-2">
                                        <InfoIcon />
                                        <i onClick={() => { scrollToTop(); expanded && showPage == 3 && scrollToTopMenuMain(); handleToggleExpand(); setShowPage(1); }}>Click this to go back to Menu Page</i>
                                        All the updates and bill will be sent on your <b>Whatsapp</b> Number, (<b>+91 9306191179</b>).
                                        — For any assistance during your dining experience, simply click the <b>top-right icon</b>.
                                    </div> */}
                                </div>
                            )
                    }
                </div>
            </div>

            <div className="bottom-content">
                <a href="/restaurant/menu" className={currPage == "menu" ? "link curr-link" : "link"}>
                    <ListIcon />
                    <div className="text">Menu</div>
                </a>
                <a href="/user/orders" className={currPage == "orders" ? "link curr-link" : "link"}>
                    <FastfoodIcon className={notifySections == true ? "notify-color" : ""} />
                    <div className={notifySections == true ? "notify-color text" : "text"}>
                        Orders
                    </div>
                    {notifySections == true && <div className="update-notify"></div>}
                </a>
                <a href="/user/bills" className={currPage == "bills" ? "link curr-link" : "link"}>
                    <ReceiptIcon />
                    <div className="text">
                        Bills
                    </div>
                </a>
                <a href="/user/profile" className={currPage == "profile" ? "link curr-link" : "link"}>
                    <AccountCircleIcon />
                    <div className="text">Profile</div>
                </a>
            </div>
        </Container>
    )
}

export default BottomNav

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: auto;
    width: 100vw;

    z-index: 100;
    
    .dark {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.7);
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        transition: opacity 1s ease-in-out;
    }

    .order-container {
        position: fixed;
        width: 100vw;
        bottom: 70px;
        z-index: 101;
        display: flex;
        flex-direction: column;

        .upper-layer-text {
            font-size: 0.8rem;
            height: 38px;
            border-top: 1px solid rgb(233, 229, 229);
            background-color: #ede76d;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            font-weight: 500;

            b {
                background-color: orange;
                padding: 2.5px 7.5px;
                border-radius: 5px;
            }
        }

        .expanded-layer-text{
            border-top: none;
        }

        .content {
            height: 0;
            background-color: white;
            border-bottom: 1px solid rgb(233, 229, 229);
            transition: height 0.25s ease-in-out;
            display: none;
        }

        .expanded {
            display: block;
            height: 450px;
            overflow-y: scroll;
            padding: 10px;

            .middle{
                position: relative;
                width: 100%;
                padding: 40px 20px;

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
                    font-size: 1.75rem;
                    font-weight: 600;
                    letter-spacing: 0.25rem;
                    text-transform: uppercase;
                    text-align: center;
                    color: #474747;
                    margin-bottom: 10px;
                }

                .order-placed{
                    font-size: 1.75rem;
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

                .order-detail-after-placed{
                    font-size: 1rem;
                    font-weight: 300;
                    letter-spacing: 0.1rem;
                    /* text-transform: uppercase; */
                    text-align: center;
                    color: #474747;
                    margin-bottom: 40px;
                }

                .order-detail{
                    font-size: 1rem;
                    font-weight: 500;
                    letter-spacing: 0.25rem;
                    text-transform: uppercase;
                    text-align: center;
                    color: #474747;
                    margin-bottom: 40px;
                }

                .order-item{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 25px;
                    border-bottom: 1px solid #dadada;
                    position: relative;

                    .update-count{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: absolute;

                        left: -5px;

                        svg{
                            font-size: 1.75rem;
                            margin: -5px 0;
                            padding: 0;
                        }
                    }

                    .remove-item{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: absolute;

                        right: -20px;
                        
                        height: 25px;
                        width: 25px;
                        border-radius: 50%;
                        background-color: #ffd0d0;

                        svg{
                            font-size: 1.25rem;
                            padding: 0;
                        }
                    }

                    .left{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .about-item{
                            margin-right: 10px;

                            .item-name{
                                font-size: 0.95rem;
                                font-weight: 500;
                                letter-spacing: 0.1rem;
            
                                span{
                                    font-size: 0.85rem;
                                    font-weight: 300;
                                    letter-spacing: 0.1rem;
                                }
                            }
                            .item-more{
                                font-size: 0.8rem;
                                font-weight: 300;
                                letter-spacing: 0.03rem;
                                margin-top: 5px;
                            }
                        }
                        
                        .item-count{
                            margin: 0 15px 0 0;
                            display: flex;
                            align-items: center;
                            
                            svg{
                                font-size: 0.8rem;
                                letter-spacing: 0.1rem;
                            }

                            .val{
                                font-size: 1rem;
                                font-weight: 500;
                                margin-right: 10px;
                                letter-spacing: 0.1rem;
                            }
                        }
                    }
                
                    .right{
                        .price{
                            font-size: 0.8rem;
                            font-weight: 500;
                            letter-spacing: 0.1rem;
                            flex: 1;
                            white-space: nowrap;
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

                    .fake{
                        background-color: #fbf8f8;
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

                .info-text{
                    margin: 40px auto;
                    font-size: 0.85rem;
                    font-weight: 200;

                    svg{
                        font-size: 1.25rem;
                        margin-bottom: -3px;
                        margin-right: 2px;
                    }
                    
                    b{
                        font-weight: 400;
                        /* font-size: 0.75rem; */
                    }
                    
                    i{
                        color: #153d85;
                        margin-left: 5px;
                        font-weight: 300;
                        font-size: 0.75rem;
                    }
                }

                .info-text-2{
                    margin-top: 40px;
                    margin-bottom: 10px;
                    font-size: 0.8rem;
                    font-weight: 200;

                    svg{
                        font-size: 1.25rem;
                        margin-bottom: -3px;
                        margin-right: 2px;
                    }
                    
                    b{
                        font-weight: 500;
                        font-size: 0.75rem;
                    }

                    i{
                        color: cornflowerblue;
                        display: block;
                        font-weight: 500;
                        margin: 10px 0;
                    }
                }

                .zigzag{
                    position: relative;
                    width: 100%;
                    /* height: 700px; */
                    background: #f2f2f2;
                    /* background-color: white; */
                }

                .bill{
                    padding: 30px;

                    .order-item{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 25px 0;
                        border-bottom: 1px solid #dadada;

                        .left{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .about-item{
                                margin-right: 10px;

                                .item-name{
                                    font-size: 0.95rem;
                                    font-weight: 500;
                                    letter-spacing: 0.1rem;
                
                                    span{
                                        font-size: 0.85rem;
                                        font-weight: 300;
                                        letter-spacing: 0.1rem;
                                    }
                                }
                                .item-more{
                                    font-size: 0.8rem;
                                    font-weight: 300;
                                    letter-spacing: 0.03rem;
                                    margin-top: 5px;
                                }
                            }
                            
                            .item-count{
                                margin: 0 15px 0 0;
                                display: flex;
                                align-items: center;
                                
                                svg{
                                    font-size: 0.8rem;
                                    letter-spacing: 0.1rem;
                                }

                                .val{
                                    font-size: 1rem;
                                    font-weight: 500;
                                    margin-right: 10px;
                                    letter-spacing: 0.1rem;
                                }
                            }
                        }
                    
                        .right{
                            .price{
                                font-size: 0.8rem;
                                font-weight: 500;
                                letter-spacing: 0.1rem;
                                flex: 1;
                                white-space: nowrap;
                            }
                        }
                    }
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

                .payment{
                    padding: 20px;
                    font-size: 0.8rem;
                    margin-bottom: 10px;
                    background-color: #c3eec3;
                    font-weight: 400;
                    
                    b{
                        display: block;
                        font-weight: 400;
                    }
                }

                .payment-btns{
                }

                .pay-after{
                    margin-top: 25px;
                    display: flex;
                    align-items: center;
                    font-size: 0.85rem;

                    svg{
                        font-size: 1rem;
                    }
                }

                .back-btn{
                    position: absolute;
                    left: 20px;
                    top: 20px;
                    font-size: 0.85rem;
                    
                    svg{
                        font-size: 1rem;
                    }
                }
            }   

            .product-mapping{
                display: flex;
                flex-direction: column;

                .item{
                    margin-bottom: 10px;
                    padding: 10px;
                    background-color: #fff6f6;
                    border-radius: 5px;
                }
            }
        }
    }

    .bottom-content {
        position: fixed;
        bottom: -10px;
        width: 100vw;
        padding: 0 30px;
        padding-top: 5px;
        height: 80px;
        background-color: rgba(255, 255, 255, 1);
        display: flex;  
        align-items: flex-start;
        justify-content: space-between;
    
        .link {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            height: 60px;
            border-radius: 50%;
            aspect-ratio: 1/1;
    
            svg {
                font-size: 1.75rem;
                margin-bottom: 2.5px;
                fill: #babab9;
            }
    
            .text {
                font-size: 0.65rem;
                text-decoration: none;
                color: #babab9;
                font-weight: 500;
                position: relative;
                
            }
            
            .update-notify{
                height: 5px;
                aspect-ratio: 1/1;
                border-radius: 100px;
                background-color: orange;
            }

            .notify-color{
                color: orange;
                fill: orange;
            }
        }
    
        .curr-link {
            background-color: #fff6f6;
    
            svg {
                fill: #333;
            }
    
            .text {
                color: #333;
            }
        }
    }
`;