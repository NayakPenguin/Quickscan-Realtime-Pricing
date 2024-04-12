import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const NonAuthenticated = () => {
    useEffect(() => {
        // window.location.href = '/qrscan/T-06';
    }, [])

  return (
    <Container>ERROR : You are not authenticated! Open your scanner and scan the QR in the table.</Container>
  )
}

export default NonAuthenticated

const Container = styled.div`
    padding: 20px;
`