import React from 'react';
import '../styles/AdminMainPanel.css';

const AdminMainPanel = () => {

  return (
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
  );
}

export default AdminMainPanel;