import React, { useState, useEffect } from "react";
import "./HomepageStyles.css";
import Navbar from "../components/Navbar";
import "./userSearchStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

function BusinessEdit() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const username = "test";
  const item = "test";
  const menuItemID = 3;
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files && files[0]) {
        setMenuItem((prev) => ({ ...prev, image: files[0] }));
        setSelectedFile(files[0].name); // Set the selected file name
      }
    } else {
      setMenuItem((prev) => ({ ...prev, [name]: value }));
    }
  };
  // const handleEditChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "image") {
  //     if (files && files[0]) {
  //       setMenuItem((prev) => ({ ...prev, image: files[0] }));
  //     }
  //   } else {
  //     setMenuItem((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  const fetchMenuItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/restaurant/${username}`
      );
      setMenuItems(response.data);
    } catch (error) {
      console.error("There was an error fetching the menu item", error);
    }
  };

  const deleteMenuItem = async (menuItemId, restaurantId) => {
    try {
      await axios.delete(`http://localhost:3000/${menuItemId}/${restaurantId}`);
      fetchMenuItem();
      navigate("/businessHomepage");
    } catch (error) {
      console.error("There was an error deleting the menu item", error);
    }
  };

  const discardChanges = () => {
    setEditItem(null);
    navigate("/businessHomepage");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(menuItem).forEach((key) => {
      if (menuItem[key] !== null && menuItem[key] !== undefined) {
        if (key === "image" && menuItem[key] instanceof File) {
          formData.append("file", menuItem[key]); // Ensure this key matches your Multer config
        } else {
          formData.append(key, menuItem[key].toString()); // Ensure all values are strings
        }
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:8080/menu_items/${menuItemID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update response:", response.data);
      navigate("/businessHomepage"); // Redirect on success
    } catch (error) {
      console.error("Failed to update the menu item:", error.response || error);
    }
  };

  const updateMenuItem = async () => {
    const formData = new FormData();
    if (menuItem.image instanceof File) {
      formData.append("image", menuItem.image);
    }

    formData.append("name", menuItem.name);
    formData.append("description", menuItem.description);
    formData.append("price", menuItem.price);
    formData.append("isAvailable", menuItem.isAvailable);
    formData.append("categoryId", menuItem.categoryId);
    formData.append("prepTime", menuItem.prepTime);

    try {
      console.log("Updating menu item...");
      const response = await axios.put(
        `http://localhost:8080/menu_items/${menuItemID}`, // Ensure this is the correct URL
        formData, // Sending FormData if image uploads are involved
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Update response:", response.data);
      fetchMenuItem();
      navigate("/businessHomepage");
    } catch (error) {
      console.error(
        "There was an error updating the menu item",
        error.response || error
      );
    }
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
            <label htmlFor="file-upload" className="file-upload-btn">
              {selectedFile || "Choose File"}{" "}
              {/* Display the selected file name or 'Choose File' */}
            </label>
          </div>
        </div>

        <div className="business_buttons1">
          <button
            onClick={() => deleteMenuItem(item.menu_item_id)}
            className="delete_bus"
            type="button"
          >
            Delete Item
          </button>
        </div>
        <div className="business_edit_button3">
          <button
            className="save_changes3"
            type="submit"
            onClick={handleSubmit}
          >
            Save Changes
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

export default BusinessEdit;
