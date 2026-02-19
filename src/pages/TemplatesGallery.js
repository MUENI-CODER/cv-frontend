import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplatesGallery.css';

function TemplatesGallery() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const templates = [
    { id: 'modern', name: 'Modern', color: '#667eea', desc: 'Clean design' },
    { id: 'professional', name: 'Professional', color: '#2c3e50', desc: 'Business style' },
    { id: 'creative', name: 'Creative', color: '#e74c3c', desc: 'Artistic' },
    { id: 'executive', name: 'Executive', color: '#1e3c72', desc: 'Senior level' },
    { id: 'minimal', name: 'Minimal', color: '#95a5a6', desc: 'Simple' },
    { id: 'tech', name: 'Tech', color: '#0f172a', desc: 'Developer' },
    { id: 'elegant', name: 'Elegant', color: '#8e44ad', desc: 'Sophisticated' },
    { id: 'compact', name: 'Compact', color: '#16a085', desc: 'One page' }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#667eea', textAlign: 'center', marginBottom: '40px' }}>
        CV Templates Gallery
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {templates.map(t => (
          <div
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            style={{
              background: 'white',
              borderRadius: '10px',
              padding: '20px',
              cursor: 'pointer',
              border: selectedTemplate === t.id ? '3px solid ' + t.color : '2px solid #ddd',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              height: '150px',
              background: t.color,
              borderRadius: '8px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '3em'
            }}>
              📄
            </div>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{t.name}</h3>
            <p style={{ margin: '0', color: '#666' }}>{t.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => navigate('/create-cv', { state: { selectedTemplate } })}
          style={{
            padding: '15px 40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1em',
            cursor: 'pointer'
          }}
        >
          Use Selected Template
        </button>
      </div>
    </div>
  );
}

export default TemplatesGallery;
