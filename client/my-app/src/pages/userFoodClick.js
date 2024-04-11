import React, { useState, useEffect } from 'react';
import './userFoodClickStyles.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserFoodClick() {
  const [menuItem, setMenuItem] = useState([]);
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
            setMenuItem(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const userMenuItems = () => {
    navigate('/userSearch');
  };

  const userCartItems = () => {
    navigate('/userCart');
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
        <div className="food-items" onClick={userMenuItems}>
          {menuItem.map((item) => (
            <img key={item.id} src="food.png" alt={item.name} />
          ))}
        </div>
        <button className="view-cart-btn" onClick={userCartItems}>View cart</button>

        <footer className="bottom_nav">
          <img src={'/HomeIconB.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} />
          <img src={'/ChatIconG.svg'} onClick={chatNavigate} className="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} />
          <img src={'/SettingIconG.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} />
        </footer>
      </div>
    </>
  );
}

export default UserFoodClick;
