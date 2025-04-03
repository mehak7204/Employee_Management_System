import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/EmployeeService";
import { Container, Form, Button } from "react-bootstrap";

function AddEmployee() {
  const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", email: "" });
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const addEmployee = () => {
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email) {
      alert("Please fill in all fields.");
      return;
    }

    createEmployee(newEmployee)
      .then(() => {
        alert("Employee Added!");
        setNewEmployee({ firstName: "", lastName: "", email: "" }); // Clear form
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Add Employee</h2>

      {/* Employee Form */}
      <Form className="mb-3">
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={newEmployee.firstName} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={newEmployee.lastName} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={newEmployee.email} onChange={handleChange} />
        </Form.Group>

        <Button variant="success" onClick={addEmployee} className="mt-2">
          + Add Employee
        </Button>
      </Form>

      {/* Button to Navigate to Employee List Page */}
      <Button variant="primary" onClick={() => navigate("/employees")}>
        Show Employee Details
      </Button>
    </Container>
  );
}

export default AddEmployee;
