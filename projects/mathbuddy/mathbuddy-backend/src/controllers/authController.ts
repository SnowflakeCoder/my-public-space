import { Request, Response } from 'express';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';
import { AuthUtils } from '../utils/authUtils';

// In-memory storage (replace with database in production)
const users: User[] = [];

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, username, password }: RegisterRequest = req.body;

      if (!email || !username || !password) {
        res.status(400).json({
          success: false,
          message: 'Email, username, and password are required'
        } as AuthResponse);
        return;
      }

      if (!AuthUtils.validateEmail(email)) {
        res.status(400).json({
          success: false,
          message: 'Invalid email format'
        } as AuthResponse);
        return;
      }

      const passwordValidation = AuthUtils.validatePassword(password);
      if (!passwordValidation.isValid) {
        res.status(400).json({
          success: false,
          message: passwordValidation.message
        } as AuthResponse);
        return;
      }

      // Check if user already exists
      const existingUser = users.find(u => u.email === email || u.username === username);
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'User with this email or username already exists'
        } as AuthResponse);
        return;
      }

      // Hash password and create user
      const hashedPassword = await AuthUtils.hashPassword(password);
      const newUser: User = {
        id: Date.now().toString(),
        email,
        username,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      users.push(newUser);

      // Generate token
      const token = AuthUtils.generateToken(newUser.id, newUser.email, newUser.username);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username
        },
        token
      } as AuthResponse);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      res.status(500).json({
        success: false,
        message: errorMessage
      } as AuthResponse);
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginRequest = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required'
        } as AuthResponse);
        return;
      }

      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        } as AuthResponse);
        return;
      }

      // Verify password
      const isValidPassword = await AuthUtils.comparePassword(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        } as AuthResponse);
        return;
      }

      // Generate token
      const token = AuthUtils.generateToken(user.id, user.email, user.username);

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        },
        token
      } as AuthResponse);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      res.status(500).json({
        success: false,
        message: errorMessage
      } as AuthResponse);
    }
  }

  static getProfile(req: Request, res: Response): void {
    // This would typically get user info from authenticated request
    res.json({
      success: true,
      message: 'Profile endpoint - implement with authentication middleware'
    });
  }
}