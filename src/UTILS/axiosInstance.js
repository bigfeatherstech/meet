import axios from 'axios';

// Create axios instance - NO CIRCULAR DEPENDENCY
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL  || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // CRITICAL: Sends cookies automatically
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Your backend uses HTTP-Only cookies, so NO token in headers needed
    // The token is automatically sent via cookies with `withCredentials: true`
    
    // If you want to also send token in headers (optional backup), get from sessionStorage:
    const token = sessionStorage.getItem('adminToken');
    if (token && config.headers.Authorization === undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear sessionStorage token
      sessionStorage.removeItem('adminToken');
      
      // Redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Handle other errors
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - server may be down');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;