import React, { useState, useEffect } from "react";
import styled from "styled-components";

import "../CustomerCSS.css";

// Material Ui Icons
import ListIcon from '@material-ui/icons/List';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';

const BottomNav = () => {
    return (
        <Container>
            <div className="upper-layer-text">
                Added 3 items for ₹192.78. <b>Click to Order</b>
            </div>
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
        </Container>
    )
}

export default BottomNav

const Container = styled.div`
    position: fixed;
    bottom: -10px;
    left: 0;

    width: 100vw;
    height: 80px;
    padding: 0 30px;
    padding-top: 5px;
    
    z-index: 500;

    /* border-top: 1px solid rgb(233, 229, 229); */
    background-color: rgba(255, 255, 255, 1);
    /* box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px; */

    display: flex;  
    align-items: flex-start;
    justify-content: space-between;

    .upper-layer-text{
        position: absolute;
        height: 38px;
        top: -38px;
        font-size: 0.8rem;
        z-index: 500;

        border-top: 1px solid rgb(233, 229, 229);
        background-color: #ede76d;

        width: 100%;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 15px;
        font-weight: 500;

        b{
            background-color: orange;
            padding: 2.5px 7.5px;
            border-radius: 5px;
        }
    }

    .link{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;

        /* background-color: orange; */
        height: 60px;
        border-radius: 50%;
        aspect-ratio: 1/1;

        svg{
            font-size: 1.75rem;
            margin-bottom: 2.5px;
            fill: #babab9;
        }

        .text{
            font-size: 0.65rem;
            text-decoration: none;
            color: #babab9;
            font-weight: 500;
        }
    }

    .curr-link{
        background-color: #fff6f6;

        svg{
            fill: #333;
        }

        .text{
            color: #333;
        }
    }
`