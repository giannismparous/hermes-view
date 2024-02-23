// VideoComponent.js

import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import SplitTextJS from "split-text-js";
import "../styles/VideoComponent.css";

function VideoComponent({ onVideoReady }) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const titles = gsap.utils.toArray('.text-wrapper p');
    const tl = gsap.timeline({ repeat: -1 });

    titles.forEach((title) => {
      const splitTitle = new SplitTextJS(title);
      tl.from(splitTitle.chars, { opacity: 0, y: 80, rotateX: -90, stagger: 0.02 }, "<")
        .to(splitTitle.chars, { opacity: 0, y: -80, rotateX: 90, stagger: 0.02 }, "<1.2");
    });

    const videoElement = document.querySelector('video');

    const handleVideoReady = () => {
      setVideoReady(true);
      onVideoReady(); // Callback to notify the parent component
    };

    if (videoElement.readyState >= 3) {
      // If video is already ready, trigger the callback immediately
      handleVideoReady();
    } else {
      // Otherwise, add event listener for when the video is ready
      videoElement.addEventListener('canplaythrough', handleVideoReady);
    }

    return () => {
      tl.kill();
      videoElement.removeEventListener('canplaythrough', handleVideoReady);
    };
  }, [onVideoReady]);

  const isMobile = window.innerWidth <= 767; // Adjust the breakpoint as needed

  const handleVideoClick = () => {
    if (!videoReady) {
      // Start the video only if it's ready
      const video = videoRef.current;
      video.play();
    }
  };

  return (
    <div className="video-container">
      <video
        autoPlay
        muted
        loop
        width="100%"
        height="100%"
        playsInline // Add playsinline attribute
        ref={videoRef} // Add a ref to the video element
        onCanPlayThrough={() => {}} // Empty function to prevent ESLint warning
        onClick={handleVideoClick} // Add an onClick handler to start the video on mobile
      >
        <source
          src={isMobile ? "/videos/showcase-smartphone.mp4" : "/videos/showcase-pc.mp4"}
          type="video/mp4"
        />
      </video>
      <div className="text-wrapper">
        <p style={{ opacity: videoReady ? 1 : 0 }}>Hermes</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>View</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>The</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>Art</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>of</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>Virtual</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>Tours</p>
      </div>
    </div>
  );
}

export default VideoComponent;
