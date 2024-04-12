import React, { useState, useEffect } from "react";
import { Link,Routes, Route,useNavigate } from "react-router-dom";
import styled from "styled-components";
import ScrollToTop from "./Components/ScrollToTop";
import MenuMain from "./Customer/Screens/MenuMain";
import PreMenu from "./Customer/Screens/PreMenu";
import LandingPage from "./CommonPages/LandingPage";
import TableManagment from "./Restaurant/Screens/TableManagment";
import Orders from "./Restaurant/Screens/Orders";
import MenuStatusControl from "./Restaurant/Screens/MenuStatusControl";
import KotUpdates from "./Restaurant/Screens/KotUpdates";
import Customers from "./Restaurant/Screens/Customers";
import Login from "./Restaurant/Screens/Login";
import ShowRedux from "./Components/showredux"
import { jwtDecode } from "jwt-decode";
import { Provider } from 'react-redux'
import {store} from './store'
import NonAuthenticated from "./Customer/Screens/NonAuthenticated";
import GooglePayResearch from "./CommonPages/GooglePayResearch";
import LandingPage2 from "./CommonPages/LandingPage2";

const isTokenExpired = (decodedToken) => {
    if (decodedToken && decodedToken.exp) {
      const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
      return decodedToken.exp < currentTimestamp;
    }

    return false;
}

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    try{
    const token = localStorage.getItem('authToken')
    const decodedToken = jwtDecode(token);
    console.log("token : ", decodedToken);
    const active = !isTokenExpired(decodedToken)
    console.log("active : ", active);
    if(active){
      const id = decodedToken.restaurant_id
      //navigate('/restaurant/'+id+'/table-management')
    }
    else{
      // alert("Session expired . Please login")
      //navigate('/restaurant-login')
    }
  }
  catch(error){
    console.log(error)
  }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/google-pay-research" element={<GooglePayResearch />} />
        <Route path="/restaurant-login" element={<Login />} />
        <Route path="/qrscan/:tableId" element={<PreMenu setIsAuthenticated={setIsAuthenticated}/>} />
        {/* {
          isAuthenticated ? <Route path="/menu" element={<MenuMain />} /> : <Route path="/menu" element={<NonAuthenticated />} /> 
        } */}

        <Route path="/menu" element={<MenuMain />} />
        
        <Route path="/restaurant/:restaurantId/table-management" element={<TableManagment />} />
        <Route path="/restaurant/:restaurantId/orders" element={<Orders />} />
        <Route path="/restaurant/:restaurantId/menu-status-control" element={<MenuStatusControl />} />
        <Route path="/restaurant/:restaurantId/kot-updates" element={<KotUpdates />} />
        
        <Route path="/show" element={<ShowRedux/>}/>
        
        {/* NAYAK Working on this */}
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<LandingPage2 />} />
        <Route path="/restaurant/:restaurantId/customers" element={<Customers />} />
      </Routes>
    </div>
  )
}

export default App