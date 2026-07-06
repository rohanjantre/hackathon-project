import axios from 'axios';
import type { LoginPayload, SignupPayload, AuthResponse } from '../types/auth';

// Create Axios instance with Base URL http://localhost:3000 as specified by user
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('forgemind_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Authentication API Service
 * No backend logic, just direct API calls to existing NestJS endpoints:
 * POST /auth/login
 * POST /auth/signup
 */
export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/user/login', payload);
    return response.data;
  },

  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/user/signup', payload);
    return response.data;
  },
};

export default api;
