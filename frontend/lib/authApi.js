import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Create an axios instance with credentials (cookies) enabled
export const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true
});









export const login = async (email, password) => {
  const response = await authApi.post('/login', { email, password });
  return response.data.data.user;
};

export const logout = async () => {
  await authApi.post('/logout');
};

export const getMe = async () => {
  const response = await authApi.get('/me');
  return response.data.data.user; // Match the backend response structure
};