import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import "../styles/NavigationBar.css";
import Logo from "./Logo";

function NavigationBar() {
  return (
    <nav>
      <div className="logo-container">
        <Logo />
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/products">Products</Link></li>
        <li><Link to="/projects">Projects</Link></li> */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      <div className="social-media-icons">
        {/* Replace '#' with your actual social media profile links */}
        <a href="https://www.facebook.com/profile.php?id=61555932080153" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://www.instagram.com/hermes_view/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="http://www.linkedin.com/shareArticle?mini=true&url=www.hermesview.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
    </nav>
  );
}

export default NavigationBar;