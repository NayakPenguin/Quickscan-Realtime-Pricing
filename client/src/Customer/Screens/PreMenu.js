import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios'
import { db } from "../../firebase";
import { collection, getDoc, where, query, getDocs, addDoc, updateDoc, onSnapshot, doc } from "firebase/firestore";
import {useDispatch} from 'react-redux'
//import {updateUser} from '../../userslice'

const PreMenu = ({setIsAuthenticated}) => {
    const { tableId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log(tableId);
    }, [tableId]);

    const [restaurantId, setRestaurantId] = useState("BrdwyKol");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [state,setState] = useState("register")
    const [otp,setOtp] = useState("");
    
    useEffect(async ()=>{
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const lastaccess = localStorage.getItem('lastaccesstime');

        console.log("Last loggedin : ", currentTimestamp-lastaccess);

        if(!lastaccess) setState("register")
        else if((currentTimestamp-lastaccess)>2592000){
            setState("otp");
        }
        else{
            //dispatch(updateUser(localStorage.getItem('mobile')))
            await handleCreateSession();
            localStorage.setItem('lastaccesstime',currentTimestamp)
            setIsAuthenticated(true);
            window.location.href = '/menu';
        }
    }, [])
    
    const handleCreateSession = async () => {
        const q = query(collection(db, `Tables${restaurantId}`), where("tableNo", '==', tableId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const matchingDoc = querySnapshot.docs[0];
            const tableRef = doc(db, `Tables${restaurantId}`, matchingDoc.id);

            console.log(tableRef.id);

            await updateDoc(tableRef, {
                status: "occ",
                // userInfo: {
                //   [`customer-name`]: tableCustomerInfo.name || '',
                //   [`customer-phone`]: tableCustomerInfo.phone || '',
                //   [`customer-email`]: tableCustomerInfo.email || '',
                // },
                sessionStartTime: new Date(),
            });
            console.log('Session created successfully!');
            navigate('/menu');
        } else {
            console.log('No matching document found.');
        }
    }

    const handleSubmit = async () => {
        console.log(name,mobile,email)
        const response = await axios.post('http://localhost:8000/login-user', {
               name,mobile,email
            });
        const currentTimestamp = Math.floor(Date.now() / 1000);
        //console.log(currentTime)
        //dispatch(updateUser(mobile))
        localStorage.setItem('mobile',mobile)
        localStorage.setItem('lastaccesstime',currentTimestamp)
        setState("otp")
    }
    
    const handleOtp = async () => {
        console.log("Your OTP : ", otp);
        if (otp == "12345") {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            localStorage.setItem('lastaccesstime', currentTimestamp);
            await handleCreateSession();
            setIsAuthenticated(true);
            window.location.href = '/menu';
            console.log("Authentication successful");
        } else {
            alert("Invalid OTP");
        }
    }

    return (
        <Container>
            <div className="top">
                <h1>Hello,</h1>
            </div>
            {
              state == "register"?
              <div className="form">
                <div className="desc-text">Fill in your details and start ordering.</div>
                <input type="text" placeholder="Your Name" onChange={(e)=>setName(e.target.value)} />
                <input type="text" placeholder="Mobile Number" onChange={(e)=>setMobile(e.target.value)} />
                <input type="text" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
                <a className="submit-btn" onClick={() => handleSubmit()}>Submit</a>
            </div>
              :<div className="form">
              <div className="desc-text">Enter Otp</div>
              <input type="text" placeholder="Otp" onChange={(e)=>setOtp(e.target.value)} />
              <a className="submit-btn" onClick={() => handleOtp()}>Submit</a>
          </div>
            }
            
            <div className="bottom-img">
            </div>
            <div className="bottom">
                Powered by <br /> <b>slurp.in</b>
            </div>
        </Container>
    )
}

export default PreMenu

const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    max-width: 500px;
    margin: auto;
    background-color: whitesmoke;
    /* background: url('https://media1.giphy.com/media/3oEjHImwTUlfR2wBji/giphy.gif?cid=6c09b952gqrcx7dj0s97tonk9ssy1v01y4z61041mbwq0c0q&ep=v1_gifs_search&rid=giphy.gif&ct=g') no-repeat center center fixed;
    background-size: cover; */
    
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 150px;

    .top-img-left{
        img{
            position: absolute;
            left: -50px;
            top: 0px;
            height: 300px;
            z-index: -10;
            transform: rotate(30deg);
        }
    }

    .top{
        h1{
            font-size: 3.5rem;
            margin-bottom: 30px;
        }
    }

    .form{
        display: flex;
        flex-direction: column;
        width: 75%;

        .desc-text{
            font-size: 0.85rem;
            font-weight: 500;
            text-align: center;
            margin-bottom: 15px;
        }

        input {
            width: 100%;
            padding: 15px 25px;
            margin: 3.5px 0;
            /* border-radius: 10px; */
            font-size: 0.85rem;
            border: 1px solid #d6cfcf;
            background-color: rgba(255, 255, 255, 0.95); /* Adjust the alpha value for transparency */
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Adjust the alpha value for hazy effect */
            z-index: 2;
        }

        .submit-btn{
            width: 100%;
            padding: 15px 25px;
            text-align: center;
            z-index: 2;
            background-color: orange;
            margin-top: 10px;
            font-size: 0.85rem;
            font-weight: 500;
            color: #333;
            text-decoration: none;
        }
    }

    .bottom-img{
        img{
            bottom: 0;
            position: absolute;
            width: 100vw;
            transform: scale(1.15);
            z-index: 1;
            left: -40px;
            /* opacity: 0.7; */
        }
    }

    .bottom{
        margin-top: 100px;
        font-weight: 300;
        text-align: center;
        font-size: 0.75rem;
        
        b{
            font-size: 1.5rem;
            font-weight: 600;
        }
    }
`