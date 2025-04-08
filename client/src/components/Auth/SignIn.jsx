import React, { useState } from 'react';
import { signIn } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';

export default function SignIn({ onSignIn, switchToSignUp }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await signIn(form);
      if (res.token) {
        localStorage.setItem('token', res.token);
        onSignIn();
        navigate('/dashboard');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch {
      setError('Error during sign in.');
    }
  };

  return (
    <div>
      <Logo />
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button onClick={switchToSignUp} className="text-blue-600 hover:underline">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
