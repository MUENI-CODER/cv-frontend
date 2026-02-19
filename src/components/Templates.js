import React from 'react';

function Templates({ onSelectTemplate, selectedTemplate }) {
  const templates = [
    { id: 'modern', name: 'Modern', color: '#667eea' },
    { id: 'professional', name: 'Professional', color: '#2c3e50' },
    { id: 'creative', name: 'Creative', color: '#e74c3c' },
    { id: 'executive', name: 'Executive', color: '#1e3c72' },
    { id: 'minimal', name: 'Minimal', color: '#95a5a6' },
    { id: 'tech', name: 'Tech', color: '#0f172a' },
    { id: 'elegant', name: 'Elegant', color: '#8e44ad' },
    { id: 'compact', name: 'Compact', color: '#16a085' }
  ];

  return (
    <div style={{ margin: '30px 0' }}>
      <h3 style={{ marginBottom: '15px' }}>Choose Template ({templates.length} designs)</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '10px'
      }}>
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectTemplate(t.id)}
            style={{
              padding: '15px 10px',
              border: selectedTemplate === t.id ? '3px solid ' + t.color : '2px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              background: selectedTemplate === t.id ? t.color + '20' : 'white',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '2em', marginBottom: '5px' }}>📄</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
