import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Templates from '../components/Templates';
import CVPreview from '../components/CVPreview';
import './CreateCV.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

function CreateCV() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const cvToEdit = location.state?.cvToEdit;

  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    template: 'modern'
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (cvToEdit) {
      setFormData({
        title: cvToEdit.title || '',
        fullName: cvToEdit.fullName || '',
        email: cvToEdit.email || '',
        phone: cvToEdit.phone || '',
        summary: cvToEdit.summary || '',
        experience: cvToEdit.experience || '',
        education: cvToEdit.education || '',
        skills: cvToEdit.skills || '',
        template: cvToEdit.template || 'modern'
      });
    }
  }, [cvToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTemplateSelect = (templateId) => {
    setFormData({
      ...formData,
      template: templateId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL + '/api/cvs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('✅ CV Saved Successfully!');
        navigate('/dashboard');
      } else {
        alert('❌ Error saving CV');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error connecting to server');
    }
  };

  return (
    <div className="create-cv-container" style={{ maxWidth: '1400px' }}>
      <h1>{cvToEdit ? 'Edit CV' : t.cvForm.title}</h1>
      
      <Templates 
        onSelectTemplate={handleTemplateSelect}
        selectedTemplate={formData.template}
      />

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <div style={{ flex: '1' }}>
          <form onSubmit={handleSubmit} className="cv-form">
            <div className="form-group">
              <label>{t.cvForm.cvTitle} <span className="required">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t.cvForm.fullName} <span className="required">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.cvForm.email} <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t.cvForm.phone}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t.cvForm.summary}</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>{t.cvForm.experience}</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>{t.cvForm.education}</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>{t.cvForm.skills}</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-btn">💾 Save CV</button>
              <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
              <button 
                type="button" 
                className="preview-btn"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? '📝 Hide Preview' : '👁️ Show Preview'}
              </button>
            </div>
          </form>
        </div>

        {showPreview && (
          <div style={{ flex: '1', position: 'sticky', top: '20px' }}>
            <CVPreview data={formData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCV;
