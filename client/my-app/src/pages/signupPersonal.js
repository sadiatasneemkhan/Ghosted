import React, {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPersonal() {

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const businessNavigate = () => {
    navigate('/signup');
  };

  const handleSignup = async () => {
    
    try {

      const response = await axios.post('http://localhost:8080/customers', {
        phone: phoneNumber,
        email: email,
        password: password,
        first_name: fname,
        last_name: lname,
        address: address,
        city: "",
        province: "",
      });
  
      const loginData = response.data;
      localStorage.setItem('user_id', loginData.user_id); // Store user_id in localStorage
      userHomepageNavigate();

    } catch (error) {
      console.error('Error occurred during signup:', error);
    }

  };

   const userHomepageNavigate = () => {
    navigate('/userHomepage');
  };

  return (
    <div className="page2">
      <header className="page2_signup">
        <h1>Choose Account Type</h1>
        <div className="page2_buttons">
          <div className="page2_personal">
            <img src={'/personal2.svg'} className="App-logos" alt="personal" />
            <p>Personal</p>
          </div>
          <div className="page2_business">
            <img
              src={'/business2.svg'}
              className="App-logos"
              alt="business"
              onClick={businessNavigate}
            />
            <p>Business</p>
          </div>
        </div>

        <div className="page2_inputfields">
        <div className="businessname">
          <label htmlFor="businessname">FIRST NAME</label>
          <input
            type="text"
            id="businessname"
            name="businessname"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className="businessname">
          <label htmlFor="businessname">LAST NAME</label>
          <input
            type="text"
            id="businessname"
            name="businessname"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
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
          <label htmlFor="businessemail">EMAIL</label>
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
          <label htmlFor="businessaddress">ADDRESS</label>
          <input
            type="text"
            id="businessaddress"
            name="businessaddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        </div>
        <button onClick={handleSignup} className="sign-up-button">
          Sign up
        </button>
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
  );
}

export default SignupPersonal;
