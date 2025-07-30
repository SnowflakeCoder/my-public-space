export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
  token?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}

export enum QuestionType {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION'
}

export interface QuestionConfig {
  type: QuestionType;
  count: number; // 1-100
  firstNumberMinDigits: number;
  firstNumberMaxDigits: number;
  secondNumberMinDigits: number;
  secondNumberMaxDigits: number;
  firstNumberBigger: boolean; // Default true - ensures first number is always bigger than second
}

export interface Exercise {
  id: string;
  name: string;
  code: string;
  userId: string;
  questionConfigs: QuestionConfig[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedQuestion {
  id: string;
  type: QuestionType;
  firstNumber: number;
  secondNumber: number;
  answer: number;
  userAnswer?: number;
}

export interface CreateExerciseRequest {
  name: string;
  questionConfigs: QuestionConfig[];
}

export interface ExerciseResponse {
  success: boolean;
  message: string;
  exercise?: {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
  };
}

export interface ExerciseListResponse {
  success: boolean;
  exercises: {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
  }[];
}