import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import "../CustomerCSS.css";

// Material Ui Icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import DoneIcon from '@material-ui/icons/Done';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PanToolIcon from '@material-ui/icons/PanTool';

// Firebase
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, doc, query, where } from "firebase/firestore";

const OrderedList = ({ menuData, orderedItemCount, expanded, handleToggleExpand, scrollToTopMenuMain }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isBouncing, setBouncing] = useState(false);
    const [orderedMenuState, setOrderedMenuState] = useState([]);
    const [showPage, setShowPage] = useState(1);
    const [allowPostPaid, setAllowPostPaid] = useState(true);
    const [callWaiter, setCallWaiter] = useState(false);

    const [restaurantId, setRestaurantId] = useState("BrdwyKol");
    
    const [ordersToday, setOrdersToday] = useState([]); // get this from localhost or something
    const [orderDone, setOrderDone] = useState(false);

    let orderedMenu = [];

    useEffect(() => {
        orderedMenu = [];
        let count = 0, price = 0;

        console.log(orderedItemCount);

        Object.keys(orderedItemCount).forEach((encodedValue) => {
            // keyDecoder(encodedValue);
            let itemPrice = 0;
            const { itemIndex, detailsKeyArray } = keyDecoder(encodedValue);
            console.log(itemIndex, detailsKeyArray);

            const options = detailsKeyArray;

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

        if (count > 0 || price > 0) {
            setBouncing(true);
            setTimeout(() => setBouncing(false), 750);
        }
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

    const modalRef = useRef(null);

    const scrollToTop = () => {
        if (modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    };

    const [fillWidth, setFillWidth] = useState(0);
    const [showCancelOrder, setShowCancelOrder] = useState(false);

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
            setShowPage(3);
            pushOrderToDB(orderedMenuState);
        }, 5000);
    };

    const userDetails = {
        name: "Atanu Nayak",
        phone: "+91 93061 91179",
        email: "nayak.primary@gmail.com",
    }

    const tableName = "T14-2F";

    const pushOrderToDB = async (orderedMenuState) => {
        setOrderDone(false);
        console.log("orderedMenuState : ", orderedMenuState);
        const currentTime = new Date();
        try {
            const ordersCollectionRef = collection(db, `Orders${restaurantId}`);
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

            setOrderedMenuState([]);

            // Find how many orders have timeOfOrder less than the current order
            const orderQuery = query(ordersCollectionRef, where('timeOfOrder', '<', currentTime));
            const orderSnapshot = await getDocs(orderQuery);
            // console.log(orderSnapshot.docs);
            const orderCount = orderSnapshot.size;

            // Update the ordersToday state
            setOrdersToday((prevOrdersToday) => [
                ...prevOrdersToday,
                {
                    phone: userDetails.phone,
                    orderId: newOrderItemDoc.id,
                    orderCount: orderCount + 1,
                }
            ]);

            const ordersNoCollectionRef = collection(db, `OrderNumbers${restaurantId}`);
            
            const newOrderNoItemDoc = await addDoc(ordersNoCollectionRef, {
                orderId: newOrderItemDoc.id,
                orderCount: orderCount + 1,
            });

            console.log("newOrderNoItemDoc pushed!");
            
            setOrderDone(true);
        } catch (error) {
            console.error('Error adding menu item: ', error);
        }

        console.log("orderedMenuState : ", orderedMenuState);
    }

    // console.log(ordersToday);

    return (
        <div>
            <Container expanded={expanded}>
                <div className="dark" onClick={() => { scrollToTop(); expanded && scrollToTopMenuMain(); handleToggleExpand(); setShowPage(1); }}></div>
                <div className={`order-main ${isBouncing ? 'bounce' : ''}`} ref={modalRef}>
                    <div className="top" onClick={() => { scrollToTop(); expanded && showPage == 3 && scrollToTopMenuMain(); handleToggleExpand(); setShowPage(1); }}>
                        <div className="order">
                            {
                                totalCount > 0 ? `Ordered ${totalCount} items for ₹${totalPrice.toFixed(2)}` : "Your order will be displayed here."
                            }
                        </div>
                        {
                            expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />
                        }
                    </div>
                    {
                        showPage == 1 ? (
                            <div className="middle">
                                <div className="table">Table 14</div>
                                <div className="order-detail">Order No. 54</div>
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

                                <div className="info-text">
                                    <InfoIcon />
                                    All the updates will be sent on your Whatsapp Number, (<b>+91 9306191179</b>).
                                    <i>Change Number</i>
                                </div>


                                {!showCancelOrder && (
                                    <div className="place-order">
                                        <div className="payment-btn" onClick={handleConfirmOrderClick}>
                                            Confirm Order
                                        </div>
                                    </div>
                                )}

                                {showCancelOrder && (
                                    <div className="cancel-order">
                                        <div className="cancel-order-time-fill">
                                            <div className="fill" style={{ width: `${fillWidth}%` }}></div>
                                        </div>
                                        <div className="cancel-btn">Cancel</div>
                                    </div>
                                )}
                            </div>
                        ) :
                            showPage == 2 ? (
                                <div className="middle">
                                    <div className="back-btn center" onClick={() => setShowPage(1)}>
                                        <ArrowBackIosIcon />
                                        Edit Menu
                                    </div>
                                    <div className="order-placed">Payment</div>
                                    <div className="order-detail-after-placed">
                                        Table 14, Order No. 54
                                    </div>
                                    <div className="place-order center">
                                        <a href={`tez://upi/pay?pa=ajha8931@oksbi@indus&pn=Nayak's%20Bistro&am=1.00&cu=INR&mc=4900&tn=Payment%20for%20Table%2014,%20Order%20No.%20:%2054`} className="payment-btn" onClick={() => setShowPage(4)}>Pay with UPI</a>
                                        {
                                            allowPostPaid == false ? <>or <div className="payment-btn" onClick={() => { setCallWaiter(true); setShowPage(4); }}><PanToolIcon />Call a Waiter</div></> : <></>
                                        }
                                    </div>
                                    {
                                        allowPostPaid ? (
                                            <div className="pay-after center" onClick={() => setShowPage(3)}>
                                                Or, Pay after Dining <ChevronRightIcon />
                                            </div>
                                        ) : (<div className="pay-after center">
                                            <i>*You Need to Pay before dining.</i>
                                        </div>)
                                    }
                                </div>
                            ) : showPage == 3 ? (
                                <div className="middle">
                                    {/* <div className="back-btn center" onClick={() => setShowPage(2)}>
                                    <ArrowBackIosIcon/>
                                    Temp Back
                                </div> */}
                                    <div className="done-img"><img src="https://i.gifer.com/7efs.gif" alt="" /></div>
                                    <div className="order-placed">Order Placed</div>
                                    <div className="order-detail-after-placed">
                                        Table 14, Order No. {
                                            orderDone ? (
                                                <>{ordersToday[ordersToday.length - 1].orderCount}</>
                                            ) : (<>...generating</>)
                                        }
                                    </div>
                                    <div className="zigzag bill"></div>
                                    {/* <div className="place-order center">
                                    <div className="download-btn">
                                        Download Bill
                                    </div>
                                </div> */}
                                    <div className="info-text-2">
                                        <InfoIcon />
                                        <i onClick={() => { scrollToTop(); expanded && showPage == 3 && scrollToTopMenuMain(); handleToggleExpand(); setShowPage(1); }}>Click this to go back to Menu Page</i>
                                        All the updates and bill will be sent on your <b>Whatsapp</b> Number, (<b>+91 9306191179</b>).
                                        — For any assistance during your dining experience, simply click the <b>top-right icon</b>.
                                    </div>
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
                                    <div className="zigzag payment">
                                        {
                                            !callWaiter ? <>If you've completed the payment, the restaurant management will manually verify it and send the payment confirmation status to your WhatsApp.</> :
                                                <>
                                                    Your waiter will be with you shortly; thank you for your patience.
                                                </>
                                        }


                                        {/* <b>Since this is a prepaid dining experience, you need to pay first - if the payment is not completed the resturant might close the order.</b> */}
                                    </div>
                                    <div className="zigzag bill"></div>
                                    {/* <div className="place-order center">
                                    <div className="download-btn">
                                        Download Bill
                                    </div>
                                </div> */}
                                    <div className="info-text-2">
                                        <InfoIcon />
                                        <i onClick={() => { scrollToTop(); expanded && showPage == 3 && scrollToTopMenuMain(); handleToggleExpand(); setShowPage(1); }}>Click this to go back to Menu Page</i>
                                        All the updates and bill will be sent on your <b>Whatsapp</b> Number, (<b>+91 9306191179</b>).
                                        — For any assistance during your dining experience, simply click the <b>top-right icon</b>.
                                    </div>
                                </div>
                            )
                    }
                </div>
            </Container>
        </div>
    )
}

export default OrderedList

const Container = styled.div`
    z-index: 101;

    .center{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dark{
        position: fixed;
        bottom: ${({ expanded }) => (expanded ? "0" : "calc(-100vh + 60px)")};
        z-index: 101;
        width: 100%;
        max-width: 500px;
        height: 100vh;
        background-color: ${({ expanded }) => (expanded ? "#00000075" : "transparent")};;
        transition: bottom 0.3ms ease;
        margin: 0 auto;
    }

    .order-main{
        position: fixed;
        bottom: ${({ expanded }) => (expanded ? "-180px" : "calc(-100vh + 60px)")};
        z-index: 102;
        height: 100vh;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        border-radius: 25px;
        background-color: white;
        box-shadow: 0px -15px 30px -10px rgba(0, 0, 0, 0.15);
        -webkit-box-shadow: 0px -15px 30px -10px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0px -15px 30px -10px rgba(0, 0, 0, 0.15);
        border: 1px dashed #b4b4b4;
        overflow-y: scroll;
        
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        transition: bottom 0.3s ease; 
        
        padding-bottom: 200px;

        &::-webkit-scrollbar {
        display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
        }

        scrollbar-width: thin; /* For Firefox */
        -ms-overflow-style: none; 

        .top {
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 1px dashed #000;
        
            .order {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 60px;
                /* color: #efefef; */
                font-size: 0.8rem;
                font-weight: 300;
                letter-spacing: 0.1rem;
            }
        
            svg {
                /* fill: #efefef; */
                font-size: 1rem;
            }
        }

        .middle{
            position: relative;
            width: 100%;
            padding: 40px;

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
                padding: 25px 0;
                border-bottom: 1px solid #dadada;

                .left{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .about-item{
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
                    font-weight: 500;
                    font-size: 0.75rem;
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
                background: #e9e8ec;
                /* background-color: white; */
            }

            .bill{
                height: 700px;
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
    }

    @keyframes bounceAnimation {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-50px);
        }
        60% {
            transform: translateY(-25px);
        }
    }

    .bounce {
        animation: bounceAnimation 1s ease;
    }
`;