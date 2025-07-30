import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);

  const errorResponse: ErrorResponse = {
    success: false,
    error: error.message || 'Internal server error',
    timestamp: new Date().toISOString()
  };

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json(errorResponse);
};