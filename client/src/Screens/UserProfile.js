import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNavSimple from "../Components/BottomNavSimple";

const UserProfile = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <BottomNavSimple currPage={"profile"}/>
    </Container>
  )
}

export default UserProfile

const Container = styled.div`
    
`