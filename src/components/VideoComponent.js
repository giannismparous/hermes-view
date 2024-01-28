import React, { useEffect } from "react";
import gsap from 'gsap';
import SplitTextJS from "split-text-js";
import "../styles/VideoComponent.css"; // Add a new CSS file for styling

function VideoComponent() {
  useEffect(() => {
    const titles = gsap.utils.toArray('.text-wrapper p');
    const tl = gsap.timeline({ repeat: -1 }); // Set repeat to -1 for an infinite loop

    titles.forEach((title) => {
      const splitTitle = new SplitTextJS(title);
      tl.from(splitTitle.chars, { opacity: 0, y: 80, rotateX: -90, stagger: 0.02 }, "<")
        .to(splitTitle.chars, { opacity: 0, y: -80, rotateX: 90, stagger: 0.02 }, "<1.2");
    });

    return () => {
      tl.kill(); // Cleanup to prevent memory leaks
    };
  }, []);

  const isSmartphone = window.innerWidth <= 767; // Adjust the threshold based on your design

  return (
    <div className="video-container">
      <video autoPlay muted loop width="100%" height="100%">
      <source src={isSmartphone ? "/hermes-view-large-files/videos/showcase-smartphone.mp4" : "/hermes-view-large-files/videos/showcase-pc.mp4"} type="video/mp4" />
    </video>
      <div className="text-wrapper">
        <p>HermesView</p>
        <p>The</p>
        <p>Art</p>
        <p>of</p>
        <p>Virtual</p>
        <p>Tours</p>
      </div>
    </div>
  );
}

export default VideoComponent;
