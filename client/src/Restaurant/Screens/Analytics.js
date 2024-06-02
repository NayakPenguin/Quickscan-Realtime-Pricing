import React, { useState, useEffect } from "react";
import LeftMenu from "../Components/LeftMenu";
import styled from "styled-components";
import Navbar from "../Components/Navbar";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Analytics = () => {
  const [pageID, setPageID] = useState("analytics");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearch = () => {
    // Handle search logic using startDate and endDate
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is null or undefined

    const day = date.getDate(); // Get the day of the month
    const month = date.toLocaleString('default', { month: 'long' }); // Get the month name
    const year = date.getFullYear(); // Get the year

    // Add ordinal suffix to the day (e.g., "1st", "2nd", "3rd", etc.)
    const ordinalSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return 'th';
      }
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  };

  return (
    <Container>
      <LeftMenu pageID={pageID} />
      <Navbar />

      <h1>Analytics</h1>
      <div className="search-bar">
        {/* <input type="text" placeholder="Start Date"/>
        <input type="text" placeholder="End Date"/> */}
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="date-picker"
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="date-picker"
        />
        <div className="search-btn">GO</div>
      </div>
    </Container>
  )
}

export default Analytics;

const Container = styled.div`
  background-color: #fff6e659;
  width: 100vw;
  min-height: 100vh;
  padding: 100px 40px 40px 300px;
  
  h1{
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 30px;
  } 

  .search-bar{
    display: flex;
    width: 100%;

    input{
        font-size: 0.8rem;
        padding: 5px 10px;
        flex: 1;
        max-width: 300px;
        border: none;
        border: 2px solid black;
        margin-right: 5px;
        /* background-color: #fde7d0; */
    }

    .search-btn{
        height: 35px;
        width: 50px;
        display: grid;
        place-items: center;
        background-color: #8bd28b;
        border: 2px solid black;
        cursor: pointer;
        font-size: 0.85rem;

        svg{
            font-size: 1rem;
        }
    }
  }
`
