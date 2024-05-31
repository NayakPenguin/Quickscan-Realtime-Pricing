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

const BottomNavSimple = ({currPage}) => {
    return (
        <Container>
            <div className="bottom-content">
                <a href="/restaurant/menu" className={currPage == "menu" ? "link curr-link" : "link"}>
                    <ListIcon />
                    <div className="text">Menu</div>
                </a>
                <a href="/user/orders" className={currPage == "orders" ? "link curr-link" : "link"}>
                    <FastfoodIcon />
                    <div className="text">
                        Orders
                    </div>
                    {/* <div className="update-notify"></div> */}
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