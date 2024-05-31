import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import PreMenu from "./Screens/PreMenu";

import { isAuthenticated } from './Controllers/IsAuthenticated'
import MenuMain from "./Screens/MenuMain";
import UserOrders from "./Screens/UserOrders";
import UserBills from "./Screens/UserBills";
import UserProfile from "./Screens/UserProfile";
import LandingPage from "./Screens/LandingPage";

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/qrscan/" element={<PreMenu/>} />
        <Route path="/qrscan/:creatorShopId/:scanId" element={<PreMenu/>} />
        <Route path="/restaurant/menu" element={<MenuMain/>} />
        <Route path="/user/orders" element={<UserOrders/>} />
        <Route path="/user/bills" element={<UserBills/>} />
        <Route path="/user/profile" element={<UserProfile/>} />
      </Routes>
    </div>
  )
}

export default App