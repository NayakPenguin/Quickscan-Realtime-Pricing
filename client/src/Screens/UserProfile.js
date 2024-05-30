import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";

const UserProfile = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <div className="content">
          <div className="user">
            <img className="profile-image" src="https://media.tenor.com/xTBnFraEFd4AAAAj/food-hungry.gif" alt="" />
            <div className="items">
              <div className="item">
                <b>Name : </b> Atanu Nayak
              </div>
              <div className="item">
                <b>Phone : </b> 9306191179
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

  .content{
    padding: 0 10px;

    .user{
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: whitesmoke;

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