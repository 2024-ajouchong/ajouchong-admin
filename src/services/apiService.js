// apiService.js
import axios from 'axios';

const API_URL = 'http://ajouchong.com';

//Login
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Create
export const createItem = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating item in ${endpoint}:`, error);
    throw error;
  }
};

// Read
export const fetchItems = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/api/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching items from ${endpoint}:`, error);
    throw error;
  }
};

// Update
export const updateItem = async (endpoint, id, data) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating item in ${endpoint}:`, error);
    throw error;
  }
};

// Delete
export const deleteItem = async (endpoint, id) => {
  try {
    await axios.delete(`${API_URL}/api/admin/${endpoint}/${id}`);
  } catch (error) {
    console.error(`Error deleting item in ${endpoint}:`, error);
    throw error;
  }
};
