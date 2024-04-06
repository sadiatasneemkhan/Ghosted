
import React from 'react';
// import line from '../public/line.svg';
// import circle from '../public/circle.svg';
import './pages.css';
import { useNavigate } from 'react-router-dom';

function Verify() {
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
    </style>
    
    
  const navigate = useNavigate();

  const welcomeNavigate = () => {
    navigate('/welcome');
  };


    return (
      <div className="verify">
        <div className="verify_logo">
          <img src={'/circle.svg'} className="App-circle" alt="circle" />
          <img src={'/line.svg'} className="App-line" alt="line" />
        </div>
        <div className="verify_information">
          <div className="verify_title">
            <h1>Verifying Business</h1>
          </div>
          <div className="verify_description">
            <p>This may take up to 24-48 hours.</p>
          </div>
        </div>
       
        <button className="welcome-screen" onClick={welcomeNavigate}>Welcome Screen</button>

      </div>
    );
}

export default Verify;
