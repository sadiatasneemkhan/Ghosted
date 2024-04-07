import React from 'react';
import './HomepageStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function BusinessHomePage() {
    const navigate = useNavigate();

    const homeNavigate = () => {
        navigate('/businessHomepage');
    }

    const chatNavigate = () => {
        navigate('/businessChat');
    }

    const settingNavigate = () => {
        navigate('/businessProfile');
    }

    const editNavigate = () => {
        navigate('/businessEdit');
    }

    return (
        <div className="HomepageMainCon">
            <img src={'/logo.svg'} className="App-logo-small" alt="logo" />
            <h1 className="Home-title">Home</h1>
            <div className="BusinessContainer">
                <div className="BusinessDetails">
                    <img src={'/Pfp.svg'} className="Pfp" alt="User profile picture" onClick={settingNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <h4 className="DisplayUserName">Welcome *Business Name*</h4>
                </div>
            </div>
            <div className="Restaurant2" data-name="Restaurant Name" data-distance="2.4km" onClick={homeNavigate}>
                <div>
                    <img src="rest1.png" className="main-img" alt="Restaurant Image" draggable="false" />
                    <img onClick={homeNavigate} src="EditbuttonLarge.svg" alt="Restaurant Edit button" className="EditButton" draggable="false" />
                </div>
            </div>

            <div className="scrollable-containerr2">
                <div className="food-items">
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <img className="food-items1" src="food.png" alt="Food Item 1" onClick={editNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                </div>
            </div>
            <footer className="bottom_nav">
                <img src={'/HomeIconB.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} />
                <img src={'/ChatIconG.svg'} onClick={chatNavigate} className="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} />
                <img src={'/SettingIconG.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} />
            </footer>
        </div>
    )


}

export default BusinessHomePage;