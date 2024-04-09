import React, { useState } from 'react';
import './userSearchStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const navigate = useNavigate();

  const userFoodItems = () => {
    navigate('/userSearch');
  };
  const userCartItems = () => {
    navigate('/userCart');
  };
  
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Jost:wght@200&family=Rubik+Iso&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>;

  return (
    <div className="HomepageMainCon">
      <img src={'/logo.svg'} class="App-logo-small" alt="logo" />
      <h1 class="Home-title">Home</h1>
      <div className="main-ctn">
        <div className="food-stuff">
          <img src="/specificfood.png"></img>
          <p className="food-name">*Food Name*</p>
        </div>
        <div className="description-ctn">
          <p className="description-label">Description</p>
          <div className="description-box"></div>
        </div>
        <div className="price-qty">
          <div className="qty">
            <p className="qty-label">Quantity</p>
            <div className="counter">
              <button className="decrement" onClick={decrement}>
                -
              </button>
              <span className="count">{count}</span>
              <button className="increment" onClick={increment}>
                +
              </button>
            </div>
          </div>
          <div className="price">
            <p className="price-label">Price</p>
            <p className="price-value">$30.29</p>
          </div>
        
        <div className="btn-ctn">
          <button className="add-to-cart">Add to cart</button>
        </div>
        </div>
          <div className="view-cart-btn-ctn" onClick={userCartItems}>
            <button className="view-cart">View cart</button>
          </div>
      </div>
     
      <Navbar />
    </div>
  );
}

export default Homepage;
