package com.example.employee_management_system.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.employee_management_system.entity.Employee;
import com.example.employee_management_system.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        logger.info("Fetching all employees from the database");
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        logger.info("Fetching employee with ID: {}", id);
        return employeeRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Employee with ID {} not found", id);
                    return new RuntimeException("Employee not found with ID: " + id);
                });
    }

    public Employee createEmployee(Employee employee) {
        logger.info("Creating a new employee: {}", employee);
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        logger.info("Updating employee with ID: {}", id);
        Employee employee = getEmployeeById(id);
        if (employee != null) {
            employee.setFirstName(employeeDetails.getFirstName());
            employee.setLastName(employeeDetails.getLastName());
            employee.setEmail(employeeDetails.getEmail());
            logger.info("Employee updated with new details: {}", employee);
            return employeeRepository.save(employee);
        }
        logger.error("Employee with ID {} not found for update", id);
        return null;
    }

    public boolean deleteEmployee(Long id) {
        logger.info("Deleting employee with ID: {}", id);
        Employee employee = getEmployeeById(id);
        if (employee != null) {
            employeeRepository.delete(employee);
            logger.info("Employee with ID {} deleted successfully", id);
            return true;
        }
        logger.error("Employee with ID {} not found for deletion", id);
        return false;
    }
}
