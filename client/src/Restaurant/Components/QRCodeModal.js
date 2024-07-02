import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import qrImage from '../../DummyDB/demo_qr2.png'
import QRCode from 'react-qr-code';
import {QRCodeSVG} from 'qrcode.react';

const QRCodeModal = ({setShowQR, qrTableNo}) => {
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(null);
    const [value, setValue] = useState("");

    const handleDownload = () => {
        // Get the QR code image element by its class name
        const qrCodeImage = document.querySelector(".qr-code-container img");

        // Create a temporary link element
        const downloadLink = document.createElement("a");

        // Set the href attribute to the image source
        downloadLink.href = qrCodeImage.src;

        // Set the download attribute to specify the file name
        downloadLink.download = "qr_code.png";

        // Append the link to the body
        document.body.appendChild(downloadLink);

        // Trigger a click on the link to start the download
        downloadLink.click();

        // Remove the link from the body
        document.body.removeChild(downloadLink);
    };

    const handlePrint = () => {
        // Create a new window for printing
        const printWindow = window.open("", "_blank");

        // Write the QR code image to the new window
        printWindow.document.write(`
          <html>
            <head>
              <title>Print QR Code</title>
            </head>
            <body>
              <img src="${qrImage}" style="max-width: 100%;" />
              <script>
                // Automatically trigger print once the image is loaded
                window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                };
              </script>
            </body>
          </html>
        `);
    };

    useEffect(() => {
        const newValue = `https://quickscan-alpha-v1.web.app/qrscan/${qrTableNo.tableNo}`;
        setValue(newValue);
        console.log(qrTableNo.tableNo);
        console.log(newValue);
    }, [qrTableNo])

    return (
        <Container>
            <div className="closer" onClick={() => setShowQR(false)}>

            </div>
            <div className="main-container">
                <div className="qr-code-container">
                    {qrTableNo && (
                        <QRCode
                            value={value}
                            size={size === '' ? 0 : size}
                        />
                    )}
                    {/* <img src={qrImage} alt="" /> */}
                </div>
                <div className="qr-btns">
                    <div className="btn download-btn" onClick={handleDownload}>
                        Download
                    </div>
                    <div className="btn print-btn" onClick={handlePrint}>
                        Print
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default QRCodeModal

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

        .qr-code-container{
            width: 100%;
            background-color: white;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-bottom: 10px solid black;
            padding: 40px;

            img{
                width: 100%;
            }
        }

        .qr-btns{
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
                color: black;
                font-size: 0.75rem;
                
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