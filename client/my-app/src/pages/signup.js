// import business from '../public/business.svg';
// import personal from '../public/personal.svg';
import './pages.css';
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function Signup() {
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const personalNavigate = () => {
    navigate('/signupPersonal');
  };

  const handleSignup = async () => {
    
    try {

      const response = await axios.post('http://localhost:8080/restaurants', {
        phone: phoneNumber,
        email: email,
        password: password,
        first_name:"",
        last_name: "",
        business_name: name,
        address: address,
        city: "",
        province: "",
      });
  
      const loginData = response.data;
      localStorage.setItem('user_id', loginData.user_id); // Store user_id in localStorage
      verifyNavigate();

    } catch (error) {
      console.error('Error occurred during signup:', error);
    }

  };

  //NOT WORKING!!
  const verifyNavigate = () => {
    navigate('/verify');
  };

  return (
    <div className='split-screen'>
      <div className='signup_desc'>
        <h1 id='signup_heading'>
          Local finds, simplified with GHOSTED
        </h1>
        <h2 id='signup_subheading'>
        Sign up now to find and small businesses around you!
        </h2>
      </div>
    <div className="page2 dkpage3">
      <header className="page2_signup">
        <h1>Choose Account Type</h1>
        <div className="page2_buttons">
          <div className="page2_personal">
            <img onClick={personalNavigate} src={'/personal.svg'} className="App-logos" alt="personal" />
            <p>Personal</p>
          </div>
          <div className="page2_business">
            <img src={'/business.svg'} className="App-logos" alt="business" />
            <p>Business</p>
          </div>
        </div>
        <div className="page2_inputfields">
        <div className="businessname">
          <label htmlFor="businessname">BUSINESS NAME</label>
          <input
            type="text"
            id="businessname"
            name="businessname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="businessname">
          <label htmlFor="phonenumber">PHONE NUMBER</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="businessname">
          <label htmlFor="businessemail">BUSINESS EMAIL</label>
          <input
            type="text"
            id="businessemail"
            name="businessemail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="businessname">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="businessname">
          <label htmlFor="businessaddress">BUSINESS ADDRESS</label>
          <input
            type="text"
            id="businessaddress"
            name="businessaddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        </div>
        <button onClick={handleSignup} className="sign-up-button"> Sign up</button>
        <div className="page2_account">
          <p>
            Already have an account? <a href="./signin">Sign In</a>
          </p>
        </div>
        <p>
          <a href="./guestHomepage">Continue as guest</a>
          </p>
      </header>
    </div>
    </div>
  );
}

export default Signup;