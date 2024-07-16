import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import './Admin.css';

const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7074/api/Users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`https://localhost:7074/api/Users/${userId}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        fetchUsers();
    };

    return (
        <div className="admin-container">
            <h2>Manage Users</h2>
            <button className="btn btn-primary" onClick={handleAddNew}>Add New User</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.userId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showForm && <UserForm user={selectedUser} onClose={handleFormClose} />}
        </div>
    );
};

export default UsersAdmin;
