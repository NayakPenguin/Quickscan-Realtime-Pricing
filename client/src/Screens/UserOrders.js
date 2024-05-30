import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";

const UserOrders = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <BottomNavSimple currPage={"orders"} />
    </Container>
  )
}

export default UserOrders

const Container = styled.div`
    
`