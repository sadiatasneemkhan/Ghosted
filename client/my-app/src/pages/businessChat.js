import React, { useState, useEffect } from "react";
import "./pages.css";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function BusinessChat() {
  const userId = localStorage.getItem("user_id");
  console.log(userId); 
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [customers, setCustomers] = useState([]);
  function getBusinessLogoUrl(logo) {
    const defaultLogo = "default-business.svg"; // Default business logo
    if (!logo || logo.trim() === "" || logo === "./images/default-profile") {
      return `http://localhost:8080/images/${defaultLogo}`;
    }
    return `http://localhost:8080/images/${logo}`;
  }

  function getUserProfilePicUrl(profilePic) {
    console.log(profilePic);
    const defaultProfilePic = "default-profile.svg"; // Default profile picture
    if (
      !profilePic ||
      profilePic.trim() === "" ||
      profilePic === "./images/default-profile"
    ) {
      return `http://localhost:8080/images/${defaultProfilePic}`;
    }
    return `http://localhost:8080/images/${profilePic}`;
  }

  useEffect(() => {
    async function fetchData() {
      await fetchBusinessByUserId(userId);
      await fetchCustomerChats(userId);
    }

    fetchData();
  }, [userId]);

  async function fetchBusinessByUserId(userId) {
    try {
      const response = await axios.get(
        `http://localhost:8080/restaurants/user/${userId}`
      );
      if (response.data && response.data.length > 0) {
        setBusiness(response.data[0]);
      } else {
        setBusiness(null);
      }
    } catch (error) {
      console.error("Failed to fetch business:", error);
      setBusiness(null);
    }
  }

  async function fetchCustomerChats(userId) {
    try {
      const response = await axios.get(
        `http://localhost:8080/messages/customers/${userId}`
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customer chats:", error);
    }
  }

  const listCustomerChats = () => {
    return customers.length ? (
      customers.map((cust) => (
        <div
          key={cust.user_id}
          className="chat"
          onClick={() => navigate(`/userNewChat/${cust.user_id}`)}
        >
          <img
            src={getUserProfilePicUrl(cust.profile_pic)}
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
            src={
              business
                ? getBusinessLogoUrl(business.logo)
                : `/images/default-business.svg`
            }
            className="profile_pic"
            alt="business logo"
          />
          <p>Welcome {business ? business.business_name : "Business"}</p>
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

      <footer className="bottom_nav">
        {/* Footer navigation links here */}
      </footer>
    </div>
  );
}

export default BusinessChat;
