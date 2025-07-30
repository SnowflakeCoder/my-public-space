# MathBuddy Backend

Node.js/TypeScript REST API server with JWT authentication for the MathBuddy application.

## Overview

The backend provides authentication services, exercise management, and API endpoints for user management. It uses in-memory storage for development and includes comprehensive error handling and middleware.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken) + bcrypt for password hashing
- **CORS**: Enabled for frontend communication
- **Database**: In-memory storage (array-based)
- **Dev Tools**: nodemon, ts-node

## Project Structure

```
mathbuddy-backend/
├── src/
│   ├── index.ts                    # Entry point and Express app setup
│   ├── controllers/
│   │   ├── authController.ts       # Authentication logic
│   │   └── exerciseController.ts   # Exercise management logic
│   ├── database/
│   │   └── exerciseDB.ts           # In-memory exercise storage
│   ├── middleware/
│   │   ├── authMiddleware.ts       # JWT authentication middleware
│   │   └── errorHandler.ts        # Global error handling
│   ├── routes/
│   │   ├── auth.ts                 # Authentication routes
│   │   └── exercise.ts             # Exercise routes
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   └── utils/
│       ├── authUtils.ts            # JWT and password utilities
│       └── codeGenerator.ts        # Base62 code generation
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── CLAUDE.md                 # Development notes
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm

### Install Dependencies
```bash
npm install
```

### Development Dependencies
```bash
npm install --save-dev @types/express @types/bcryptjs @types/jsonwebtoken @types/cors @types/node typescript ts-node-dev
```

### Production Dependencies
```bash
npm install express bcryptjs jsonwebtoken cors dotenv
```

## Environment Variables

Create a `.env` file in the root directory:
```env
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
```

## Available Scripts

```bash
# Development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run compiled JavaScript
npm start

# Type checking
npm run type-check
```

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Authentication Backend is running!"
}
```

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username"
  }
}
```

#### Get User Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer jwt-token-here
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Exercise Routes

#### Create Exercise (Protected)
```http
POST /api/exercise/create
Authorization: Bearer jwt-token-here
Content-Type: application/json

{
  "name": "Basic Algebra Quiz"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Exercise created successfully",
  "exercise": {
    "id": "exercise-id",
    "name": "Basic Algebra Quiz",
    "code": "nXtEGE",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get User's Exercises (Protected)
```http
GET /api/exercise/my-exercises
Authorization: Bearer jwt-token-here
```

**Success Response (200):**
```json
{
  "success": true,
  "exercises": [
    {
      "id": "exercise-id",
      "name": "Basic Algebra Quiz",
      "code": "nXtEGE",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Exercise by Code (Public)
```http
GET /api/exercise/{code}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Exercise found",
  "exercise": {
    "id": "exercise-id",
    "name": "Basic Algebra Quiz",
    "code": "nXtEGE",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Exercise not found"
}
```

## Default Test Users

The backend comes with two pre-seeded test users:

```json
[
  {
    "email": "student@mathbuddy.com",
    "password": "password123",
    "username": "student"
  },
  {
    "email": "teacher@mathbuddy.com",
    "password": "password123",
    "username": "teacher"
  }
]
```

## Error Handling

All API responses follow a consistent error format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created (registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `409` - Conflict (user already exists)
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS**: Configured for frontend origin
- **Input Validation**: Email format and password strength
- **Error Sanitization**: No sensitive data in error responses

## Development

### Running the Server
```bash
npm run dev
```
Server starts on `http://localhost:3000`

### Testing API Endpoints
```bash
# Health check
curl -X GET http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# Login user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create exercise (requires JWT token)
curl -X POST http://localhost:3000/api/exercise/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Math Quiz 101"}'

# Get user's exercises (requires JWT token)
curl -X GET http://localhost:3000/api/exercise/my-exercises \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get exercise by code (public)
curl -X GET http://localhost:3000/api/exercise/nXtEGE
```

## Database Schema (In-Memory)

### User Interface
```typescript
interface User {
  id: string;           // UUID
  email: string;        // Unique email address
  username: string;     // Display name
  password: string;     // Hashed password
  createdAt: Date;      // Account creation date
}
```

### Exercise Interface
```typescript
interface Exercise {
  id: string;           // Unique exercise ID
  name: string;         // Exercise name (e.g., "Basic Algebra Quiz")
  code: string;         // Base62 code for shareable URLs (e.g., "nXtEGE")
  userId: string;       // ID of user who created the exercise
  createdAt: Date;      // Exercise creation date
  updatedAt: Date;      // Last modification date
}
```

## Production Considerations

For production deployment:
1. Replace in-memory storage with a real database (PostgreSQL, MongoDB)
2. Add rate limiting middleware
3. Implement proper logging (Winston, Morgan)
4. Add input sanitization
5. Use environment-specific configurations
6. Add API documentation (Swagger/OpenAPI)
7. Implement refresh token mechanism

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### TypeScript Compilation Errors
```bash
# Check TypeScript configuration
npm run type-check

# Clean build
rm -rf dist && npm run build
```

## Contributing

1. Follow TypeScript best practices
2. Use consistent error handling patterns
3. Add appropriate type definitions
4. Test all API endpoints manually
5. Update documentation for new features