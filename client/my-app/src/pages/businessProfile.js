// import logo from '../public/logo.svg';
// import businessLogo from '../public/business-logo.svg';
// import homeIcon from '../public/homeIcon.svg';
// import chatIcon from '../public/chatIcon.svg';
// import settingIcon from '../public/settingIcon.svg';
import './pages.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function BusinessProfile() {
  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>;

  const navigate = useNavigate();
  const homeNavigate = () => {
    navigate('/businessHomepage');
  };

  const chatNavigate = () => {
    navigate('/businessChat');
  };
  const settingNavigate = () => {
    navigate('/businessProfile');
  }

  const logoutNavigate = () => {
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
            src={'/business-logo.svg'}
            className="profile_pic_large"
            alt="user pfp"
          />
        </div>
      </header>

      <section>
        <div className="scrollable_content">
          <div className="user_field_list">
            <div className="user_field">
              <label for="change_name">CHANGE BUSINESS NAME</label>
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
            <div className="user_field">
              <label for="change_bus_links">CHANGE BUSINESS LINKS</label>
              <div className="field_box bus_links">
                <input type="text" id="change_bus_links"></input>
              </div>
            </div>

            <div className="business_buttons">
              <button className="pause_bus" type="button">
                Pause Business
              </button>
              <button className="delete_bus" type="button">
                Delete Business
              </button>
            </div>

            <div className="business_edit_button2">
              <button className="save_changes2" type="submit">
                Save Changes
              </button>
              <button className="log_out2" type="button" onClick={logoutNavigate}>
                Log Out
              </button>
            </div>
          </div>
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

export default BusinessProfile;
