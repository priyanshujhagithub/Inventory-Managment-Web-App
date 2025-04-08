import React from 'react';
import useSocket from '../hooks/useSocket';
import ProductList from '../components/Dashboard/ProductList';
import Logo from '../components/Logo';


export default function DashboardPage({ onLogout, mode, toggleMode }) {
  const { notification } = useSocket();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Inventory Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMode}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          >
            {mode === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            onClick={onLogout}
            className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-6">
        <Logo/>
        {notification && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            {notification.message}
          </div>
        )}
        <ProductList />
      </main>
    </div>
  );
}
