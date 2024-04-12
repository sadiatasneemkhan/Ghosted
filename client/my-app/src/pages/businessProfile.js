// import logo from '../public/logo.svg';
// import businessLogo from '../public/business-logo.svg';
// import homeIcon from '../public/homeIcon.svg';
// import chatIcon from '../public/chatIcon.svg';
// import settingIcon from '../public/settingIcon.svg';
import "./pages.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function BusinessProfile() {
  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>;
  const [profilePic, setProfilePic] = useState("default-business.svg");
  const userId = 2;
  const [businessData, setBusinessData] = useState({
    business_name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [saveStatus, setSaveStatus] = useState("");

  const navigate = useNavigate();
  const homeNavigate = () => {
    navigate("/businessHomepage");
  };

  const chatNavigate = () => {
    navigate("/businessChat");
  };
  const settingNavigate = () => {
    navigate("/businessProfile");
  };

  const logoutNavigate = () => {
    navigate("/signin");
  };

  function getProfilePic() {
    console.log(profilePic);
    const defaultProfilePic = "default-business.svg"; // Default profile picture
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
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/restaurants/user/${userId}`
        );
        if (response.data && response.data.length) {
          const data = response.data[0];
          setProfilePic(data.logo || "default-business.svg");
        }
      } catch (error) {
        console.error("Failed to fetch business data:", error);
      }
    };

    fetchBusinessData();
  }, [userId]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
    setSaveStatus("");
  };

  const saveChanges = async () => {
    const updates = {};
    Object.entries(businessData).forEach(([key, value]) => {
      if (value.trim()) updates[key] = value;
    });

    if (Object.keys(updates).length > 0) {
      try {
        await axios.put(`http://localhost:8080/restaurants/${userId}`, updates);
        setSaveStatus("Changes saved successfully.");
      } catch (error) {
        console.error("Failed to update business data:", error);
        setSaveStatus("Failed to save changes.");
      }
    } else {
      setSaveStatus("No changes to save.");
    }
  };

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // API call to update the profile picture
      await axios
        .post(`http://localhost:8080/restaurants/logo/${userId}`, formData)
        .then((response) => {
          setProfilePic(response.data.path);
          console.log("Profile picture updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update profile picture", error);
        });
    }
  }
  const fileInputRef = useRef(null);

  return (
    <div>
      <header className="msg_header">
        <div className="small_logo">
          <img src={"/logo.svg"} className="mini_logo" alt="mini logo" />
          <h1>Profile</h1>
        </div>

        <div
          className="display_pic"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <img
            src={getProfilePic()}
            className="profile_pic_large"
            alt="business profile"
          />
          <div className="profile_pic_overlay"></div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </header>

      <section>
        <div className="scrollable_content">
          <div className="user_field_list">
            <div className="user_field">
              <label for="change_name">CHANGE BUSINESS NAME</label>
              <div className="field_box">
                <input
                  type="text"
                  name="business_name"
                  value={businessData.business_name}
                  onChange={handleInputChange}
                  id="change_name"
                ></input>
              </div>
            </div>
            <div className="user_field">
              <label for="change_phone_nbr">CHANGE PHONE NUMBER</label>
              <div className="field_box">
                <input
                  type="text"
                  name="phone"
                  value={businessData.phone}
                  onChange={handleInputChange}
                  id="change_phone_nbr"
                ></input>
              </div>
            </div>
            <div className="user_field">
              <label for="change_email">CHANGE EMAIL</label>
              <div className="field_box">
                <input
                  type="text"
                  name="email"
                  value={businessData.email}
                  onChange={handleInputChange}
                  id="change_email"
                ></input>
              </div>
            </div>
            <div className="user_field">
              <label for="change_password">CHANGE PASSWORD</label>
              <div className="field_box">
                <input
                  type="text"
                  name="password"
                  value={businessData.password}
                  onChange={handleInputChange}
                  id="change_password"
                ></input>
              </div>
            </div>
            <div className="user_field">
              <label for="change_address">CHANGE ADDRESS</label>
              <div className="field_box">
                <input
                  type="text"
                  name="address"
                  value={businessData.address}
                  onChange={handleInputChange}
                  id="change_address"
                ></input>
              </div>
            </div>

            <div className="business_buttons" style={{ paddingBottom: "10px" }}>
              <button className="save_changes" onClick={saveChanges}>
                Save Changes
              </button>
              <button className="pause_bus" type="button">
                Pause Business
              </button>
              <button className="delete_bus" type="button">
                Delete Business
              </button>
              <button
                className="log_out2"
                type="button"
                onClick={logoutNavigate}
              >
                Log Out
              </button>
            </div>

            <div className="business_edit_button2">
              <button className="save_changes2" type="submit">
                Save Changes
              </button>
              <button
                className="log_out2"
                type="button"
                onClick={logoutNavigate}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        {saveStatus && <p className="save_status_message">{saveStatus}</p>}{" "}
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
          src={"/ChatIconG.svg"}
          onClick={chatNavigate}
          className="chat_icon"
          alt="chat icon"
          style={{ cursor: "pointer" }}
        />
        <img
          src={"/SettingIconB.svg"}
          onClick={settingNavigate}
          className="setiing_icon"
          alt="setting icon"
          style={{ cursor: "pointer" }}
        />
      </footer>
    </div>
  );
}

export default BusinessProfile;
