
import axios from 'axios';

// API configuration

// Define API URL without double paths
export const API_URL = 'https://deeploi-backend.onrender.com/api/v1';

// Export base URL for other uses
export const BASE_URL = 'https://deeploi-backend.onrender.com/api/v1';

// Export frontend URL for redirects
export const FRONTEND_URL = window.location.origin;

// Export SOCKET URL for other uses - Socket.io runs on base server, not API path
export const SOCKET_URL = 'https://deeploi-backend.onrender.com';

// Create and export apiClient
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Increased timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Don't modify the error, just log it for debugging
    return Promise.reject(error);
  }
);
