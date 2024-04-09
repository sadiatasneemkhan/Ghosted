import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome';
import Signup from './pages/signup';
import Verify from './pages/verify';
import SignupPersonal from './pages/signupPersonal';
import UserChat from './pages/userChat';
import BusinessChat from './pages/businessChat';
import UserProfile from './pages/userProfile';
import BusinessProfile from './pages/businessProfile';
import Signin from './pages/signin';
import UserFoodClick from './pages/userFoodClick';
import UserSearch from './pages/userSearch';
import UserCart from './pages/userCart';
import UserNewChat from './pages/userNewChat';
import UserHomepage from './pages/userHomepage';
import GuestHomepage from './pages/guestHomepage';
import GuestFoodClick from './pages/guestFoodClick';
import GuestSearch from './pages/guestSearch';
import BusinessHomePage from './pages/businessHomepage';
import BusinessEdit from './pages/businessEdit';
import BusinessAddItem from './pages/businessAddItem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/signupPersonal" element={<SignupPersonal />} />
      <Route path="/userChat" element={<UserChat />} />
      <Route path="/businessChat" element={<BusinessChat />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/businessProfile" element={<BusinessProfile />} />
      <Route path="/userHomepage" element={<UserHomepage />} />
      <Route path="/guestHomepage" element={<GuestHomepage />} />
      <Route path="/userFoodClick" element={<UserFoodClick />} />
      <Route path="/guestFoodClick" element={<GuestFoodClick />} /> 
      <Route path="/userSearch" element={<UserSearch />} />
      <Route path='/guestSearch' element={<GuestSearch />} />
      <Route path="/userCart" element={<UserCart />} />
      <Route path="/userNewChat" element={<UserNewChat />} />
      <Route path="/businessHomepage" element={<BusinessHomePage />} /> 
      <Route path="/businessEdit" element={<BusinessEdit />} /> 
      <Route path="/businessAddItem" element={<BusinessAddItem />} />
      {/*  */}
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;
