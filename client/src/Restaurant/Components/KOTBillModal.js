import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';

const KOTBillModal = ({ setShowKOTBillModal, isKOT, orderDetails, totalPrice }) => {
    useEffect(() => {
        console.log(orderDetails);
    }, [orderDetails])
    return (
        <Container>
            <div className="closer" onClick={() => setShowKOTBillModal(false)}>

            </div>
            <div className="main-container">
                <div className="bill-container">
                    <div className="table">Table 14</div>
                    <div className="order-detail">Order No. 54</div>
                    {orderDetails.map((item, index) => (
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
                <div className="bill-btns">
                    <div className="btn download-btn">
                        Download
                    </div>
                    <div className="btn print-btn">
                        Print
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default KOTBillModal

const Container = styled.div`
    z-index: 1001; // all modal z-index

    position: fixed;
    top: 0;
    right: 0;

    .closer{
        z-index: 1001; // all modal z-index
        width: 100vw;
        height: 100vh;
        background-color: #000000ba;
        
        position: absolute;
        top: 0;
        right: 0;
    }

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    .main-container{
        z-index: 1002;
        width: 90%;
        /* background-color: orange; */
        border: 10px solid black;
        max-width: 500px;

        .bill-container{
            width: 100%;
            background-color: white;
            aspect-ratio: 1/1;
            overflow: hidden;
            overflow-y: scroll;
            border-bottom: 10px solid black;
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
                margin-bottom: 40px;
            }

            .order-item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                border-bottom: 1px solid #dadada;

                .left{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

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
        }

        ::-webkit-scrollbar {
            width: 3px; /* Set the width of the scrollbar */
        }

        ::-webkit-scrollbar-thumb {
            background-color: #7290f0; /* Color of the scrollbar thumb */
            border-radius: 100px; /* Radius of the scrollbar thumb */
        }

        .bill-btns{
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;

            .btn{
                width: 50%;
                text-align: center;
                display: flex;
                justify-content: center;
                padding: 10px 0;
                font-size: 0.75rem;
                color: black;

                text-transform: uppercase;
                letter-spacing: 0.25rem;
                font-weight: 400;

                cursor: pointer;
            }

            .download-btn{
                background-color: #71d17f;
                border-right: 10px solid black;
            }
            
            .print-btn{
                background-color: #eea2a2;
            }
        }
    }
`