import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user, setUser, isNewUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    passwordHash: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    isEmailConfirmed: true,
    role: 'User',
    dateCreated: new Date().toISOString()
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        dateCreated: user.dateCreated ? new Date(user.dateCreated).toISOString() : new Date().toISOString()
      });
    } else {
      setFormData({
        email: '',
        passwordHash: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        isEmailConfirmed: true,
        role: 'User',
        dateCreated: new Date().toISOString()
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isNewUser
        ? await axios.post('https://localhost:7074/api/Users', formData)
        : await axios.put(`https://localhost:7074/api/Users/${formData.userId}`, formData);
      console.log(response.data);
      setUser(null);  // Очистка выбранного пользователя после операции
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" className="form-control" name="passwordHash" value={formData.passwordHash} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Role:</label>
        <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">{isNewUser ? 'Add User' : 'Update User'}</button>
    </form>
  );
};

export default UserForm;