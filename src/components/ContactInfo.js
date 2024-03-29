import React from "react";
import { FaEnvelope, FaPhone, FaMapMarker } from "react-icons/fa";
import "../styles/ContactInfo.css";

function ContactInfo() {
  return (
    <div className="footer">
      <section className="contact-info">
        <h2>Contact us:</h2>
        <ul>
          <li>
            <a href="mailto:info@hermesview.com">info@hermesview.com <FaEnvelope color="rgb(0, 9, 128)"/></a>
          </li>
          <li>
            <a href="tel:+306945660821">+306945660821 <FaPhone color="rgb(0, 9, 128)"/></a>
          </li>
          <li>
            <a href="tel:+306944470266">+306944470266 <FaPhone color="rgb(0, 9, 128)"/></a>
          </li>
          {/* <li>
            <a href="tel:+306983652602">+306983652602 <FaPhone color="rgb(0, 9, 128)"/></a>
          </li> */}
          <li>
            <p>Athens, Greece <FaMapMarker color="rgb(0, 9, 128)"/></p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ContactInfo;
