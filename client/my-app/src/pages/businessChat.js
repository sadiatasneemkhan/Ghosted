// import logo from '../public/logo.svg';
// import userProfile from '../public/userProfile.svg';
// import businessLogo from '../public/business-logo.svg';
// import searchIcon from '../public/searchIcon.svg';
// import homeIcon from '../public/homeIcon.svg';
// import chatIcon from '../public/chatIcon.svg';
// import settingIcon from '../settingIcon.svg';
import "./pages.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function BusinessChat() {
  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>;

  // HARCODED!!
  const userId = 2;
  const restaurantId = 1;
  const businessName = "Jane's Kitchen";

  const navigate = useNavigate();

  const navigateToChat = (receiverId) => {
    navigate(`/userNewChat/${receiverId}`);
  };

  // ideally gotten from some env file
  const port = 8080;

  const [customers, setCustomers] = useState([]);
  const homeNavigate = () => {
    navigate("/guestHomepage");
  };

  const chatNavigate = () => {
    navigate("/signupPersonal");
  };

  const settingNavigate = () => {
    navigate("/signupPersonal");
  };

  useEffect(() => {
    getCustomerChats(userId);
  }, [userId]);

  const getCustomerChats = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:${port}/messages/customers/${userId}`
      );
      console.log(response);
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listCustomerChats = () => {
    // if customers is empty, list "No Chat Yet"

    // {products.map((prod) => (
    //   <Products key={prod.id} prod={prod} />
    // ))}
    // otherwise list chats
    return (
      <>
        {customers.map((cust) => (
          <div
            className="chat"
            onClick={() => navigateToChat(cust.user_id)}
            key={cust.user_id}
          >
            <img
              src={"/userProfile.svg"}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">{cust.first_name}</p>
              <p className="sender_msg">Open chat to view messages</p>
            </div>
            <p className="date_alt">
              {moment(cust.sent_at).format("YYYY/MM/DD")}
            </p>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <header className="msg_header">
        <div className="small_logo">
          <img src={"/logo.svg"} className="mini_logo" alt="mini logo" />
          <h1>Messages</h1>
        </div>

        <div className="subheading">
          <img
            src={"/business-logo.svg"}
            className="profile_pic"
            alt="business logo"
          />
          <p>Welcome {businessName}</p>
        </div>
      </header>

      <section>
        <div className="center_bar">
          <div className="search_bar">
            <img
              src={"/searchIcon.svg"}
              className="search_icon"
              alt="search icon"
            />
            <input type="text" placeholder="Search Chat"></input>
          </div>
        </div>
        <div className="chat_list">
          {listCustomerChats()}
          {/* <div className="chat">
            <img
              src={"/userProfile.svg"}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">*User Name*</p>
              <p className="sender_msg">*Message*</p>
            </div>
            <p className="date_alt">*Date*</p>
          </div> */}
        </div>
      </section>

      <footer className="bottom_nav">
        <img
          src={"/HomeIconG.svg"}
          onClick={homeNavigate}
          className="home_icon"
          alt="home icon"
          style={{ cursor: "pointer" }}
        />
        <img
          src={"/ChatIconB.svg"}
          onClick={chatNavigate}
          className="chat_icon"
          alt="chat icon"
          style={{ cursor: "pointer" }}
        />
        <img
          src={"/SettingIconG.svg"}
          onClick={settingNavigate}
          className="setiing_icon"
          alt="setting icon"
          style={{ cursor: "pointer" }}
        />
      </footer>
    </div>
  );
}

export default BusinessChat;
