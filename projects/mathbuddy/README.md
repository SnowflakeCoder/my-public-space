# MathBuddy

A modern full-stack web application for mathematics learning and practice, featuring user authentication, exercise management, and elegant minimalist design.

## Project Overview

MathBuddy consists of two main components that work together to provide a seamless learning experience:

- **mathbuddy-backend**: Node.js/TypeScript REST API with JWT authentication
- **mathbuddy-frontend**: React/TypeScript SPA with Tailwind CSS styling

## Architecture

```
┌─────────────────────┐     HTTP/REST API     ┌─────────────────────┐
│                     │ ←─────────────────── │                     │
│  mathbuddy-frontend │                       │  mathbuddy-backend  │
│   (React + TS)      │ ──────────────────→ │   (Node.js + TS)    │
│   Port: 4000        │                       │   Port: 3000        │
└─────────────────────┘                       └─────────────────────┘
```

## Service Communication

- **Frontend → Backend**: RESTful API calls for authentication and exercise management
- **Authentication**: JWT tokens stored in localStorage
- **Exercise URLs**: Public shareable URLs with base62 codes
- **CORS**: Enabled for cross-origin requests
- **API Base URL**: `http://localhost:3000/api`

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm

### 1. Start Backend
```bash
cd mathbuddy-backend
npm install
npm run dev
```
Backend runs on: http://localhost:3000

### 2. Start Frontend
```bash
cd mathbuddy-frontend
npm install
npm start
```
Frontend runs on: http://localhost:4000

### 3. Verify Services
```bash
# Check backend health
curl -X GET http://localhost:3000/health

# Check frontend (open in browser)
open http://localhost:4000
```

## Features

### Authentication System
- User registration with validation
- Email/password login
- JWT token-based authentication
- Protected routes and profile access

### Exercise Management
- Create exercises with custom names
- Generate unique shareable URLs with base62 codes
- Public exercise access without authentication
- Dashboard to view and manage created exercises
- Beautiful exercise welcome pages with "Hello, welcome to {exercise-name}!"

### Design System
- Elegant minimalism with soft gradients
- 4pt/8pt spacing system for consistency
- Touch-accessible components (48x48px minimum)
- Black/white text only for clarity
- Refined rounded corners and subtle shadows

## Project Structure

```
mathbuddy/
├── mathbuddy-backend/     # REST API server
│   ├── src/
│   │   ├── controllers/   # Route handlers (auth, exercise)
│   │   ├── database/      # In-memory data storage
│   │   ├── middleware/    # Auth & error handling
│   │   ├── routes/        # API endpoints
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # Helper functions (auth, codeGenerator)
│   └── README.md          # Backend documentation
├── mathbuddy-frontend/    # React SPA
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components (auth, dashboard, exercise)
│   │   ├── context/       # React context
│   │   ├── services/      # API client
│   │   └── types/         # TypeScript interfaces
│   ├── DESIGN.md          # Design specifications
│   └── README.md          # Frontend documentation
└── README.md              # This file
```

## Default Test Users

For development and testing:
- Email: `student@mathbuddy.com`, Password: `password123`
- Email: `teacher@mathbuddy.com`, Password: `password123`

## Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Authentication**: JWT + bcrypt
- **Database**: In-memory storage (development)
- **Dev Tools**: nodemon, ts-node

### Frontend
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App with CRACO
- **Routing**: React Router v7
- **HTTP Client**: Axios

## Development

For detailed setup and development instructions, see:
- [Backend Documentation](./mathbuddy-backend/README.md)
- [Frontend Documentation](./mathbuddy-frontend/README.md)
- [Design Specifications](./mathbuddy-frontend/DESIGN.md)

## Development Notes

- After deploying services always verify both front-end and back-end using curl
- Make a beep sound when you finish the task each time

