import React from 'react';
import logoImage from '../logo/hermes-view-logo.png';
import '../styles/Logo.css'; // Import the styles for the Logo

function Logo() {
  return (
    <img src={logoImage} alt="Hermes View Logo" className="logo" />
  );
}

export default Logo;