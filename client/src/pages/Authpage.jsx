import React, { useState } from 'react';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/auth/SignUp';

export default function AuthPage({ onAuthenticated }) {
  const [tab, setTab] = useState('signIn');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <div className="flex">
          <button
            className={`w-1/2 py-3 ${tab==='signIn'
              ? 'bg-blue-500 text-white'
              : 'bg-transparent text-gray-700 dark:text-gray-300'}`}
            onClick={() => setTab('signIn')}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-3 ${tab==='signUp'
              ? 'bg-blue-500 text-white'
              : 'bg-transparent text-gray-700 dark:text-gray-300'}`}
            onClick={() => setTab('signUp')}
          >
            Sign Up
          </button>
        </div>
        <div className="p-6">
          {tab === 'signIn' ? (
            <SignIn onSignIn={onAuthenticated} switchToSignUp={() => setTab('signUp')} />
          ) : (
            <SignUp switchToSignIn={() => setTab('signIn')} />
          )}
        </div>
      </div>
    </div>
  );
}
