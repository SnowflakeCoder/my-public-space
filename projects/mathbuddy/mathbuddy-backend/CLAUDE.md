# MathBuddy Backend - Claude Code Description

## Project Overview
A comprehensive Node.js/TypeScript backend for the MathBuddy math exercise application with user authentication, exercise management, and question generation capabilities.

## Core Features Implemented

### **Authentication System**
- **JWT-based authentication** with secure token management
- **User registration and login** with email/password
- **Password hashing** using bcrypt for security
- **Protected routes** with middleware authorization
- **Test users** for development and testing

### **Exercise Management System**
- **Exercise CRUD operations** with user ownership
- **Deterministic question generation** using seeded random numbers
- **Question configuration** with customizable parameters
- **Progress tracking** support for frontend
- **Unique exercise codes** using Base62 encoding

### **Question Generation Engine**
- **Multiple question types**: Addition, Subtraction, Multiplication, Division
- **Configurable number ranges** with min/max digit constraints
- **Seeded randomization** for consistent question sets
- **Smart number generation** with optional "first number bigger" constraint
- **Batch question generation** for complete exercises

## Project Structure
```
mathbuddy-backend/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts (entry point)
│   ├── types/index.ts (TypeScript interfaces)
│   ├── database/
│   │   └── exerciseDB.ts (in-memory exercise storage)
│   ├── controllers/
│   │   ├── authController.ts (authentication logic)
│   │   └── exerciseController.ts (exercise management)
│   ├── middleware/
│   │   ├── authMiddleware.ts (JWT verification)
│   │   └── errorHandler.ts (global error handling)
│   ├── routes/
│   │   ├── auth.ts (auth endpoints)
│   │   └── exercise.ts (exercise endpoints)
│   └── utils/
│       ├── authUtils.ts (auth helpers)
│       ├── codeGenerator.ts (unique code generation)
│       └── questionGenerator.ts (math question generation)
```

## API Endpoints

### **Authentication Routes** (`/api/auth`)
- `POST /login` - User authentication with email/password
- `POST /register` - New user registration
- `GET /profile` - Get authenticated user profile (protected)

### **Exercise Routes** (`/api/exercises`)
- `POST /` - Create new exercise (protected)
- `GET /my` - Get user's exercises with question configs (protected)
- `GET /:code` - Get exercise and generated questions by code (public)

### **System Routes**
- `GET /health` - Health check endpoint

## Key Technologies

### **Dependencies**
```json
{
  "express": "^4.18.2",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

### **Development Dependencies**
```json
{
  "@types/express": "^4.17.17",
  "@types/bcryptjs": "^2.4.2",
  "@types/jsonwebtoken": "^9.0.2",
  "@types/cors": "^2.8.13",
  "@types/node": "^20.4.5",
  "typescript": "^5.1.6",
  "nodemon": "^3.0.1",
  "ts-node": "^10.9.1"
}
```

## Data Models

### **User Model**
```typescript
interface User {
  id: string;
  email: string;
  username: string;
  password: string; // bcrypt hashed
  createdAt: Date;
  updatedAt: Date;
}
```

### **Exercise Model**
```typescript
interface Exercise {
  id: string;
  name: string;
  code: string; // unique Base62 identifier
  userId: string;
  questionConfigs: QuestionConfig[];
  createdAt: Date;
  updatedAt: Date;
}

interface QuestionConfig {
  type: QuestionType; // ADDITION, SUBTRACTION, etc.
  count: number; // number of questions to generate
  firstNumberMinDigits: number;
  firstNumberMaxDigits: number;
  secondNumberMinDigits: number;
  secondNumberMaxDigits: number;
  firstNumberBigger: boolean; // constraint for subtraction/division
}
```

### **Generated Question Model**
```typescript
interface GeneratedQuestion {
  type: QuestionType;
  firstNumber: number;
  secondNumber: number;
  answer: number;
}
```

## Advanced Features

### **Deterministic Question Generation**
- **Seeded random number generation** ensures same exercise code always generates identical questions
- **Math.sin() based seeding** for consistent cross-platform results
- **Question order consistency** for reliable progress tracking

### **Smart Number Generation**
- **Digit-based constraints** for appropriate difficulty levels
- **Mathematical validity** ensuring positive results for subtraction/division
- **Configurable ranges** per question set within an exercise

### **Progress Tracking Support**
- **Question configs included** in exercise responses for frontend calculations
- **Unique exercise codes** for persistent localStorage keys
- **Total question counting** for progress percentage calculations

### **Security Features**
- **JWT token authentication** with configurable expiration
- **Password hashing** with bcrypt salt rounds
- **CORS configuration** for frontend integration
- **Input validation** for all API endpoints
- **Error handling** with consistent JSON responses

## Development Features

### **Test Data**
- **Pre-seeded test exercises** for development
- **Default user accounts** for quick testing
- **Sample question configurations** demonstrating all question types

### **Scripts**
```json
{
  "dev": "nodemon src/index.ts", // Development with auto-reload
  "build": "tsc", // TypeScript compilation
  "start": "node dist/index.js" // Production start
}
```

### **Environment Configuration**
```bash
# .env file
JWT_SECRET=your-secret-key
PORT=3000
NODE_ENV=development
```

## Recent Updates

### **Backend API Enhancement**
- **Fixed exercise list endpoint** to include `questionConfigs` for accurate progress calculation
- **Enhanced question generation** with proper seeding for deterministic results
- **Improved error handling** with detailed logging and user-friendly messages

### **Progress Tracking Integration**
- **Complete exercise data** now returned in `/my` endpoint
- **Question config exposure** enables frontend to calculate total questions correctly
- **Deterministic question sets** ensure consistent experience across sessions

This backend provides a robust foundation for the MathBuddy application with secure authentication, flexible exercise creation, and reliable question generation capabilities.