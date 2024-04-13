import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios'

const PreMenu = () => {
    const [managerId, setManagerId] = useState("@NayakPenguin");
    const [name, setName] = useState("ATANU NAYAK");
    const [mobile, setMobile] = useState("9306191179");
    const [email, setEmail] = useState("");
    const [showOTPBox, setShowOTPBox] = useState(false);
    const [loading, setLoading] = useState(false);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const { scanId } = useParams();

    const API_BASE_URL = "localhost:8000";

    useEffect(() => {
        console.log(scanId);
    }, [scanId]);

    const handleOpenOTP = async () => {
        if (!name.trim()) {
            alert('Please enter your name.');
            return;
        }

        const cleanedMobile = mobile.replace(/\s/g, '');
        if (!cleanedMobile) {
            alert('Please enter your mobile number.');
            return;
        }
        if (!/^\d{10}$/.test(cleanedMobile)) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        setLoading(true);

        try {
            const userId = `customer@${cleanedMobile}`;

            const response = await axios.post("http://localhost:8000/otp/get-otp", {
                name: name.trim(),
                mobile: cleanedMobile,
                userId: userId
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error fetching OTP:', error);
        } finally {
            setLoading(false);
            setShowOTPBox(true);
        }
    };


    const handleSubmit = async () => {
        const userOTP = otp.join('');
    
        try {
            const response = await axios.post("http://localhost:8000/otp/verify-otp", {
                name: name.trim(),
                mobile: mobile.replace(/\s/g, ''),
                userId: `customer@${mobile.replace(/\s/g, '')}`,
                userOTP: userOTP
            });
    
            const { success, message, token } = response.data;
            
            if (success) {
                localStorage.setItem('token', token);
                console.log(message);
            } else {
                console.error('OTP verification failed:', message);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleChange = (index, event) => {
        const { value } = event.target;
        const numericValue = value.replace(/\D/g, '');
        const newOtp = [...otp];
        newOtp[index] = numericValue;
        setOtp(newOtp);

        if (numericValue && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };


    return (
        <Container>
            <div className="top">
                <h1>Hello,</h1>
            </div>
            <div className="form">
                <div className="desc-text">Fill in your details and get started!</div>
                <div className="input-box">
                    <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading || showOTPBox} />
                </div>
                <div className="input-box">
                    <div className="box">+91</div>
                    <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="numeric" disabled={loading || showOTPBox} />
                </div>
                {/* <input type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} /> */}

                {
                    showOTPBox ? (
                        <>
                            <div className="enter-otp">
                                <div className="place-title">Enter OTP</div>
                                <div className="otp-boxes">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            className="otp-box"
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(event) => handleChange(index, event)}
                                            onKeyDown={(event) => handleBackspace(index, event)}
                                            ref={(ref) => (inputRefs.current[index] = ref)}
                                            inputMode="numeric"
                                        />
                                    ))}
                                </div>
                            </div>
                            <a className="submit-btn" onClick={() => handleSubmit()}>Submit</a>
                        </>
                    ) : (
                        loading ? (<a className="submit-btn fade-btn">Sending OTP...</a>) : (<a className="submit-btn" onClick={() => handleOpenOTP()}>Get OTP</a>)
                    )
                }
            </div>

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
            margin-bottom: 25px;
        }

        .input-box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .box{
                height: 52px;
                aspect-ratio: 1/1;
                border: 1px solid #d6cfcf;
                background-color: rgba(255, 255, 255, 0.95);
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 0.85rem;
                margin-right: 8px;
                font-weight: 500;
            }
            
            input {
                /* width: calc(100% - 56px); */
                flex: 1;
                padding: 15px 25px;
                margin: 3.5px 0;
                /* border-radius: 10px; */
                font-size: 0.85rem;
                border: 1px solid #d6cfcf;
                background-color: rgba(255, 255, 255, 0.95); /* Adjust the alpha value for transparency */
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Adjust the alpha value for hazy effect */
                z-index: 2;
                width: 100%;
            }
        }

        .enter-otp{
            .place-title{
                margin-top: 10px;                
                font-size: 0.85rem;
                font-weight: 500;
                margin-bottom: 5px;
            }
            
            .otp-boxes{
                display: flex;
                justify-content: space-between;
                
                .otp-box{
                    width: 14.5%;
                    aspect-ratio: 1/1;
                    border: 1px solid #d6cfcf;
                    background-color: rgba(255, 255, 255, 0.95); 
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); 
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    font-size: 0.85rem;
                }
            }
        }

        .submit-btn{
            width: 100%;
            padding: 15px 25px;
            text-align: center;
            z-index: 2;
            background-color: orange;
            margin-top: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            color: #333;
            text-decoration: none;
            cursor: pointer;
        }

        .fade-btn{
            opacity: 0.5;
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