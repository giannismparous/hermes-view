import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import useScrollAnimation from './useScrollAnimation';
import '../styles/Contact.css';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xr7p4nn', 'template_slxggff', form.current, 'Ds0o_PNgxgdmtdIce')
      .then((result) => {
          alert('Message sent successfully!');
      }, (error) => {
          alert('Failed to send message, please try again.');
      });
  };

  const scrollRef = useScrollAnimation();

  return (
    <div className="contact" ref={scrollRef}>
      <section className="contact-container container animate-on-scroll">
        <h1>Reach out to us</h1>
        <p>Email us at hermesview@gmail.com or fill out the form below:</p>
        
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
    </div>
  );
}

export default Contact;
