import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyForm = ({ property, setProperty, isNewProperty }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '',
    pricePerNight: 0,
    maxGuests: 0,
    type: 'Apartment',
    rating: 0,
    availabilityStart: new Date().toISOString().split('T')[0],
    availabilityEnd: new Date().toISOString().split('T')[0],
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    ownerId: null
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        availabilityStart: property.availabilityStart ? new Date(property.availabilityStart).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        availabilityEnd: property.availabilityEnd ? new Date(property.availabilityEnd).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        dateCreated: property.dateCreated ? new Date(property.dateCreated).toISOString() : new Date().toISOString(),
        dateModified: property.dateModified ? new Date(property.dateModified).toISOString() : new Date().toISOString(),
        ownerId: property.ownerId || null
      });
    } else {
      setFormData({
        title: '',
        description: '',
        city: '',
        pricePerNight: 0,
        maxGuests: 0,
        type: 'Apartment',
        rating: 0,
        availabilityStart: new Date().toISOString().split('T')[0],
        availabilityEnd: new Date().toISOString().split('T')[0],
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        ownerId: null
      });
    }

    fetchUsers();
  }, [property]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7074/api/Users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = isNewProperty
        ? await axios.post('https://localhost:7074/api/Properties', formData)
        : await axios.put(`https://localhost:7074/api/Properties/${formData.propertyId}`, formData);
      console.log('Response:', response.data);
      setProperty(null);  // Очистка выбранного свойства после операции
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Price Per Night:</label>
        <input type="number" className="form-control" name="pricePerNight" value={formData.pricePerNight} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Max Guests:</label>
        <input type="number" className="form-control" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
        </select>
      </div>
      <div className="form-group">
        <label>Rating:</label>
        <input type="number" className="form-control" name="rating" value={formData.rating} onChange={handleChange} step="0.1" min="0" max="5" />
      </div>
      <div className="form-group">
        <label>Availability Start:</label>
        <input type="date" className="form-control" name="availabilityStart" value={formData.availabilityStart} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Availability End:</label>
        <input type="date" className="form-control" name="availabilityEnd" value={formData.availabilityEnd} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Owner:</label>
        <select name="ownerId" className="form-control" value={formData.ownerId || ''} onChange={handleChange} required>
          <option value="" disabled>Select Owner</option>
          {users.map(user => (
            <option key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">{isNewProperty ? 'Add Property' : 'Update Property'}</button>
    </form>
  );
};

export default PropertyForm;