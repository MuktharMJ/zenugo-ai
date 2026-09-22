import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (name, email, password) =>
  API.post('/auth/register', { name, email, password });

export const loginUser = (email, password) =>
  API.post('/auth/login', { email, password });

export const getMe = () =>
  API.get('/auth/me');

/**
 * CONCEPT: JavaScript — async/await
 * Uses actual `async` and `await` keywords with proper try/catch error handling.
 * - `async` specifies that this function returns a Promise.
 * - `await` pauses execution until the API request resolves.
 * - try/catch handles network/HTTP errors.
 */
export async function fetchUserProfile() {
  try {
    const response = await getMe();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}

export const logoutUser = () =>
  API.post('/auth/logout');

export default API;

