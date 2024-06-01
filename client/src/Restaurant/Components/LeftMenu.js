import React from "react";
import styled from "styled-components";

const LeftMenu = ({ pageID }) => {
  const creatorShopId = "BrdwyKol";

  const menuItems = [
    { name: "Table Management", id: "table-management", url: "table-management" },
    { name: "Orders", id: "orders", url: "orders" },
    { name: "Menu Status Control", id: "menu-status-control", url: "menu-status-control" },
    { name: "KOT Updates", id: "kot-updates", url: "kot-updates" },
    // { name: "Analytics", id: "analytics", url: "analytics" },
    { name: "Customers", id: "customers", url: "customers" },
  ];

  return (
    <Container>
      <div className="top">
        <img src="https://live.staticflickr.com/65535/49816898282_e611b8f730_b.jpg" alt="" />
      </div>
      <div className="middle">
        {menuItems.map((item, index) => (
          <a key={index} href={`/restaurant/${creatorShopId}/${item.url}`} className={item.id === pageID ? "selected" : ""}>
            {item.name}
          </a>
        ))}
      </div>
      <div className="bottom">Slurp.in V.20</div>
    </Container>
  );
};

export default LeftMenu;

const Container = styled.div`
  width: 260px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e8e1d6;
  padding: 40px 20px;
  z-index: 101;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;

  .top {
    img {
      height: 75px;
    }
  }

  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    a {
      font-size: 0.75rem;
      font-weight: 300;
      margin: 5px 0;
      text-decoration: none;
      color: #333;

      background-color: #e5e5e580;
      width: 100%;
      text-align: center;
      padding: 10px;
      border: 2px solid black;
      box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 10px 0px;
      
      &:hover {
        border: 2px solid black;
        transition-duration: 500ms;
        background-color: #fffbf7;
        box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
      }
    }

    .selected {
      background-color: #fde7d0;
      font-weight: 500;
      border: 2px solid black;
      
      &:hover {
        border: 2px solid black;
        background-color: #fde7d0;
      }
    }
  }

  .bottom {
    text-align: center;
    font-size: 0.75rem;
    font-weight: 500;
  }
`;
