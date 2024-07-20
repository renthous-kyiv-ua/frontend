import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import UsersAdmin from './components/UsersAdmin';
// import PropertiesAdmin from './components/PropertiesAdmin';
// import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">RentHouse Admin</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/properties">Manage Properties</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container mt-5">
          <Routes>
            <Route path="/admin/users" element={<UsersAdmin />} />
            <Route path="/admin/properties" element={<PropertiesAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}

export default App;