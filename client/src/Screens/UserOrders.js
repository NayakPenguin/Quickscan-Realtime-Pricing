import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";
import CloseIcon from '@material-ui/icons/Close';

const UserOrders = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <h3 className="category-heading">Your Orders</h3>
        <div className="content">
          <div className="order-item">
            <div className="top">
              <div className="order-count">25</div>
              <div className="order-info">
                1st Apr, 2024
                <a href="/show-live-menu" className="restaurant-name">
                  Broadway Kolkata
                </a>
                <b className="amount">₹ 892.00</b>
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
                1st Apr, 2024
                <a href="/show-live-menu" className="restaurant-name">
                  Broadway Kolkata
                </a>
                <b className="amount">₹ 892.00</b>
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
              <div className="order-count">23</div>
              <div className="order-info">
                1st Apr, 2024
                <a href="/show-live-menu" className="restaurant-name">
                  Broadway Kolkata
                </a>
                <b className="amount">₹ 892.00</b>
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

  .category-heading{
    font-weight: 600;
    font-size: 1.15rem;
    color: #434343;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .content{
    padding: 0 10px;

    .order-item{
      padding: 10px;
      border: 1px solid #e0dddd;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
      background-color: #fff;
      margin-bottom: 10px;
      
      .top{
        display: flex;
        align-items: center;
        padding-bottom: 10px;

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
          width: 100%;
          display: flex;
          flex-direction: column;

          font-size: 0.85rem;
          align-items: flex-end;

          .restaurant-name{
            font-size: 0.85rem;
            font-weight: 500;
            text-decoration: none;
          }
          
          .amount{
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: 10px;
            padding: 3.5px 10px;
            background-color: #e8d4ac;
            border-radius: 100px;
            margin-top: 10px;
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