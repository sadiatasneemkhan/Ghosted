import React, { useState, useEffect } from 'react';
import './HomepageStyles.css';
import Navbar from '../components/Navbar';
import './userSearchStyles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function BusinessEdit() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const username = "test";
  const item = "test";

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

  useEffect(() => {
    fetchMenuItem();
  }, []);

  const fetchMenuItem = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/restaurant/${username}`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("There was an error fetching the menu item", error);
    }
  };

  const updateMenuItem = async (menuItemId, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/restaurant/menu-item/${menuItemId}`, data);
      console.log(response.data);
      fetchMenuItem();
      navigate('/businessHomepage');
    } catch (error) {
      console.error("There was an error updating the menu item", error);
    }
  };

  const deleteMenuItem = async (menuItemId, restaurantId) => {
    try {
      await axios.delete(`http://localhost:3000/${menuItemId}/${restaurantId}`);
      fetchMenuItem();
      navigate('/businessHomepage');
    } catch (error) {
      console.error("There was an error deleting the menu item", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prev => ({ ...prev, [name]: value }));
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
          <p className="food-name">Food Name</p>
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
        <div className="business_buttons1">
          <button onClick={() => deleteMenuItem(item.menu_item_id)} className="delete_bus" type="button">
            Delete Item
          </button>
        </div>

        <div className="business_edit_button2">
          <button onClick={() => updateMenuItem(item.menu_item_id)} className="save_changes2" type="submit" >
            Save Changes
          </button>
          <button className="log_out2" type="button" onClick={discardChanges}>
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

export default BusinessEdit;