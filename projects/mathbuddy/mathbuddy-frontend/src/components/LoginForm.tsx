import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  return (
    <>
      <div className="text-center" style={{ marginBottom: '32px' }}>
        <h2 className="text-primary font-bold" style={{ fontSize: '24px', lineHeight: '32px', marginBottom: '8px' }}>
          Welcome Back
        </h2>
        <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label 
            htmlFor="email" 
            className="text-primary font-medium" 
            style={{ 
              display: 'block', 
              fontSize: '16px', 
              lineHeight: '24px', 
              marginBottom: '8px' 
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="text-primary font-medium" 
            style={{ 
              display: 'block', 
              fontSize: '16px', 
              lineHeight: '24px', 
              marginBottom: '8px' 
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Enter your password"
            required
          />
        </div>

        {(error || localError) && (
          <div className="error-message">
            {error || localError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
          style={{ 
            marginTop: '8px',
            width: '100%',
            opacity: isLoading ? 0.5 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center" style={{ marginTop: '24px' }}>
        <p className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary font-medium"
            style={{ 
              fontSize: '14px', 
              lineHeight: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </>
  );
};