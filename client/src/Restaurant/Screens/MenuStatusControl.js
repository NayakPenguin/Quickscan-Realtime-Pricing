import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import LeftMenu from "../Components/LeftMenu";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import menuData from "../../DummyDB/menuData.json";
import menuCategoryData from "../../DummyDB/menuCategoryData.json";
import newMenuData from "../../DummyDB/newMenuData.json";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteIcon from '@material-ui/icons/Delete';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';
import { useParams, useNavigate } from 'react-router-dom';

import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";

const MenuStatusControl = () => {
    const [pageID, setPageID] = useState("menu-status-control");
    const [newCategory, setNewCategory] = useState('');
    const [newMenuItemName, setNewMenuItemName] = useState('');
    const [newMenuItemPrice, setNewMenuItemPrice] = useState('');
    const [isVeg, setIsVeg] = useState(true);

    const [currSelectedCategory, setCurrSelectedCategory] = useState('No-Category');

    const [allItems, setAllItems] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [menuDataObject, setMenuDataObject] = useState({});


    const params = useParams();
    const { creatorShopId } = useParams();

    const menuCollectionRef = collection(db, `Menu${creatorShopId}`);
    const categoriesCollectionRef = collection(db, `Categories${creatorShopId}`);

    const [showTagOptions, setShowTagOptions] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredItems = menuDataObject[currSelectedCategory]?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];


    useEffect(() => {
        const categoriesCollectionRef = collection(db, `Categories${creatorShopId}`);
        const menuCollectionRef = collection(db, `Menu${creatorShopId}`);

        const getCategoriesAndMenu = async () => {
            try {
                const data1 = await getDocs(categoriesCollectionRef);
                const filteredData1 = data1.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                const sortedData1 = filteredData1.sort((a, b) => a.orderIndex - b.orderIndex);
                setAllCategories(sortedData1);
                if (currSelectedCategory == "No-Category") setCurrSelectedCategory(sortedData1[0]?.name || '');

                const data = await getDocs(menuCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                const categoryMap = filteredData.reduce((acc, item) => {
                    const { category, ...rest } = item;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(rest);
                    return acc;
                }, {});

                Object.keys(categoryMap).forEach(category => {
                    categoryMap[category].sort((a, b) => a.index_order - b.index_order);
                });

                setMenuDataObject(categoryMap);
            } catch (error) {
                console.log(error);
            }
        };

        getCategoriesAndMenu();
    }, [db, creatorShopId, allItems]);

    const onChange = async (sourceId, sourceIndex, targetIndex) => {
        const nextState = swap(allCategories, sourceIndex, targetIndex);
        setAllCategories(nextState);

        // Update Firestore order
        nextState.forEach(async (category, index) => {
            const categoryDocRef = doc(db, `Categories${creatorShopId}`, category.id);
            await updateDoc(categoryDocRef, { orderIndex: index });
        });
    };

    const handleAddCategory = async () => {
        try {
            const categoriesCollectionRef = collection(db, `Categories${creatorShopId}`);
            const newCategoryDoc = await addDoc(categoriesCollectionRef, {
                name: newCategory,
            });

            console.log('Category added successfully with ID: ', newCategoryDoc.id);

            setNewCategory('');
            setAllCategories(prevCategories => [{ id: newCategoryDoc.id, name: newCategory }, ...prevCategories]);
        } catch (error) {
            console.error('Error adding category: ', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const categoryDocRef = doc(db, `Categories${creatorShopId}`, categoryId);
            await deleteDoc(categoryDocRef);

            console.log('Category deleted successfully with ID: ', categoryId);

            setAllCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category: ', error);
        }
    };

    const handleAddMenuItem = async () => {
        try {
            const menuCollectionRef = collection(db, `Menu${creatorShopId}`);
            const newMenuItemDoc = await addDoc(menuCollectionRef, {
                index_order: allItems.length + 1,
                type: `${isVeg ? "Veg" : "Non-Veg"}`,
                name: newMenuItemName,
                allow_visibility: true,
                unavailable: false,
                price: parseFloat(newMenuItemPrice),
                discount: "",
                tag: "",
                ordered: "",
                details: [],
                details_options: [],
                category: currSelectedCategory,
            });

            console.log('Menu item added successfully with ID: ', newMenuItemDoc.id);

            setNewMenuItemName('');
            setNewMenuItemPrice('');
            setAllItems(prevMenuItems => [{ id: newMenuItemDoc.id, name: newMenuItemName, price: parseFloat(newMenuItemPrice), time: new Date(), order: allItems.length + 1 }, ...prevMenuItems]);

        } catch (error) {
            console.error('Error adding menu item: ', error);
        }
    };

    const [tagOptions, setTagOptions] = useState([
        "Top Seller 🔥",
        "Few Left ⏰",
        "Unavailable 😞",
        "Chef's Special 🍽️",
        "Limited Edition ⏳",
        "Vegetarian 🌱",
        "Gluten-Free 🚫🌾",
        "Spicy 🔥",
        "Family Size 🍲",
        "Organic 🌿",
        "Locally Sourced 🌍",
        "Vegan Friendly 🌱",
        "Low Calorie 🥗",
        "Signature Dish 🖋️",
        "Heart-Healthy ❤️",
        "Keto Friendly 🥩",
        "Award-Winning 🏆",
        "Fresh Catch 🎣",
        "Sugar-Free 🍬",
        "Happy Hour 🍹",
        "Homemade Goodness 🏠",
        "Farm-to-Table 🚜",
        "Kids' Favorite 🧒🍔",
    ])

    const updateTag = async (itemId, selectedTag) => {
        console.log(itemId, selectedTag);
        try {
            const itemRef = doc(db, `Menu${creatorShopId}`, itemId);
            await updateDoc(itemRef, { tag: selectedTag });
            // Optionally, you can update the local state to reflect the change immediately
            setMenuDataObject((prevMenuDataObject) => {
                // Make sure currSelectedCategory is a valid index or key
                const updatedItems = prevMenuDataObject[currSelectedCategory].map((item) =>
                    item.id === itemId ? { ...item, tag: selectedTag } : item
                );

                return {
                    ...prevMenuDataObject,
                    [currSelectedCategory]: updatedItems,
                };
            });
        } catch (error) {
            console.error("Error updating tag:", error);
        }
    };

    const handleTagButtonClick = (itemId) => {
        setShowTagOptions((prevState) => !prevState);
        setSelectedItemId(itemId);
    };

    const handleTagSelection = (itemId, selectedTag) => {
        updateTag(itemId, selectedTag);
        // setShowTagOptions(false);
        setSelectedItemId(null);
    };

    const handleVisibilityToggle = async (itemId) => {
        try {
            const itemRef = doc(db, `Menu${creatorShopId}`, itemId);

            // Get the current item's data from the database
            const currentItemSnapshot = await getDoc(itemRef);
            const currentItemData = currentItemSnapshot.data();

            if (currentItemData) {
                const currentVisibility = currentItemData.allow_visibility;

                // Toggle the "unavailability" property for the item in the database
                await updateDoc(itemRef, { allow_visibility: !currentVisibility });

                setMenuDataObject((prevMenuDataObject) => {
                    // Make sure currSelectedCategory is a valid index or key
                    const updatedItems = prevMenuDataObject[currSelectedCategory].map((item) =>
                        item.id === itemId ? { ...item, allow_visibility: !currentVisibility } : item
                    );

                    return {
                        ...prevMenuDataObject,
                        [currSelectedCategory]: updatedItems,
                    };
                });
            }
        } catch (error) {
            console.error("Error toggling unavailability:", error);
        }
    };

    const handleUnavailabilityToggle = async (itemId) => {
        try {
            const itemRef = doc(db, `Menu${creatorShopId}`, itemId);

            // Get the current item's data from the database
            const currentItemSnapshot = await getDoc(itemRef);
            const currentItemData = currentItemSnapshot.data();

            if (currentItemData) {
                const currentUnavailability = currentItemData.unavailable;

                // Toggle the "unavailability" property for the item in the database
                await updateDoc(itemRef, { unavailable: !currentUnavailability });

                setMenuDataObject((prevMenuDataObject) => {
                    // Make sure currSelectedCategory is a valid index or key
                    const updatedItems = prevMenuDataObject[currSelectedCategory].map((item) =>
                        item.id === itemId ? { ...item, unavailable: !currentUnavailability } : item
                    );

                    return {
                        ...prevMenuDataObject,
                        [currSelectedCategory]: updatedItems,
                    };
                });
            }
        } catch (error) {
            console.error("Error toggling unavailability:", error);
        }
    };

    const handleSwap = async (sourceId, sourceIndex, targetIndex) => {
        const nextState = swap(menuDataObject[currSelectedCategory], sourceIndex, targetIndex);
        setMenuDataObject({
            ...menuDataObject,
            [currSelectedCategory]: nextState,
        });

        // Update Firestore with the new order
        nextState.forEach(async (item, index) => {
            const itemDocRef = doc(db, `Menu${creatorShopId}`, item.id);
            await updateDoc(itemDocRef, { index_order: index });
        });
    };

    // -----------------------------------------------------------------------------

    // Handle With EXTRA-CARE might exceed firebase limit if called again and again!
    const handleAddAllMenuItem = async () => {
        try {
            const menuCollectionRef = collection(db, `Menu${creatorShopId}`);

            // Iterate through each menu item and add it to the 'Menu' collection
            for (const menuItem of menuData) {
                const newMenuItemDoc = await addDoc(menuCollectionRef, menuItem);
                console.log('Menu item added successfully with ID: ', newMenuItemDoc.id);
            }

        } catch (error) {
            console.error('Error adding menu item: ', error);
        }
    };

    const handleAddAllCategoryItem = async () => {
        try {
            const categoriesCollectionRef = collection(db, `Categories${creatorShopId}`);

            // Iterate through each menu item and add it to the 'Menu' collection
            for (const categoryItem of menuCategoryData) {
                const newCategoriesMenuItemDoc = await addDoc(categoriesCollectionRef, categoryItem);
                console.log('Menu item added successfully with ID: ', newCategoriesMenuItemDoc.id);
            }

        } catch (error) {
            console.error('Error adding menu item: ', error);
        }
    };

    // -----------------------------------------------------------------------------

    return (
        <Container>
            <LeftMenu pageID={pageID} />
            <Navbar />
            {/* <div className="publish-changes">
                Enter Items with Customizations
                <ChevronRightIcon />
            </div> */}
            {/* <h1>Create or Update Menu</h1> */}
            <div className="categories">
                {/* <div className="bulk-input">
                    <h3>Bulk Import <a href="/">Click here!</a></h3>
                    <p>Quickly add multiple food and categories to the list by uploading
                        an Excel file. Streamline your food management process with ease. </p>
                </div> */}
                <div className="add-categories">
                    <h2>Categories</h2>
                </div>

                {/* <button onClick={() => {handleAddAllMenuItem(); handleAddAllCategoryItem();}}>Hello World, I am Danger! - DONT CLICK!</button> */}

                <div className="add-categories">
                    <input
                        type="text"
                        placeholder="Enter Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>Add</button>
                </div>

                <GridContextProvider onChange={onChange}>
                    <div className="categories-container">
                        <GridDropZone
                            id="categories"
                            boxesPerRow={1}
                            rowHeight={60}
                        >
                            {allCategories.map((category) => (
                                <GridItem key={category.id}>
                                    <div className={`category ${category.name === currSelectedCategory ? 'selected' : ''}`} onClick={() => setCurrSelectedCategory(category.name)}>
                                        <div className="strip"></div>
                                        <div className="left">
                                            <DragIndicatorIcon />
                                            <div className="name">{category.name}</div>
                                        </div>
                                        <div className="right" onClick={() => handleDeleteCategory(category.id)}>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </GridItem>
                            ))}
                        </GridDropZone>
                    </div>
                </GridContextProvider>
            </div>
            <div className="edit-food">
                <div className="top-layer">
                    <h1>
                        <span>Category {">"} </span>
                        {currSelectedCategory}
                    </h1>
                </div>
                <div className="top-layer">
                    <div className="select" onClick={() => setIsVeg(!isVeg)}>
                        {
                            isVeg ? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png" alt="" /> : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png" alt="" />
                        }
                        <FlipCameraAndroidIcon />
                    </div>
                    <div className="select choose-cat">
                        {currSelectedCategory}
                        {/* <ExpandMoreIcon /> */}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Item Name"
                        value={newMenuItemName}
                        onChange={(e) => setNewMenuItemName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Item Price"
                        value={newMenuItemPrice}
                        onChange={(e) => setNewMenuItemPrice(e.target.value)}
                    />
                    <button onClick={handleAddMenuItem}>Add</button>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Search Food Item Here" value={searchQuery} onChange={handleSearch} />
                    <div className="search-btn"><SearchIcon /></div>
                </div>

                <div className="food-list">
                    <GridContextProvider onChange={handleSwap}>
                        <GridDropZone id="items" boxesPerRow={1} rowHeight={100}>
                            {filteredItems.map((item, index) => (
                                <GridItem key={item.id}>
                                    <div className="food-container">
                                        <div className="fc-top-layer">
                                            <div className="left">
                                                <DragIndicatorIcon />
                                                <div className="main-info">
                                                    <div className="name">{item.name}</div>
                                                    <div className="one-row">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png" alt="" />
                                                        <div className="price">₹ {item.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="control-btns">
                                                    <div className={`btn add-tag ${item.tag == "" ? "" : "color-tag"}`} onClick={() => handleTagButtonClick(item.id)}>
                                                        {item.tag == "" ? "Add Tag" : item.tag}
                                                        <ArrowDropDownIcon />
                                                        {showTagOptions == true && selectedItemId !== null && selectedItemId === item.id && (
                                                            <div className="show-tag-options">
                                                                {tagOptions.map((tag, index) => (
                                                                    <span
                                                                        key={index}
                                                                        onClick={() => handleTagSelection(item.id, tag)}
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={`btn circle ${item.allow_visibility ? "" : "color-tag"}`}
                                                        onClick={() => handleVisibilityToggle(item.id)}>
                                                        <VisibilityOffIcon />
                                                    </div>
                                                    <div className={`btn circle ${item.unavailable ? "color-tag" : ""}`}
                                                        onClick={() => handleUnavailabilityToggle(item.id)}>
                                                        <RestoreIcon />
                                                    </div>
                                                </div>
                                                <MoreVertIcon />
                                            </div>
                                        </div>
                                    </div>
                                </GridItem>
                            ))}
                        </GridDropZone>
                    </GridContextProvider>
                </div>
            </div>

        </Container>
    );
};

export default MenuStatusControl;

const Container = styled.div`
    background-color: #fff6e659;
    width: 100vw;
    min-height: 100vh;

    padding-left: 300px;
    padding-top: 120px;
    padding-right: 40px;

    position: relative;

    button{
        font-size: 0.75rem;
        padding: 5px 12.5px;
        border: none;
        background-color: #f2f2f2;
        border: 2px solid black;
        box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;
        
        &:hover{
            transition-duration: 250ms;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
        }
    }

    .one-row{
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .publish-changes{
        position: absolute;
        top: 80px;
        right: 40px;

        display: flex;
        align-items: center;

        svg{
            font-size: 1rem;
            margin-left: 2.5px;
            margin-right: -5px;
        }

        font-size: 0.75rem;
        padding: 5px 12.5px;
        border: none;
        background-color: #f2f2f2;
        border: 2px solid black;
        box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;
        
        &:hover{
            transition-duration: 250ms;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
        }
    }
    
    .categories{
        position: fixed;
        height: calc(100vh - 60px);
        background-color: white;
        top: 60px;
        left: 260px;
        width: 300px;
        border-right: 1px solid #e8e1d6;
        padding: 20px;
        overflow-y: scroll;

        .bulk-input{
            background-color: #f88888;
            /* border-radius: 10px; */
            border: 2px solid red;

            padding: 10px;

            h3{
                font-size: 0.85rem;
                font-weight: 500;
                margin-bottom: 2.5px;
                color: white;

                a{
                    color: #5fff3c;
                    font-weight: 500;
                    text-decoration: none;
                    font-style: italic;
                }
            }

            p{
                font-size: 0.7rem;
                font-weight: 300;
                color: white;
            }
        }

        .add-categories{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0;

            h2{
                font-size: 1rem;
                font-weight: 500;
            }

            input{
                flex: 1;
                border: 2px solid black;
                border-right: none;
                font-size: 0.75rem;
                padding: 5px 7.5px;
            }

            button{
                font-size: 0.75rem;
                padding: 5px 12.5px;
                background-color: #f2f2f2;
            }
        }

        .categories-container{
            display: flex;
            flex-direction: column;


            .category{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #f2f2f2;
                /* border-radius: 5px; */
                position: relative;
                overflow: hidden;
                border: 2px solid black;
                box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;

                .strip{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 7px;
                }

                .left{  
                    display: flex;
                    align-items: center;

                    svg{
                        font-size: 1rem;
                        margin-right: 5px;
                        cursor: grab;
                    }
                    
                    .name{
                        font-size: 0.8rem;
                        font-weight: 400;
                    }
                }

                .right{
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    svg{
                        font-size: 1.25rem;
                    }
                }

                &:hover{
                    transition-duration: 250ms;
                    /* cursor: pointer; */
                    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
                }
            }

            .selected{
                background-color: #fde7d0;
                .strip{
                    background-color: #8bd28b;
                }
            }
        }
    }

    .categories::-webkit-scrollbar {
     width: 3px; /* Set the width of the scrollbar */
    }

    .categories::-webkit-scrollbar-thumb {
        background-color: #7290f0; /* Color of the scrollbar thumb */
        border-radius: 100px; /* Radius of the scrollbar thumb */
    }

    .edit-food{
        padding-left: 300px;

        .top-layer{
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            
            h1{
                display: flex; 
                flex-direction: column;
                align-items: flex-start;
                
                span{
                    font-size: 0.75rem;
                    font-weight: 300;
                }
    
                font-size: 1.75rem;
                font-weight: 500;

                margin-bottom: 20px;
            }

            .select{
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 2px solid black;
                border-right: none;
                font-size: 0.8rem;
                padding: 5px 7.5px;
                background-color: white;

                height: 35px;

                img{
                    height: 90%;
                    margin: 0;
                }

                svg{
                    font-size: 1rem;
                    margin-left: 10px;
                }
            }

            .choose-cat{
                flex: 1;
                font-weight: 500;
            }

            input{
                flex: 1;
                border: 2px solid black;
                border-right: none;
                font-size: 0.8rem;
                padding: 0 7.5px;
                height: 35px;
                /* background-color: #fde7d0; */
            }

            button{
                font-size: 0.85rem;
                padding: 5px 12.5px;
                background-color: #f2f2f2;
            }
        }

            

        .search-bar{
            display: flex;
            margin-top: 20px;
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

                svg{
                    font-size: 1rem;
                }
            }
        }

        .food-list{
            display: flex;
            flex-direction: column; 
            width: 100%;
            padding: 20px 0;

            .food-container{
                width: 100%;
                margin-bottom: 10px;
                background-color: #fff;
                /* background-color: black; */
                /* border-radius: 5px; */
                position: relative;
                /* overflow: hidden; */
                border: 2px solid black;
                box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;

                .fc-top-layer{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 15px;
                    padding-bottom: 20px;
                    /* background-color: orange; */

                    .left{  
                        display: flex;
                        align-items: center;
    
                        svg{
                            font-size: 1.5rem;
                            margin-right: 15px;
                        }
                        
                        .main-info{
                            .name{
                                font-size: 1.25rem;
                                font-weight: 500;
                            }

                            .one-row{ // global css
                                .price{
                                    font-size: 0.85rem;
                                    font-weight: 400;
                                    letter-spacing: 0.1rem;
                                }

                                img{
                                    height: 1.25rem;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                    
                    .right{
                        display: flex;
                        align-items: center;

                        .control-btns{
                            display: flex;
                            align-items: center;
                            margin-right: 10px;

                            .btn{
                                height: 32.5px;
                                border-radius: 100px;
                                background-color: #f2f2f2;
                                /* background-color: #f88888; */
                                /* background-color: #8bd28b; */
                                border: 1.5px solid black;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-left: 10px;
                                /* color: white; */

                                svg{
                                    font-size: 1.25rem;
                                    /* fill: white; */
                                }

                                box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 10px 0px;
        
                                &:hover{
                                    transition-duration: 250ms;
                                    cursor: pointer;
                                    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
                                }
                            }

                            .add-tag{
                                position: relative;

                                display: flex;
                                align-items: center;
                                font-size: 0.7rem;
                                padding: 0 15px;
                                font-weight: 500;
                                
                                svg{
                                    font-size: 1.5rem;
                                    margin-left: 5px;
                                    margin-right: -5px;
                                }

                                .show-tag-options{
                                    display: flex;
                                    flex-direction: column;
                                    position: fixed;
                                    top: 5px;
                                    background-color: #f2f2f2;
                                    right: 280px;
                                    z-index: 10;
                                    width: 180px;
                                    border-radius: 10px;
                                    max-height: 80px;
                                    overflow-y: scroll;
                                    overflow-x: hidden;
                                    /* padding: 0 7.5px; */
                                    border: 1px solid black;
                                    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0px;

                                    span{
                                        width: 100%;
                                        padding: 7.5px;
                                        border-bottom: 1px solid black;
                                    }

                                    span:last-child {
                                        border-bottom: none;
                                    }
                                }

                                .show-tag-options::-webkit-scrollbar {
                                    width: 3px; /* Set the width of the scrollbar */
                                }

                                .show-tag-options::-webkit-scrollbar-thumb {
                                    background-color: #7290f0; /* Color of the scrollbar thumb */
                                    border-radius: 100px; /* Radius of the scrollbar thumb */
                                }
                            }

                            .color-tag{
                                background-color: #8bd28b;
                            }

                            .circle{
                                aspect-ratio: 1/1;
                            }
                        }
    
                        svg{
                            font-size: 1.5rem;
                        }
                    }    
                }

                .bottom{
                    padding: 15px;
                    padding-top: 10px;
                    border-top: 2px solid black;
                    background-color: #f2f2f2;


                    .bottom-top-layer{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        h4{
                            font-size: 0.95rem;
                            font-weight: 500;
                        }

                        .add-customization{
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                            width: 50%;

                            input{
                                flex: 1;
                                max-width: 200px;
                                border: 2px solid black;
                                border-right: none;
                                font-size: 0.8rem;
                                padding:  calc(2.5px + 0.05rem) 7.5px;
                            }

                            button{
                                font-size: 0.8rem;
                                padding: calc(2.5px + 0.05rem) 12.5px;
                                background-color: #f2f2f2;
                            }
                        }
                    }

                    .boxes{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: column;
                        align-items: flex-start;
                        margin-top: 5px;

                        .box{
                            /* height: 32.5px; */
                            /* border: 2px solid black; */
                            display: flex;
                            flex-direction: column;

                            .box-title{
                                display: flex;
                                font-size: 0.85rem;
                                align-items: center;
    
                                padding: 0 12.5px;
                                margin-right: 5px;
                                margin-top: 10px;
    
                                font-weight: 500;
    
                                svg{
                                    font-size: 1rem;
                                    margin: 0 5px 0 -5px;
                                }
    
                                &:hover{
                                    cursor: pointer;
                                }
                            }

                            .box-list{
                                display: flex;
                                flex-direction: column;

                                div{
                                    font-size: 0.75rem;
                                    font-weight: 400;
                                    margin: 2.5px 0;
                                    margin-left: 35px;

                                    span{
                                        background-color: #8bd28b;
                                        padding: 1.5px 7.5px;
                                        font-weight: 500;
                                        border-radius: 100px;
                                    }
                                }
                            }
                        }

                        /* .add-btn{
                            width: 0;
                            aspect-ratio: 1/1;
                            justify-content: center;
                            height: 32.5px;
                            border: 2px solid black;
                            background-color: #fde7d0;

                            
                            svg{
                                font-size: 0.9rem;
                                margin: 0;
                            }
                        } */
                    }

                }

                &:hover{
                    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 10px 0px;
                    transition-duration: 250ms;
                }
            }
        }
       
    }

`    