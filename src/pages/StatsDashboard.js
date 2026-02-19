import React, { useState } from 'react';

function StatsDashboard() {
  const [activeTab, setActiveTab] = useState('skills');

  const skillData = [
    { name: 'JavaScript', value: 90 },
    { name: 'React', value: 85 },
    { name: 'Node.js', value: 75 },
    { name: 'Python', value: 70 },
    { name: 'HTML/CSS', value: 95 },
    { name: 'TypeScript', value: 65 }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#667eea', textAlign: 'center', fontSize: '2.5em' }}>
        📊 CV Analytics Dashboard
      </h1>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '30px 0' }}>
        <button
          style={{
            padding: '10px 20px',
            background: activeTab === 'skills' ? '#667eea' : 'white',
            color: activeTab === 'skills' ? 'white' : '#667eea',
            border: '2px solid #667eea',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={() => setActiveTab('skills')}
        >
          Skills Analysis
        </button>
        <button
          style={{
            padding: '10px 20px',
            background: activeTab === 'experience' ? '#667eea' : 'white',
            color: activeTab === 'experience' ? 'white' : '#667eea',
            border: '2px solid #667eea',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={() => setActiveTab('experience')}
        >
          Experience Timeline
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        {activeTab === 'skills' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Skills Proficiency</h2>
            {skillData.map(skill => (
              <div key={skill.name} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>{skill.name}</span>
                  <span style={{ color: '#667eea', fontWeight: 'bold' }}>{skill.value}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '12px',
                  background: '#f0f0f0',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: skill.value + '%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    borderRadius: '6px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Experience Timeline</h2>
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p style={{ fontSize: '1.2em' }}>📈 Coming Soon: Interactive career timeline</p>
              <p style={{ marginTop: '10px' }}>Track your job history and promotions over time</p>
            </div>
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>Total CVs</h3>
          <p style={{ color: '#667eea', fontSize: '2.5em', fontWeight: 'bold' }}>24</p>
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>Skills Avg</h3>
          <p style={{ color: '#667eea', fontSize: '2.5em', fontWeight: 'bold' }}>78%</p>
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;
