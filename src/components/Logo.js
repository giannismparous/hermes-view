import React from 'react';
import '../styles/Logo.css'; // Import the styles for the Logo

const logoImg='../logo/hermes-view-logo.png';

function Logo() {
  return (
    <img src={logoImg} alt="Hermes View Logo" className="logo" />
  );
}

export default Logo;