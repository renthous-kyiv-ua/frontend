import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import AboutUs from './components/AboutUs';
import AccountSettingsTenant from './components/AccountSettingsTenant';
import AdminMainPanel from './components/AdminMainPanel';
import UsersAdmin from './components/UsersAdmin';
import PropertiesAdmin from './components/PropertiesAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgot_pass" element={<ForgotPassword />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/tenant" element={<AccountSettingsTenant />} />
      <Route path="/admin" element={<AdminMainPanel />} />
      <Route path="/admin/users" element={<UsersAdmin />} />
      <Route path="/admin/properties" element={<PropertiesAdmin />} />
    </Routes>
  );
}

export default App;