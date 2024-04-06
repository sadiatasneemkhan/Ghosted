import React from 'react';
import './userFoodClickStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


function GuestFoodClick() {

  const navigate = useNavigate();

  const guestFoodItems = () => {
    navigate('/guestSearch');
  };
  
  const navigateCart = () => {
    navigate('/signup');
  };
  
  const homeNavigate = () => {
    navigate('/guestHomepage');
  }

  const chatNavigate = () => {
    navigate('/signupPersonal');
  };

  const settingNavigate = () => {
    navigate('/signupPersonal');
  }

  const foodClickNavigate = () => {
    navigate('/guestFoodClick');
  }

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
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false" />
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
          <img className="food-items1" src="food.png" alt="Food Item 1" onClick={guestFoodItems} style={{ cursor: 'pointer' }} draggable="false"/>
        </div>
        <button className="view-cart-btn" onClick={navigateCart}>View cart</button>

        <footer className="bottom_nav">
        <img src={'/HomeIconB.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} draggable="false"/>
        <img src={'/ChatIconG.svg'} onClick={chatNavigate} cclassName="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} draggable="false" />
        <img src={'/SettingIconG.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} draggable="false"/>
      </footer>
      </div>
      
    </>
  );
}

export default GuestFoodClick;
