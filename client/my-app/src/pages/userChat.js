import React, { useState, useEffect } from "react";
import "./pages.css";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function UserChat() {
  const firstName = "John";
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const userId = localStorage.getItem("user_id");
  console.log(userId); 

  useEffect(() => {
    const fetchBusinessChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/messages/restaurants/${userId}`
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch business chats:", error);
      }
    };

    fetchBusinessChats();
  }, [userId]);

  const getProfilePicUrl = (profilePic) => {
    const defaultProfilePic = "default-profile.svg"; // Default profile picture
    if (
      !profilePic ||
      profilePic.trim() === "" ||
      profilePic === "./images/default-profile"
    ) {
      return `http://localhost:8080/images/${defaultProfilePic}`;
    }
    return `http://localhost:8080/images/${profilePic}`;
  };

  const listCustomerChats = () => {
    return restaurants.length ? (
      restaurants.map((bus) => (
        <div
          className="chat"
          key={bus.user_id}
          onClick={() => navigate(`/userNewChat/${bus.user_id}`)}
        >
          <img
            src={getProfilePicUrl(bus.logo)}
            className="sender_pfp"
            alt="business logo"
          />
          <div className="name_content">
            <p className="sender_name">{bus.business_name}</p>
            <p className="sender_msg">Open chat to view messages</p>
          </div>
          <p className="date_alt">{moment(bus.sent_at).format("YYYY/MM/DD")}</p>
        </div>
      ))
    ) : (
      <p>No Chat Yet</p>
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

      <section className="center_bar">
        <div className="search_bar">
          <img
            src={"/searchIcon.svg"}
            className="search_icon"
            alt="search icon"
          />
          <input type="text" placeholder="Search Chat" />
        </div>
        <div className="chat_list">{listCustomerChats()}</div>
      </section>

      <Navbar />
    </div>
  );
}

export default UserChat;
