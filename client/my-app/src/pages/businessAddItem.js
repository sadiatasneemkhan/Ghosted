import React, { useState, useEffect } from 'react';
import './HomepageStyles.css';
import Navbar from '../components/Navbar';
import './userSearchStyles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function BusinessAddItem() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const username = "test";
  const item = "test";
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: 0,
    isAvailable: true, 
    categoryId: '', 
    image: '', 
    prepTime: 0, 
  });

  const homeNavigate = () => {
    navigate('/businessHomepage');
  }

  const chatNavigate = () => {
    navigate('/businessChat');
  }

  const settingNavigate = () => {
    navigate('/businessProfile');
  }

  const editNavigate = () => {
    navigate('/businessEdit');
  }

  const saveNavigate = () => {
    navigate('/businessHomepage');
  }

  const addItemNavigate = () => {
    navigate('/businessAddItem');
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setMenuItem(prev => ({ ...prev, [name]: value }));
  };

  const addNewMenuItem = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/menu-item`, { menuItem, restaurantId });
      console.log(response.data);
      navigate('/businessHomepage');
    }
    catch (error) {
      console.error("There was an error adding the menu item", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    addNewMenuItem(); 
  };

  const discardChanges = () => {
    setEditItem(null);
    navigate('/businessHomepage');
  };

  return (
    <div className="HomepageMainCon">
      <img src={'/logo.svg'} class="App-logo-small" alt="logo" />
      <h1 class="Home-title">Home</h1>
      <div className="main-ctn2">
        <div className="food-stuff2">
          <img src="/specificfood.png"></img>
          <p className="food-name">Food Name:</p>
          <input type="text" name="name"
            value={editItem?.name || item.name}
            onChange={handleEditChange}></input>
        </div>
        <div className="description-ctn">
          <p className="description-label">Description</p>
          <textarea className="description-item" placeholder="Description" maxLength="200" name="description"
            value={editItem?.description || item.description}
            onChange={handleEditChange}></textarea>
        </div>
        <div className="price-qty">
          <div className="price">
            <p className="price-label">Price</p>
            <input type="number"
              name="price"
              value={editItem?.price || item.price}
              onChange={handleEditChange}></input>
          </div>
        </div>
        <div className="business_edit_button3">
          <button className="save_changes3" type="submit" onClick={handleSubmit}>
            Add Item
          </button>
          <button className="log_out3" type="button" onClick={discardChanges}>
            Discard Changes
          </button>
        </div>
      </div>

      <footer className="bottom_nav">
        <img src={'/HomeIconB.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} />
        <img src={'/ChatIconG.svg'} onClick={chatNavigate} className="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} />
        <img src={'/SettingIconG.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} />
      </footer>
    </div>
  );
}

export default BusinessAddItem;