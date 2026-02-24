import React from 'react';
import './Templates.css';

function Templates({ onSelectTemplate, selectedTemplate }) {
  const templateItems = [
    { id: 'modern', name: 'Modern', color1: '#667eea', color2: '#764ba2' },
    { id: 'professional', name: 'Professional', color1: '#2c3e50', color2: '#3498db' },
    { id: 'creative', name: 'Creative', color1: '#e74c3c', color2: '#f39c12' },
    { id: 'executive', name: 'Executive', color1: '#1e3c72', color2: '#2a5298' },
    { id: 'minimal', name: 'Minimal', color1: '#95a5a6', color2: '#7f8c8d' },
    { id: 'tech', name: 'Tech', color1: '#0f172a', color2: '#3b82f6' },
    { id: 'elegant', name: 'Elegant', color1: '#8e44ad', color2: '#9b59b6' },
    { id: 'compact', name: 'Compact', color1: '#16a085', color2: '#1abc9c' },
    { id: 'corporate', name: 'Corporate', color1: '#1a237e', color2: '#ffd700' },
    { id: 'startup', name: 'Startup', color1: '#6d28d9', color2: '#0d9488' },
    { id: 'academic', name: 'Academic', color1: '#800020', color2: '#f5e6d3' },
    { id: 'medical', name: 'Medical', color1: '#0f4c5c', color2: '#a8e6cf' },
    { id: 'legal', name: 'Legal', color1: '#2c1810', color2: '#800000' },
    { id: 'creative2', name: 'Creative 2.0', color1: '#ff6b6b', color2: '#4ecdc4' },
    { id: 'minimalist', name: 'Minimalist', color1: '#2d3436', color2: '#b2bec3' },
    { id: 'prestige', name: 'Prestige', color1: '#000000', color2: '#c0c0c0' }
  ];

  return (
    <div className="templates-section">
      <h3>Choose Template ({templateItems.length} designs)</h3>
      <div className="templates-grid">
        {templateItems.map((item) => (
          <div
            key={item.id}
            className={	emplate-card }
            onClick={() => onSelectTemplate(item.id)}
          >
            <div 
              className="template-preview"
              style={{ 
                background: 'linear-gradient(135deg, ' + item.color1 + ', ' + item.color2 + ')'
              }}
            >
              <span className="template-icon">📄</span>
            </div>
            <h4>{item.name}</h4>
            {selectedTemplate === item.id && <span className="selected-badge">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
