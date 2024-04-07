import React from 'react';
import './userCartStyles.css';
import Navbar from '../components/Navbar';
import DateSelector from '../components/DateSelector';
import { useNavigate } from 'react-router-dom';
function Homepage() {

  const navigate = useNavigate();
  
  const homeNavigate = () => {
    navigate('/userHomepage');
  };

  const chatNavigate = () => {
    navigate('/userChat');
  };
  const settingNavigate = () => {
    navigate('/userProfile');
  }

  const newChatNavigate = () => {
    navigate('/userNewChat');
  }

  return (
    <>
      <div className="HomepageMainCon">
        <img src={'/logo.svg'} className="App-logo-small" alt="logo" />
        <h1 className="Home-title">Home</h1>
        <div className="main-ctn">
          <span className="cart-label">Cart</span>
          <hr></hr>
          <div className="scrollable-container">
            <div className="item">
              <img src="cartitem.png" alt="Item 1" className="item-image" />
              <div className="item-details">
                <h3 className="food-name">*Food Name*</h3>
                <p className="quantity">Quantity: 1</p>
                <p className="price">Price: $30.29</p>
              </div>
              <button className="remove-button">Remove</button>
            </div>
            <div className="line"></div>
            <div className="item">
              <img src="cartitem.png" alt="Item 1" className="item-image" />
              <div className="item-details">
                <h3 className="food-name">Food Name</h3>
                <p className="quantity">Quantity: 1</p>
                <p className="price">Price: $30.29</p>
              </div>
              <button className="remove-button">Remove</button>
            </div>
            <div className="line"></div> 
            <div className="item">
              <img src="cartitem.png" alt="Item 1" className="item-image" />
              <div className="item-details">
                <h3 className="food-name">*Food Name*</h3>
                <p className="quantity">Quantity: 1</p>
                <p className="price">Price: $30.29</p>
              </div>
              <button className="remove-button">Remove</button>
            </div>
            <div className="line"></div> 
            <div className="item">
              <img src="cartitem.png" alt="Item 1" className="item-image" />
              <div className="item-details">
                <h3 className="food-name">*Food Name*</h3>
                <p className="quantity">Quantity: 1</p>
                <p className="price">Price: $30.29</p>
              </div>
              <button className="remove-button">Remove</button>
            </div>
            <div className="line"></div> 
          </div>
          <hr></hr>
         
          <div className="second-ctn">
            <p className="total-price">Total Price: $44.29</p>
            <div className="date-ctn">
              <p className="selection-label">Select delivery date</p>
              <DateSelector className="date-selector" />
            </div>
            <div className='ins-ctn'>
              <p className='ins-label'>Instructions</p>
              <input className='ins-input' type='text'></input>
            </div>
            <button className='place-order' onClick={newChatNavigate}>Place Order</button>
          </div>
        </div>
        <hr></hr>
      </div>
      <footer className="bottom_nav">
        <img src={'/HomeIconB.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} />
        <img src={'/ChatIconG.svg'} onClick={chatNavigate} className="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} />
        <img src={'/SettingIconG.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} />
      </footer>
    </>
  );
}

export default Homepage;
