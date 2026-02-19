import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PublicCV.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

function PublicCV() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL + '/api/cvs/share/' + shareId)
      .then(res => {
        if (!res.ok) throw new Error('CV not found');
        return res.json();
      })
      .then(data => {
        setCv(data);
        setLoading(false);
      })
      .catch(err => {
        setError('CV not found or link expired');
        setLoading(false);
      });
  }, [shareId]);

  const getTemplateColor = (template) => {
    const colors = {
      modern: '#667eea',
      professional: '#2c3e50',
      creative: '#e74c3c',
      executive: '#1e3c72',
      minimal: '#95a5a6',
      tech: '#0f172a',
      elegant: '#8e44ad',
      compact: '#16a085'
    };
    return colors[template] || '#667eea';
  };

  if (loading) {
    return (
      <div className="public-cv-container">
        <div className="loading">Loading CV...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-cv-container">
        <div className="error-card">
          <h1>🔗 CV Not Found</h1>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </div>
    );
  }

  const primaryColor = getTemplateColor(cv.template);

  return (
    <div className="public-cv-container">
      <div className="public-cv-header">
        <h1>📄 {cv.fullName}'s CV</h1>
        <p className="share-note">Shared via link • View only</p>
      </div>

      <div 
        className="public-cv-card"
        style={{ borderTop: '5px solid ' + primaryColor }}
      >
        {/* Header */}
        <div className="cv-header" style={{ background: primaryColor }}>
          <h2>{cv.fullName}</h2>
          <p>{cv.title || 'Professional'}</p>
        </div>

        {/* Contact */}
        <div className="cv-section contact-section">
          <h3>Contact</h3>
          <div className="contact-grid">
            {cv.email && (
              <div className="contact-item">
                <span className="icon">✉️</span>
                <a href={'mailto:' + cv.email}>{cv.email}</a>
              </div>
            )}
            {cv.phone && (
              <div className="contact-item">
                <span className="icon">📞</span>
                <a href={'tel:' + cv.phone}>{cv.phone}</a>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {cv.summary && (
          <div className="cv-section">
            <h3>Professional Summary</h3>
            <p>{cv.summary}</p>
          </div>
        )}

        {/* Experience */}
        {cv.experience && (
          <div className="cv-section">
            <h3>Work Experience</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{cv.experience}</p>
          </div>
        )}

        {/* Education */}
        {cv.education && (
          <div className="cv-section">
            <h3>Education</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{cv.education}</p>
          </div>
        )}

        {/* Skills */}
        {cv.skills && (
          <div className="cv-section">
            <h3>Skills</h3>
            <div className="skills-grid">
              {cv.skills.split(',').map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag"
                  style={{ background: primaryColor + '20', color: primaryColor }}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="public-cv-footer">
        <button onClick={() => window.print()} className="print-btn">
          🖨️ Print / Save PDF
        </button>
        <button onClick={() => navigate('/')} className="home-btn">
          🏠 Home
        </button>
      </div>
    </div>
  );
}

export default PublicCV;
