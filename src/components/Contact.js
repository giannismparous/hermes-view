import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import useScrollAnimation from './useScrollAnimation';
import '../styles/Contact.css';
import ContactInfo from './ContactInfo';
import { Helmet } from 'react-helmet-async';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_USER_ID)
      .then((result) => {
          alert('Message sent successfully!');
      }, (error) => {
          alert('Failed to send message, please try again.');
      });
  };

  const scrollRef = useScrollAnimation();

  return (
    <div className="contact" ref={scrollRef}>
      <Helmet>
        <title>Contact - HermesView</title>  
        <meta name="description" content="Reach out to us.
          Fill out the form below (Name, Email, Message)"/>
        <link rel="canonical" href="/contact"/>
      </Helmet>
      <section className="contact-container container animate-on-scroll">
        <h1>Reach out to us</h1>
        <p>Fill out the form below:</p>
        
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Your Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
          
          <button type="submit">Send Message</button>
        </form>
      </section>
      <ContactInfo/>
    </div>
  );
}

export default Contact;
