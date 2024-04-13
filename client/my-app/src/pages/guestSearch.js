import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './userSearchStyles.css';

function GuestSearch() {
  const navigate = useNavigate();
  const { menu_item_id } = useParams(); 
  const [menuItem, setMenuItem] = useState(null);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  
  const restaurantId = localStorage.getItem('1'); // Retrieve restaurant_id from localStorage

  useEffect(() => {
    axios.get(`http://localhost:8080/menu_items/${menu_item_id}`)
      .then(response => {
        setMenuItem(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [menu_item_id]);


  useEffect(() => {
    if (menuItem) {
      setPrice((menuItem.price * count).toFixed(2));
    }
  }, [count, menuItem]);

  const userCartItems = () => {
    navigate('/userCart');
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // const addToCart = () => {
  //   if (menuItem) {
  //     axios.post(`http://localhost:8080/cart_items/`, {
  //       restaurant_id: restaurantId,
  //       name: menuItem.name,
  //       description: menuItem.description,
  //       price: menuItem.price,
  //       category_id: menuItem.category_id,
  //       image: menuItem.image,
  //     })
  //     .then(response => {
  //       console.log('Item added to cart:', response.data);
  //       // userCartItems();
  //     })
  //     .catch(error => {
  //       console.error('There was an error adding the item to the cart!', error);
  //     });
  //   } else {
  //     console.log('No menu item selected.');
  //   }
  // };
  
  

  return (
    <div className="HomepageMainCon">
      <img src={'/logo.svg'} className="App-logo-small" alt="logo" />
      <h1 className="Home-title">Home</h1>
      {menuItem && (
        <div className="main-ctn">
          <div className="food-stuff">
            <img src={menuItem.image} alt={menuItem.name} />
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
                <button className="decrement" onClick={decrement}>-</button>
                <span className="count">{count}</span>
                <button className="increment" onClick={increment}>+</button>
              </div>
            </div>
            <div className="price">
              <p className="price-label">Price</p>
              <p className="price-value">${price}</p>
            </div>
            {/* <div className="btn-ctn">
              <button className="add-to-cart" onClick={addToCart}>Add to cart</button>
            </div> */}
          </div>
          {/* <div className="view-cart-btn-ctn" onClick={userCartItems}>
            <button className="view-cart">View cart</button>
          </div> */}
        </div>
      )}
      <footer className="bottom_nav">
        <img src={'/HomeIconB.svg'} onClick={() => navigate('/userHomepage')} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} />
        <img src={'/ChatIconG.svg'} onClick={() => navigate('/userChat')} className="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} />
        <img src={'/SettingIconG.svg'} onClick={() => navigate('/userProfile')} className="setting_icon" alt="setting icon" style={{ cursor: 'pointer' }} />
      </footer>
    </div>
  );
}

export default GuestSearch;
