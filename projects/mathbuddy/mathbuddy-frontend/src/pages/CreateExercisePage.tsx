import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exerciseAPI } from '../services/api';
import { QuestionType, QuestionConfig } from '../types/exercise';

export const CreateExercisePage: React.FC = () => {
  const navigate = useNavigate();
  const [exerciseName, setExerciseName] = useState('');
  const [questionConfigs, setQuestionConfigs] = useState<QuestionConfig[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;

    if (questionConfigs.length === 0) {
      setError('Please add at least one question type');
      return;
    }

    try {
      setIsCreating(true);
      setError('');
      const response = await exerciseAPI.createExercise({ 
        name: exerciseName.trim(),
        questionConfigs 
      });
      
      if (response.success && response.exercise) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create exercise');
    } finally {
      setIsCreating(false);
    }
  };

  const addQuestionConfig = () => {
    const newConfig: QuestionConfig = {
      type: QuestionType.ADDITION,
      count: 10,
      firstNumberMinDigits: 1,
      firstNumberMaxDigits: 2,
      secondNumberMinDigits: 1,
      secondNumberMaxDigits: 2,
      firstNumberBigger: true
    };
    setQuestionConfigs(prev => [...prev, newConfig]);
  };

  const updateQuestionConfig = (index: number, field: keyof QuestionConfig, value: any) => {
    setQuestionConfigs(prev => prev.map((config, i) => 
      i === index ? { ...config, [field]: value } : config
    ));
  };

  const removeQuestionConfig = (index: number) => {
    setQuestionConfigs(prev => prev.filter((_, i) => i !== index));
  };

  const getQuestionTypeLabel = (type: QuestionType) => {
    switch (type) {
      case QuestionType.ADDITION: return 'Addition (+)';
      case QuestionType.SUBTRACTION: return 'Subtraction (-)';
      case QuestionType.MULTIPLICATION: return 'Multiplication (×)';
      case QuestionType.DIVISION: return 'Division (÷)';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen" style={{ padding: '32px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-secondary hover:text-primary"
            style={{ fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-primary font-bold" style={{ fontSize: '32px', lineHeight: '40px' }}>
            Create New Exercise
          </h1>
        </div>

        {/* Create Exercise Form */}
        <div className="card">
          <form onSubmit={handleCreateExercise} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label 
                htmlFor="exerciseName" 
                className="text-primary font-medium" 
                style={{ display: 'block', fontSize: '16px', lineHeight: '24px', marginBottom: '8px' }}
              >
                Exercise Name
              </label>
              <input
                type="text"
                id="exerciseName"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                className="input-field"
                placeholder="Enter exercise name"
                maxLength={100}
                required
              />
            </div>

            {/* Question Configurations */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="text-primary font-medium" style={{ fontSize: '18px', lineHeight: '24px' }}>
                  Question Types
                </h3>
                <button
                  type="button"
                  onClick={addQuestionConfig}
                  className="btn-secondary btn-sm"
                >
                  Add Question Type
                </button>
              </div>

              {questionConfigs.length === 0 ? (
                <div className="card-subtle text-center" style={{ padding: '24px' }}>
                  <div className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    No question types added yet. Click "Add Question Type" to get started.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {questionConfigs.map((config, index) => (
                    <div key={index} className="card-subtle">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <h4 className="text-primary font-medium" style={{ fontSize: '16px', lineHeight: '24px' }}>
                          Question Set {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeQuestionConfig(index)}
                          className="text-secondary hover:text-primary"
                          style={{ fontSize: '14px', padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label className="text-primary font-medium" style={{ display: 'block', fontSize: '14px', lineHeight: '20px', marginBottom: '4px' }}>
                            Question Type
                          </label>
                          <select
                            value={config.type}
                            onChange={(e) => updateQuestionConfig(index, 'type', e.target.value as QuestionType)}
                            className="input-field"
                            style={{ fontSize: '14px' }}
                          >
                            {Object.values(QuestionType).map(type => (
                              <option key={type} value={type} style={{ background: '#2d2d2d', color: '#ffffff' }}>
                                {getQuestionTypeLabel(type)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-primary font-medium" style={{ display: 'block', fontSize: '14px', lineHeight: '20px', marginBottom: '4px' }}>
                            Number of Questions (1-100)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={config.count}
                            onChange={(e) => updateQuestionConfig(index, 'count', parseInt(e.target.value) || 1)}
                            className="input-field"
                            style={{ fontSize: '14px' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <label className="text-primary font-medium" style={{ display: 'block', fontSize: '14px', lineHeight: '20px', marginBottom: '4px' }}>
                            First Number Min Digits
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={config.firstNumberMinDigits}
                            onChange={(e) => updateQuestionConfig(index, 'firstNumberMinDigits', parseInt(e.target.value) || 1)}
                            className="input-field"
                            style={{ fontSize: '14px' }}
                          />
                        </div>

                        <div>
                          <label className="text-primary font-medium" style={{ display: 'block', fontSize: '14px', lineHeight: '20px', marginBottom: '4px' }}>
                            First Number Max Digits
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={config.firstNumberMaxDigits}
                            onChange={(e) => updateQuestionConfig(index, 'firstNumberMaxDigits', parseInt(e.target.value) || 1)}
                            className="input-field"
                            style={{ fontSize: '14px' }}
                          />
                        </div>

                        <div>
                          <label className="text-primary font-medium" style={{ display: 'block', fontSize: '14px', lineHeight: '20px', marginBottom: '4px' }}>
                            Second Number Min Digits
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={config.secondNumberMinDigits}
                            onChange={(e) => updateQuestionConfig(index, 'secondNumberMinDigits', parseInt(e.target.value) || 1)}
                            className="input-field"
                            style={{ fontSize: '14px' }}
                          />
                        </div>

                        <div>
                          <label className="text-primary font-medium" style={{ display: 'block', fontSize: '14px', lineHeight: '20px', marginBottom: '4px' }}>
                            Second Number Max Digits
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={config.secondNumberMaxDigits}
                            onChange={(e) => updateQuestionConfig(index, 'secondNumberMaxDigits', parseInt(e.target.value) || 1)}
                            className="input-field"
                            style={{ fontSize: '14px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-primary font-medium" style={{ display: 'flex', alignItems: 'center', fontSize: '14px', lineHeight: '20px', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={config.firstNumberBigger}
                            onChange={(e) => updateQuestionConfig(index, 'firstNumberBigger', e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                          />
                          First number is always bigger than second number
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || !exerciseName.trim() || questionConfigs.length === 0}
                className="btn-primary"
                style={{ 
                  opacity: (isCreating || !exerciseName.trim() || questionConfigs.length === 0) ? 0.5 : 1,
                  cursor: (isCreating || !exerciseName.trim() || questionConfigs.length === 0) ? 'not-allowed' : 'pointer'
                }}
              >
                {isCreating ? 'Creating...' : 'Create Exercise'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};