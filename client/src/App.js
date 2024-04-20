import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import PreMenu from "./Screens/PreMenu";
import Menu from "./Screens/Menu";

import { isAuthenticated } from './Controllers/IsAuthenticated'

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/qrscan/:creatorShopId/:scanId" element={<PreMenu/>} />
        <Route path="/:creatorShopId/:scanId/menu" element={<Menu/>} />
      </Routes>
    </div>
  )
}

export default App