import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'flex', gap: '5px', marginLeft: '20px' }}>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '5px 10px',
          background: language === 'en' ? 'white' : 'transparent',
          color: language === 'en' ? '#667eea' : 'white',
          border: '1px solid white',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        style={{
          padding: '5px 10px',
          background: language === 'es' ? 'white' : 'transparent',
          color: language === 'es' ? '#667eea' : 'white',
          border: '1px solid white',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🇪🇸 ES
      </button>
    </div>
  );
}

export default LanguageSwitcher;
