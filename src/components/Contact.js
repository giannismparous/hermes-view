import React, { Fragment, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import useScrollAnimation from './useScrollAnimation';
import '../styles/Contact.css';
import ContactInfo from './ContactInfo';
import { Helmet } from 'react-helmet-async';
import { addNewContactForm } from './firebase.utils';

function Contact() {
  const form = useRef();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID,
  //     process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  //     form.current,
  //     process.env.REACT_APP_EMAILJS_USER_ID)
  //     .then((result) => {
  //         alert('Message sent successfully!');
  //     }, (error) => {
  //         alert('Failed to send message, please try again.');
  //     });
  // };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    message: "",
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewContactFormToServer();
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addNewContactFormToServer = async () => {
    const response = await addNewContactForm(
      "form",
      formData.firstName,
      formData.lastName,
      formData.location,
      formData.email,
      formData.message,
    );
    console.log("Form submitted successfully!");
    alert("Form submitted successfully!");
  };

  const scrollRef = useScrollAnimation();

  return (
    <Fragment>
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
        
        <form className="contact-form" ref={form} onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          
          <label htmlFor="message">Your Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
          
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
      <ContactInfo/>
    </Fragment>
  );
}

export default Contact;
