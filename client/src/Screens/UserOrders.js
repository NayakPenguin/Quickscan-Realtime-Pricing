import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";
import CloseIcon from '@material-ui/icons/Close';

const UserOrders = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <div className="content">
          <div className="order-item">
            <div className="top">
              <div className="order-count">25</div>
              <div className="order-info">
                1st Apr, 2024
                <b>₹ 892.00</b>
              </div>
            </div>
            <div className="items">
              <div className="item">
                <div className="item-count">
                    <div className="val">2</div>
                    <CloseIcon />
                </div>
                <div className="about-item">
                    <div className="item-name">Chicken Biryani</div>
                    <div className="item-more">Kofta Graved</div>
                </div>
              </div>
              <div className="item">
                <div className="item-count">
                    <div className="val">4</div>
                    <CloseIcon />
                </div>
                <div className="about-item">
                    <div className="item-name">Chicken Biryani</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-item">
            <div className="top">
              <div className="order-count">24</div>
              <div className="order-info">
                23rd Feb, 2024
                <b>₹ 324.00</b>
              </div>
            </div>
            <div className="items">
              <div className="item">
                <div className="item-count">
                    <div className="val">2</div>
                    <CloseIcon />
                </div>
                <div className="about-item">
                    <div className="item-name">Chicken Biryani</div>
                    <div className="item-more">Kofta Graved</div>
                </div>
              </div>
              <div className="item">
                <div className="item-count">
                    <div className="val">4</div>
                    <CloseIcon />
                </div>
                <div className="about-item">
                    <div className="item-name">Chicken Biryani</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavSimple currPage={"orders"} />
    </Container>
  )
}

export default UserOrders

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  margin: 0 auto;
  padding: 91px 0 84px 0;
  background-color: #fffaf145;
  overflow-y: scroll;

  .content{
    padding: 0 10px;

    .order-item{
      padding: 10px;
      background-color: whitesmoke;
      border: 1px solid #e0d8d8;
      border-radius: 10px;
      margin-bottom: 10px;
      
      .top{
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        margin-bottom: 10px;

        .order-count{
          height: 50px;
          aspect-ratio: 1/1;
          border-radius: 100%;
          background-color: #e9d4ac;
          margin-right: 10px;

          display: grid; 
          place-items: center;
          /* color: white; */
          font-size: 0.85rem;
        }

        .order-info{
          display: flex;
          /* flex-direction: column; */

          font-size: 0.85rem;
          align-items: center;

          b{
            font-weight: 600;
            margin-left: 10px;
            padding: 5px 10px;
            background-color: #e5e5e5;
            border-radius: 100px;
          }
        }
      }
  
      .item{
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        padding: 10px;
        border-top: 1px solid #e0d8d8;


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
    }

  }

`