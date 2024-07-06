// src/components/Testimonial.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Testimonial.css';

const Testimonial = ({ name, date, content, stars = 5, profilePic }) => {
  const renderStars = () => {
    const starIcons = [];
    for (let i = 0; i < stars; i++) {
      starIcons.push(<span key={i} className="star">&#9733;</span>); // Unicode for star character
    }
    return starIcons;
  };

  return (
    <div className="testimonial-item">
      <div className="testimonial-details">
        <div className="testimonial-author">
          <div className="author-info">
            {profilePic ? (
              <img src={profilePic} alt={`Profile of ${name}`} className="profile-pic" />
            ) : (
              <div className="profile-pic-prompt">{Array.from(name)[0]}</div>
            )}
            <div className="author-name">{name}</div>
          </div>
          <div className="author-meta">
            <span className="testimonial-date">{date}</span>
            <div className="stars">
              {renderStars()}
            </div>
          </div>
          <div className="testimonial-content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  stars: PropTypes.number, // Default is 5 stars
  profilePic: PropTypes.string // URL for profile picture
};

export default Testimonial;
