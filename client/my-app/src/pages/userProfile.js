import "./pages.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function UserProfile() {
  <style>
    @import
    url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')
  </style>;

  const [profilePic, setProfilePic] = useState("default-profile.svg");
  const [file, setFile] = useState(null);
  const userId = localStorage.getItem("user_id");
  console.log(userId); 

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
  });
  const [saveStatus, setSaveStatus] = useState("");

  const navigate = useNavigate();
  const homeNavigate = () => {
    navigate("/userHomepage");
  };

  const chatNavigate = () => {
    navigate("/userChat");
  };
  const settingNavigate = () => {
    navigate("/userProfile");
  };

  const signinNavigate = () => {
    navigate("/signin");
  };

  function getProfilePic() {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSaveStatus(""); // Clear save status message on input change
  };

  const handleNameChange = (event) => {
    setFullName(event.target.value);
    setSaveStatus(""); // Clear save status message on name change
  };

  const saveChanges = async () => {
    const updates = { ...userData }; // Copy current userData state
    // Assuming name handling is updated to handle first_name and last_name correctly
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length) {
      updates.first_name = nameParts[0]; // First part is the first name
      updates.last_name = nameParts.slice(1).join(" "); // Rest is the last name
    }

    // Filter out any empty values
    Object.keys(updates).forEach((key) => {
      if (!updates[key].trim()) {
        delete updates[key];
      }
    });

    if (Object.keys(updates).length > 0) {
      try {
        const response = await axios.put(
          `http://localhost:8080/customers/${userId}`,
          updates
        );
        console.log("Update successful", response.data);
        setSaveStatus("Changes saved successfully.");
      } catch (error) {
        console.error("Failed to update user data:", error);
        setSaveStatus("Failed to save changes.");
      }
    } else {
      setSaveStatus("No changes to save.");
    }
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customers/user/${userId}`
        );

        setProfilePic(response.data[0].profile_pic);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchCustomerData();
  }, [userId]);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // When the component mounts or userData changes, set the full name
    if (userData.first_name || userData.last_name) {
      setFullName(`${userData.first_name} ${userData.last_name}`.trim());
    }
  }, [userData.first_name, userData.last_name]);

  const fileInputRef = useRef(null);

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // API call to update the profile picture
      await axios
        .post(`http://localhost:8080/customers/pfp/${userId}`, formData)
        .then((response) => {
          setFile(response.data.path);
          console.log("Profile picture updated successfully");
          setImage();
          setSaveStatus("Image changed successfully.");
        })
        .catch((error) => {
          console.error("Failed to update profile picture", error);
        });
    }
  }
  async function setImage() {
    try {
      const response = await axios.get(
        `http://localhost:8080/customers/pfp/${userId}`
      );

      setProfilePic(response.data[0].profile_pic);
    } catch (error) {
      console.log(error);
    }
  }

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
            alt="user pfp"
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </header>

      <section>
        <div className="user_field_list">
          <div className="user_field">
            <label for="change_name">CHANGE NAME</label>
            <div className="field_box">
              <input
                type="text"
                name="name"
                value={fullName}
                onChange={handleNameChange}
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
                value={userData.phone}
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
                value={userData.email}
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
                value={userData.password}
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
                value={userData.address}
                onChange={handleInputChange}
                id="change_address"
              ></input>
            </div>
          </div>
        </div>
        <div className="user_profile_buttons">
          <button className="save_changes" onClick={saveChanges}>
            Save Changes
          </button>
          <button className="log_out" type="button" onClick={signinNavigate}>
            Log Out
          </button>
        </div>
        {saveStatus && <p className="save_status_message">{saveStatus}</p>}{" "}
        {/* Display save status message here */}
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

export default UserProfile;
