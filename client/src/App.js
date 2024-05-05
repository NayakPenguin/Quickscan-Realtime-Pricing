import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import PreMenu from "./Screens/PreMenu";
import Menu from "./Screens/Menu";

import { isAuthenticated } from './Controllers/IsAuthenticated'
import MenuMain from "./Screens/MenuMain";

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/qrscan/:creatorShopId/:scanId" element={<PreMenu/>} />
        <Route path="/menu/:creatorShopId/:scanId" element={<MenuMain/>} />
        <Route path="user/orders" element={<MenuMain/>} />
        <Route path="user/bills" element={<MenuMain/>} />
        <Route path="user/profile" element={<MenuMain/>} />
      </Routes>
    </div>
  )
}

export default App