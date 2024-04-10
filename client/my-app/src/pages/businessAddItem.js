import React, { useState, useEffect } from "react";
import "./HomepageStyles.css";
import "./pages.css";
import "./userSearchStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BusinessAddItem() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const username = "test";
  const item = "test";
  // hardcoded
  const restaurantId = 1;
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: 0,
    isAvailable: true,
    categoryId: 1,
    image: "",
    prepTime: 0,
  });

  const homeNavigate = () => {
    navigate("/businessHomepage");
  };

  const chatNavigate = () => {
    navigate("/businessChat");
  };

  const settingNavigate = () => {
    navigate("/businessProfile");
  };

  const editNavigate = () => {
    navigate("/businessEdit");
  };

  const saveNavigate = () => {
    navigate("/businessHomepage");
  };

  const addItemNavigate = () => {
    navigate("/businessAddItem");
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setMenuItem((prev) => ({ ...prev, image: files[0] }));
    }
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const addNewMenuItem = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/menu_items/`, {
        restaurantId: restaurantId,
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        isAvailable: menuItem.isAvailable,
        categoryId: menuItem.categoryId,
        image: menuItem.image,
        prepTime: menuItem.prepTime,
      });
      console.log(response.data);
      navigate("/businessHomepage");
    } catch (error) {
      console.error("There was an error adding the menu item", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewMenuItem();
  };

  const discardChanges = () => {
    setEditItem(null);
    navigate("/businessHomepage");
  };

  return (
    <div className="HomepageMainCon">
      <img src={"/logo.svg"} class="App-logo-small" alt="logo" />
      <h1 class="Home-title">Home</h1>
      <div className="main-ctn2">
        <div className="price-qty">
          <div className="price">
            <p className="price-label">Food Name</p>
            <input
              type="text"
              name="name"
              value={editItem?.price || item.price}
              onChange={handleEditChange}
              className="price-input"
              placeholder="Name"
            ></input>
          </div>
        </div>
    
        <div className="description-ctn">
          <p className="description-label">Description</p>
          <textarea
            className="description-input"
            placeholder="Description"
            maxLength="200"
            name="description"
            value={editItem?.description || item.description}
            onChange={handleEditChange}
          ></textarea>
        </div>
        <div className="price-qty">
          <div className="price">
            <p className="price-label">Price</p>
            <input
              type="number"
              name="price"
              value={editItem?.price || item.price}
              onChange={handleEditChange}
              className="price-input"
              placeholder="Price"
            ></input>
          </div>
        </div>
        <div className="price-qty">
          <div className="price">
            <p className="price-label">Upload Image</p>
            <input
              type="file"
              id="file-upload"
              name="image" 
              onChange={handleEditChange}
              className="upload-img"
            />
            <label htmlFor="file-upload" className="file-upload-btn">Choose File</label>
          </div>
        </div>

        <div className="business_edit_button3">
          <button
            className="save_changes3"
            type="submit"
            onClick={handleSubmit}
          >
            Add Item
          </button>
          <button className="log_out3" type="button" onClick={discardChanges}>
            Discard Changes
          </button>
        </div>
      </div>

      <footer className="bottom_nav">
        <img
          src={"/HomeIconB.svg"}
          onClick={homeNavigate}
          className="home_icon"
          alt="home icon"
          style={{ cursor: "pointer" }}
        />
        <img
          src={"/ChatIconG.svg"}
          onClick={chatNavigate}
          className="chat_icon"
          alt="chat icon"
          style={{ cursor: "pointer" }}
        />
        <img
          src={"/SettingIconG.svg"}
          onClick={settingNavigate}
          className="setiing_icon"
          alt="setting icon"
          style={{ cursor: "pointer" }}
        />
      </footer>
    </div>
  );
}

export default BusinessAddItem;
