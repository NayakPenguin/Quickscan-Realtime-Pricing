import React, { useState, useEffect, useRef } from "react";
import LeftMenu from "../Components/LeftMenu";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import AddIcon from '@material-ui/icons/Add';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import EditIcon from '@material-ui/icons/Edit';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

import QRCodeModal from "../Components/QRCodeModal";

import { db } from "../../firebase";
import { collection, getDocs, addDoc, query, where, updateDoc, onSnapshot, doc } from "firebase/firestore";
import { getCreatorShopId } from "../Controllers/ReastaurantID";

const TableManagment = () => {
  const pageID = "table-management";
  const [boxesPerRow, setBoxesPerRow] = useState(calculateBoxesPerRow());
  const navigate = useNavigate();

  var creatorShopId = null;

  useEffect(() => {
    creatorShopId = getCreatorShopId();
    if (creatorShopId == null) navigate("/restaurant/login");
  }, []);

  const [showQR, setShowQR] = useState(false);
  const [qrTableNo, setQrTableNo] = useState("");

  const [isOccupied, setOccupied] = useState(true);
  const [isNonOccupied, setNonOccupied] = useState(true);

  const [tableIdentifier, setTableIdentifier] = useState('');
  const [tableCapacity, setTableCapacity] = useState('');

  const handleOccupiedCheckboxChange = () => {
    setOccupied(!isOccupied);
  };

  const handleNonOccupiedCheckboxChange = () => {
    setNonOccupied(!isNonOccupied);
  };

  // function onChange(sourceId, sourceIndex, targetIndex) {
  //   const nextState = swap(allTables, sourceIndex, targetIndex);
  //   setAllTables(nextState);
  // }

  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const newTables = swap(allTables, sourceIndex, targetIndex);
    setAllTables(newTables);
    
    const newOrder = newTables.map(item => item.id);
    localStorage.setItem('tableOrder', JSON.stringify(newOrder));
  };

  useEffect(() => {
    function handleResize() {
      setBoxesPerRow(calculateBoxesPerRow());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function calculateBoxesPerRow() {
    // Adjust this logic based on your requirements
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1380) {
      return 4;
    } else if (windowWidth >= 1100) {
      return 3;
    } else if (windowWidth >= 600) {
      return 2;
    } else {
      return 1;
    }
  }

  const handleOpenQRCode = (tableNo) => {
    setShowQR(true);
    setQrTableNo(tableNo);
  }


  // -----------------------------------------------------------------------------


  // Handle With EXTRA-CARE might exceed firebase limit if called again and again!
  const [items, setItems] = useState([
    {
      id: 1, restaurantId: 1, tableNo: "T-01", capacity: 4, order: 0, status: "occ",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 2, restaurantId: 2, tableNo: "T-02", capacity: 4, order: 0, status: "occ",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 3, restaurantId: 3, tableNo: "T-03", capacity: 4, order: 0, status: "occ",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 4, restaurantId: 4, tableNo: "T-04", capacity: 4, order: 0, status: "free",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 5, restaurantId: 5, tableNo: "T-05", capacity: 4, order: 0, status: "free",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 6, restaurantId: 6, tableNo: "T-06", capacity: 4, order: 0, status: "free",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 7, restaurantId: 7, tableNo: "T-07", capacity: 4, order: 0, status: "free",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 8, restaurantId: 8, tableNo: "T-08", capacity: 4, order: 0, status: "free",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 9, restaurantId: 9, tableNo: "T-09", capacity: 4, order: 0, status: "free",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
    {
      id: 10, restaurantId: 10, tableNo: "T-10", capacity: 4, order: 0, status: "free",
      userInfo: {
        name: "",
        phone: "",
        email: "",
      },
      sessionStartTime: null
    },
  ]);

  const handlePushBulkDataToFirebase = async () => {
    try {
      const tablesCollectionRef = collection(db, `Tables${creatorShopId}`);

      // Iterate through each menu item and add it to the 'Menu' collection
      for (const item of items) {
        const newItemDoc = await addDoc(tablesCollectionRef, item);
        console.log('Menu item added successfully with ID: ', newItemDoc.id);
      }

    } catch (error) {
      console.error('Error adding menu item: ', error);
    }
  }

  // -----------------------------------------------------------------------------
  const [allTables, setAllTables] = useState([]);

  useEffect(() => {
    const tablesCollectionRef = collection(db, `Tables${creatorShopId}`);
    console.log(`Tables${creatorShopId}`);

    const fetchData = async () => {
      try {
        const data = await getDocs(tablesCollectionRef);
        const initialData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Remove duplicates
        const uniqueData = Array.from(new Set(initialData.map(a => a.id)))
          .map(id => {
            return initialData.find(a => a.id === id);
          });

        // Load order from localStorage if available
        const savedOrder = JSON.parse(localStorage.getItem('tableOrder'));
        if (savedOrder) {
          const orderedTables = savedOrder.map(id => uniqueData.find(table => table.id === id)).filter(Boolean);
          const newTables = uniqueData.filter(table => !savedOrder.includes(table.id));
          setAllTables([...orderedTables, ...newTables]);
        } else {
          setAllTables(uniqueData);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(tablesCollectionRef, (snapshot) => {
      setAllTables(prevData => {
        let newData = [...prevData];

        snapshot.docChanges().forEach((change) => {
          const tableData = {
            ...change.doc.data(),
            id: change.doc.id,
          };

          if (change.type === 'added' && !prevData.find(item => item.id === tableData.id)) {
            newData.push(tableData);
          } else if (change.type === 'modified') {
            newData = newData.map((item) => (item.id === tableData.id ? tableData : item));
          } else if (change.type === 'removed') {
            newData = newData.filter((item) => item.id !== tableData.id);
          }
        });

        // Update the order with the new table data
        const savedOrder = JSON.parse(localStorage.getItem('tableOrder'));
        if (savedOrder) {
          const orderedTables = savedOrder.map(id => newData.find(table => table.id === id)).filter(Boolean);
          const newTables = newData.filter(table => !savedOrder.includes(table.id));
          return [...orderedTables, ...newTables];
        } else {
          return newData;
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [db, creatorShopId]);

  useEffect(() => {
    console.log(allTables);
  }, [allTables])

  const [customerInfoMap, setCustomerInfoMap] = useState({});

  const handleInputChange = (tableId, name, value) => {
    setCustomerInfoMap((prevMap) => ({
      ...prevMap,
      [tableId]: {
        ...prevMap[tableId],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    console.log(customerInfoMap);
  }, [customerInfoMap])

  const handleCreateSession = async (tableId) => {
    console.log("handleCreateSession-tableId : ", tableId);

    try {
      const tableCustomerInfo = customerInfoMap[tableId];
      const creatorShopId = getCreatorShopId();

      if (tableCustomerInfo) {
        const tableRef = doc(db, `Tables${creatorShopId}`, tableId);

        await updateDoc(tableRef, {
          status: "occ",
          userInfo: {
            [`customer-name`]: tableCustomerInfo.name || '',
            [`customer-phone`]: tableCustomerInfo.phone || '',
            [`customer-email`]: tableCustomerInfo.email || '',
          },
          sessionStartTime: new Date(),
        });

        // Reset the customerInfo state for the specific table
        setCustomerInfoMap((prevMap) => {
          const newMap = { ...prevMap };
          delete newMap[tableId];
          return newMap;
        });

        console.log('Session created successfully!');
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleFreeSession = async (tableId) => {
    try {
      const creatorShopId = getCreatorShopId();
      const tableRef = doc(db, `Tables${creatorShopId}`, tableId);

      await updateDoc(tableRef, {
        status: "free",
        userInfo: {
          [`customer-name`]: '',
          [`customer-phone`]: '',
          [`customer-email`]: '',
        },
        sessionStartTime: null,
      });

      console.log('Session dissolved successfully!');
    } catch (error) {
      console.error('Error dissolving session:', error);
    }
  };

  const handleCreateTable = async () => {
    try {
      const tablesCollectionRef = collection(db, `Tables${creatorShopId}`);

      // Add a new table to the 'Tables' collection
      const newItemDoc = await addDoc(tablesCollectionRef, {
        tableNo: tableIdentifier,
        capacity: tableCapacity,
        order: 0,
        status: 'free',
        userInfo: {
          name: '',
          phone: '',
          email: '',
        },
        sessionStartTime: null,
      });

      console.log('Table added successfully with ID: ', newItemDoc.id);
      setTableIdentifier("");
      setTableCapacity("");

    } catch (error) {
      console.error('Error adding table: ', error);
    }
  };

  const handleEditTable = async () => {
    try {
      const creatorShopId = getCreatorShopId();
      const tablesCollectionRef = collection(db, `Tables${creatorShopId}`);

      // Get the table document by identifier
      const querySnapshot = await getDocs(
        query(tablesCollectionRef, where('tableNo', '==', tableIdentifier))
      );

      if (!querySnapshot.empty) {
        // Update the capacity of the first matching document
        const tableDoc = querySnapshot.docs[0];
        await updateDoc(tableDoc.ref, { capacity: tableCapacity });
        console.log('Table capacity updated successfully');
      } else {
        console.error('Table not found');
      }

    } catch (error) {
      console.error('Error editing table: ', error);
    }
  };

  // Add a state to keep track of elapsed time for each table
  const [elapsedTimes, setElapsedTimes] = useState({});

  function calculateTimeDifference(sessionStartTime) {
    if (sessionStartTime == null) {
      return "Invalid";
    }

    // Convert Firebase Timestamp to JavaScript Date
    const startTime = new Date(sessionStartTime.seconds * 1000 + sessionStartTime.nanoseconds / 1e6);

    // Get current time
    const currentTime = new Date();

    // Calculate time difference in milliseconds
    const timeDifference = currentTime - startTime;

    // Convert time difference to HH:MM:SS format
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format the result
    const formattedDifference = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedDifference;
  }

  // Function to update the elapsed time for a specific table
  const updateElapsedTime = (tableId) => {
    setElapsedTimes((prevElapsedTimes) => {
      return {
        ...prevElapsedTimes,
        [tableId]: calculateTimeDifference(allTables.find((table) => table.id === tableId).sessionStartTime),
      };
    });
  };

  useEffect(() => {
    // Update the elapsed time for each table every second
    const intervalId = setInterval(() => {
      allTables.forEach((table) => {
        updateElapsedTime(table.id);
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [allTables]);  // Ensure the effect runs when the allTables array changes



  return (
    <Container>
      <LeftMenu pageID={pageID} />
      <Navbar />

      {showQR ? <QRCodeModal setShowQR={setShowQR} qrTableNo={qrTableNo} /> : null}

      <h1>Table Managment</h1>

      {/* <button onClick={() => handlePushBulkDataToFirebase()}>Push Bulk Data</button>  */}

      <div className="edit-container">
        <div className="inputs">
          <input
            type="text"
            placeholder="Table Identifier"
            value={tableIdentifier}
            onChange={(e) => setTableIdentifier(e.target.value)}
          />
          <input
            type="text"
            placeholder="Table Capacity"
            value={tableCapacity}
            onChange={(e) => setTableCapacity(e.target.value)}
          />
        </div>
        <div className="btns">
          <button onClick={handleCreateTable}>Add</button>
          <button onClick={handleEditTable}>Edit</button>
        </div>
      </div>
      {/* <div className="management-btns">
        <div className="add-table">
          <AddIcon />
        </div>
        <div className="add-table">
          <EditIcon />
        </div>
      </div> */}
      <div className="start-table-space"></div>
      <Filter>
        <CheckboxContainer>
          <CheckboxLabel>
            <ToggleButtonCover>
              <div className="toggle-button-cover">
                <div id="button-3" className="button r">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={isOccupied}
                    onChange={handleOccupiedCheckboxChange}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </ToggleButtonCover>
            Occupied
          </CheckboxLabel>
          <CheckboxLabel>
            <ToggleButtonCover>
              <div className="toggle-button-cover">
                <div id="button-3" className="button r">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={isNonOccupied}
                    onChange={handleNonOccupiedCheckboxChange}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </ToggleButtonCover>
            Free
          </CheckboxLabel>
        </CheckboxContainer>
      </Filter>
      <div className="tables">
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id="items"
            boxesPerRow={boxesPerRow}
            rowHeight={260}
            style={{ height: 240 * Math.ceil(items.length / boxesPerRow) }}
          >
            {allTables.map((item) =>
              ((item.status === 'occ' && isOccupied === true) || (item.status === "free" && isNonOccupied === true)) ? (
                <GridItem key={item.id}>
                  <div className={`table ${item.status}`}>
                    <DragIndicatorIcon className="drag-svg" />
                    <img src="https://www.techopedia.com/wp-content/uploads/2023/03/aee977ce-f946-4451-8b9e-bba278ba5f13.png" alt="" className="qr-img" onClick={() => handleOpenQRCode({ tableNo: item.tableNo })} />
                    <div className="table-no">Table : {item.tableNo}</div>
                    <div className="capacity">Capacity : {item.capacity}</div>
                    {item.status === 'occ' ? (
                      <>
                        {/* <div className="order-no">Order <span>(s)</span> : {item.order}</div> */}
                        <div className="order-no">Order : {item.order}</div>
                        <div className="session-duration">{item.sessionStartTime != null ? elapsedTimes[item.id] : null}</div>
                        <div className="options">
                          <div className="gen kot">Customer</div>
                          <div className="gen bill" onClick={() => handleFreeSession(item.id)}>Free Table</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={customerInfoMap[item.id]?.name || ''}
                          onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
                          className="add-user-info"
                          placeholder="Customer Name"
                        />
                        <input
                          type="text"
                          value={customerInfoMap[item.id]?.phone || ''}
                          onChange={(e) => handleInputChange(item.id, 'phone', e.target.value)}
                          className="add-user-info"
                          placeholder="Customer Phone No."
                        />
                        <input
                          type="text"
                          value={customerInfoMap[item.id]?.email || ''}
                          onChange={(e) => handleInputChange(item.id, 'email', e.target.value)}
                          className="add-user-info"
                          placeholder="Customer Email"
                        />
                        <div
                          className="create-session"
                          onClick={() => handleCreateSession(item.id)}
                        >
                          Create a Session
                        </div>
                      </>
                    )}
                  </div>
                </GridItem>
              ) : null
            )}
          </GridDropZone>
        </GridContextProvider>
      </div>
    </Container>
  )
}

export default TableManagment

const Container = styled.div`
    background-color: #fff6e659;
    width: 100vw;
    min-height: 100vh;

    padding-left: 300px;
    padding-top: 100px;

    h1{
      font-size: 2rem;
      font-weight: 500;
    }

    .edit-container{
      margin-top: 20px;
      width: calc(100% - 60px);
      
      .inputs{
        width: 100%;
        max-width: 720px;
        
        input{
          width: 50%;
          border: 2px solid black;
          box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 10px 0px;
          font-size: 0.8rem;
          padding: 0 7.5px;
          height: 35px;

          &:first-child {
            border-right: none;
          }
        }
      }

      .btns{
        button{
          font-size: 0.75rem;
          padding: 5px 12.5px;
          border: none;
          margin-right: 5px;
          margin-top: 5px;
          background-color: #f2f2f2;
          border: 2px solid black;
          box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 10px 0px;
          
          &:hover{
              transition-duration: 250ms;
              cursor: pointer;
              box-shadow: rgba(0, 0, 0, 0) 1px 1px 10px 0px;
          }
        }
      }
    }

    .management-btns{
      display: flex;  

      .add-table{
        height: 75px;
        width: 75px;
        border: 2px solid black;
        margin: 25px 10px 10px 10px;
        background-color: white;
        cursor: pointer;
  
        display: grid;
        place-items: center;
  
        svg{
          font-size: 1.5rem;
        }
      }
    }
    
    .start-table-space{
      border-top: 1px solid #cccac4;
      width: calc(100% - 60px);
      /* margin-left: 10px; */
      margin-top: 40px;
      margin-bottom: 10px;
    }

    .tables{
      /* display: flex; */
      /* flex-wrap: wrap; */
      margin-top: 10px;
      padding-right: 40px;
      margin-left: -10px;
      
      .table{
        height: 235px;
        /* width: 235px; */
        border: 2.5px solid #6cba6c;
        margin: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;

        
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: center;

        position: relative;

        .drag-svg {
          position: absolute;
          fill: white;
          font-size: 1.25rem;
          top: 10px;
          right: 5px;
          z-index: 2;
          cursor: grab;

          &:active {
            cursor: grabbing;
          }
        }

        .qr-img{
          height: 35px;
          position: absolute;
          top: 2.5px;
          left: 2.5px;
          z-index: 2;
          border-radius: 2.5px;
          cursor: pointer;
        }
        
        .table-no{
            background-color: #8bd28b;
            color: white;
            width: 100%;
            text-align: center;

            position: absolute;
            top: 0;
            left: 0;

            font-size: 1.25rem;
            font-weight: 500;
            padding: 5px;
            border-bottom: 2px solid #6cba6c;
        }

        .capacity{
          font-size: 0.85rem;
        }

        .order-no{
          font-size: 1.5rem;
          font-weight: 500;

          display: flex;
          align-items: center;

          span{
            font-size: 0.75rem;
            margin: 0 3.5px;
          }
        }

        .session-duration{
          font-size: 0.85rem;
          letter-spacing: 0.15rem;
          font-weight: 400;
        }

        .options{
          width: 100%;
          display: flex;
          justify-content: space-between;

          position: absolute;
          left: 0;
          bottom: 0;

          .gen{
            width: 50%;
            text-align: center;
            padding: 5px;
            font-size: 0.85rem;
            letter-spacing: 0.05rem;
            font-weight: 500;
            border-top: 2px solid #6cba6c;
            cursor: pointer;
          }

          .kot{
            background-color: #e1adad;
            border-right: 1px solid #6cba6c; 
          }

          .bill{
            background-color: #f1d7d7;
            border-left: 1px solid #6cba6c; 
          }
        }

        .add-user-info{
          width: 75%;
          margin: 2.5px;
          font-size: 0.75rem;
          padding: 6.5px;
          border: 2px solid #6dba6c;
          background-color: white;
        }

        .create-session{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          border-top: 2px solid #6cba6c;
          text-align: center;
          padding: 5px;
          font-size: 0.85rem;
          letter-spacing: 0.05rem;
          font-weight: 500;
          background-color: #f0d7d6;
          cursor: pointer;
        }

        &:hover{
          box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
          transition-duration: 250ms;
        }
      }

      .occ{
        border-color: red;

        .table-no{
            background-color: #f88888;
            border-bottom: 2px solid red;
        }

        .options{
          .gen{
            border-top: 2px solid red;
          }

          .kot{
            border-right: 1px solid red; 
          }

          .bill{
            border-left: 1px solid red; 
          }
        }
      }
    }
`

const Filter = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  padding-right: 50px;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 10px;
  position: relative;
`;

const ToggleButtonCover = styled.div`
  
  .toggle-button-cover {
    display: table-cell;
    position: relative;
  }

  .button-cover {
    height: 100px;
    margin: 20px;
    background-color: #fff;
    box-shadow: 0 10px 20px -8px #c5d6d6;
    border-radius: 4px;
  }

  .button-cover:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }

  .button-cover,
  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 27.5px;
    margin: 0 5px 0 auto;
    /* overflow: hidden; */
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    z-index: 2;
  }

  .layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
  }

  .button.r,
  .button.r .layer {
    border-radius: 100px;
  }

  #button-3 .knobs:before {
    content: "NO";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 27.5px;
    height: 20.5px;
    /* color: #fff; */
    font-size: 10px;
    font-weight: 600;
    text-align: center;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff6c6c;
    border-radius: 15px;
    transition: 0.3s ease all;
  }

  #button-3 .checkbox:active + .knobs:before {
    width: 46px;
    border-radius: 100px;
  }

  #button-3 .checkbox:checked:active + .knobs:before {
    margin-left: -26px;
  }

  #button-3 .checkbox:checked + .knobs:before {
    content: "YES";
    left: 42px;
    background-color: #e8d4ac;
  }

  #button-3 .checkbox:checked ~ .layer {
    background-color: #fcebeb;
  }
`;