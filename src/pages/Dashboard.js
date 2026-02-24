import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://cv-backend-vcs8.onrender.com';

function Dashboard() {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Please login to view your CVs');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL + '/api/cvs', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      
      if (response.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
      
      const data = await response.json();
      setCvs(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      setError('Failed to load CVs. Please try again.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this CV?')) return;
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(API_URL + '/api/cvs/' + id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      
      if (response.ok) {
        setCvs(cvs.filter(cv => cv._id !== id));
      }
    } catch (error) {
      console.error('Error deleting CV:', error);
    }
  };

  const handleEdit = (cv) => {
    navigate('/create-cv', { state: { cvToEdit: cv } });
  };

  const handleShare = (shareId) => {
    const shareUrl = 'https://my-cv-manager.netlify.app/cv/' + shareId;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(shareId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generatePDF = (cv) => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.setTextColor(102, 126, 234);
    doc.text(cv.title || 'CV', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Name: ' + (cv.fullName || 'Not provided'), 20, 40);
    doc.text('Email: ' + (cv.email || 'Not provided'), 20, 50);
    doc.text('Phone: ' + (cv.phone || 'Not provided'), 20, 60);
    
    doc.save((cv.title || 'CV') + '.pdf');
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Your CVs</h1>
      {cvs.length === 0 ? (
        <div className="empty-state">
          <p>No CVs yet. Create your first CV!</p>
          <button className="create-btn" onClick={() => navigate('/create-cv')}>
            Create CV
          </button>
        </div>
      ) : (
        <div className="cv-grid">
          {cvs.map((cv) => (
            <div key={cv._id} className="cv-card">
              <h3>{cv.title || 'Untitled CV'}</h3>
              <p><strong>Name:</strong> {cv.fullName || 'Not provided'}</p>
              <p><strong>Email:</strong> {cv.email || 'Not provided'}</p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(cv)}>Edit</button>
                <button className="pdf-btn" onClick={() => generatePDF(cv)}>PDF</button>
                <button className="share-btn" onClick={() => handleShare(cv.shareId)}>
                  {copiedId === cv.shareId ? 'Copied!' : 'Share'}
                </button>
                <button className="delete-btn" onClick={() => handleDelete(cv._id)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="cv-card new" onClick={() => navigate('/create-cv')}>
            <h3>+ Create New CV</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
