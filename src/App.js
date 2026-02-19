import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateCV from './pages/CreateCV';
import Profile from './pages/Profile';
import TemplatesGallery from './pages/TemplatesGallery';
import StatsDashboard from './pages/StatsDashboard';
import DragDropCV from './pages/DragDropCV';
import PublicCV from './pages/PublicCV';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode-active');
    } else {
      document.body.classList.remove('dark-mode-active');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className={App }>
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-cv" element={<CreateCV />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/templates" element={<TemplatesGallery />} />
            <Route path="/stats" element={<StatsDashboard />} />
            <Route path="/layout" element={<DragDropCV />} />
            <Route path="/cv/:shareId" element={<PublicCV />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
