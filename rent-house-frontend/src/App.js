// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import MainPage from './components/MainPage';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import ForgotPassword from './components/ForgotPassword';
// import AboutUs from './components/AboutUs';
// import FindHouse from './components/FindHouse';
// import AccountSettingsTenant from './components/AccountSettingsTenant';
// import MyReservationsTenant from './components/MyReservationsTenant';
// import LoyaltyProgrammeTenant from './components/LoyaltyProgrammeTenant';
// import WalletTenant from './components/WalletTenant';
// import ReferralLinkTenant from './components/ReferralLinkTenant';
// import SavedTenant from './components/SavedTenant';
// import AccountSettingsLandlord from './components/AccountSettingsLandlord';
// import MyProperties from './components/MyProperties';
// import LoyaltyProgrammeLandlord from './components/LoyaltyProgrammeLandlord';
// import MyRules from './components/MyRules';
// import MoreDetails from './components/MoreDetails';
// import WalletFAQ from './components/WalletFAQ';
// import HouseReg from './components/HouseReg';
// import AdminMainPanel from './components/AdminMainPanel';
// import UsersAdmin from './components/UsersAdmin';
// import PropertiesAdmin from './components/PropertiesAdmin';
// import { useAuth } from './context/AuthContext';
// import PrivateRoute from './PrivateRoute';

// function App() {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       <Route path="/" element={<MainPage />} />
//       <Route path="/signin" element={<SignIn />} />
//       <Route path="/register" element={<SignUp />} />
//       <Route path="/forgot_pass" element={<ForgotPassword />} />
//       <Route path="/about" element={<AboutUs />} />
//       <Route path="/find_house" element={<FindHouse />} />
//       <Route path="/tenant" element={<PrivateRoute><AccountSettingsTenant /></PrivateRoute>} />
//       <Route path="/reservations" element={<PrivateRoute><MyReservationsTenant /></PrivateRoute>} />
//       <Route path="/loyalty" element={<PrivateRoute><LoyaltyProgrammeTenant /></PrivateRoute>} />
//       <Route path="/wallet" element={<PrivateRoute><WalletTenant /></PrivateRoute>} />
//       <Route path="/referral" element={<PrivateRoute><ReferralLinkTenant /></PrivateRoute>} />
//       <Route path="/saved" element={<PrivateRoute><SavedTenant /></PrivateRoute>} />
//       <Route path="/details" element={<MoreDetails />} />
//       <Route path="/faq" element={<WalletFAQ />} />
//       <Route path="/property" element={<PrivateRoute><HouseReg /></PrivateRoute>} />
//       <Route path="/landlord" element={<PrivateRoute><AccountSettingsLandlord /></PrivateRoute>} />
//       <Route path="/myProperties" element={<PrivateRoute><MyProperties /></PrivateRoute>} />
//       <Route path="/lanLoyalty" element={<PrivateRoute><LoyaltyProgrammeLandlord /></PrivateRoute>} />
//       <Route path="/rules" element={<PrivateRoute><MyRules /></PrivateRoute>} />
      
//       <Route path="/admin" element={user?.role === 'admin' ? <AdminMainPanel /> : <SignIn />} />
//       <Route path="/admin/users" element={user?.role === 'admin' ? <UsersAdmin /> : <SignIn />} />
//       <Route path="/admin/properties" element={user?.role === 'admin' ? <PropertiesAdmin /> : <SignIn />} />
//     </Routes>
//   );
// }

//export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import AboutUs from './components/AboutUs';
import FindHouse from './components/FindHouse';
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
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ConfirmEmail from './components/ConfirmEmail';
import ResetPassword from './components/ResetPassword';
function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgot_pass" element={<ForgotPassword />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/find_house" element={<FindHouse />} />
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
      <Route path="/confirm-email" Component={ConfirmEmail} />
      <Route path="/reset-password" Component={ResetPassword} />
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="Admin">
            <AdminMainPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute requiredRole="Admin">
            <UsersAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/properties"
        element={
          <PrivateRoute requiredRole="Admin">
            <PropertiesAdmin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;