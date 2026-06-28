import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const registerUser = (name, email, password) =>
  API.post('/auth/register', { name, email, password });

export const loginUser = (email, password) =>
  API.post('/auth/login', { email, password });

export const getMe = () =>
  API.get('/auth/me');

export const logoutUser = () =>
  API.post('/auth/logout');

export default API;
