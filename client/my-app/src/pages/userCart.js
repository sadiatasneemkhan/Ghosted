import React, { useState } from 'react';
import './userCartStyles.css';
import Navbar from '../components/Navbar';
import DateSelector from '../components/DateSelector';

function Homepage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Food Name 1', quantity: 1, price: 30.29 },
    { id: 2, name: 'Food Name 2', quantity: 1, price: 30.29 },
    { id: 3, name: 'Food Name 3', quantity: 1, price: 30.29 },
    { id: 4, name: 'Food Name 4', quantity: 1, price: 30.29 },
  ]);

  const removeItem = (id) => {

    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

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

export default Homepage;
