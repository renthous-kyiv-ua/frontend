import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import Modal from './Modal'; // Импортируем модальное окно

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7074/api/Users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading users:', error);
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedUser({ email: '', passwordHash: '', firstName: '', lastName: '', phoneNumber: '', isEmailConfirmed: true, role: 'User', dateCreated: new Date().toISOString() });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://localhost:7074/api/Users/${userId}`);
      setUsers(users.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Users Administration</h2>
      <button onClick={handleAddNew} className="btn btn-success mb-4">Add New User</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UserForm user={selectedUser} setUser={setSelectedUser} isNewUser={!selectedUser?.userId} />
      </Modal>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="btn btn-primary mr-2">Edit</button>
                <button onClick={() => deleteUser(user.userId)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;