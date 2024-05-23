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
    alert("Form submitted successfully!");
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="businessWebsite"
        placeholder="Business Website"
        value={formData.businessWebsite}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="postcode"
        placeholder="Postcode"
        value={formData.postcode}
        onChange={handleChange}
        required
      />
      <textarea
        name="extraComments"
        placeholder="Extra Comments"
        value={formData.extraComments}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LandingForm;
