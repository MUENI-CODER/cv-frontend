import React from 'react';
import './CVPreview.css';

function CVPreview({ data }) {
  const getTemplateStyles = () => {
    const templates = {
      modern: {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#ffffff',
        text: '#333333',
        accent: '#f0f4ff'
      },
      professional: {
        primary: '#2c3e50',
        secondary: '#3498db',
        background: '#ffffff',
        text: '#2c3e50',
        accent: '#ecf0f1'
      },
      creative: {
        primary: '#e74c3c',
        secondary: '#f39c12',
        background: '#ffffff',
        text: '#2c3e50',
        accent: '#fde3e0'
      }
    };
    return templates[data.template] || templates.modern;
  };

  const styles = getTemplateStyles();

  return (
    <div className="cv-preview-container">
      <h3 style={{ marginBottom: '15px', color: '#333' }}>Live Preview</h3>
      <div 
        className="cv-preview"
        style={{
          background: styles.background,
          borderTop: '5px solid ' + styles.primary,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, ' + styles.primary + ', ' + styles.secondary + ')',
          color: 'white',
          padding: '25px'
        }}>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '1.8em' }}>
            {data.fullName || 'Your Name'}
          </h2>
          <p style={{ margin: '0', opacity: '0.9' }}>
            {data.title || 'Job Title'}
          </p>
        </div>

        {/* Contact Info */}
        {(data.email || data.phone) && (
          <div style={{ 
            padding: '20px',
            background: styles.accent,
            borderBottom: '1px solid ' + styles.primary + '20'
          }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {data.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: styles.primary }}>✉️</span>
                  <span style={{ color: styles.text }}>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: styles.primary }}>📞</span>
                  <span style={{ color: styles.text }}>{data.phone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Summary */}
        {data.summary && (
          <div style={{ padding: '20px' }}>
            <h3 style={{ color: styles.primary, marginBottom: '10px' }}>Professional Summary</h3>
            <p style={{ color: styles.text, lineHeight: '1.6' }}>{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && (
          <div style={{ padding: '0 20px 20px 20px' }}>
            <h3 style={{ color: styles.primary, marginBottom: '10px' }}>Experience</h3>
            <p style={{ color: styles.text, lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {data.experience}
            </p>
          </div>
        )}

        {/* Education */}
        {data.education && (
          <div style={{ padding: '0 20px 20px 20px' }}>
            <h3 style={{ color: styles.primary, marginBottom: '10px' }}>Education</h3>
            <p style={{ color: styles.text, lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {data.education}
            </p>
          </div>
        )}

        {/* Skills */}
        {data.skills && (
          <div style={{ padding: '0 20px 20px 20px' }}>
            <h3 style={{ color: styles.primary, marginBottom: '10px' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.skills.split(',').map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: styles.accent,
                    color: styles.primary,
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9em',
                    border: '1px solid ' + styles.primary + '30'
                  }}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data.fullName && !data.email && !data.summary && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
            <p>👈 Start typing to see your CV preview</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CVPreview;
