import React, { useState, useEffect } from "react";
import { Link,Routes, Route,useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreMenu from "./Screens/Customer/PreMenu";
import { jwtDecode } from "jwt-decode";
import { Provider } from 'react-redux'
import {store} from './store'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/qrscan/:tableId" element={<PreMenu/>} />
      </Routes>
    </div>
  )
}

export default App