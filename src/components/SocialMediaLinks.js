import React from 'react';
import '../styles/SocialMediaLinks.css'; // Make sure to create a SocialMediaLinks.css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


function SocialMediaLinks() {
  return (
    <div className="social-media-links">
      {/* Replace '#' with your actual social media profile links */}
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      {/* Add more social media links as needed */}
    </div>
  );
}

export default SocialMediaLinks;
