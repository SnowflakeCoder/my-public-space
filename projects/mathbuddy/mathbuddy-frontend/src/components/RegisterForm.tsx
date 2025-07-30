import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { register, isLoading, error } = useAuth();

  const validateForm = () => {
    if (!email || !username || !password || !confirmPassword) {
      setLocalError('Please fill in all fields');
      return false;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long');
      return false;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setLocalError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!validateForm()) {
      return;
    }

    try {
      await register(email, username, password);
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  return (
    <>
      <div className="text-center" style={{ marginBottom: '32px' }}>
        <h2 className="text-primary font-bold" style={{ fontSize: '24px', lineHeight: '32px', marginBottom: '8px' }}>
          Create Account
        </h2>
        <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
          Join us today
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
            htmlFor="username" 
            className="text-primary font-medium" 
            style={{ 
              display: 'block', 
              fontSize: '16px', 
              lineHeight: '24px', 
              marginBottom: '8px' 
            }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            placeholder="Choose a username"
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
            placeholder="Create a password"
            required
          />
          <p className="text-muted" style={{ fontSize: '14px', lineHeight: '20px', marginTop: '4px' }}>
            Must contain at least 6 characters with uppercase, lowercase, and number
          </p>
        </div>

        <div>
          <label 
            htmlFor="confirmPassword" 
            className="text-primary font-medium" 
            style={{ 
              display: 'block', 
              fontSize: '16px', 
              lineHeight: '24px', 
              marginBottom: '8px' 
            }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            placeholder="Confirm your password"
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
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="text-center" style={{ marginTop: '24px' }}>
        <p className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
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
            Sign in
          </button>
        </p>
      </div>
    </>
  );
};