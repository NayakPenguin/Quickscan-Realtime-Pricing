import React, { useState, useEffect } from "react";
import styled from "styled-components";

import "../CustomerCSS.css";

// Material Ui Icons
import TranslateIcon from '@material-ui/icons/Translate';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SearchIcon from '@material-ui/icons/Search';
import PanToolIcon from '@material-ui/icons/PanTool';

const MenuNav = ({showSearch}) => {
    const [getAssistance, setGetAssistance] = useState(false);

    return (
        <Container>
            <div className="top">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Las_Iguanas_logo.svg/2560px-Las_Iguanas_logo.svg.png" alt="" />
                </div>
                <div className="right">
                    <div className="btn">
                        <TranslateIcon />
                        <div className="text">English</div>
                    </div>
                    <div className={getAssistance ? "btn clicked-btn" : "btn"}onClick={() => setGetAssistance(!getAssistance)}>
                        <PanToolIcon />
                        {/* <div className="text">Call Waiter</div> */}
                    </div>
                </div>
            </div>
            {
                showSearch ? (
                    <div className="bottom">
                        <input type="text" placeholder="Search in Arsalan" />
                        <SearchIcon />
                    </div>
                ) : (<></>)
            }
            
        </Container>
    )
}

export default MenuNav

const Container = styled.div`
    border-bottom: 1px solid rgb(233, 229, 229);
    background-color: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 500px;
    z-index: 100;
    
    .top{
        height: 80px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* background-color: grey; */
        border-bottom: 1px solid #e5e5e5;
    
        padding-right: 20px;
        padding-left: 10px;
    
        .left{
            height: 100%;
            display: flex;
            align-items: center;

            img{
                height: 50%;
                margin-left: 10px;
            }
        }
    
        .right{
            display: flex;
    
            .btn{ // over-writing CustomerCSS.css
                margin-left: 10px;
                background-color: #e5e5e5;
                border-radius: 100px;
                padding: 7.5px 10px;
    
                svg{
                    font-size: 1rem;
                }
                
                .text{
                    font-size: 0.8rem;
                    margin-left: 10px;
                }
            }

            .clicked-btn{
                background-color: #ffce74;
            }
        }   
    }

    .bottom{
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;

        input{
            flex: 1;
            height: 100%;
            border-radius: 100px;
            border: 1px solid #d6cfcf;
            /* border: none; */
            background-color: #fff6f6;

            margin-right: 10px;
            padding: 0 15px;
            font-size: 0.8rem;
            font-weight: 300;
        }
    }
`