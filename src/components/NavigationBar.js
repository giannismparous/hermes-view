import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import "../styles/NavigationBar.css";
import '../styles/Logo.css'; // Import the styles for the Logo

const logoImg='../logo/hermes-view-logo.png';

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Add or remove the 'no-scroll' class based on the menuOpen state
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup the class on component unmount
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  return (
    <nav>
      <div className={`logo-container ${menuOpen ? 'menu-open' : ''}`}>
        <img src={logoImg} alt="Hermes View Logo" className="logo" onClick={toggleMenu}/>
      </div>
      <div className={`mobile-menu-overlay ${menuOpen ? 'visible' : ''}`} onClick={toggleMenu}></div>
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/sample" onClick={toggleMenu}>Sample</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>Contact Us</Link></li>
            <li className="social-media-list">
              <a href="https://www.facebook.com/profile.php?id=61555932080153" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF}  />
              </a>
              <a href="https://www.instagram.com/hermes_view/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="http://www.linkedin.com/shareArticle?mini=true&url=www.hermesview.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
