import React from 'react';
import './HomepageStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function UserHomepage() {

  const navigate = useNavigate();

  const userFoodClick = () => {
    navigate('/userFoodClick');
  };
  const homeNavigate = () => {
    navigate('/userHomepage');
  };

  const chatNavigate = () => {
    navigate('/userChat');
  };
  const settingNavigate = () => {
    navigate('/userProfile');
  }

  const foodClickNavigate = () => {
    navigate('/userFoodClick');
  }
  const welcomeNavigate = () => {
    navigate('/welcome');
  };

  const chatNavigate = () => {
  navigate('/userChat');
  };
    
  const profileNavigate = () => {
  navigate('/userProfile');
  };

  return (
    <div className="HomepageMainCon">
      <img src={'/logo.svg'} className="App-logo-small" alt="logo"  />
      <h1 className="Home-title">Home</h1>
      <div className="UserContainer">
        <div className="UserDetails">
          <img src={'/Pfp.svg'} className="Pfp" alt="User profile picture"  onClick={settingNavigate} style={{ cursor: 'pointer' }} draggable="false"/>
          <h4 className="DisplayUserName">Welcome *UserName*</h4>
        </div>
      </div>
      <div className="Search-Container">
        <input type="text" className="SearchBar" placeholder=" Search" />
      </div>
      <div className="Restaurant-ScrollContainer">
        <div className="Restaurant-Container">
          <div
            className="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
            onClick={userFoodClick}
          >
            <img onClick={foodClickNavigate} src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false" />
          </div>
          <div
            className="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
            onClick={userFoodClick}
          >
            <img onClick={foodClickNavigate} src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false" />
          </div>
          <div
            className="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
            onClick={userFoodClick}
          >
            <img onClick={foodClickNavigate} src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false" />
          </div>
          <div
            className="Restaurant1"
            data-name="Restaurant Name"
            data-distance="2.4km"
            onClick={userFoodClick}
          >
            <img onClick={foodClickNavigate} src="rest1.png" alt="Restaurant Image" style={{ cursor: 'pointer' }} draggable="false" />
          </div>
        </div>
      </div>
      <footer className="bottom_nav">
        <a href="/welcome" onClick={welcomeNavigate}>
          <img src={'/homeIcon.svg'} className="home_icon" alt="home icon" />
        </a>
        <a href="/userChat" onClick={chatNavigate}>
          <img src={'/chatIcon.svg'} className="chat_icon" alt="chat icon" />
        </a>
        <a href="/userProfile" onClick={profileNavigate}>
          <img src={'/settingIcon.svg'} className="setting_icon" alt="setting icon" />
        </a>
      </footer>
    </div>
  );
}

export default UserHomepage;
