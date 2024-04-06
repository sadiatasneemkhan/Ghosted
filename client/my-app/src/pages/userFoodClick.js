import React from 'react';
import './userFoodClickStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


function UserFoodClick() {

  const navigate = useNavigate();

  const userFoodItems = () => {
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
        <div className="food-items" onClick={userFoodItems}>
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
          <img src="food.png" alt="Food Item 1" />
        </div>
        <button className="view-cart-btn" onClick={userCartItems}>View cart</button>

        <Navbar />
      </div>
    </>
  );
}

export default UserFoodClick;
