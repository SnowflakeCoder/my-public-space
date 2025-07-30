import { Exercise, QuestionConfig } from '../types';
import { generateUniqueCode } from '../utils/codeGenerator';

class ExerciseDatabase {
  private exercises: Exercise[] = [];

  create(name: string, userId: string, questionConfigs: QuestionConfig[] = []): Exercise {
    const existingCodes = this.exercises.map(ex => ex.code);
    const code = generateUniqueCode(existingCodes, 6);
    
    const exercise: Exercise = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      code,
      userId,
      questionConfigs,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.exercises.push(exercise);
    return exercise;
  }

  findByCode(code: string): Exercise | undefined {
    return this.exercises.find(exercise => exercise.code === code);
  }

  findByUserId(userId: string): Exercise[] {
    return this.exercises.filter(exercise => exercise.userId === userId);
  }

  findById(id: string): Exercise | undefined {
    return this.exercises.find(exercise => exercise.id === id);
  }

  getAll(): Exercise[] {
    return [...this.exercises];
  }
}

export const exerciseDB = new ExerciseDatabase();

// Add some test exercises for development
const exercise1 = exerciseDB.create('Basic Algebra Quiz', 'test-user-1', []);
const exercise2 = exerciseDB.create('Advanced Calculus Problems', 'test-user-1', []);
const exercise3 = exerciseDB.create('Geometry Fundamentals', 'test-user-2', []);

console.log('Test exercises created:');
console.log(`- ${exercise1.name}: http://localhost:4000/exercise/${exercise1.code}`);
console.log(`- ${exercise2.name}: http://localhost:4000/exercise/${exercise2.code}`);
console.log(`- ${exercise3.name}: http://localhost:4000/exercise/${exercise3.code}`);