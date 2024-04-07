import React from 'react';
import './HomepageStyles.css';
import Navbar from '../components/Navbar';
import './userSearchStyles.css';
import { useNavigate } from 'react-router-dom';


function BusinessEdit() {
    const navigate = useNavigate();

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

    return (
        <div className="HomepageMainCon">
        <img src={'/logo.svg'} class="App-logo-small" alt="logo" />
        <h1 class="Home-title">Home</h1>
        <div className="main-ctn">
          <div className="food-stuff">
            <img src="/specificfood.png"></img>
            <p className="food-name">*Food Name*</p>
            <input type="text" id="change_phone_nbr"></input>
          </div>
          <div className="description-ctn">
            <p className="description-label">Description</p>
            <textarea className="type_message_input" placeholder="Type Message" maxLength="200"></textarea>

          </div>
          <div className="price-qty">
            <div className="qty">
              <p className="qty-label">Quantity</p>
            </div>
            <div className="price">
              <p className="price-label">Price</p>
              <p className="price-value">$30.29</p>
            </div>
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