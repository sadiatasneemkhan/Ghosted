
import './pages.css';
import Navbar from '../components/Navbar';

function UserProfile() {
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
    </style>
    
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
            <button className="log_out" type="button">
              Log Out
            </button>
          </div>
        </section>

        <Navbar />
      </div>
    );
  }
  
export default UserProfile;