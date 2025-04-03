package com.example.employee_management_system.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.employee_management_system.entity.Employee;
import com.example.employee_management_system.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        logger.info("Received request to fetch all employees");
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        logger.info("Received request to create employee: {}", employee);
        return employeeService.createEmployee(employee);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        logger.info("Received request to update employee with ID: {}", id);
        return employeeService.updateEmployee(id, employeeDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        logger.info("Received request to delete employee with ID: {}", id);
        boolean isDeleted = employeeService.deleteEmployee(id);
        if (isDeleted) {
            logger.info("Employee with ID: {} successfully deleted", id);
            return ResponseEntity.ok("Employee deleted successfully");
        } else {
            logger.error("Failed to delete employee with ID: {}", id);
            return ResponseEntity.status(404).body("Employee not found");
        }

    }

}
