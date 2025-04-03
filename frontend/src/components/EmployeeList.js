import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../services/EmployeeService";
import { Container, Table, Button } from "react-bootstrap";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    getEmployees()
      .then((response) => setEmployees(response))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const removeEmployee = (id) => {
    deleteEmployee(id)
      .then(() => {
        alert("Employee Deleted!");
        loadEmployees(); // Reload the updated list
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Employee List</h2>

      {/* Employee Table */}
      <Table striped bordered hover>
        <thead className="bg-primary text-white">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => removeEmployee(emp.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Back to Add Employee Page */}
      <Button variant="secondary" onClick={() => navigate("/")}>
        Add Employee
      </Button>
    </Container>
  );
}

export default EmployeeList;
