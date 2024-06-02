import React, { useState, useEffect, useRef } from "react";
import LeftMenu from "../Components/LeftMenu";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

const Customers = () => {
  const pageID = "customers";
  const users = [
    {
      "name": "Atanu Nayak",
      "phone": "+91 9306191179",
      "email": "nayak.primary@gmail.com",
      "lastOrder": "15 Jan 2024",
      "customerTag": "Internal",
      "isOnline": "true",
    },
    {
      "name": "John Doe",
      "phone": "+1 1234567890",
      "email": "john.doe@example.com",
      "lastOrder": "14 Jan 2024",
      "customerTag": "External",
      "isOnline": "true",
    },
    {
      "name": "Alice Smith",
      "phone": "+44 9876543210",
      "email": "alice.smith@example.com",
      "lastOrder": "13 Jan 2024",
      "customerTag": "Internal",
      "isOnline": "true",
    },
    {
      "name": "Bob Johnson",
      "phone": "+61 8765432109",
      "email": "bob.johnson@example.com",
      "lastOrder": "12 Jan 2024",
      "customerTag": "External",
      "isOnline": "true",
    },
    {
      "name": "Emily White",
      "phone": "+81 2345678901",
      "email": "emily.white@example.com",
      "lastOrder": "11 Jan 2024",
      "customerTag": "Internal",
      "isOnline": "false",
    },
    {
      "name": "Michael Brown",
      "phone": "+1 3456789012",
      "email": "michael.brown@example.com",
      "lastOrder": "10 Jan 2024",
      "customerTag": "External",
      "isOnline": "false",
    },
    {
      "name": "Sophia Davis",
      "phone": "+44 7654321098",
      "email": "sophia.davis@example.com",
      "lastOrder": "9 Jan 2024",
      "customerTag": "Internal",
      "isOnline": "false",
    },
    {
      "name": "David Wilson",
      "phone": "+61 9876543210",
      "email": "david.wilson@example.com",
      "lastOrder": "8 Jan 2024",
      "customerTag": "External",
      "isOnline": "false",
    },
    {
      "name": "Olivia Miller",
      "phone": "+81 8765432109",
      "email": "olivia.miller@example.com",
      "lastOrder": "7 Jan 2024",
      "customerTag": "Internal",
      "isOnline": "false",
    },
    {
      "name": "Daniel Turner",
      "phone": "+1 9876543210",
      "email": "daniel.turner@example.com",
      "lastOrder": "6 Jan 2024",
      "customerTag": "External",
      "isOnline": "false",
    }
  ];

  return (
    <Container>
      <LeftMenu pageID={pageID} />
      <Navbar />

      <h1>Customers</h1>
      
      <div className="filter-results">
        <div className="search-bar">
          <input type="text" placeholder="Search Foot Iteam Here" />
          <div className="search-btn"><SearchIcon /></div>
        </div>
        <div className="filter">  
          <div className="text">By Date Added</div>
          <div className="filter-btn">
            <FilterListIcon/>
          </div>
        </div>
      </div>

      <Table>
        <div className="row naked">
          <div className="name">Name</div>
          <div className="phone-no">Phone No.</div>
          <div className="email">Email Address</div>
          <div className="last-order">Last Visited</div>
          <div className="customer-tag">
            Tag
          </div>
        </div>
        {users.map((user, index) => (
          <div key={index} className={`row${index % 2 === 1 ? ' alternate' : ''}`}>
            {
              user.isOnline == "true" ? (
                <div className="is-online">
                  <div className="circle"></div>
                </div>
              ) : null
            }
            <div className="box name">{user.name}</div>
            <div className="box phone-no">{user.phone}</div>
            <div className="box email">{user.email}</div>
            <div className="box last-order">{user.lastOrder}</div>
            <div className="box customer-tag">
              <div className="tag">{user.customerTag}</div>
            </div>
          </div>
        ))}
      </Table>
    </Container>
  )
}

export default Customers


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

    .filter-results{
      margin: 20px 0 40px 0;
      display: flex;
      align-items: center;

      .search-bar{
        display: flex;
        flex: 1;
        border: 2px solid black; 
        background-color: white;   
  
        input{
            font-size: 0.8rem;
            padding: 5px 10px;
            flex: 1;
            border: none;
            border-right: 2px solid black;
            /* background-color: #fde7d0; */
        }
  
        .search-btn{
            height: 35px;
            display: grid;
            place-items: center;
            padding: 0 20px;
            background-color: #8bd28b;
            cursor: pointer;
  
            svg{
                font-size: 1rem;
            }
        }
      }

      .filter{
        padding-left: 100px;
        display: flex;
        align-items: center;

        .text{
          display: flex;
          align-items: center;
          height: 35px;
          font-size: 0.75rem;
          font-weight: 400;
          background-color: white;
          /* margin-right: 10px; */
          padding: 5px 20px;
          border: 2px solid black;
          border-right: none;
        }

        .filter-btn{
          border: 2px solid black; 
          height: 35px;
          display: grid;
          place-items: center;
          padding: 0 20px;
          background-color: #8bd28b;
          cursor: pointer;

          svg{
              font-size: 1rem;
          }
      }
      }
    }
`


const Table = styled.div`
    width: 100%;
    /* border: 2px solid black; */
    /* overflow: hidden; */

    .row{
        position: relative;
        width: 100%;
        /* background-color: #f2f2f2; */
        background-color: #fff;

        display: flex;
        /* align-items: flex-start; */
        
        /* border-bottom: 2px solid black; */
        border: 2px solid black;
        margin-bottom: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;

        .is-online{
          height: 15px;
          width: 15px;
          background-color: #b3db5b;
          border: 2px solid black;
          position: absolute;
          border-radius: 100%;
          top: -7.5px;
          left: -7.5px;
        }

        .box{
          padding: 20px 10px;
          font-size: 0.8rem;
          font-weight: 300;
          white-space: normal;
          height: auto;
        }

        .name{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 17.5%;
          text-align: center;
          border-right: 2px solid black;
          font-weight: 500;
        }

        .phone-no{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 17.5%;
          text-align: center;
          border-right: 2px solid black;
        }

        .email{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 17.5%;
          text-align: center;
          border-right: 2px solid black;
          color: cornflowerblue;
          font-weight: 500;
          flex: 1;
        }

        .last-order{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 17.5%;
          text-align: center;
          border-right: 2px solid black;
        }

        .customer-tag{
          width: 17.5%;
          text-align: center;
          display: flex;
          align-items: flex-start;
          justify-content: center;

          .tag{
            background-color: #fde7d0;
            padding: 7.5px 15px;
            font-size: 0.7rem;
            font-weight: 500;
            border-radius: 100px;
          }
        }

        .address{
        }

        &:hover{
          box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
          cursor: pointer;
          transition-duration: 250ms;
        }
    }

    .alternate{
        background-color: whitesmoke;
    }

    .naked{
      border: none;
      box-shadow: none;
      background-color: transparent;
      margin-bottom: 20px;

      div{
          padding: 0 10px;
          font-size: 0.9rem;
          font-weight: 300;

          text-transform: uppercase;
          letter-spacing: 0.15rem;
        }

        .name{
          width: 17.5%;
          text-align: center;
          border-right: none;
          font-weight: 500;
        }

        .phone-no{
          width: 17.5%;
          text-align: center;
          border-right: none;
          font-weight: 500;
        }

        .email{
          width: 17.5%;
          text-align: center;
          border-right: none;
          color: #333;
          font-weight: 500;
          flex: 1;
        }

        .last-order{
          width: 17.5%;
          text-align: center;
          border-right: none;
          font-weight: 500;
        }

        .customer-tag{
          width: 17.5%;
          text-align: center;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          font-weight: 500;

          .tag{
            background-color: #fde7d0;
            padding: 7.5px 15px;
            font-size: 0.7rem;
            font-weight: 500;
            border-radius: 100px;
          }
        }

        &:hover{
          box-shadow: rgba(0, 0, 0, 0) 1px 1px 10px 0px;
          cursor: pointer;
          transition-duration: 250ms;
        }
    }

    /* :last-child {
      border: none;
    } */
`