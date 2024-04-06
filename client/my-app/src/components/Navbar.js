import React from 'react';
import { useNavigate } from 'react-router-dom';
function Navbar() {

  const navigate = useNavigate();

  const welcomeNavigate = () => {
    navigate('/welcome');
  };


  return (
    <footer className="bottom_nav">
      <img onClick={welcomeNavigate} src={'/homeIcon.svg'} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }}/>
      <img src={'/chatIcon.svg'} className="chat_icon" alt="chat icon" />
      <img
        src={'/settingIcon.svg'}
        className="setiing_icon"
        alt="setting icon"
      />
    </footer>
  );
}

export default Navbar;
