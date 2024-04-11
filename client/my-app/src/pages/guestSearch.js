import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userSearchStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {

    axios.get('http://localhost:8080/menu_items')
      .then(response => {
        setMenuItem(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const userMenuItems = () => {
    navigate('/guestSearch');
  };
  const userCartItems = () => {
    navigate('/userCart');
  };

  const settingNavigate = () => {
    navigate('/signup')
;  }

  const increment = () => {
    setCount(count + 1);
  };

  const welcomeNavigate = () => {
    navigate('/guestHomepage');
  }
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addToCart = () => {
    const userId = localStorage.getItem('user_id'); // Retrieve user_id from localStorage
  
    axios.post('http://localhost:8080/cart', {
      itemId: menuItem.id,
      quantity: count,
      user_id: userId
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };
  

  return (
    <div className="HomepageMainCon">
      <img src={'/logo.svg'} class="App-logo-small" alt="logo" />
      <h1 class="Home-title">Home</h1>
      <div className="main-ctn">
        <div className="food-stuff">
          <img src="/specificfood.png"></img>
          <p className="food-name">{menuItem.name}</p>
        </div>
        <div className="description-ctn">
          <p className="description-label">Description</p>
          <div className="description-box">{menuItem.description}</div>
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
            <p className="price-value">${(menuItem.price * count).toFixed(2)}</p>
          </div>
        
        <div className="btn-ctn">
          <button className="add-to-cart" onClick={addToCart}>Add to cart</button>
        </div>
        </div>
          <div className="view-cart-btn-ctn" onClick={userCartItems}>
            <button className="view-cart">View cart</button>
          </div>
      </div>
     
      <footer className="bottom_nav">
        <a href="/welcome" onClick={welcomeNavigate}>
          <img src={'/HomeIconG.svg'} className="home_icon" alt="home icon" />
        </a>
        <a href="/userChat" onClick={settingNavigate}>
          <img src={'/ChatIconB.svg'} className="chat_icon" alt="chat icon" />
        </a>
        <a href="/userProfile" onClick={settingNavigate}>
          <img src={'/SettingIconB.svg'} className="setting_icon" alt="setting icon" />
        </a>
      </footer>
    </div>
  );
}

export default Homepage;
