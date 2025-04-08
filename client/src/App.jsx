import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

const App = ({ mode, toggleMode }) => {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuthenticated = () => setAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            authenticated
              ? <Navigate to="/dashboard" replace />
              : <AuthPage onAuthenticated={handleAuthenticated} />
          }
        />
        <Route
          path="/dashboard"
          element={
            authenticated
              ? <DashboardPage onLogout={handleLogout} mode={mode} toggleMode={toggleMode} />
              : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={authenticated ? '/dashboard' : '/auth'} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
