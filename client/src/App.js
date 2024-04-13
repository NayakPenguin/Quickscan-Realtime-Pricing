import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreMenu from "./Screens/Customer/PreMenu";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
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

    if (!isAuthenticated()) {
      // User is not authenticated or token has expired, redirect to /qrscan/0
      navigate("/qrscan/0");
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/qrscan/:scanId" element={<PreMenu/>} />
        <Route path="/s" element={<PreMenu/>} />
      </Routes>
    </div>
  )
}

export default App