import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

function Navbar() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            {user ? (
              <>
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
                  <Link to="/stats" className="nav-link">📊 Stats</Link>
                </li>
                <li className="nav-item">
                  <Link to="/layout" className="nav-link">🎯 Layout</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link logout-btn">
                    Logout ({user.name})
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
