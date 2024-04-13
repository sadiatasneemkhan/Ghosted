import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userCartStyles.css";
import Navbar from "../components/Navbar";
import DateSelector from "../components/DateSelector";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate("/userHomepage");
  };

  const chatNavigate = () => {
    navigate("/userChat");
  };

  const settingNavigate = () => {
    navigate("/userProfile");
  };

  const userId = "1";

  const fetchCartItems = () => {
    axios
      .get(`http://localhost:8080/cart/user/${userId}`) // Updated URL
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []); // Removed cartItems from dependencies

  const removeItem = (id) => {
    axios
      .delete(`http://localhost:8080/cart_items/${id}`, {
        data: { orderId: userId }, // Include orderId in the request body
      })
      .then((response) => {
        fetchCartItems(); // Fetch cart items after successfully deleting an item
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
      });
  };

  // Calculate total price
  const totalPrice = Array.isArray(cartItems)
    ? cartItems
        .reduce((total, item) => {
          return total + item.price;
        }, 0)
        .toFixed(2)
    : 0; // Return 0 if cartItems is not an array

  console.log("Total Price:", totalPrice);

  return (
    <>
      <div className="HomepageMainCon">
        <img src={"/logo.svg"} className="App-logo-small" alt="logo" />
        <h1 className="Home-title">Home</h1>
        <div className="main-ctn">
          <span className="cart-label">Cart</span>
          <hr />
          <div className="scrollable-container">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="item">
                  <img src="cartitem.png" alt="Item" className="item-image" />
                  <div className="item-details">
                    <h3 className="food-name">{item.name}</h3>
                    <p className="quantity">Quantity: {item.quantity}</p>

                    <p className="price">
                      price: ${item.price ? item.price.toFixed(2) : 0}
                    </p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                  <div className="line"></div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
          <hr />
          <div className="second-ctn">
            <p className="total-price">Total Price: ${totalPrice}</p>{" "}
            {/* Display total price */}
            <div className="date-ctn">
              <p className="selection-label">Select delivery date</p>
              <DateSelector className="date-selector" />
            </div>
            <div className="ins-ctn">
              <p className="ins-label">Instructions</p>
              <input className="ins-input" type="text"></input>
            </div>
            <button className="place-order">Place Order</button>
          </div>
        </div>
      </div>
      <footer className="bottom_nav">
        <a href="/welcome" onClick={homeNavigate}>
          <img src={"/homeIconB.svg"} className="home_icon" alt="home icon" />
        </a>
        <a href="/userChat" onClick={chatNavigate}>
          <img src={"/chatIconG.svg"} className="chat_icon" alt="chat icon" />
        </a>
        <a href="/userProfile" onClick={settingNavigate}>
          <img
            src={"/settingIconG.svg"}
            className="setting_icon"
            alt="setting icon"
          />
        </a>
      </footer>
    </>
  );
}

export default Homepage;
