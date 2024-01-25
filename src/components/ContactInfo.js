import React from "react";
import "../styles/ContactInfo.css";

function ContactInfo() {
  return (
    <div className="footer">
      <section className="contact-info">
        <p>Contact us:</p>
        <ul>
          <li>
            Phone: <a href="tel:+306945660821">+306945660821</a>
          </li>
          <li>
            Phone: <a href="tel:+306944470266">+306944470266</a>
          </li>
          <li>
            Phone: <a href="tel:+306983652602">+306983652602</a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ContactInfo;
