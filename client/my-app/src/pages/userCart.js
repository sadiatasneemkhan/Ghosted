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
  const splitted = window.location.pathname.split("/");
  const cart_id = splitted[2];
  const userId = localStorage.getItem("user_id");
  console.log(userId); 

  const homeNavigate = () => {
    navigate("/userHomepage");
  };

  const chatNavigate = () => {
    navigate("/userChat");
  };

  const settingNavigate = () => {
    navigate("/userProfile");
  };

  const fetchCartItems = () => {
    axios
      .get(`http://localhost:8080/cart_items/cart/${cart_id}`) // Updated URL
      .then((response) => {
        setCartItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []); // Removed cartItems from dependencies

  const removeItem = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:8080/cart_items/`, {
        data: { cartId: cart_id, cartItemId: id }, // Include orderId in the request body
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
  const totalPrice = cartItems
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);
  console.log("Total Price:", 0);

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

                    <p className="price">price: ${item.price}</p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.cart_item_id)}
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
