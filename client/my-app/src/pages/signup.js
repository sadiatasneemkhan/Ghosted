// import business from '../public/business.svg';
// import personal from '../public/personal.svg';
import './pages.css';
import { useNavigate } from 'react-router-dom';


function Signup() {
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>

  const navigate = useNavigate();

  const personalNavigate = () => {
    navigate('/signupPersonal');
  };

  const signupNavigate = () => {
    navigate('/verify')
  }

  return (
    <div className="page2">
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
            <label for="businessname">BUSINESS NAME</label>
            <input type="text" id="businessname" name="businessname"></input>
          </div>
          <div className="businessname">
            <label for="phonenumber">PHONE NUMBER</label>
            <input type="text" id="phonenumber" name="phonenumber"></input>
          </div>
          <div className="businessname">
            <label for="businessemail">BUSINESS EMAIL</label>
            <input
              type="text"
              id="businessemail"
              name="businessemail"
            ></input>
          </div>
          <div className="businessname">
            <label for="password">PASSWORD</label>
            <input type="text" id="password" name="password"></input>
          </div>
          <div className="businessname">
            <label for="businessaddress">BUSINESS ADDRESS</label>
            <input
              type="text"
              id="businessaddress"
              name="businessaddress"
            ></input>
          </div>
        </div>
        <button onClick={signupNavigate} className="sign-up-button"> Sign up</button>
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

export default Signup;