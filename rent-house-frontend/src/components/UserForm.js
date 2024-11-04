import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        passwordHash: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        isEmailConfirmed: false,
        role: 'User'
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                await axios.put(`https://localhost:7074/api/Users/${user.userId}`, formData);
            } else {
                await axios.post('https://localhost:7074/api/Users', formData);
            }
            onClose();
        } catch (error) {
            console.error('Error adding/updating user:', error.response?.data || error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="passwordHash" value={formData.passwordHash} onChange={handleChange} required />
                </div>
                <div>
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email Confirmed</label>
                    <input type="checkbox" name="isEmailConfirmed" checked={formData.isEmailConfirmed} onChange={handleChange} />
                </div>
                <div>
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default UserForm;
