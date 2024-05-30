import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";

const UserBills = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <BottomNavSimple currPage={"bills"} />
    </Container>
  )
}

export default UserBills

const Container = styled.div`
    
`