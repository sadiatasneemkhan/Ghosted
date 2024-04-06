// import logo from '../public/logo.svg';
// import userProfile from '../public/userProfile.svg';
// import businessLogo from '../public/business-logo.svg';
// import searchIcon from '../public/searchIcon.svg';
// import homeIcon from '../public/homeIcon.svg';
// import chatIcon from '../public/chatIcon.svg';
// import settingIcon from '../settingIcon.svg';
import './pages.css';
import Navbar from '../components/Navbar';

function BusinessChat() {
  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>;

  return (
    <div>
      <header className="msg_header">
        <div className="small_logo">
          <img src={'/logo.svg'} className="mini_logo" alt="mini logo" />
          <h1>Messages</h1>
        </div>

        <div className="subheading">
          <img
            src={'/business-logo.svg'}
            className="profile_pic"
            alt="business logo"
          />
          <p>Welcome *Business Name*</p>
        </div>
      </header>

      <section>
        <div className="center_bar">
          <div className="search_bar">
            <img
              src={'/searchIcon.svg'}
              className="search_icon"
              alt="search icon"
            />
            <input type="text" placeholder="Search Chat"></input>
          </div>
        </div>
        <div className="chat_list">
          <div className="chat">
            <img
              src={'/userProfile.svg'}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">*User Name*</p>
              <p className="sender_msg">*Message*</p>
            </div>
            <p className="date_alt">*Date*</p>
          </div>
          <div className="chat">
            <img
              src={'/userProfile.svg'}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">*User Name*</p>
              <p className="sender_msg">*Message*</p>
            </div>
            <p className="date_alt">*Date*</p>
          </div>
          <div className="chat">
            <img
              src={'/userProfile.svg'}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">*User Name*</p>
              <p className="sender_msg">*Message*</p>
            </div>
            <p className="date_alt">*Date*</p>
          </div>
          <div className="chat">
            <img
              src={'/userProfile.svg'}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">*User Name*</p>
              <p className="sender_msg">*Message*</p>
            </div>
            <p className="date_alt">*Date*</p>
          </div>
          <div className="chat">
            <img
              src={'/userProfile.svg'}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">*User Name*</p>
              <p className="sender_msg">*Message*</p>
            </div>
            <p className="date_alt">*Date*</p>
          </div>
        </div>
      </section>

      <Navbar />
    </div>
  );
}

export default BusinessChat;
