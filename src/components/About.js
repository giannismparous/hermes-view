import React, { Fragment } from "react";
import useScrollAnimation from './useScrollAnimation';
import "../styles/About.css"; // Make sure to create an About.css file with the styles
import ContactInfo from "./ContactInfo";
import { Helmet } from "react-helmet-async";

function About() {

  const scrollRef = useScrollAnimation();

  return (
    <Fragment>
      <Helmet>
        <title>About - HermesView</title>  
        <meta name="description" content="About Us:
          HermesView emerged with a visionary goal, to revolutionize the real estate landscape in Greece by simplifying the house-hunting experience."/>
        <link rel="canonical" href="/about"/>
      </Helmet>
      <div className="about" ref={scrollRef}>
      <div className="about-info-container">
        <section className='container golden-container animate-on-scroll about-container'>
          <h1>About Us</h1>
        </section>
        <section className="container ">
        <p>Welcome to HermesView: Where Reality Meets Innovation</p>
        <p>We're not your average virtual reality tour company – we're here to redefine how you experience the world around you.</p>
        <p>Picture this: immersive VR tours that aren't just passive views, but interactive adventures. With clickable features, 360-degree videos, and even virtual guides chatting with you as you explore, we're taking virtual tours to a whole new level.</p>
        <p>But that's not all. We're also your go-to team for digital marketing magic. From crafting killer social media content to building sleek websites and running ads on all the hottest platforms – Google, Facebook, LinkedIn, TikTok – we've got your back.</p>
        <p>At HermesView, we're all about pushing boundaries and making the impossible, possible. Join us on this journey and let's make some digital dreams a reality. Ready to dive in? Let's chat!</p>
        </section>
        </div>
      </div>
      <ContactInfo/>
    </Fragment>
  );
}

export default About;