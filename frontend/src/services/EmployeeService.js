import axios from "axios";

const BASE_URL = "http://localhost:8080/employees"; // Backend API URL

class EmployeeService {
  getEmployees() {
    return axios.get(BASE_URL);
  }

  createEmployee(employee) {
    return axios.post(BASE_URL, employee);
  }

  updateEmployee(id, employee) {
    return axios.put(`${BASE_URL}/${id}`, employee);
  }

  deleteEmployee(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}

// ✅ Export functions individually
export const getEmployees = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(BASE_URL, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {  // ✅ Ensure deleteEmployee is exported
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

// ✅ Default export
export default new EmployeeService();
