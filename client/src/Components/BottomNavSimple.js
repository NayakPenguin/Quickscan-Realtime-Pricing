import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import "../CustomerCSS.css";

// Material Ui Icons
import ListIcon from '@material-ui/icons/List';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

const BottomNavSimple = () => {
    const [isOrderExpanded, setIsOrderExpanded] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderedMenuState, setOrderedMenuState] = useState([])
    const [isBouncing, setBouncing] = useState(false);
    const [showPage, setShowPage] = useState(1);
    const [allowPostPaid, setAllowPostPaid] = useState(true);
    const [callWaiter, setCallWaiter] = useState(false);
    const [fillWidth, setFillWidth] = useState(0);
    const [showCancelOrder, setShowCancelOrder] = useState(false);
    const [orderDone, setOrderDone] = useState(false);

    return (
        <Container>
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

export default BottomNavSimple

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