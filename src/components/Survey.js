import React from 'react';
import '../styles/Survey.css'; // Import CSS file for styling

const Survey = ({ formPath }) => {
  return (
    <div className="survey-container">
      <img src="../icons/hermes-view-logo-new-black.png" alt="" />
      <iframe title="survey" src={formPath} width="640" height="1656" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    </div>
  );
}

export default Survey;