import React, { useState, useEffect } from "react";
import styled from "styled-components";

import "../CustomerCSS.css";

// Material Ui Icons
import ListIcon from '@material-ui/icons/List';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReceiptIcon from '@material-ui/icons/Receipt';

const BottomNav = ({ menuData, currPage, realTimeOrderedItemCount }) => {
    const [isOrderExpanded, setIsOrderExpanded] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderedMenuState, setOrderedMenuState] = useState([])
    const [isBouncing, setBouncing] = useState(false);
    const [showPage, setShowPage] = useState(1);
    const [allowPostPaid, setAllowPostPaid] = useState(true);
    const [callWaiter, setCallWaiter] = useState(false);

    const [creatorShopId, setCreatorShopId] = useState(() => {
        return localStorage.getItem('creatorShopId') || null;
    });

    const [orderedItemCount, setOrderedItemCount] = useState(() => {
        const savedOrderedItemCount = localStorage.getItem('orderedItemCount');
        return savedOrderedItemCount ? JSON.parse(savedOrderedItemCount).data : null;
    });

    useEffect(() => {
        console.log(orderedItemCount);
    }, [orderedItemCount]);

    useEffect(() => {
        if (realTimeOrderedItemCount != 'otherpage') {
            setOrderedItemCount(realTimeOrderedItemCount);
        }
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



    // const modalRef = useRef(null);

    // const scrollToTop = () => {
    //     if (modalRef.current) {
    //         modalRef.current.scrollTop = 0;
    //     }
    // };

    // const [fillWidth, setFillWidth] = useState(0);
    // const [showCancelOrder, setShowCancelOrder] = useState(false);

    // const handleConfirmOrderClick = () => {
    //     setShowCancelOrder(true);

    //     const totalTime = 5000; // 5 seconds
    //     const interval = 10; // Update every 10 milliseconds
    //     const steps = totalTime / interval;

    //     let step = 1;

    //     const updateFillWidth = () => {
    //         setFillWidth((step / steps) * 100);
    //         step += 1;

    //         if (step <= steps) {
    //             setTimeout(updateFillWidth, interval);
    //         }
    //     };

    //     updateFillWidth();

    //     // After 5 seconds, perform setShowPage(3) or any other logic
    //     setTimeout(() => {
    //         setShowPage(3);
    //         pushOrderToDB(orderedMenuState);
    //     }, 5000);
    // };

    // const userDetails = {
    //     name: "Atanu Nayak",
    //     phone: "+91 93061 91179",
    //     email: "nayak.primary@gmail.com",
    // }

    // const tableName = "T14-2F";

    // const pushOrderToDB = async (orderedMenuState) => {
    //     setOrderDone(false);
    //     console.log("orderedMenuState : ", orderedMenuState);
    //     const currentTime = new Date();
    //     try {
    //         const ordersCollectionRef = collection(db, `Orders${creatorShopId}`);
    //         const newOrderItemDoc = await addDoc(ordersCollectionRef, {
    //             orderDetails: orderedMenuState,
    //             userDetails: userDetails,
    //             tableName: tableName,
    //             timeOfOrder: currentTime,
    //             paymentCompleted: false,
    //             canceledOrder: false,
    //             totalPrice: totalPrice,
    //         });

    //         console.log('Order item added successfully with ID: ', newOrderItemDoc.id);

    //         // Find how many orders have timeOfOrder less than the current order
    //         const orderQuery = query(ordersCollectionRef, where('timeOfOrder', '<', currentTime));
    //         const orderSnapshot = await getDocs(orderQuery);
    //         // console.log(orderSnapshot.docs);
    //         const orderCount = orderSnapshot.size;

    //         // Update the ordersToday state
    //         setOrdersToday((prevOrdersToday) => [
    //             ...prevOrdersToday,
    //             {
    //                 phone: userDetails.phone,
    //                 orderId: newOrderItemDoc.id,
    //                 orderCount: orderCount + 1,
    //             }
    //         ]);

    //         const ordersNoCollectionRef = collection(db, `OrderNumbers${creatorShopId}`);
            
    //         const newOrderNoItemDoc = await addDoc(ordersNoCollectionRef, {
    //             orderId: newOrderItemDoc.id,
    //             orderCount: orderCount + 1,
    //         });

    //         console.log("newOrderNoItemDoc pushed!");
            
    //         setOrderDone(true);
    //     } catch (error) {
    //         console.error('Error adding menu item: ', error);
    //     }

    //     console.log("orderedMenuState : ", orderedMenuState);
    // }



    return (
        <Container>
            {isOrderExpanded && <div className="dark" onClick={handleOrderClick}></div>}

            <div className="order-container">
                <div className={`upper-layer-text ${isOrderExpanded ? 'expanded-layer-text' : ''}`} onClick={handleOrderClick}>
                    Added {totalCount} items for ₹{totalPrice.toFixed(2)}.
                    {
                        isOrderExpanded ? <b>Click to Close</b> : <b>Click to Order</b>
                    }
                </div>

                <div className={`content ${isOrderExpanded ? 'expanded' : ''}`}>
                    {
                        orderedMenuState.length > 0 ? 
                        <div className="product-mapping">
                            {orderedMenuState.map((item, index) => (
                                <div key={index} className="item">
                                    <p>Item Name: {item.itemName}</p>
                                    <p>Count: {item.count}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Extras: {item.extraWithItem}</p>
                                </div>
                            ))}
                        </div> : null
                    }
                </div>
            </div>

            <div className="bottom-content">
                <a href="/restaurant/menu" className={currPage == "menu" ? "link curr-link" : "link"}>
                    <ListIcon />
                    <div className="text">Menu</div>
                </a>
                <a href="/user/orders" className={currPage == "orders" ? "link curr-link" : "link"}>
                    <FastfoodIcon />
                    <div className="text">Orders</div>
                </a>
                <a href="/user/bills" className={currPage == "bills" ? "link curr-link" : "link"}>
                    <ReceiptIcon />
                    <div className="text">Bills</div>
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