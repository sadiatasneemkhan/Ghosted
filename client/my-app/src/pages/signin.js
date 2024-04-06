// import logo from '../public/logo.svg';

import './pages.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
    </style>
    
    const navigate = useNavigate();

    const homepageNav = () => {
      navigate('/userHomepage');
    };

    return (
      <div className="page2">
        <header className="page2_signup">
          <div className="page5_signin">
            <h1>Sign in</h1>
          </div>
          <div className="page2_buttons">
            <div className="page2_personal">
              <img src={'/logo.svg'} className="App-logo3" alt="logo" />
            </div>
          </div>

          <div className="page2_inputfields">
            <div className="businessname">
              <label for="businessname">EMAIL</label>
              <input type="text" id="businessname" name="businessname"></input>
            </div>
            <div className="businessname">
              <label for="phonenumber">PASSWORD</label>
              <input type="text" id="phonenumber" name="phonenumber"></input>
            </div>
            <div className="checkbox-container">
              <input type="checkbox" id="rememberMeCheckbox" />
              <label
                htmlFor="rememberMeCheckbox"
                className="checkbox-description"
              >
                Remember Me
              </label>
              <div className="forgot-password">
                <p>
                  <a href="#">Forgot Password</a>
                </p>
              </div>
            </div>
          </div>

          <button onClick={homepageNav} className="sign-up-button"> Log in</button>
          <div className="page2_account">
            <p>
              Don't have an account? <a href="./signup">Sign Up</a>
            </p>
          </div>
      
        </header>
      </div>
    );
  }
  
export default Signin;