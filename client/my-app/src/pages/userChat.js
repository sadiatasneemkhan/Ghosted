import "./pages.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function UserChat() {
  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>;

  // HARCODED!!
  const userId = 1;
  const firstName = "John";

  const navigate = useNavigate();

  const navigateToChat = (receiverId) => {
    navigate(`/userNewChat/${receiverId}`);
  };

  // ideally gotten from some env file
  const port = 8080;

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getBusinessChats(userId);
  }, [userId]);

  const getBusinessChats = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:${port}/messages/restaurants/${userId}`
      );
      console.log(response);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listCustomerChats = () => {
    // if restaurants is empty, list "No Chat Yet"

    // {products.map((prod) => (
    //   <Products key={prod.id} prod={prod} />
    // ))}
    // otherwise list chats
    return (
      <>
        {restaurants.map((bus) => (
          <div
            className="chat"
            onClick={() => navigateToChat(bus.user_id)}
            key={bus.user_id}
          >
            <img
              src={"/userProfile.svg"}
              className="sender_pfp"
              alt="user pfp"
            />
            <div className="name_content">
              <p className="sender_name">{bus.business_name}</p>
              <p className="sender_msg">Open chat to view messages</p>
            </div>
            <p className="date_alt">
              {moment(bus.sent_at).format("YYYY/MM/DD")}
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
          <p>Welcome {firstName}</p>
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

      <Navbar />
    </div>
  );
}

export default UserChat;
