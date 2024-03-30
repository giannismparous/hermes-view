// VideoComponent.js

import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import SplitTextJS from "split-text-js";
import "../styles/VideoComponent.css";

function VideoComponent({ onVideoReady }) {

  const [videoReady, setVideoReady] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  const playIcon = "../icons/play_button.png"

  // useEffect(() => {
  //   const titles = gsap.utils.toArray('.text-wrapper p');
  //   const tl = gsap.timeline({ repeat: -1 });
  
  //   titles.forEach((title, index) => {
  //     const splitTitle = new SplitTextJS(title);
  //     tl.from(splitTitle.chars, { opacity: 0, y: 80, rotateX: -90, stagger: 0.07, duration: 1 }, `<0.5`)
  //       .to(splitTitle.chars, { opacity: 0, y: -80, rotateX: 90, stagger: 0.07, duration: 1 }, `<2`);
  //       // Adjust the duration (in seconds) and stagger delay to control the animation speed and delay between words
  //   });

  //   const videoElement = document.querySelector('video');

  //   const handleVideoReady = () => {
  //     setVideoReady(true);
  //     onVideoReady(); // Callback to notify the parent component
  //   };

  //   if (videoElement.readyState >= 3) {
  //     // If video is already ready, trigger the callback immediately
  //     handleVideoReady();
  //   } else {
  //     // Otherwise, add event listener for when the video is ready
  //     videoElement.addEventListener('canplaythrough', handleVideoReady);
  //   }

  //   return () => {
  //     tl.kill();
  //     videoElement.removeEventListener('canplaythrough', handleVideoReady);
  //   };
  // }, [onVideoReady]);

  const isMobile = window.innerWidth <= 767; // Adjust the breakpoint as needed

  const handleVideoClick = () => {
    const video = videoRef.current;
    const button = buttonRef.current;

    if (!videoPlaying) {
      // Start the video only if it's ready
      video.play();
      setVideoPlaying(true);
      // Fade out the button
      gsap.to(button, { opacity: 0, duration: 0.5, onComplete: () => {
        button.style.display = "none";
      }});
    } else {
      // Pause the video if it's playing
      video.pause();
      setVideoPlaying(false);
      // Fade in the button
      button.style.display = "block";
      gsap.to(button, { opacity: 1, duration: 0.5 });
    }
  };

  return (
    <div className="video-container">
      <video
        loop
        width="100%"
        height="100%"
        playsInline // Add playsinline attribute
        ref={videoRef} // Add a ref to the video element
        onCanPlayThrough={() => {}} // Empty function to prevent ESLint warning
        onClick={handleVideoClick} // Add an onClick handler to start the video on mobile
      >
        <source
          src={isMobile ? "https://raw.githubusercontent.com/giannismparous/hermes-view/main/public/videos/Google_Earth_VR_Edited_Compressed.mp4" : "https://raw.githubusercontent.com/giannismparous/hermes-view/main/public/videos/Google_Earth_VR_Edited_Compressed.mp4"}
          type="video/mp4"
        />
      </video>
      <div ref={buttonRef} className="icon-container" onClick={handleVideoClick}>
        <img src={playIcon} alt="Play icon" /> {/* Use the play icon */}
      </div>
      {/* <div className="text-wrapper">
        <p style={{ opacity: videoReady ? 1 : 0 }}>Hermes</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>View</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>The</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>Art</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>of</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>Virtual</p>
        <p style={{ opacity: videoReady ? 1 : 0 }}>Tours</p>
      </div> */}
    </div>
  );
}

export default VideoComponent;
