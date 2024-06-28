import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => {
  return api.post('/usuarios/register', userData);
};

export const loginUser = (loginData) => {
  return api.post('/usuarios/login', loginData);
};

export const createCourse = (courseData) => {
  return api.post('/cursos', courseData);
};

export const getCourses = () => {
  return api.get('/cursos').then(response => response.data);
};
