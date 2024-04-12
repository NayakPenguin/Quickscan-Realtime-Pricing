import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

const GooglePayResearch = () => {
    const [upiId, setUpiId] = useState("gpay-11208395125@okbizaxis");
    const [amount, setAmount] = useState("1");
    const [linkCopied, setLinkCopied] = useState(false);

    const generatePaymentLink = () => {
        const paymentLink = `upi://pay?pa=${encodeURIComponent(
            upiId
        )}&am=${encodeURIComponent(amount)}&mc=5399&pn=Google%20Pay%20Merchant&oobe=fos123&qrst=stk&tr=1208395125&cu=INR`;
        return paymentLink;
    };

    return (
        <GrandContainer>
            <Container>
                <h1>Google Pay Research</h1>
                <p>This will create a button for payment, and hence can be used for testing purposes.</p>

                <input
                    type="text"
                    placeholder="UPI Id"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <a href={generatePaymentLink()} target="_blank" >
                    Open Google Pay
                </a>

                <CopyToClipboard
                    text={generatePaymentLink()}
                    onCopy={() => {
                        setLinkCopied(true);
                        setTimeout(() => {
                            setLinkCopied(false);
                        }, 3000);
                    }}
                >
                    <button>
                        {linkCopied ? "Link Copied!" : "Copy Link"}
                    </button>
                </CopyToClipboard>

                {linkCopied && (
                    <p>Link copied! Click again to copy.</p>
                )}
            </Container>
        </GrandContainer>
    );
};

export default GooglePayResearch;

const GrandContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Container = styled.div`
    padding: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 500px;
    max-width: 100vw;
    min-height: 100vh;
    background-color: whitesmoke;

    *{
        color: #1e293b;
        text-align: center;
    }
    
    h1{
        font-size: 36px;
        font-weight: 600;
    }

    p{
        font-size: 0.85rem;
        margin: 5px 0 20px 0;
        font-weight: 300;
    }

    input{
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
    }

    button{
        width: 100%;
        padding: 10px;
    }
    
    a{
        cursor: pointer;
        margin: 30px 0;
    }

`