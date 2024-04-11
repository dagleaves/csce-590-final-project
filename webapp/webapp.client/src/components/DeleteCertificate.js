import React from 'react';

const DeleteCertificate = ({ onDelete, certificateId }) => {

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/certificates/${certificateId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong with deleting the certificate');
      }
  
      // Handle success
      console.log("Certificate deleted successfully!");
      onDelete();
    } catch (error) {
      console.error("Failed to delete certificate:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
      Delete Certificate
    </button>
  );
};

export default DeleteCertificate;