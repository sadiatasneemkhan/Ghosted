import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userCartStyles.css';
import Navbar from '../components/Navbar';
import DateSelector from '../components/DateSelector';

function Homepage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id'); // Retrieve user_id from localStorage

    axios.get(`http://localhost:8080/cart/${userId}`) // Include user_id in the request
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });
  }, []);

  const removeItem = (id) => {
    axios.delete(`http://localhost:8080/cart_items/${id}`)
      .then(response => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="HomepageMainCon">
          <img src={'/logo.svg'} className="App-logo-small" alt="logo" />
          <h1 className="Home-title">Home</h1>
          <div className="main-ctn">
            <span className="cart-label">Cart</span>
            <hr />
            <div className="scrollable-container">
              {cartItems.map((item) => (
                <div key={item.id} className="item">
                  <img src="cartitem.png" alt="Item" className="item-image" />
                  <div className="item-details">
                    <h3 className="food-name">{item.name}</h3>
                    <p className="quantity">Quantity: {item.quantity}</p>
                    <p className="price">Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <button className="remove-button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                  <div className="line"></div>
                </div>
              ))}
            </div>
            <hr />
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
              <button className='place-order'>Place Order</button>
            </div>
          </div>
        </div>
        <Navbar />
      </>
    );
  }
}

export default Homepage;
