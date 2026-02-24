import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://cv-backend-vcs8.onrender.com';

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL + '/health')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(err => {
        setError('Backend not running. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/create-cv');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <h1>CV Management System</h1>
      
      {loading && <p className="status">Loading...</p>}
      
      {error && <div className="status error">{error}</div>}
      
      {message && <div className="status success">✅ Connected: {message}</div>}

      <div className="cards">
        <div className="card">
          <h2>For Job Seekers</h2>
          <p>Create and manage your CVs with 16 professional templates</p>
          <button className="primary-btn" onClick={handleGetStarted}>Get Started</button>
        </div>
        <div className="card">
          <h2>For Recruiters</h2>
          <p>Find and manage candidates - view public CVs</p>
          <button className="primary-btn" onClick={handleSearch}>Search CVs</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
