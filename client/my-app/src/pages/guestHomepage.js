import React from 'react';
import './HomepageStyles.css';
import './pages.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function GuestHomepage() {

  const navigate = useNavigate();

  const homeNavigate = () => {
    navigate('/guestHomepage');
  }

  const chatNavigate = () => {
    navigate('/signupPersonal');
  };

  const settingNavigate = () => {
    navigate('/signupPersonal');
  }

  const foodClickNavigate = () => {
    navigate('/guestFoodClick');
  }
  const welcomeNavigate = () => {
    navigate('/welcome');
  };
  
  const profileNavigate = () => {
    navigate('/userProfile');
  };
  return (
    <div className="HomepageMainCon">
      <img src={'/logo.svg'} className="App-logo-small" alt="logo" />
      <h1 className="Home-title">Home</h1>
      <div className="UserContainer">
        
      </div>
      <div className="Search-Container">
        <input type="text" className="SearchBar" placeholder=" Search" />
      </div>
      <div className="Restaurant-ScrollContainer2">
        <div className="Restaurant-Container">
          <div
            class="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
          >
            <img onClick={foodClickNavigate} src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false"/>
          </div>
          <div
            class="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
          >
             <img onClick={foodClickNavigate} className="Restaurant-main-img" src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false"/>
          </div>
          <div
            class="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
          >
           <img onClick={foodClickNavigate} src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false"/>
          </div>
          <div
            class="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
          >
             <img onClick={foodClickNavigate} src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false"/>
          </div>
        </div>
      </div>
      <footer className="bottom_nav">
        <a href="/welcome" onClick={welcomeNavigate}>
          <img src={'/homeIconG.svg'} className="home_icon" alt="home icon" />
        </a>
        <a href="/userChat" onClick={chatNavigate}>
          <img src={'/chatIconB.svg'} className="chat_icon" alt="chat icon" />
        </a>
        <a href="/userProfile" onClick={profileNavigate}>
          <img src={'/settingIconB.svg'} className="setting_icon" alt="setting icon" />
        </a>
      </footer>
    </div>
  );
}

export default GuestHomepage;
