import './pages.css';
import { useNavigate } from 'react-router-dom';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
</style>

function SignupPersonal() {
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>

  const navigate = useNavigate();

  const businessNavigate = () => {
    navigate('/signup');
  };

  const signinNavigate = () => {
    navigate('/signin');
  }

  return (
    <div className="page2">
      <header className="page2_signup">
        <h1>Choose Account Type</h1>
        <div className="page2_buttons">
          <div className="page2_personal">
            <img
              src={'/personal2.svg'}
              className="App-logos"
              alt="personal"
            />
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
            <label for="businessname">FULLNAME</label>
            <input type="text" id="businessname" name="businessname"></input>
          </div>
          <div className="businessname">
            <label for="phonenumber">PHONE NUMBER</label>
            <input type="text" id="phonenumber" name="phonenumber"></input>
          </div>
          <div className="businessname">
            <label for="businessemail">EMAIL</label>
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
            <label for="businessaddress">ADDRESS</label>
            <input
              type="text"
              id="businessaddress"
              name="businessaddress"
            ></input>
          </div>
        </div>
        <button onClick={signinNavigate} className="sign-up-button"> Sign up</button>
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