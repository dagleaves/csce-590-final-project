import { useEffect, useState } from 'react';
import './App.css';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    grade: string;
    userType: string;
    username: string;
}

function App() {
    const [employees, setEmployees] = useState<Employee[]>();

    useEffect(() => {
        populateEmployeeData();
    }, []);

    const contents = employees === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
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
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
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
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateEmployeeData() {
        const response = await fetch('employee');
        const data = await response.json();
        setEmployees(data);
    }
}

export default App;