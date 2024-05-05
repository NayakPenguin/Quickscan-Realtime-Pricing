import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import BottomNav from "../Components/BottomNav";

const UserProfile = () => {
  return (
    <Container>
        <MenuNav showSearch={false}/>
        <BottomNav currPage={"profile"} realTimeOrderedItemCount={"otherpage"} />
    </Container>
  )
}

export default UserProfile

const Container = styled.div`
    
`