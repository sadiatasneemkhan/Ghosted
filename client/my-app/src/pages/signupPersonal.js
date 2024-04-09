import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPersonal() {
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customers/2'); 
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  const businessNavigate = () => {
    navigate('/signup');
  };

  const signinNavigate = () => {
    navigate('/signin');
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
            <label htmlFor="businessname">FULLNAME</label>
            <input type="text" id="businessname" name="businessname" value={customerData ? `${customerData.first_name} ${customerData.last_name}` : ''} readOnly></input>
          </div>
          <div className="businessname">
            <label htmlFor="phonenumber">PHONE NUMBER</label>
            <input type="text" id="phonenumber" name="phonenumber" value={customerData ? customerData.phone : ''} readOnly></input>
          </div>
          <div className="businessname">
            <label htmlFor="businessemail">EMAIL</label>
            <input type="text" id="businessemail" name="businessemail" value={customerData ? customerData.email : ''} readOnly></input>
          </div>
          <div className="businessname">
            <label htmlFor="password">PASSWORD</label>
            <input type="text" id="password" name="password"></input>
          </div>
          <div className="businessname">
            <label htmlFor="businessaddress">ADDRESS</label>
            <input type="text" id="businessaddress" name="businessaddress" value={customerData ? `${customerData.address}, ${customerData.city}, ${customerData.province}` : ''} readOnly></input>
          </div>
        </div>
        <button onClick={signinNavigate} className="sign-up-button">
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
