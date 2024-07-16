import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7074/api/Users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container mt-3">
      <h2>Users Administration</h2>
      <table className="table">
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
                {/* Add actions like edit or delete */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersAdmin;