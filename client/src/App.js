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

import TableManagment from "./Restaurant/Screens/TableManagment";
import Orders from "./Restaurant/Screens/Orders";
import MenuStatusControl from "./Restaurant/Screens/MenuStatusControl";
import KotUpdates from "./Restaurant/Screens/KotUpdates";
import Customers from "./Restaurant/Screens/Customers";
import Analytics from "./Restaurant/Screens/Analytics";
import Login from "./Restaurant/Screens/Login";

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

        <Route path="/restaurant/table-management" element={<TableManagment />} />
        <Route path="/restaurant/orders" element={<Orders />} />
        <Route path="/restaurant/menu-status-control" element={<MenuStatusControl />} />
        <Route path="/restaurant/kot-updates" element={<KotUpdates />} />
        <Route path="/restaurant/customers" element={<Customers />} />
        <Route path="/restaurant/analytics" element={<Analytics />} />
        <Route path="/restaurant/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App