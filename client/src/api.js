import axios from 'axios';

// Create an axios instance with the base URL of the Express server
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Get all data
export const getData = () => api.get('/api/data');

// Create a new data item
export const createData = payload => api.post('/api/data', payload);

// Update an existing data item
export const updateData = (id, payload) => api.put(`/api/data/${id}`, payload);

// Delete an existing data item
export const deleteData = id => api.delete(`/api/data/${id}`);
