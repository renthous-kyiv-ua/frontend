import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import AboutUs from './components/AboutUs';
import AccountSettingsTenant from './components/AccountSettingsTenant';
import MyReservationsTenant from './components/MyReservationsTenant';
import LoyaltyProgrammeTenant from './components/LoyaltyProgrammeTenant';
import WalletTenant from './components/WalletTenant';
import ReferralLinkTenant from './components/ReferralLinkTenant';
import SavedTenant from './components/SavedTenant';
import AccountSettingsLandlord from './components/AccountSettingsLandlord';
import MyProperties from './components/MyProperties';
import LoyaltyProgrammeLandlord from './components/LoyaltyProgrammeLandlord';
import MyRules from './components/MyRules';
import MoreDetails from './components/MoreDetails';
import WalletFAQ from './components/WalletFAQ';
import HouseReg from './components/HouseReg';
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
      <Route path="/reservations" element={<MyReservationsTenant />} />
      <Route path="/loyalty" element={<LoyaltyProgrammeTenant />} />
      <Route path="/wallet" element={<WalletTenant />} />
      <Route path="/referral" element={<ReferralLinkTenant />} />
      <Route path="/saved" element={<SavedTenant />} />
      <Route path="/details" element={<MoreDetails />} />
      <Route path="/faq" element={<WalletFAQ />} />
      <Route path="/property" element={<HouseReg />} />
      <Route path="/landlord" element={<AccountSettingsLandlord />} />
      <Route path="/myProperties" element={<MyProperties />} />
      <Route path="/lanLoyalty" element={<LoyaltyProgrammeLandlord />} />
      <Route path="/rules" element={<MyRules />} />
      <Route path="/admin" element={<AdminMainPanel />} />
      <Route path="/admin/users" element={<UsersAdmin />} />
      <Route path="/admin/properties" element={<PropertiesAdmin />} />
    </Routes>
  );
}

export default App;