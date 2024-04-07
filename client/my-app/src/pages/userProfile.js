// import logo from '../public/logo.svg';
// import userProfile from '../public/userProfile.svg';
// import homeIcon from '../public/homeIcon.svg';
// import chatIcon from '../public/chatIcon.svg';
// import settingIcon from '../public/settingIcon.svg';
import './pages.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>


  const navigate = useNavigate();
  const homeNavigate = () => {
    navigate('/userHomepage');
  };

  const chatNavigate = () => {
    navigate('/userChat');
  };
  const settingNavigate = () => {
    navigate('/userProfile');
  }

  const signinNavigate = () => {
    navigate('/signin');
  }

  return (
    <div>
      <header className="msg_header">
        <div className="small_logo">
          <img src={'/logo.svg'} className="mini_logo" alt="mini logo" />
          <h1>Profile</h1>
        </div>

        <div className="display_pic">
          <img
            src={'/userProfile.svg'}
            className="profile_pic_large"
            alt="user pfp"
          />
        </div>
      </header>

      <section>
        <div className="user_field_list">
          <div className="user_field">
            <label for="change_name">CHANGE NAME</label>
            <div className="field_box">
              <input type="text" id="change_name"></input>
            </div>
          </div>
          <div className="user_field">
            <label for="change_phone_nbr">CHANGE PHONE NUMBER</label>
            <div className="field_box">
              <input type="text" id="change_phone_nbr"></input>
            </div>
          </div>
          <div className="user_field">
            <label for="change_email">CHANGE EMAIL</label>
            <div className="field_box">
              <input type="text" id="change_email"></input>
            </div>
          </div>
          <div className="user_field">
            <label for="change_password">CHANGE PASSWORD</label>
            <div className="field_box">
              <input type="text" id="change_password"></input>
            </div>
          </div>
          <div className="user_field">
            <label for="change_address">CHANGE ADDRESS</label>
            <div className="field_box">
              <input type="text" id="change_address"></input>
            </div>
          </div>
        </div>

        <div className="user_profile_buttons">
          <button className="save_changes" type="submit">
            Save Changes
          </button>
          <button className="log_out" type="button" onClick={signinNavigate}>
            Log Out
          </button>
        </div>
      </section>

      <footer className="bottom_nav">
        <img src={'/HomeIconG.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} />
        <img src={'/ChatIconG.svg'} onClick={chatNavigate} className="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} />
        <img src={'/SettingIconB.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} />
      </footer>
    </div>
  );
}

export default UserProfile;