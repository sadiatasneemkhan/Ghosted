import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './pages.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userID, setUserID] = useState('');

  
  const navigate = useNavigate();

  const signupNavigate = () => {
    navigate('/signup');
  };

  const handleLogin = async () => {
    
    try {
      const response = await axios.post('http://localhost:8080/users', {
        user: email,
        pass: password,
      });
  
      const loginData = response.data;
  
      if (loginData.message !== "User Not Found" && loginData.message !== "Incorrect Password" && loginData.length) {

        const restaurantResponse = await axios.get(`http://localhost:8080/restaurants/${loginData.user_id}`);
        const restaurantData = restaurantResponse.data;
  
        if (restaurantData.account_status === 'pending') {
          setMessage('Your account is still pending. Please wait for approval.');
        } else {
          setMessage('Login successful!');
          console.log("loginData:", loginData);

          console.log(loginData[0].user_id);
          localStorage.setItem('user_id', loginData[0].user_id); // Store user_id in localStorage
 
          
          handleloginandHomepage();

        }
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setMessage('An error occurred during login. Please try again later.');
    }
  };
  

  const handleloginandHomepage = () => {
    navigate('/userHomepage');
  };
  

  return (
    <div className="page2 dkpage2">
      <header className="page2_signup">
        <div className="page2_signin">
          <h1>Sign in</h1>
        </div>
        <div className="page2_buttons">
          <div className="page2_personal">
            <img src={'/logo.svg'} className="App-logo3" alt="logo" />
          </div>
        </div>
        <div className="page2_inputfields">
          <div className="businessname">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              id="email"
              name="email"
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
          <div className="checkbox-container">
            <input type="checkbox" id="rememberMeCheckbox" />
            <label htmlFor="rememberMeCheckbox" className="checkbox-description">
              Remember Me
            </label>
            <div className="forgot-password">
              <p>
                <a href="#">Forgot Password</a>
              </p>
            </div>
          </div>
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="page2_account">
          <p>
          Don't have an account? <a href="#" onClick={signupNavigate}>Sign Up</a>
          </p>
        </div>
        {message && <p className="error-message">{message}</p>}
      </header>
    </div>
  );
}

export default Signin;
