import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="cv-header">
      <div className="header-container">
        <h1 className="header-title">CV Generator</h1>
        <p className="header-subtitle">Create your professional resume</p>
      </div>
    </header>
  );
};

export default Header;