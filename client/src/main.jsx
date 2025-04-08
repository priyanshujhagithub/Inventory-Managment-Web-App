import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const Root = () => {
    const [mode, setMode] = useState('light');
    const toggleMode = () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Sync <html> class for Tailwind dark mode
    useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark');
    }, [mode]);

    return <App mode={mode} toggleMode={toggleMode} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
