import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

import CallMadeIcon from '@material-ui/icons/CallMade';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import axios from 'axios'
import {updateRestaurant} from '../../userslice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, writeBatch } from "firebase/firestore";

const Login = () => {
    const [isOwner, setIsOwner] = useState(false);
    const [creatorShopId, setCreatorShopId] = useState("");
    const [password , setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('creatorToken')

        console.log(jwt);
        
        if(jwt) {
            const decodedHeader = jwtDecode(jwt);

            console.log(decodedHeader);
            console.log(decodedHeader.creatorShopId);
            navigate(`/restaurant/${decodedHeader.creatorShopId}/table-management`);
        }
    },[]);

    const DeleteCollection = async (collectionName) => {
        const collectionRef = collection(db, collectionName);
        const snapshot = await getDocs(collectionRef);
        const batch = writeBatch(db);

        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log(`Collection ${collectionName} documents deleted successfully.`);
    };

    const handleLogin = async () => {
        try {
            const loginDoc = {
                creatorShopId: creatorShopId,
                password: password
            };
    
            console.log(loginDoc);
    
            const response = await fetch('https://quickscan.tonmoy1912.in/creator/verify-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginDoc)
            });
    
            const data = await response.json();
    
            console.log('API response:', data);
    
            if (!data.token) {
                alert('Invalid credentials');
                return;
            }

            await DeleteCollection(`Orders${creatorShopId}`);
            await DeleteCollection(`OrderNumbers${creatorShopId}`);

            localStorage.setItem('creatorToken', data.token);
            const decodedHeader = await jwtDecode(data.token);

            navigate(`/restaurant/${decodedHeader.creatorShopId}/table-management`);
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const handleLoginTest = async () => {
        const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdG9ySWQiOiI2Njg1MzllZjBhOWYzNTc5ZTYyNjA5MGUiLCJjcmVhdG9yU2hvcElkIjoiV2luZHNvckRlbCIsImlhdCI6MTcyMDAwNzc4OSwiZXhwIjoyMDM1NTgzNzg5fQ.HTOC39TWmaQgQ6LMrOG4_OKJIx1nrMg4-5KHF5MJ6B8";
        
        localStorage.setItem('creatorToken', dummyToken);

        const decodedHeader = await jwtDecode(dummyToken);

        navigate(`/restaurant/${decodedHeader.creatorShopId}/table-management`);
    }   


    return (
        <Container>
            <Navbar >
                <div className="left">
                    <img src="https://static.vecteezy.com/system/resources/previews/023/870/096/non_2x/cute-coffee-cup-kawaii-icon-logo-illustration-free-png.png" alt="" />
                </div>
                <div className="right">
                    <a href="/" className="normal-link">
                        Don't have an account? 
                        <b>Talk with Sales</b> <ArrowForwardIcon/>
                    </a>
                </div>
            </Navbar>
            <Form>
                <h3>Login to your Restaurant Dashboard</h3>
                <div className="input-container">
                    <div className="svg-container">
                        <PersonIcon/>
                    </div>
                    {/* <div className="result">{
                        isOwner ? "Restaurant Owner" : "Restaurant Manager"
                    }</div> */}
                    <div className="result">Restaurant Management</div>
                    <div className="swap-icon" onClick={() => setIsOwner(!isOwner)}><SwapHorizIcon/></div>
                </div>
                <div className="input-container">
                    <div className="svg-container">
                        <RestaurantIcon/>
                    </div>
                    <input type="text" placeholder="Registered Restaurant ID" onChange={(e) => setCreatorShopId(e.target.value)} />
                </div>
                <div className="input-container">
                    <div className="svg-container">
                        <VpnKeyIcon/>
                    </div>
                    <input type="text" placeholder="Access Key" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <a href="/" className="two-fact-auth-req-link">Request 2FA to enhance security measures.</a>
                <div className="login-btn" onClick={() => handleLogin()}>
                    Login
                </div>
                <div className="login-btn test" onClick={() => handleLoginTest()}>
                    Login as Test User
                </div>
            </Form>
            <div className="bottom">
            If you need to update your access key or enable 2FA, please get in touch with the <a href="/">technical team</a>.
            </div>
        </Container>
    )
}

export default Login

const Container = styled.div`
    padding: 50px 12.5%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .bottom{
        max-width: 350px;
        text-align: center;
        font-size: 0.75rem;
        font-weight: 200;

        a{
            font-weight: 500;
        }
    }
`

const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: 1px solid black; */

  .left{
    display: flex;
    align-items: center;
    
    img{
      height: 60px;
    }
  }

  .right{
    display: flex;
    align-items: center;
    
    .normal-link{
        color: #333;
        font-size: 0.85rem;
        margin: 0 10px;
        text-decoration: none;
    
        font-weight: 300;
        display: flex;
        align-items: center;
        
        b{
            font-weight: 500;
            font-size: 1rem;
            margin-left: 5px;
        }

        svg{
            font-size: 1.25rem;
            margin-left: 5px;
        }
    }
  }
`


const Form = styled.div`
    width: 500px;
    /* background-color: orange; */

    display: flex;
    flex-direction: column;
    align-items: center;

    h3{
        font-weight: 500;
        margin-bottom: 20px;
    }

    .input-container{
        background-color: orange;
        position: relative;

        background: #edf2f7;
        height: 48px;
        font-size: 16px;
        
        display: flex;
        align-items: center;
        border-radius: 10px;
        border: 1px solid #e4e3e3;
        margin-bottom: 10px;

        .svg-container{
            height: 48px;
            width: 48px;
            display: grid;
            place-items: center;
            border-right: 1px solid #e4e3e3;

            svg{
                font-size: 1.25rem;
            }
        }

        input{
            height: 48px;
            font-size: 0.85rem;
            width: 300px;
            padding: 0 10px;
            background-color: transparent;
            border: none;
            font-weight: 300;
        }

        .result{
            height: 48px;
            font-size: 0.85rem;
            width: 300px;
            padding: 0 10px;
            background-color: transparent;
            border: none;
            font-weight: 400;
            display: flex;
            align-items: center;
        }

        .swap-icon{
            position: absolute;
            right: 10px;
            height: 28px;
            width: 28px;
            display: grid;
            place-items: center;
            background-color: white;
            border-radius: 100px;
            cursor: pointer;
            border: 1px solid #e4e3e3;
            background-color: #ece7e7;
            
            svg{
                font-size: 1.25rem;
            }

            &:hover{
                border: 1px solid #bfb8b8;
                background-color: #ece7e7;
                transition-duration: 500ms;
            }
        }
    }

    .two-fact-auth-req-link{
        width: 350px;
        font-size: 0.75rem;
        text-align: left;
        text-decoration: none;
        font-weight: 400;
    }

    .login-btn{
        height: 48px;
        width: 350px;
        display: grid;
        place-items: center;
        background-color: black;
        color: white;
        border-radius: 100px;
        margin-top: 15px;
        font-size: 0.85rem;
        cursor: pointer;
    }

    .test{
        background-color: orange;
    }
`