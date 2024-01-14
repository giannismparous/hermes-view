import React from "react";
import useScrollAnimation from './useScrollAnimation';
import "../styles/About.css"; // Make sure to create an About.css file with the styles

function About() {

  const scrollRef = useScrollAnimation();

  return (
    <div className="about" ref={scrollRef}>
      <section className='container golden-container animate-on-scroll'>
        <h1>About Us</h1>
      </section>
      <section className="container animate-on-scroll">
        <p>Founded in 2023 and proudly headquartered in Athens, Hermes View emerged with a visionary goal: to revolutionize the real estate landscape in Greece by simplifying the house-hunting experience. Recognizing the challenges faced by both prospective homeowners and real estate agencies, we embarked on a mission to bridge the gap between vision and reality. Our cutting-edge VR tours are meticulously designed to offer an interactive, immersive exploration of properties, transforming the way properties are showcased and experienced.</p>
        <p>At the heart of Hermes View lies a commitment to excellence. We understand the nuances of the real estate market and the evolving expectations of modern clients. By harnessing the power of technology, we empower agencies to present properties in their most authentic light, enabling clients to make informed decisions with confidence and clarity.</p>
        <p>Our journey is not just about creating tours; it's about enhancing connections. We believe that every home tells a story, and through our innovative solutions, we aim to narrate these tales in the most captivating manner. With Hermes View by their side, agencies can elevate their offerings, clients can embark on memorable virtual journeys, and the dream of finding the perfect home becomes more accessible than ever before.</p>
      </section>
    </div>
  );
}

export default About;