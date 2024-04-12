import React, { useState } from 'react';

const UpdateCertificate = ({ onUpdate, certificate }) => {
  const [formData, setFormData] = useState({
    certificateName: certificate.certificateName,
    level: certificate.level,
    category: certificate.category
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
      const response = await fetch(`/api/certificates/${certificate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong with updating the certificate');
      }
  
      
      console.log("Certificate updated successfully!");
      onUpdate();
    } catch (error) {
      console.error("Failed to update certificate:", error);
      
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
      
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Update Certificate
      </button>
    </form>
  );
};

export default UpdateCertificate;
