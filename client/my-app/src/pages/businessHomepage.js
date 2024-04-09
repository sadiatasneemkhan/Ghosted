import React, { useState, useEffect } from 'react';
import './HomepageStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BusinessHomePage() {
    const username = "test";
    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState('');
    const [menuItems, setMenuItems] = useState([]);

    const homeNavigate = () => {
        navigate('/businessHomepage');
    }

    const chatNavigate = () => {
        navigate('/businessChat');
    }

    const settingNavigate = () => {
        navigate('/businessProfile');
    }


    const addItemNavigate = () => {
        navigate('/businessAddItem');
    }

    useEffect(() => {
        fetchBusinessInfo();
        //fetchMenu();
    }, [username]);

    const fetchBusinessInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/${username}`);
            setBusinessName(response.data.business_name);
        } catch (error) {
            console.error('Failed to fetch business info:', error);
            setBusinessName('Your Business');
        }
    };

    const fetchMenu = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurant/${username}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    };

    async function fetchMenuItems(menuItemId) {
        try {
            const response = await axios.get(`http://localhost:3000/menu-item/${menuItemId}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error('', error);
        }
    }

    function editNavigate(menuItemId) {
        navigate(`/businessEdit/${menuItemId}`); 
    }

    return (
        <div className="HomepageMainCon">
            <img src={'/logo.svg'} className="App-logo-small" alt="logo" />
            <h1 className="Home-title">Home</h1>
            <div className="BusinessContainer">
                <div className="BusinessDetails">
                    <img src={'/Pfp.svg'} className="Pfp" alt="User profile picture" onClick={settingNavigate} style={{ cursor: 'pointer' }} draggable="false" />
                    <h4 className="DisplayUserName">Welcome {businessName}</h4>
                </div>
            </div>
            <div className="Restaurant2" data-name={businessName} data-distance="2.4km" onClick={homeNavigate}>
                <div>
                    <img src="rest1.png" className="main-img" alt="Restaurant Image" draggable="false" />
                    <img onClick={homeNavigate} src="EditbuttonLarge.svg" alt="Restaurant Edit button" className="EditButton" draggable="false" />
                </div>
            </div>

            <div className="scrollable-containerr2">
                <div className="food-items">
                    {menuItems.map((item) => (
                        <div key={item.menu_item_id} onClick={() => editNavigate(item.menu_item_id)} style={{ cursor: 'pointer' }}>
                            <img
                                src={item.image || '/images/default-item-image.png'}
                                alt={item.name}
                                className="food-items1"
                                draggable="false"
                            />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="btn-ctn">
                <button className="add-to-cart2" onClick={addItemNavigate}>Add New Item</button>
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