import axios from 'axios';

const API_URL = 'https://localhost:7074/api/Users';

const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const addUser = async (user) => {
    const response = await axios.post(API_URL, user);
    return response.data;
};

const updateUser = async (id, user) => {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

const blockUser = async (id) => {
    const response = await axios.post(`${API_URL}/${id}/block`);
    return response.data;
};

const unblockUser = async (id) => {
    const response = await axios.post(`${API_URL}/${id}/unblock`);
    return response.data;
};

export {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser
};
