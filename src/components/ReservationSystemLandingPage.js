import React, { useState } from "react";
import { addNewLead } from "./firebase.utils";

const LandingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    businessWebsite: "",
    city: "",
    postcode: "",
    extraComments: "",
  });

  const addNewLeadToServer = async () => {
    const response = await addNewLead(
      "form",
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phoneNumber,
      formData.businessName,
      formData.businessWebsite,
      formData.city,
      formData.postcode,
      formData.extraComments
    );
    console.log("Form submitted successfully!");
    window.location.href = "https://hermesview.com/projects/4"; // Redirect to the desired URL
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewLeadToServer();
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  // Regular expression to validate website format
  const websiteRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(?:\/\S*)?$/;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="reservation-system-input"
        id="firstname"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="reservation-system-input"
        id="lastname"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="reservation-system-input"
        id="email"
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="reservation-system-input"
        id="phoneNumber"
      />
      <input
        type="text"
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
        className="reservation-system-input"
        id="businessName"
      />
      {/* <input
        type="text"
        name="businessWebsite"
        placeholder="Business Website (example.com)"
        value={formData.businessWebsite}
        onChange={handleChange}
        pattern={websiteRegex}
        className="reservation-system-input"
        id="businessWebsite"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
        className="reservation-system-input"
        id="city"
      />
      <input
        type="text"
        name="postcode"
        placeholder="Postcode"
        value={formData.postcode}
        onChange={handleChange}
        className="reservation-system-input"
        id="postcode"
      />
      <textarea
        name="extraComments"
        placeholder="Extra Comments"
        value={formData.extraComments}
        onChange={handleChange}
        className="reservation-system-input"
      ></textarea> */}
      <button type="submit" className="reservation-system-submit">Submit</button>
    </form>
  );
};

export default LandingForm;
