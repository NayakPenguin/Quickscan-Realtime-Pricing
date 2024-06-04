import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("creatorToken");
    navigate("/restaurant/login");
  };
  
  return (
    <Container>
        <div></div>
        <div className="logout" onClick={() => logout()}>Logout</div>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
    width: calc(100vw - 260px);
    height: 60px;
    background-color: white;
    border-bottom: 1px solid #e8e1d6;
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 20px;

    .logout{
      font-size: 0.85rem;
      padding: 5px 10px;
      /* background-color: #fde7d0; */
      background-color: #f88888;
      color: white;
      border: 2px solid black;
    }
`