// VideoComponent.js

import React, { useEffect, useState } from "react";
import gsap from 'gsap';
import SplitTextJS from "split-text-js";
import "../styles/VideoComponent.css";

function VideoComponent({ onVideoReady }) {
  const [videoReady, setVideoReady] = useState(false);

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

  return (
    <div className="video-container">
      <video
        autoPlay
        muted
        loop
        width="100%"
        height="100%"
        onCanPlayThrough={() => {}} // Empty function to prevent ESLint warning
      >
        <source src="/videos/showcase-pc.mp4" type="video/mp4" />
      </video>
      <div className="text-wrapper">
        <p style={{ opacity: videoReady ? 1 : 0 }}>HermesView</p>
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
