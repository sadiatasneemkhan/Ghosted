import React from 'react';
import { useNavigate } from 'react-router-dom';
function Navbar() {

  const navigate = useNavigate();

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
  );
}

export default Navbar;
