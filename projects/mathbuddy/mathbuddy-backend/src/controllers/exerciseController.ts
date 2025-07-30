import { Request, Response } from 'express';
import { exerciseDB } from '../database/exerciseDB';
import { CreateExerciseRequest, ExerciseResponse, ExerciseListResponse, QuestionType } from '../types';
import { QuestionGenerator } from '../utils/questionGenerator';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export class ExerciseController {
  static async createExercise(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, questionConfigs }: CreateExerciseRequest = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      if (!name || name.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Exercise name is required'
        });
        return;
      }

      if (name.length > 100) {
        res.status(400).json({
          success: false,
          message: 'Exercise name must be less than 100 characters'
        });
        return;
      }

      if (!questionConfigs || questionConfigs.length === 0) {
        res.status(400).json({
          success: false,
          message: 'At least one question configuration is required'
        });
        return;
      }

      // Validate question configs
      for (const config of questionConfigs) {
        if (!Object.values(QuestionType).includes(config.type)) {
          res.status(400).json({
            success: false,
            message: 'Invalid question type'
          });
          return;
        }

        if (config.count < 1 || config.count > 100) {
          res.status(400).json({
            success: false,
            message: 'Question count must be between 1 and 100'
          });
          return;
        }

        if (config.firstNumberMinDigits < 1 || config.firstNumberMaxDigits < 1 ||
            config.secondNumberMinDigits < 1 || config.secondNumberMaxDigits < 1) {
          res.status(400).json({
            success: false,
            message: 'Minimum digits must be at least 1'
          });
          return;
        }

        if (config.firstNumberMinDigits > config.firstNumberMaxDigits ||
            config.secondNumberMinDigits > config.secondNumberMaxDigits) {
          res.status(400).json({
            success: false,
            message: 'Minimum digits cannot be greater than maximum digits'
          });
          return;
        }
      }

      const exercise = exerciseDB.create(name.trim(), userId, questionConfigs);

      const response: ExerciseResponse = {
        success: true,
        message: 'Exercise created successfully',
        exercise: {
          id: exercise.id,
          name: exercise.name,
          code: exercise.code,
          createdAt: exercise.createdAt
        }
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Create exercise error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getUserExercises(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const exercises = exerciseDB.findByUserId(userId);

      const response: ExerciseListResponse = {
        success: true,
        exercises: exercises.map(exercise => ({
          id: exercise.id,
          name: exercise.name,
          code: exercise.code,
          questionConfigs: exercise.questionConfigs,
          createdAt: exercise.createdAt
        }))
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get user exercises error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getExerciseByCode(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;

      if (!code || code.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Exercise code is required'
        });
        return;
      }

      const exercise = exerciseDB.findByCode(code);

      if (!exercise) {
        res.status(404).json({
          success: false,
          message: 'Exercise not found'
        });
        return;
      }

      const response: ExerciseResponse = {
        success: true,
        message: 'Exercise found',
        exercise: {
          id: exercise.id,
          name: exercise.name,
          code: exercise.code,
          createdAt: exercise.createdAt
        }
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get exercise by code error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getExerciseQuestions(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;

      if (!code || code.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Exercise code is required'
        });
        return;
      }

      const exercise = exerciseDB.findByCode(code);

      if (!exercise) {
        res.status(404).json({
          success: false,
          message: 'Exercise not found'
        });
        return;
      }

      const questions = QuestionGenerator.generateQuestionsFromConfigs(exercise.questionConfigs, exercise.code);

      res.status(200).json({
        success: true,
        message: 'Questions generated successfully',
        exercise: {
          id: exercise.id,
          name: exercise.name,
          code: exercise.code
        },
        questions
      });
    } catch (error) {
      console.error('Get exercise questions error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}