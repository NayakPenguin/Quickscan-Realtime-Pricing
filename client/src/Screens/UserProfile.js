import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";
import { getUserId } from '../Controllers/UserInfo';

const UserProfile = () => {
  const userDetails = getUserId();

  return (
    <Container>
        <MenuNav showSearch={false}/>
        <h3 className="category-heading">Your Profile</h3>
        <div className="content">
          <div className="user">
            <img className="profile-image" src="https://media.tenor.com/xTBnFraEFd4AAAAj/food-hungry.gif" alt="" />
            <div className="items">
              <div className="item">
                <b>Name : </b> {userDetails.name}
              </div>
              <div className="item">
                <b>Phone : </b> {userDetails.phone}
              </div>
            </div>
          </div>
        </div>

        <BottomNavSimple currPage={"profile"}/>
    </Container>
  )
}

export default UserProfile

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

    .user{
      display: flex;
      align-items: center;
      padding: 10px;
      border: 1px solid #e0dddd;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
      background-color: #fff;
      margin-bottom: 10px;

      .profile-image{
        height: 100px;
        aspect-ratio: 1/1;
        border-radius: 100%;
        background-color: black;
        margin-right: 10px;
      }
  
      .item{
        b{
          font-weight: 500;
        }
  
        font-size: 0.85rem;
        font-weight: 300;
      }
    }

  }

`