import React, { useState } from 'react';

const AddCertificate = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    certificateName: '',
    level: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong with adding the certificate');
      }
  
      
      console.log("Certificate added successfully!");
      setFormData({
        certificateName: '',
        level: '',
        category: '',
      });
    } catch (error) {
      console.error("Failed to add certificate:", error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-2">
        <label htmlFor="certificateName" className="block mb-1">Certificate Name:</label>
        <input 
          type="text"
          id="certificateName"
          name="certificateName"
          value={formData.certificateName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div className="mb-2">
        <label htmlFor="level" className="block mb-1">Level:</label>
        <select 
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Level</option>
          <option value="fundamental">Fundamental</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="block mb-1">Category:</label>
        <select 
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="developer">Developer</option>
          <option value="administrator">Administrator</option>
          <option value="architect">Architect</option>
        </select>
      </div>
      
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Add Certificate
      </button>
    </form>
  );
};

export default AddCertificate;