import React, { useState, useEffect } from 'react';
import '../styles/ImageScroller.css'; // Make sure to create an ImageScroller.css file for styling

const images = [
  '../project_images/intercontinental.jpg', // Replace with your image paths
  '../project_images/metromall.jpg',
  '../project_images/mercedes.jpg',
  '../project_images/electra.jpg',
];


function ImageScroller() {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-scroller">
      {images.map((image, index) => (
        <div
          key={image}
          className={`image ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
}

export default ImageScroller;