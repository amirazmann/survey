import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://localhost:7246', // Update this to match your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 