import React, { useState, useEffect } from "react";
import "./userFoodClickStyles.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserFoodClick() {
  const [menuItem, setMenuItem] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id"); // Retrieve user_id from localStorage
  const splitted = window.location.pathname.split("/");
  const restaurantId = splitted[2];

  const homeNavigate = () => {
    navigate("/userHomepage");
  };

  const settingNavigate = () => {
    navigate("/userProfile");
  };

  const chatNavigate = () => {
    navigate("/userChat");
  };
  const getImageUrl = (image) => {
    if (
      !image ||
      image.trim() === "" ||
      image === "./images/default-item-image"
    ) {
      return "default-item.png"; // Path to default image, adjust if necessary
    }
    return image;
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/menu_items/restaurant/${restaurantId}`
        );
        console.log(response.data);
        setMenuItem(response.data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
        setMenuItem([]);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);
  const userMenuItems = (itemId) => {
    navigate(`/userSearch/${itemId}`);
  };

  const userCartItems = () => {
    navigate("/userCart");
  };

  return (
    <>
      <div className="HomepageMainCon">
        <img src={"/logo.svg"} className="App-logo-small" alt="logo" />
        <h1 className="Home-title">Home</h1>
      </div>
      <div className="restaurant">
        <img src="rest1.png" alt="Restaurant Image"></img>
        <p className="restaurant-name">Restaurant 1</p>
        <p className="address">Address</p>
      </div>
      <div className="scrollable-containerr">
        {menuItem.map((item) => (
          <div
            className="food-items"
            onClick={() => userMenuItems(item.menu_item_id)}
            key={item.id}
          >
            <img
              src={`http://localhost:8080/images/${getImageUrl(item.image)}`}
              alt={item.name}
            />
          </div>
        ))}

        <button className="view-cart-btn" onClick={userCartItems}>
          View cart
        </button>

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
    </>
  );
}

export default UserFoodClick;