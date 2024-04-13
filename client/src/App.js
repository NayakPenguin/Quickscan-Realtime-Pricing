import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import PreMenu from "./Screens/Customer/PreMenu";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const navigate = useNavigate();
  const { creatorShopId, scanId } = useParams();

  useEffect(() => {
    console.log(creatorShopId);
    console.log(scanId);
}, [creatorShopId, scanId]);

  useEffect(() => {
    console.log("creatorShopId : ", creatorShopId);
    
    if(creatorShopId != undefined){
      if(!isAuthenticated()){
        navigate(`/qrscan/${creatorShopId}/0`);
      }
    }
  
  }, [creatorShopId]);


  const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const expirationTime = decodedToken.exp * 1000;
      const expirationDate = new Date(expirationTime);
      console.log("Token expiration time:", expirationDate.toLocaleString());

      const currentTime = new Date();
      console.log("Current time:", currentTime.toLocaleString());


      // Check if token is expired
      if (expirationDate < Date.now()) {
        console.log("Token has expired");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return false;
    }
  };


  return (
    <div>
      <Routes>
        <Route path="/qrscan/:creatorShopId/:scanId" element={<PreMenu/>} />

      </Routes>
    </div>
  )
}

export default App