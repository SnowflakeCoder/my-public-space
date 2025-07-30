import React from 'react';
import { useParams } from 'react-router-dom';

export const TestPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card text-center">
        <h1 className="text-primary font-bold" style={{ fontSize: '32px', lineHeight: '40px', marginBottom: '16px' }}>
          Test Page Working!
        </h1>
        <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
          Code from URL: {code || 'No code'}
        </p>
        <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px', marginTop: '16px' }}>
          If you see this, React Router is working correctly.
        </p>
      </div>
    </div>
  );
};