import React, { useState, useEffect } from 'react';
import './App.css';
import AddCertificate from './components/AddCertificate.js';
import UpdateCertificate from './components/UpdateCertificate';
import DeleteCertificate from './components/DeleteCertificate';

type Employee = {
  id: number;
  employeeID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  grade: string;
  userType: string;
  username: string;
};

type FormData = {
  certificateName: string;
  level: string;
  category: string;
};

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    populateEmployeeData();
  }, []);

  const handleAddCertificate = async (data: FormData) => {
    try {
      const response = await fetch('api/certificates', { // Use the correct endpoint for adding a certificate
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const newCertificate = await response.json();
      setCertificates([...certificates, newCertificate]); // Add the new certificate to the state
      console.log('Certificate added successfully:', newCertificate);
    } catch (error) {
      console.error('Failed to add certificate:', error);
    }
  };

  const handleUpdateCertificate = async (data: FormData, certificateId: number) => {
    try {
      const response = await fetch(`api/certificates/${certificateId}`, { // Use the correct endpoint for updating a certificate
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedCertificate = await response.json();
      setCertificates(certificates.map(c => c.id === certificateId ? updatedCertificate : c)); // Update the certificate in the state
      console.log('Certificate updated successfully:', updatedCertificate);
    } catch (error) {
      console.error('Failed to update certificate:', error);
    }
  };

  const handleDeleteCertificate = async (certificateId: number) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        const response = await fetch(`api/certificates/${certificateId}`, { // Use the correct endpoint for deleting a certificate
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        setCertificates(certificates.filter(c => c.id !== certificateId)); // Remove the deleted certificate from the state
        console.log('Certificate deleted successfully');
      } catch (error) {
        console.error('Failed to delete certificate:', error);
      }
    }
  };

  //pretty Sure const renderCertificates = () => ( is needed. Need to check first.


  async function populateEmployeeData() {
    const response = await fetch('employee');
    const data = await response.json();
    setEmployees(data);
  }

  // Conditional rendering of the employees table or the loading state
  const contents = employees.length === 0
    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    : <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Grade</th>
            <th>User Type</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee =>
            <tr key={employee.employeeID}>
              <td>{employee.employeeID}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.role}</td>
              <td>{employee.grade}</td>
              <td>{employee.userType}</td>
              <td>{employee.username}</td>
            </tr>
          )}
        </tbody>
      </table>;

  return (
    <div>
      <h1 id="tabelLabel">Employees</h1>
      <p>This component demonstrates fetching data from the server and displaying a list of employees.</p>
      {contents}
      
      <div className="my-4">
        <h2>Add New Certificate</h2>
        <AddCertificate onAdd={handleAddCertificate} />
      </div>
    </div>
  );
}

export default App;