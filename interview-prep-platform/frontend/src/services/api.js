import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Request interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null' && token.trim() !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: reject errors cleanly without destructive hard page reloads
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Avoid aggressive window.location.href = '/login' which causes infinite reload loops.
    // React Router's <ProtectedRoute> handles route security cleanly based on user context.
    return Promise.reject(error);
  }
);

export default API;
