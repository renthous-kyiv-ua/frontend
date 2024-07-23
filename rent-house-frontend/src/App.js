import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import AdminMainPanel from './components/AdminMainPanel';
import UsersAdmin from './components/UsersAdmin';
import PropertiesAdmin from './components/PropertiesAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/admin" element={<AdminMainPanel />} />
      <Route path="/admin/users" element={<UsersAdmin />} />
      <Route path="/admin/properties" element={<PropertiesAdmin />} />
    </Routes>
  );
}

export default App;