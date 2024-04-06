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
        <img src={'/HomeIconB.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} draggable="false"/>
        <img src={'/ChatIconG.svg'} onClick={chatNavigate} cclassName="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} draggable="false" />
        <img src={'/SettingIconG.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} draggable="false"/>
      </footer>
    </div>
  );
}

export default GuestHomepage;
