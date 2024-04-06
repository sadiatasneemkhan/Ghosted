
import React from 'react';
// import logo from '../public/logo.svg';
import './pages.css';
import { useNavigate } from 'react-router-dom';


function Welcome() {
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
    </style>
    
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate('/signup');
  };
    return (
      <div className="Welcomepage">
        <h1>Welcome to GHOSTED</h1>
        <p>Local finds, simplified with GHOSTED.</p>
        <img src={'/logo.svg'} className="App-logo" alt="logo" />
        <button onClick={handleNavigate}> Get Started</button>
       
      </div>
    );
}

export default Welcome;
