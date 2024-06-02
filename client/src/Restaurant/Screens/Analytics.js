import React, { useState, useRef } from "react";
import LeftMenu from "../Components/LeftMenu";
import styled from "styled-components";
import Navbar from "../Components/Navbar";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CallMadeIcon from '@material-ui/icons/CallMade';

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

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const handleSearch = () => {
    // Handle search logic using startDate and endDate
    console.log('Start Date:', formatDate(startDate));
    console.log('End Date:', formatDate(endDate));
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
  
  const handleStartDateClick = () => {
    startDatePickerRef.current.setOpen(true);
  };

  const handleEndDateClick = () => {
    endDatePickerRef.current.setOpen(true);
  };

  return (
    <Container>
      <LeftMenu pageID={pageID} />
      <Navbar />

      <h1>Analytics</h1>
      <div className="search-bar">
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="date-picker date-picker1"
            ref={startDatePickerRef}
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="date-picker date-picker2"
            ref={endDatePickerRef}
          />
        </div>
        <div className="date-value" onClick={() => handleStartDateClick()}>{startDate == null ? "Start Date - 1st April 2024" : formatDate(startDate)}</div>
        <div className="date-value" onClick={() => handleEndDateClick()}>{endDate == null ? "Present" : formatDate(endDate)}</div>
        <div className="search-btn" onClick={handleSearch}>GO</div>
      </div>
      <div className="analytics-boxes-container">
          <div className="analytics-box">
            <div className="top-title">
              Revenue
            </div>
            <div className="value">₹ 3,14,020.50</div>
          </div>
          <div className="analytics-box">
            <div className="top-title">
              Footfall
            </div>
            <div className="value">982</div>
          </div>
          <div className="analytics-box">
            <div className="top-title">
              Orders Raised
            </div>
            <div className="value">1284</div>
          </div>
          {/* <div className="analytics-box show-more-box">
            <a href="/">View all order details </a>
            <CallMadeIcon/>
          </div> */}
      </div>
    </Container>
  );
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
    position: relative;

    /* input{
        font-size: 0.8rem;
        padding: 5px 10px;
        flex: 1;
        max-width: 300px;
        border: none;
        border: 2px solid black;
        margin-right: 5px;
        background-color: #fde7d0;
        display: none;
        position: absolute;
    } */

    .date-picker-container{
      width: 605px;
      position: absolute;
      left: 0px;
      bottom: -10px;
      display: flex;
      
      input{
        width: 300px;
        margin-right: 5px;
        /* border: none; */
        background-color: transparent;
        visibility: hidden;
      }
    }

    .date-picker1{
      left: 100px;
    }
    
    .date-picker2{
      left: 305px;
    }

    .react-datepicker-popper{
      left: 100px;
    }

    .date-value{
      font-size: 0.8rem;
      padding: 5px 10px;
      flex: 1;
      max-width: 300px;
      border: none;
      border: 2px solid black;
      background-color: white;
      margin-right: 5px;
      z-index: 10;
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

  .analytics-boxes-container{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 30px;

    .analytics-box{
      width: calc(25% - 10px);
      min-width: 200px;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;

      background-color: white;
      overflow: hidden;
      border: 2.5px solid black;
      padding-top: 50px;
      box-shadow: rgba(0, 0, 0, 0.20) 1px 1px 10px 0px;

      display: grid;
      place-items: center;

      .top-title{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #e9e6e1;
        /* color: white; */
        padding: 10px;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.25rem;
        text-transform: uppercase;
        text-align: center;
        border-bottom: 2.5px solid black;
      }

      .value{
        font-size: 1.25rem;
        text-align: center;
        font-weight: 500;
        padding: 5px;
        /* background-color: orange; */
      }
    }

    .show-more-box{
      padding: 10px;

      display: flex;
      justify-content: center;
      
      a{
        text-decoration: none;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.07rem;
        font-weight: 500;
      }

      svg{
        font-size: 1rem;
        margin-left: 5px;
        fill: cornflowerblue;
      }
    }
  }
`
