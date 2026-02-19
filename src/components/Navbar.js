import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          CV Manager
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">{t.nav.home}</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">{t.nav.dashboard}</Link>
            </li>
            <li className="nav-item">
              <Link to="/templates" className="nav-link">{t.nav.templates}</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-cv" className="nav-link">{t.nav.createCV}</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">{t.nav.profile}</Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="nav-link">📊 Stats</Link>
            </li>
            <li className="nav-item">
              <Link to="/layout" className="nav-link">🎯 Layout</Link>
            </li>
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
