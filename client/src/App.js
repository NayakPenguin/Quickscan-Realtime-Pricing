import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreMenu from "./Screens/Customer/PreMenu";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return false;
      }

      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        return true;
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return false;
      }
    };

    if (!isAuthenticated()) {
      // User is not authenticated, redirect to /qrscan/0
      navigate('/qrscan/0');
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/qrscan/:scanId" element={<PreMenu/>} />
      </Routes>
    </div>
  )
}

export default App