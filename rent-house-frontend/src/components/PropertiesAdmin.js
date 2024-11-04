import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyForm from './PropertyForm'; // Импортируем PropertyForm
import Modal from './Modal'; // Импортируем модальное окно

const PropertiesAdmin = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://localhost:7074/api/Properties');
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading properties:', error);
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedProperty({ title: '', description: '', city: '', pricePerNight: 0, maxGuests: 0, type: 'Apartment', rating: 0, availabilityStart: new Date().toISOString(), availabilityEnd: new Date().toISOString(), dateCreated: new Date().toISOString(), dateModified: new Date().toISOString() });
    setIsModalOpen(true);
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  const deleteProperty = async (propertyId) => {
    try {
      await axios.delete(`https://localhost:7074/api/Properties/${propertyId}`);
      setProperties(properties.filter(property => property.propertyId !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (loading) return <div>Loading properties...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Properties Administration</h2>
      <button onClick={handleAddNew} className="btn btn-success mb-4">Add New Property</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PropertyForm property={selectedProperty} setProperty={setSelectedProperty} isNewProperty={!selectedProperty?.propertyId} />
      </Modal>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.propertyId}>
              <td>{property.propertyId}</td>
              <td>{property.title}</td>
              <td>
                <button onClick={() => handleEdit(property)} className="btn btn-primary mr-2">Edit</button>
                <button onClick={() => deleteProperty(property.propertyId)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesAdmin;