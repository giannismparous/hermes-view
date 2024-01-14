import React, { useEffect, useState } from 'react';
import '../styles/ImageSlider.css';
import { Fade } from 'react-slideshow-image';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className="slide-container">
      <Fade
        duration={2000} // You can adjust the duration as needed
        transitionDuration={500} // You can adjust the transition duration as needed
        infinite
        indicators={false}
        arrows={false}
        onChange={(prevIndex, nextIndex) => setCurrentIndex(nextIndex)}
        currentIndex={currentIndex}
      >
        {images.map((image, index) => (
          <div key={index} className={`each-fade ${index === currentIndex ? 'active' : ''}`}>
            <div className="image-container">
              <img src={image} alt="" />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default ImageSlider;
