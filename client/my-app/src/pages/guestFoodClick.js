import React, { useState, useEffect } from 'react';
import './userFoodClickStyles.css';
import Navbar from '../components/Navbar';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function GuestFoodClick() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id'); // Retrieve user_id from localStorage

  useEffect(() => {
    // Fetching the restaurant_id for the user
    axios.get(`http://localhost:8080/user/${userId}`)
      .then(response => {
        const restaurantId = response.data;

        // Then, fetching the menu items for the restaurant
        axios.get(`http://localhost:8080/restaurant/${restaurantId}`)
          .then(response => {
            setMenuItems(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      })
      .catch(error => {
        console.error('There was an errorrr!', error);
      });
  }, []);

  const guestFoodItems = () => {
    navigate('/guestSearch');
  };
  
  const navigateCart = () => {
    navigate('/userCart');
  };
  
  const homeNavigate = () => {
    navigate('/guestHomepage');
  }

  const settingNavigate = () => {
    navigate('/signupPersonal');
  }

  const foodClickNavigate = () => {
    navigate('/guestFoodClick');
  }

  const welcomeNavigate = () => {
    navigate('/welcome');
  };
  
  const profileNavigate = () => {
    navigate('/userProfile');
  };

  const chatNavigate = () => {
    navigate('/userChat');
  };
  

  return (
    <>
      <div className="HomepageMainCon">
        <img src={'/logo.svg'} className="App-logo-small" alt="logo" />
        <h1 className="Home-title">Home</h1>
      </div>
      <div className="restaurant">
        <img src="rest1.png" alt="Restaurant Image"></img>
        <p className="restaurant-name">Restaurant 1</p>
        <p className="address">Address</p>
      </div>
      <div className="scrollable-containerr">
        <div className="food-items">
          {menuItems.map((item) => (
            <img key={item.id} className="food-items1" src="food.png" alt={item.name} onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          ))}
        </div>
        <button className="view-cart-btn" onClick={navigateCart}>View cart</button>

        <footer className="bottom_nav">
          <a href="/welcome" onClick={welcomeNavigate}>
            <img src={'/homeIcon.svg'} className="home_icon" alt="home icon" />
          </a>
          <a href="/userChat" onClick={chatNavigate}>
            <img src={'/chatIcon.svg'} className="chat_icon" alt="chat icon" />
          </a>
          <a href="/userProfile" onClick={profileNavigate}>
            <img src={'/settingIcon.svg'} className="setting_icon" alt="setting icon" />
          </a>
        </footer>
      </div>
      
    </>
  );
}

export default GuestFoodClick;
