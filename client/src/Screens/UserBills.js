import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { getUserId } from '../Controllers/UserInfo';
import allCreatorData from '../Assets/LocalDB/AllCreatorData.json';

const UserBills = () => {
  const [orders, setOrders] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = getUserId();
  
        if (!userDetails || !userDetails.userId) {
          console.error("User details not available");
          return;
        }
  
        const response = await fetch(`http://localhost:8000/order/byUserId/${userDetails.userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setOrders(data.orders);
        console.log('Data:', data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
  }, []);
  
  const downloadPDF = (bill) => {
    const input = document.getElementById(`bill-${bill.creatorShopId.replace(/\s+/g, '-')}`);
    input.classList.add('pdf-content');
  
    html2canvas(input, { scrollX: -window.scrollX, scrollY: -window.scrollY, scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'px',
          format: [canvas.width, canvas.height]  // Custom format for full content
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${bill.creatorShopId}-${bill.OrderId}-bill.pdf`);
        input.classList.remove('pdf-content');
      });
  };

  return (
    <Container>
      <MenuNav showSearch={false} />
      <h3 className="category-heading">Your Bills</h3>
      <div className="content">
        {
          orders &&
          orders
            .sort((a, b) => new Date(b.timeOfOrder) - new Date(a.timeOfOrder)) // Sort orders by timeOfOrder in descending order
            .map((bill, index) => (
              <div className="zigzag bill" key={index} id={`bill-${bill.creatorShopId.replace(/\s+/g, '-')}`}>
                <div className="download-button" onClick={() => downloadPDF(bill)}>
                  <div className="text">Download PDF</div>
                  <GetAppIcon />
                </div>
                <div className="restaurant-details">
                  <h2 className="restaurant-name">{allCreatorData[bill.creatorShopId]?.name}</h2>
                  <p className="date">
                    {new Date(bill.timeOfOrder).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                  <div className="order-id"><b>Order Id : </b>{bill.orderId}</div>
                </div>
                {bill.orderDetails.map((item, index) => (
                  <div className="order-item" key={index}>
                    <div className="left">
                      <div className="item-count">
                        <div className="val">{item.count}</div>
                        <CloseIcon />
                      </div>
                      <div className="about-item">
                        <div className="item-name">{item.itemName}</div>
                        {item.extraWithItem && <div className="item-more">{item.extraWithItem}</div>}
                      </div>
                    </div>
                    <div className="right">
                      <div className="price">₹ {item.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
                <div className="total-price">
                  <div className="left">Total Amount</div>
                  <div className="right">₹ {bill.totalPrice}</div>
                </div>
              </div>
            ))}
      </div>
      <BottomNavSimple currPage={"bills"} />
    </Container>
  )
}

export default UserBills

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  margin: 0 auto;
  padding: 91px 0 84px 0;
  background-color: #fffaf145;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }

  scrollbar-width: thin; /* For Firefox */
  -ms-overflow-style: none;


  .category-heading{
    font-weight: 600;
    font-size: 1.15rem;
    color: #434343;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .content{
    padding: 0 10px;

    

    .zigzag{
        position: relative;
        width: 100%;
        /* height: 700px; */
        background: #f1f1f1;

        .restaurant-details{
          margin: auto;
          display: flex;
          flex-direction: column; 
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;

          .restaurant-name{
            font-size: 1.25rem;
            font-weight: 500;
          }
          
          .date{
            font-size: 0.85rem;
          }

          .order-id{
            b{
              font-weight: 500;
              font-style: normal;
            }
            font-style: italic;
            font-weight: 200;
            font-size: 0.85rem;
          }
        }

        .download-button{
          position: absolute;
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          height: 30px;
          border-radius: 100px;
          background-color: white;
          border: 1px solid #e0dddd;
          box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
          padding: 0 10px;
          
          right: 0px;
          top: -5px;

          svg{
            font-size: 1rem;
          }
        }
    }

    .pdf-content {
      background-color: white !important;
    }

    .pdf-content .download-button {
      display: none !important;
    }

    .bill{
        padding: 30px;
        margin-bottom: 20px;

        .order-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 0;
            border-bottom: 1px solid #dadada;

            .left{
                display: flex;
                justify-content: space-between;
                align-items: center;

                .about-item{
                    margin-right: 10px;

                    .item-name{
                        font-size: 0.95rem;
                        font-weight: 500;
                        letter-spacing: 0.1rem;
    
                        span{
                            font-size: 0.85rem;
                            font-weight: 300;
                            letter-spacing: 0.1rem;
                        }
                    }
                    .item-more{
                        font-size: 0.8rem;
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
    }

    .zigzag::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: linear-gradient(135deg,#fff 5px,
        transparent 0%), linear-gradient(-135deg,#fff 5px,
        transparent 0%);
        background-size: 15px;
    }
    
    .zigzag::after{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: linear-gradient(45deg,#fff 5px,
        transparent 0%), linear-gradient(-45deg,#fff 5px,
        transparent 0%);
        background-size: 15px;
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
  }
`