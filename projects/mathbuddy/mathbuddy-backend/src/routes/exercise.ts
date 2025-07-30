import { Router } from 'express';
import { ExerciseController } from '../controllers/exerciseController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Protected routes (require authentication)
router.post('/create', authenticateToken, ExerciseController.createExercise);
router.get('/my-exercises', authenticateToken, ExerciseController.getUserExercises);

// Public routes (no authentication required)
router.get('/:code', ExerciseController.getExerciseByCode);
router.get('/:code/questions', ExerciseController.getExerciseQuestions);

export { router as exerciseRoutes };