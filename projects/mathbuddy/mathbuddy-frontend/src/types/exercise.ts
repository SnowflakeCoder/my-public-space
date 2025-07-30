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
  createdAt: string;
  questionConfigs?: QuestionConfig[];
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
  exercise?: Exercise;
}

export interface ExerciseListResponse {
  success: boolean;
  exercises: Exercise[];
}

export interface ExerciseQuestionsResponse {
  success: boolean;
  message: string;
  exercise: {
    id: string;
    name: string;
    code: string;
  };
  questions: GeneratedQuestion[];
}