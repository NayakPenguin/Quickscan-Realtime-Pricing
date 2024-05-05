import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNav from "../Components/BottomNav";

const UserBills = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <BottomNav currPage={"bills"} realTimeOrderedItemCount={"otherpage"} />
    </Container>
  )
}

export default UserBills

const Container = styled.div`
    
`