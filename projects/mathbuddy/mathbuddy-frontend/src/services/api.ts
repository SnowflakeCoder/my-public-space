import axios from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { CreateExerciseRequest, ExerciseResponse, ExerciseListResponse, ExerciseQuestionsResponse } from '../types/exercise';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getProfile: async (): Promise<any> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  checkHealth: async (): Promise<any> => {
    const response = await api.get('/health');
    return response.data;
  }
};

export const exerciseAPI = {
  createExercise: async (data: CreateExerciseRequest): Promise<ExerciseResponse> => {
    const response = await api.post('/exercise/create', data);
    return response.data;
  },

  getMyExercises: async (): Promise<ExerciseListResponse> => {
    const response = await api.get('/exercise/my-exercises');
    return response.data;
  },

  getExerciseByCode: async (code: string): Promise<ExerciseResponse> => {
    const response = await api.get(`/exercise/${code}`);
    return response.data;
  },

  getExerciseQuestions: async (code: string): Promise<ExerciseQuestionsResponse> => {
    const response = await api.get(`/exercise/${code}/questions`);
    return response.data;
  }
};

export default api;