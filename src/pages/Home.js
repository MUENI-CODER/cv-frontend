import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

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
        setError('Backend not running. Start with: cd backend && npm run dev');
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>CV Management System</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && <div className="status error">{error}</div>}
      
      {message && <div className="status success">✅ Connected: {message}</div>}

      <div className="cards">
        <div className="card">
          <h2>For Job Seekers</h2>
          <p>Create and manage your CVs</p>
          <button onClick={() => navigate('/create-cv')}>Get Started</button>
        </div>
        <div className="card">
          <h2>For Recruiters</h2>
          <p>Find and manage candidates</p>
          <button onClick={() => navigate('/dashboard')}>Search CVs</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
