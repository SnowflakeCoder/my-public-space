import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen" style={{ padding: '32px 0' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 className="text-primary font-bold" style={{ fontSize: '32px', lineHeight: '40px', marginBottom: '8px' }}>
            MathBuddy
          </h1>
          <div className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
            {isLogin ? 'Welcome back! Please sign in to your account.' : 'Create a new account to get started.'}
          </div>
        </div>

        {/* Form Card */}
        <div className="card">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};