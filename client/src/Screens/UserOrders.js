import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNav from "../Components/BottomNav";

const UserOrders = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <BottomNav currPage={"orders"} />
    </Container>
  )
}

export default UserOrders

const Container = styled.div`
    
`