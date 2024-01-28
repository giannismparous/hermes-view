import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { gsap } from 'gsap';
import "../styles/NavigationBar.css";
import '../styles/Logo.css';
import Hamburger from "hamburger-react";

const menuImg = '../icons/menu.png';
const hermesviewImg = '../icons/hermes-view.png';

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

  useEffect(() => {
    // GSAP animation for menu items
    gsap.from(".text-fade-in", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, [menuOpen]);

  return (
    <nav>
      <div className={`nav-bar-items-container ${menuOpen ? 'menu-open' : ''}`}>
        {/* Use the Hamburger component with onClick handler */}
        <Hamburger
          label="Show menu"
          rounded
          hideOutline={false}
          direction="left"
          size={100}
          color="#8a5a00"
          duration={0.8}
          toggled={menuOpen}
          toggle={toggleMenu} // Use toggle prop to handle click
        />
        <img src={hermesviewImg} alt="hermes view logo" className="hermesview" />
      </div>
      <div className={`mobile-menu-overlay ${menuOpen ? 'visible' : ''}`} onClick={toggleMenu}></div>
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><Link to="/" onClick={toggleMenu} className="text-fade-in">Home</Link></li>
            <li><Link to="/sample" onClick={toggleMenu} className="text-fade-in">Sample</Link></li>
            <li><Link to="/about" onClick={toggleMenu} className="text-fade-in">About</Link></li>
            <li><Link to="/contact" onClick={toggleMenu} className="text-fade-in">Contact Us</Link></li>
            <li className="social-media-list">
              <a href="https://www.facebook.com/profile.php?id=61555932080153" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-fade-in">
                <FontAwesomeIcon icon={faFacebookF}  />
              </a>
              <a href="https://www.instagram.com/hermes_view/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-fade-in">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="http://www.linkedin.com/shareArticle?mini=true&url=www.hermesview.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-fade-in">
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