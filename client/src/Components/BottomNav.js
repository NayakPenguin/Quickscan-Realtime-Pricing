import React, { useState, useEffect } from "react";
import styled from "styled-components";

import "../CustomerCSS.css";

// Material Ui Icons
import ListIcon from '@material-ui/icons/List';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';

const BottomNav = () => {
    const [isOrderExpanded, setIsOrderExpanded] = useState(false);

    const handleOrderClick = () => {
        setIsOrderExpanded(!isOrderExpanded);
    };

    return (
        <Container>
            {isOrderExpanded && <div className="dark" onClick={handleOrderClick}></div>}

            <div className="order-container">
                <div className={`upper-layer-text ${isOrderExpanded ? 'expanded-layer-text' : ''}`} onClick={handleOrderClick}>
                    Added 3 items for ₹192.78. 
                    {
                        isOrderExpanded ? <b>Click to Close</b> : <b>Click to Order</b>
                    }
                </div>
                <div className={`content ${isOrderExpanded ? 'expanded' : ''}`}>
                    
                </div>
            </div>

            <div className="bottom-content">
                <a href="/" className="link curr-link">
                    <ListIcon/>
                    <div className="text">Menu</div>
                </a>
                <a href="/" className="link">
                    <FastfoodIcon/>
                    <div className="text">Orders</div>
                </a>
                <a href="/" className="link">
                    <MessageIcon/>
                    <div className="text">Reviews</div>
                </a>
                <a href="/" className="link">
                    <AccountCircleIcon/>
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
        }

        .expanded {
            height: 550px;
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