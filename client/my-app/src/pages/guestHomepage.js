import React, { useState, useEffect } from "react";
import "./HomepageStyles.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GuestHomepage() {
  const [restaurants, setRestaurants] = useState([]);
  const [image, setImage] = useState();
  const userId = 1; // hardcoded, get from localstorage later
  const firstname = "John";

  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurants();
  }, [userId]);

  const getAllRestaurants = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/restaurants/`);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLogoUrl = (logo) => {
    if (!logo || logo.trim() === "" || logo === "./images/default-profile") {
      return "default-item.png"; // Path to default image
    }
    return logo;
  };

  return (
    <div className="HomepageMainCon">
      <img src={"/logo.svg"} className="App-logo-small" alt="logo" />
      <h1 className="Home-title">Home</h1>
      <div className="UserContainer">
        <div className="UserDetails">
          <img
            src={"/Pfp.svg"}
            className="Pfp"
            alt="User profile picture"
            onClick={() => navigate("/userProfile")}
            style={{ cursor: "pointer" }}
            draggable="false"
          />
          <h4 className="DisplayUserName">Welcome {firstname}!</h4>
        </div>
      </div>
      {/* <div className="Search-Container">
        <input type="text" className="SearchBar" placeholder="Search" />
      </div> */}
      <div className="Restaurant-ScrollContainer">
        <div className="Restaurant-Container">
          {restaurants.map((bus) => (
            <div
              key={bus.restaurant_id}
              className="Restaurant1"
              data-name={bus.business_name}
              onClick={() => navigate(`/guestFoodClick/${bus.restaurant_id}`)}
            >
              <img
                src={`http://localhost:8080/images/${getLogoUrl(bus.logo)}`}
                alt="Restaurant Image"
                style={{ cursor: "pointer" }}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
      <footer className="bottom_nav">
        <img
          src={"/HomeIconB.svg"}
          onClick={() => navigate("/welcome")}
          className="home_icon"
          alt="home icon"
          style={{ cursor: "pointer" }}
        />
        <img
          src={"/ChatIconG.svg"}
          onClick={() => navigate("/userChat")}
          className="chat_icon"
          alt="chat icon"
          style={{ cursor: "pointer" }}
        />
        <img
          src={"/SettingIconG.svg"}
          onClick={() => navigate("/userProfile")}
          className="setting_icon"
          alt="setting icon"
          style={{ cursor: "pointer" }}
        />
      </footer>
    </div>
  );
}

export default GuestHomepage;
