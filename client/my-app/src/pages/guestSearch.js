import React, { useState } from 'react';
import './userSearchStyles.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const guestFoodItems = () => {
        navigate('/userSearch');
    };

    const guestCartItems = () => {
        navigate('/signup');
    };

    const homeNavigate = () => {
        navigate('/guestHomepage');
    }

    const chatNavigate = () => {
        navigate('/signupPersonal');
    };

    const settingNavigate = () => {
        navigate('/signupPersonal');
    }

    return (
        <div className="HomepageMainCon">
            <img src={'/logo.svg'} class="App-logo-small" alt="logo" />
            <h1 class="Home-title">Home</h1>
            <div className="main-ctn" style={{ backgroundColor: '#e6f7ff', padding: '20px', marginBottom: '20px' }}>
                <div className="food-stuff">
                    <img src="/specificfood.png" alt="Specific Food" />
                    <p className="food-name">*Food Name*</p>
                    <div className="description-ctn">
                        <p className="description-label">Description</p>
                        <div className="description-box"></div>
                    </div>
                    <div className="price-qty">
                        <div className="qty">
                            <p className="qty-label">Quantity</p>
                            <div className="counter">
                                <button className="decrement" onClick={decrement}>-</button>
                                <span className="count">{count}</span>
                                <button className="increment" onClick={increment}>+</button>
                            </div>
                        </div>
                        <div className="price">
                            <p className="price-label">Price</p>
                            <p className="price-value">$30.29</p>
                        </div>
                    </div>
                    <div className="btn-ctn">
                        <button className="add-to-cart" onClick={guestFoodItems}>Add to cart</button>
                    </div>
                </div>
            </div>
            <div className="view-cart-btn-ctn">
                <button className="view-cart" onClick={guestCartItems}>View cart</button>
            </div>
            <footer className="bottom_nav">
                <img src={'/HomeIconB.svg'} onClick={homeNavigate} className="home_icon" alt="home icon" style={{ cursor: 'pointer' }} draggable="false" />
                <img src={'/ChatIconG.svg'} onClick={chatNavigate} className="chat_icon" alt="chat icon" style={{ cursor: 'pointer' }} draggable="false" />
                <img src={'/SettingIconG.svg'} onClick={settingNavigate} className="setiing_icon" alt="setting icon" style={{ cursor: 'pointer' }} draggable="false" />
            </footer>
        </div>
    );
}

export default Homepage;
