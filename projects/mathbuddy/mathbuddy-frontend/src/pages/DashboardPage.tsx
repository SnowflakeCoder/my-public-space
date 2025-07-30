import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { exerciseAPI } from '../services/api';
import { Exercise } from '../types/exercise';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadExercises();
  }, []);

  // Reload exercises when page gains focus to update progress
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadExercises();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const response = await exerciseAPI.getMyExercises();
      if (response.success) {
        setExercises(response.exercises);
      }
    } catch (err: any) {
      setError('Failed to load exercises');
      console.error('Load exercises error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getExerciseUrl = (code: string) => {
    return `${window.location.origin}/exercise/${code}`;
  };

  const getTotalQuestions = (exercise: Exercise): number => {
    if (!exercise.questionConfigs) return 0;
    return exercise.questionConfigs.reduce((total, config) => total + config.count, 0);
  };

  const getExerciseProgress = (exerciseCode: string) => {
    const progressKey = `exercise_progress_${exerciseCode}`;
    const saved = localStorage.getItem(progressKey);
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        const result = {
          completed: progress.completedQuestions?.length || 0,
          score: progress.score || 0
        };
        console.log(`Progress for ${exerciseCode}:`, result, 'Raw:', progress);
        return result;
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
    return { completed: 0, score: 0 };
  };

  return (
    <div className="min-h-screen">
      <nav className="nav">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-primary">MathBuddy Home</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-secondary">Welcome, {user?.username}!</span>
              <button
                onClick={logout}
                className="btn-secondary btn-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main style={{ padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Stats Overview */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{exercises.length}</div>
              <div className="stat-label">Total Exercises</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{exercises.reduce((total, ex) => total + getTotalQuestions(ex), 0)}</div>
              <div className="stat-label">Total Questions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{exercises.reduce((total, ex) => total + getExerciseProgress(ex.code).completed, 0)}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{exercises.reduce((total, ex) => total + getExerciseProgress(ex.code).score, 0)}</div>
              <div className="stat-label">Correct Answers</div>
            </div>
          </div>

          {/* Header with Create Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="text-primary font-bold" style={{ fontSize: '24px', lineHeight: '32px' }}>
              My Exercises
            </h2>
            <button
              onClick={() => navigate('/create-exercise')}
              className="btn-primary"
            >
              Create New Exercise
            </button>
          </div>

          {/* Exercises List */}
          {isLoading ? (
            <div className="card text-center" style={{ padding: '48px' }}>
              <div className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
                Loading exercises...
              </div>
            </div>
          ) : exercises.length === 0 ? (
            <div className="card text-center" style={{ padding: '48px' }}>
              <div className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
                No exercises created yet. Click "Create New Exercise" above to get started.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {exercises.map((exercise) => {
                const totalQuestions = getTotalQuestions(exercise);
                const progress = getExerciseProgress(exercise.code);
                const progressPercentage = totalQuestions > 0 ? Math.round((progress.completed / totalQuestions) * 100) : 0;
                
                return (
                  <div 
                    key={exercise.id} 
                    className="card"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 className="text-primary font-bold" style={{ fontSize: '20px', lineHeight: '28px', marginBottom: '8px' }}>
                        {exercise.name}
                      </h3>
                      <div className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px', marginBottom: '8px' }}>
                        <span>Total Questions: {totalQuestions}</span> • 
                        <span> Code: {exercise.code}</span> • 
                        <span> Created: {new Date(exercise.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span className="text-secondary" style={{ fontSize: '12px', lineHeight: '16px' }}>
                            Progress: {progress.completed} / {totalQuestions} completed ({progressPercentage}%)
                          </span>
                          <span className="text-secondary" style={{ fontSize: '12px', lineHeight: '16px' }}>
                            Score: {progress.score}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div className={`progress-fill ${progressPercentage === 100 ? 'progress-complete' : 'progress-partial'}`} style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="text-muted" style={{ fontSize: '12px', lineHeight: '16px' }}>
                        {getExerciseUrl(exercise.code)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => navigator.clipboard.writeText(getExerciseUrl(exercise.code))}
                        className="btn-secondary btn-sm"
                      >
                        Copy Link
                      </button>
                      <button
                        onClick={() => window.open(getExerciseUrl(exercise.code), '_blank')}
                        className="btn-primary btn-sm"
                      >
                        {progressPercentage === 100 ? 'View Results' : progressPercentage > 0 ? 'Continue' : 'Start'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};