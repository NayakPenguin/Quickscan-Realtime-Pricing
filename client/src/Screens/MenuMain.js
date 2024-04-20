import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MenuNav from "../Components/MenuNav";
import OrderedList from "../Components/OrderedList";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import InfoIcon from '@material-ui/icons/Info';

import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import BottomNav from "../Components/BottomNav";

const MenuMain = () => {
  const [isVegSelected, setVegSelected] = useState(true);
  const [isNonVegSelected, setNonVegSelected] = useState(true);
  const [expandedDishes, setExpandedDishes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [itemCount, setItemCount] = useState({});
  const [expanded, setExpanded] = useState(false);

  const [menuData, setMenuData] = useState([]); // for calculations
  const [menuDataObject, setMenuDataObject] = useState({}); // for displaying
  const [allCategories, setAllCategories] = useState([]);

  const [restaurantId, setRestaurantId] = useState("BrdwyKol");
  const menuCollectionRef = collection(db, `Menu${restaurantId}`);
  const categoriesCollectionRef = collection(db, `Categories${restaurantId}`);

  useEffect(() => {
    const unsubscribeMenu = onSnapshot(menuCollectionRef, (querySnapshot) => {
      const updatedData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(updatedData);
      setMenuData(updatedData);

      // seperate the main menu 
      const categoryMap = updatedData.reduce((acc, item) => {
        const { category, ...rest } = item;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(rest);
        return acc;
      }, {});

      // Sort the array of items for the current category based on index_order
      Object.keys(categoryMap).forEach(category => {
        categoryMap[category].sort((a, b) => a.index_order - b.index_order);
      });

      // console.log(categoryMap);
      // console.log(categoryMap["HEALTHY SALADS"]);


      setMenuDataObject(categoryMap);
    });

    const unsubscribeCategories = onSnapshot(categoriesCollectionRef, (querySnapshot) => {
      const updatedData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedData = updatedData.sort((a, b) => a.orderIndex - b.orderIndex);
      setAllCategories(sortedData);
      console.log(sortedData);
    });

    // Cleanup functions to unsubscribe when the component unmounts
    return () => {
      unsubscribeCategories();
      unsubscribeMenu();
    };
  }, []);

  const handleVegCheckboxChange = () => {
    setVegSelected(!isVegSelected);
  };

  const handleNonVegCheckboxChange = () => {
    setNonVegSelected(!isNonVegSelected);
  };

  const handleToggleDetails = (dishId) => {
    setExpandedDishes((prevExpandedDishes) => {
      if (prevExpandedDishes.includes(dishId)) {
        return prevExpandedDishes.filter((id) => id !== dishId);
      } else {
        return [...prevExpandedDishes, dishId];
      }
    });
  };

  const [selectedOptions2, setSelectedOptions2] = useState({});

  const handleOptionChange2 = (itemId, detailIndex, optionIndex) => {
    console.log(itemId, detailIndex, optionIndex);

    const key = `${itemId}-${detailIndex}-${optionIndex}`;
    const regexKey = new RegExp(`^${itemId}-${detailIndex}-\\d+$`);

    setSelectedOptions2(prevOptions => {
      const updatedOptions = { ...prevOptions };

      // Set all options matching the regexKey to false
      Object.keys(updatedOptions).forEach(optionKey => {
        if (regexKey.test(optionKey)) {
          updatedOptions[optionKey] = false;
          delete updatedOptions[optionKey];
        }
      });

      // Set the current option to true
      updatedOptions[key] = true;

      return updatedOptions;
    });
  };

  useEffect(() => {
    console.log(selectedOptions2);
  }, [selectedOptions2])

  const isPossibleToIncreaseCount2 = (itemId) => {
    // Step 1: Find the item with the id itemId from menuData
    const selectedItem = menuData.find(item => item.id === itemId);

    if (!selectedItem) {
      // Item with the specified id not found
      return false;
    }

    // Step 2: Check if all the details have selected options
    for (let detailIndex = 0; detailIndex < selectedItem.details_options.length; detailIndex++) {
      const regexKey = new RegExp(`^${itemId}-${detailIndex}-\\d+$`);

      // Check if there is at least one selected option for the current detailIndex
      const optionSelected = Object.keys(selectedOptions2).some((optionKey) => regexKey.test(optionKey) && selectedOptions2[optionKey]);

      if (!optionSelected) {
        // If any detail doesn't have a selected option, return false
        return false;
      }
    }

    // Step 3: If all details have selected options, return true
    return true;
  };

  const [orderedItemCount, setOrderedItemCount] = useState({});

  const increaseCount2 = (itemId) => {
    if (isPossibleToIncreaseCount2(itemId)) {
      // Create a key with the id and the details with options selected
      const key = createKey(itemId);
      console.log(key);

      // Increase the count for the id in the state
      setOrderedItemCount(prevCount => ({
        ...prevCount,
        [key]: (prevCount[key] || 0) + 1,
      }));
    } else {
      alert("Please Select all Options before Ordering!");
    }
  };

  const decreaseCount2 = (itemId) => {
    if (isPossibleToDecreaseCount2(itemId)) {
      // Create a key with the id and the details with options selected
      const key = createKey(itemId);

      // Decrease the count for the id in the state, but don't go below 0
      setOrderedItemCount(prevCount => ({
        ...prevCount,
        [key]: Math.max((prevCount[key] || 0) - 1, 0),
      }));
    } else {
      alert("Cannot decrease count below 0. Please check the options.");
    }
  };

  const isPossibleToDecreaseCount2 = (itemId) => {
    // Step 1: Find the item with the id itemId from menuData
    const selectedItem = menuData.find(item => item.id === itemId);

    if (!selectedItem) {
      // Item with the specified id not found
      return false;
    }

    // Step 2: Check if all the details have selected options
    for (let detailIndex = 0; detailIndex < selectedItem.details_options.length; detailIndex++) {
      const regexKey = new RegExp(`^${itemId}-${detailIndex}-\\d+$`);

      // Check if there is at least one selected option for the current detailIndex
      const optionSelected = Object.keys(selectedOptions2).some((optionKey) => regexKey.test(optionKey) && selectedOptions2[optionKey]);

      if (!optionSelected) {
        // If any detail doesn't have a selected option, return false
        return false;
      }
    }

    // Step 3: If all details have selected options, check if the count is greater than 0
    const key = createKey(itemId);
    return (orderedItemCount[key] || 0) > 0;
  };

  const createKey = (itemId) => {
    const selectedItem = menuData.find(item => item.id === itemId);

    if (!selectedItem || !selectedItem.details_options || selectedItem.details_options.length === 0) {
      // If there are no details or options, use the itemId directly
      return itemId;
    }

    const detailsKey = selectedItem.details_options
      .map((_, detailIndex) => {
        const regexKey = new RegExp(`^${itemId}-${detailIndex}-\\d+$`);
        const selectedOptionIndex = Object.keys(selectedOptions2)
          .filter(optionKey => regexKey.test(optionKey))
          .map(optionKey => parseInt(optionKey.split('-').pop()))
          .find(index => selectedOptions2[`${itemId}-${detailIndex}-${index}`]);

        return selectedOptionIndex !== undefined ? selectedOptionIndex : null;
      })
      .filter(detailIndex => detailIndex !== null)
      .join('-');

    return `${itemId}-${detailsKey}`;
  };

  const getCurrentCount = (itemId) => {
    const key = createKey(itemId);
    return orderedItemCount[key] || 0;
  };

  useEffect(() => {
    if (expanded == true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'visible'; // Make sure to reset the overflow on unmount
    };
  }, [expanded]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const modalRefMenuMain = useRef(null);

  const scrollToTopMenuMain = () => {
    if (modalRefMenuMain.current) {
      modalRefMenuMain.current.scrollTop = 0;
    }
  };

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 10; // Adjust this value as needed
      const topPos = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  return (
    <Container ref={modalRefMenuMain}>
      <MenuNav />

      <Categories>
        <div className="categoriesList">
          {allCategories.map((category, categoryIndex) => (
            <a  href={`#${category.id}`} className="list-item-2" key={category.id} onClick={() => scrollToCategory(category.id)}>
              {category.name}
            </a>
          ))}
        </div>
      </Categories>
      {/* <button onClick={logPossibleToIncreaseCount}>Log Possibilities</button> */}
      <Filter>
        <CheckboxContainer>
          <CheckboxLabel>
            <ToggleButtonCover>
              <div className="toggle-button-cover">
                <div id="button-3" className="button r">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={isVegSelected}
                    onChange={handleVegCheckboxChange}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </ToggleButtonCover>
            Veg
          </CheckboxLabel>
          <CheckboxLabel>
            <ToggleButtonCover>
              <div className="toggle-button-cover">
                <div id="button-3" className="button r">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={isNonVegSelected}
                    onChange={handleNonVegCheckboxChange}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </ToggleButtonCover>
            NonVeg
          </CheckboxLabel>
        </CheckboxContainer>
      </Filter>

      <div className="menu">
        {/* <div className="dishs-ordered-container">
          <h3>Your Orders</h3>
          <p className="desc">
            All the updates and bill will be sent on your <b>Whatsapp</b> Number, (<b>+91 9306191179</b>).
            — For any assistance during your dining experience, simply click the <b>top-right icon</b>.
            <i>Click here to see all orders</i>
          </p>
        </div> */}

        {
          allCategories && allCategories.map((category, categoryIndex) => (
            <div className="category-container">
              <h3 className="category-heading" key={categoryIndex} id={category.id}>{category.name}</h3>
              {menuDataObject[`${category.name}`] && menuDataObject[`${category.name}`].map((item, index) => (
                <div key={item.id} className={item.allow_visibility == true ? "dish-container" : "dish-container no-display"}>
                  <div className="const" onClick={item.unavailable == false ? () => handleToggleDetails(item.id) : null}>
                    <div className="left">
                      <div className="extra-info">
                        <div className="veg-nonveg-sym">
                          <img
                            src={
                              item.type === "Veg"
                                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
                                : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="item-tags">
                          {item.tag.length != 0 ? <div className="tag">{item.tag}</div> : null}
                          {item.unavailable == true ? <div className="unavailable-tag tag">Currently Unavailable</div> : null}
                        </div>
                      </div>
                      <div className="name">{item.name}</div>
                      <div className="price">₹{item.price.toFixed(2)}</div>
                    </div>
                    <div className="right">
                      {
                        expandedDishes.includes(item.id) ?
                          (
                            <div className="close-btn">
                              <ExpandLessIcon />
                            </div>
                          ) : (
                            item.unavailable == true ? (
                              <div className="cant-add-btn noselect">
                                Order
                              </div>
                            ) : (
                              <div className="add-btn">
                                Order
                              </div>
                            )
                          )
                      }
                    </div>
                  </div>

                  <div className={`${expandedDishes.includes(item.id) ? "details expanded" : "details"}`}>
                    {item.details.map((detail, index) => (
                      <div className="detail" key={index}>
                        <div className="detail-title">{detail}</div>
                        {item.details_options.length > 0 && item.details_options[index] && (
                          <>
                            {item.details_options[index].options.length > 0 && item.details_options[index].options.map((option, optionIndex) => (
                              <div className="detail-option" key={optionIndex}>
                                <input
                                  type="radio"
                                  id={`${item.id}-${index}-${optionIndex}`}
                                  name={`${item.id}-${index}`}
                                  value={option}
                                  onChange={() => handleOptionChange2(item.id, index, optionIndex)}
                                />
                                <label htmlFor={`${item.id}-${index}-${optionIndex}`}>{option} - ₹{(item.details_options[index].extra[optionIndex]).toFixed(2)}</label>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    ))}
                    <div className="detail no-border">
                      <div className="detail-title">Order Count</div>
                      <div className="controller">
                        <div className="btn dec" onClick={() => decreaseCount2(item.id)}>-</div>
                        <div className="count">{getCurrentCount(item.id)}</div>
                        <div className="btn inc" onClick={() => increaseCount2(item.id)}>+</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        }
      </div>
      {/* <OrderedList menuData={menuData} orderedItemCount={orderedItemCount} expanded={expanded} handleToggleExpand={handleToggleExpand} scrollToTopMenuMain={scrollToTopMenuMain} /> */}
      <BottomNav/>
    </Container>
  )
}

export default MenuMain

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  margin: 0 auto;
  padding: 135px 0 50px 0;
  background-color: #fffaf145;
  overflow-y: scroll;

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
  }

  scrollbar-width: thin; /* For Firefox */
  -ms-overflow-style: none;

  .menu{
    /* height: 100px; */
    /* width: 100vw; */
    /* overflow-y: scroll; */
    /* background-color: #f7ebd654; */

    .dishs-ordered-container{
      position: relative;
      padding: 17.5px 30px;
      /* border-top: 1px solid #e0dddd; */
      border: 1px solid #e0dddd;
      overflow: hidden;
      margin: 15px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
      background-color: #f1efc652;

      h3{
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 0.07rem;
        margin: 2px 0 5px 0;
      }

      .desc{
        font-size: 0.85rem;
        font-weight: 200;

        svg{
            font-size: 1.25rem;
            margin-bottom: -3px;
            margin-right: 2px;
        }
        
        b{
            font-weight: 400;
            font-size: 0.75rem;
        }
        
        i{
            color: #153d85;
            font-weight: 400;
            font-size: 0.75rem;
            display: block;
            margin-top: 10px;
        }
      }
    }

    .category-container{
      margin: 40px 15px;

      .category-heading{
        font-weight: 600;
        font-size: 1.15rem;
        color: #434343;
      }

      .dish-container{
        position: relative;
        padding: 17.5px 30px;
        /* border-top: 1px solid #e0dddd; */
        border: 1px solid #e0dddd;
        overflow: hidden;
        margin: 15px 0;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
        background-color: #fff;
  
        .const{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;

          .strip{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 15px;
            background-color: #65f250;
  
            display: flex;
            align-items: center;
            justify-content: center;
  
            .text{
              font-size: 0.5rem;
              transform: rotate(270deg);
              text-align: center;
              text-transform: uppercase;
              letter-spacing: 0.25rem;
              font-weight: 500;
              white-space: nowrap;
            }
          }
          
          .left{
            width: 100%;
            .extra-info{
              width: 100%;
              display: flex;
              align-items: center;
  
              .veg-nonveg-sym{
                img{
                  height: 20px;
                }
              }

              .item-tags{
                display: flex;
                position: absolute;
                left: 20px;

                .tag{
                  font-size: 0.6rem;
                  padding: 5px 10px;
                  background-color: #e9d4ac;
                  border-radius: 100px;
                  margin-left: 5px;
                  margin-top: -7.5px;
                }
  
                .unavailable-tag{
                  background-color: #f89f9f;
                  color: white;
                  font-style: italic;
                  font-weight: 500;
                }
              }
  
            }
            .name{
              font-size: 0.95rem;
              font-weight: 500;
              letter-spacing: 0.07rem;
              margin: 2px 0 5px 0;
            }
  
            .price{
              font-size: 0.85rem;
              font-weight: 300;
              letter-spacing: 0.08rem;
            }
          }
  
          .right{
            display: flex;
            align-items: center;
            justify-content: center;
  
            .add-btn{
              font-size: 0.75rem;
              font-weight: 500;
              padding: 7.5px 15px;
              background-color: #d2ca394f;
              border-radius: 10px;
              border: 1px solid #dfdddd;
            }

            .cant-add-btn{
              font-size: 0.75rem;
              font-weight: 500;
              padding: 7.5px 15px;
              border-radius: 10px;
              border: 1px solid #dfdddd;
              background-color: #f6eeee;
              color: white;
              font-style: italic;
              font-weight: 500;
            }
  
            .close-btn{
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2.5px;
              margin-left: 5px;
              background-color: #f4f1f1;
              border-radius: 100%;
              font-size: 0.75rem;
            }
          }
        }
  
        .details{
          max-height: 0;
          overflow: hidden;
          margin-top: 17.5px;
          padding: 0 20px 0 20px;
          transition: max-height 0.25s ease;
  
          background-color: #f1ede6;
          border-radius: 20px;
  
          .detail{
            border-bottom: 1px solid #d5d2cd;
            padding-top: 20px;
            padding-bottom: 5px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-height: 132px;
  
            .detail-title{
              font-size: 0.95rem;
              font-weight: 500;
              letter-spacing: 0.07rem;
              margin: 0 0 15px 0;
            }
  
            input[type="radio"] {
              appearance: none;
              -webkit-appearance: none;
              width: 15px;
              height: 15px;
              border: 1px solid #000;
              border-radius: 50%;
              margin-right: 10px;
              background-color: transparent;
              position: relative;
            }
  
            input[type="radio"]:checked::before {
              content: "";
              display: block;
              width: 10px;
              height: 10px;
              background-color: #ca8489;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              /* animation: appear 0.8s; */
            }
  
            label {
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 0.15rem;
  
              i{
                font-size: 0.65rem;
                text-transform: none;
                font-style: normal;
              }
            }
  
            .detail-option{
              display: flex;
              align-items: center;
  
              margin-bottom: 15px;
            }
  
            @keyframes appear {
              0% {
                transform: translate(-50%, -50%) scale(0);
                background-color: #fff;
              }
              45% {
                transform: translate(-50%, -50%) scale(1.6);
                background-color: #64aedf;
              }
              50% {
                transform: translate(-50%, -50%) scale(1.7);
                background-color: #ad97b3;
              }
              55% {
                transform: translate(-50%, -50%) scale(1.6);
              }
              100% {
                transform: translate(-50%, -50%) scale(1);
                background-color: #ca8489;
              }
            }
  
            .controller{
              margin-bottom: 20px;
              display: flex;
              width: auto;
              align-items: center;
  
              /* background-color: orange; */
  
              .btn{
                width: 40px;
                height: 40px;
                display: grid;
                place-items: center;
                border-radius: 100px;
                background-color: #ddaead;
                z-index: 2;
              }
  
              .count{
                padding: 3.5px 0;
                width: 40px;
                text-align: center;
                background-color: white;
                margin: 0 -7.5px;
              }
  
              .inc{
                background-color: #ebcea4;
                scale: 1.15;
              }
            }
          }
  
          .no-border{
            border-bottom: none;
          }
        }
  
        .expanded {
          max-height: 1000px; 
          margin-top: 17.5px;
          transition: max-height 0.75s ease;
          padding: 0 20px 0px 20px;
        }
      }

      .no-display{
        display: none;
      }
    }
    

    /* .non-veg-container{
      background-color: #ffebeb;

      .details{
        background-color: #f3d8d8;
        .detail{
          .controller{
            .dec{
              background-color: #ddaead;
            }
          }
        }
      }
    } */
  }
`

const Filter = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
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

const Categories = styled.div`
  margin: 15px 15px 5px 15px;
  user-select: none;

  .categoriesList{
    display: flex;
    align-items: center;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
    }

    scrollbar-width: thin; /* For Firefox */
    -ms-overflow-style: none; 

    .list-item-2{
      padding: 10px 17.5px;
      margin-right: 7.5px;
      border-radius: 10px;
      white-space: nowrap;
      border: 1px solid rgb(233, 229, 229);
      background-color: rgba(255, 255, 255, 1);
      box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
      font-size: 0.8rem;
      color: #333;
      text-decoration: none;
      /* text-transform: uppercase; */
      /* letter-spacing: 0.25rem; */
    }
  }
`