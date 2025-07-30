import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exerciseAPI } from '../services/api';
import { Exercise, GeneratedQuestion, QuestionType } from '../types/exercise';

export const ExercisePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('ExercisePage rendered with code:', code);

  const getProgressKey = (exerciseCode: string) => `exercise_progress_${exerciseCode}`;

  const saveProgress = (exerciseCode: string, completed: Set<number>, currentIndex: number, currentScore: number) => {
    const progress = {
      completedQuestions: Array.from(completed),
      currentQuestionIndex: currentIndex,
      score: currentScore,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(getProgressKey(exerciseCode), JSON.stringify(progress));
  };

  const loadProgress = (exerciseCode: string) => {
    const saved = localStorage.getItem(getProgressKey(exerciseCode));
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        setCompletedQuestions(new Set(progress.completedQuestions || []));
        setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
        setScore(progress.score || 0);
        return progress;
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
    return null;
  };

  const loadExercise = async () => {
    if (!code) {
      setError('No exercise code provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('Making API call for code:', code);
      const response = await exerciseAPI.getExerciseQuestions(code);
      console.log('API response:', response);
      
      if (response.success && response.exercise && response.questions) {
        setExercise({
          ...response.exercise,
          createdAt: new Date().toISOString() // Add missing field
        });
        setQuestions(response.questions);
        
        // Load saved progress and set correct current question
        const progress = loadProgress(code);
        if (progress && response.questions) {
          const completedSet = new Set(progress.completedQuestions || []);
          
          // If all questions are completed, show finished state
          if (completedSet.size === response.questions.length) {
            setIsFinished(true);
          } else {
            // Find the first unanswered question
            let nextIndex = 0;
            while (nextIndex < response.questions.length && completedSet.has(nextIndex)) {
              nextIndex++;
            }
            setCurrentQuestionIndex(nextIndex);
          }
        }
      } else {
        setError('Exercise not found or no questions available');
      }
    } catch (err: any) {
      console.error('Load exercise error:', err);
      setError('Failed to load exercise questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered with code:', code);
    loadExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const getOperatorSymbol = (type: QuestionType): string => {
    switch (type) {
      case QuestionType.ADDITION: return '+';
      case QuestionType.SUBTRACTION: return '-';
      case QuestionType.MULTIPLICATION: return '×';
      case QuestionType.DIVISION: return '÷';
      default: return '?';
    }
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || !code) return;

    const userAnswerNum = parseInt(userAnswer);
    const isCorrect = userAnswerNum === currentQuestion.answer;
    
    let newScore = score;
    let newCompletedQuestions = new Set(completedQuestions);
    
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
      newCompletedQuestions.add(currentQuestionIndex);
      setCompletedQuestions(newCompletedQuestions);
    }

    setShowResult(true);
    
    // Show result for 2 seconds, then move to next question only if correct
    setTimeout(() => {
      if (isCorrect) {
        // Find next unanswered question or finish if all answered
        let nextIndex = currentQuestionIndex + 1;
        while (nextIndex < questions.length && newCompletedQuestions.has(nextIndex)) {
          nextIndex++;
        }
        
        if (nextIndex >= questions.length) {
          // Save final progress before finishing
          saveProgress(code, newCompletedQuestions, questions.length, newScore);
          setIsFinished(true);
        } else {
          setCurrentQuestionIndex(nextIndex);
          setUserAnswer('');
          setShowResult(false);
          // Save progress
          saveProgress(code, newCompletedQuestions, nextIndex, newScore);
        }
      } else {
        // Stay on the same question if incorrect
        setUserAnswer('');
        setShowResult(false);
        // Save progress even for wrong answers
        saveProgress(code, newCompletedQuestions, currentQuestionIndex, newScore);
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim() && !showResult) {
      handleSubmitAnswer();
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setScore(0);
    setShowResult(false);
    setIsFinished(false);
    setCompletedQuestions(new Set());
    
    // Clear saved progress
    if (code) {
      localStorage.removeItem(getProgressKey(code));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <h2 className="text-primary font-bold" style={{ fontSize: '24px', lineHeight: '32px', marginBottom: '16px' }}>
            Loading Exercise...
          </h2>
          <div className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
            Please wait while we load the exercise.
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <h2 className="text-primary font-bold" style={{ fontSize: '24px', lineHeight: '32px', marginBottom: '16px' }}>
            Error
          </h2>
          <div className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
            {error}
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <h2 className="text-primary font-bold" style={{ fontSize: '24px', lineHeight: '32px', marginBottom: '16px' }}>
            No Questions Available
          </h2>
          <div className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
            This exercise doesn't have any questions configured yet.
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ padding: '32px 16px' }}>
        <div className="card text-center" style={{ maxWidth: '500px', width: '100%' }}>
          <div 
            style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}
          >
            <span className="text-white font-bold" style={{ fontSize: '32px', lineHeight: '40px' }}>
              ✓
            </span>
          </div>

          <h1 className="text-primary font-bold" style={{ fontSize: '32px', lineHeight: '40px', marginBottom: '16px' }}>
            Quiz Complete!
          </h1>
          
          <div className="text-secondary" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '24px' }}>
            You scored <span className="text-primary font-bold">{score}</span> out of <span className="text-primary font-bold">{questions.length}</span>
          </div>

          <div className="card-subtle" style={{ marginBottom: '24px', padding: '16px' }}>
            <div className="text-primary font-bold" style={{ fontSize: '48px', lineHeight: '56px', marginBottom: '8px' }}>
              {Math.round((score / questions.length) * 100)}%
            </div>
            <div className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
              Accuracy
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={restartQuiz} className="btn-secondary">
              Try Again
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = showResult && parseInt(userAnswer) === currentQuestion.answer;

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ padding: '32px 16px' }}>
      <div className="card text-center" style={{ maxWidth: '500px', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 className="text-primary font-bold" style={{ fontSize: '24px', lineHeight: '32px', marginBottom: '8px' }}>
            {exercise?.name}
          </h1>
          <div className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div className="progress-bar">
            <div 
              className="progress-fill progress-partial"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '32px' }}>
          <div className="text-primary font-bold" style={{ fontSize: '48px', lineHeight: '56px', marginBottom: '16px' }}>
            {currentQuestion.firstNumber} {getOperatorSymbol(currentQuestion.type)} {currentQuestion.secondNumber} = ?
          </div>
        </div>

        {/* Answer Input */}
        {!showResult ? (
          <div style={{ marginBottom: '32px' }}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              style={{ 
                fontSize: '24px', 
                textAlign: 'center', 
                maxWidth: '200px', 
                margin: '0 auto 16px auto' 
              }}
              placeholder="Your answer"
              autoFocus
            />
            <div>
              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="btn-primary"
                style={{ 
                  opacity: !userAnswer.trim() ? 0.5 : 1,
                  cursor: !userAnswer.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '32px' }}>
            <div className={`text-center font-bold ${isCorrect ? 'text-primary' : 'text-red-400'}`} style={{ fontSize: '24px', lineHeight: '32px', marginBottom: '16px' }}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            {!isCorrect && (
              <div className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
                The correct answer is: <span className="text-primary font-bold">{currentQuestion.answer}</span>
              </div>
            )}
          </div>
        )}

        {/* Progress */}
        <div className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Completed: {completedQuestions.size} / {questions.length} • Score: {score}
        </div>
      </div>
    </div>
  );
};