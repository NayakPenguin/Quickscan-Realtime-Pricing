import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";

function ShowRedux(){
    const user = useSelector(state => state.user)
    const restaurant = useSelector(state => state.restaurant)
    const dispatch = useDispatch()
    console.log(restaurant)
    return (
        <Container>
             <Navbar >
                <div className="left">
                    <img src="https://live.staticflickr.com/65535/49816898282_e611b8f730_b.jpg" alt="" />
                </div>
            </Navbar>
            <Subcontainer>
                <ul>
                <li>Mobile : {user.phone}</li>
                <li>Restaurant_id : {restaurant.id}</li>
                <li>Access key: {restaurant.accesskey}</li>
                </ul>
            </Subcontainer>
        </Container>
    )
}

export default ShowRedux 

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
const Subcontainer = styled.div`
    padding:10%
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
