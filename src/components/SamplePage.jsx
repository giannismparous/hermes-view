import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SamplePage({ style, redirectToSample, ...otherProps }) {
  const defaultStyles = {
    position: "relative",
    width: "100vw",
    height: "100vh",
  };

  const iframeStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",  // Updated to 100% width
    height: "100%",
    border: "none",
    outline: "none",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: redirectToSample ? "pointer" : "default",
  };

  const navigate = useNavigate();

  const handleOverlayClick = () => {
    // Redirect to "/sample" only if redirectToSample is true
    if (redirectToSample) {
      navigate("/sample");
      console.log("Redirecting to /sample");
    }
  };

  return (
    <div style={{ ...defaultStyles, ...style }} {...otherProps}>
      <iframe title="3D Vista Project" src="/samples/sample1/index.htm" style={iframeStyle} allowFullScreen></iframe>
      {/* Clickable overlay */}
      <div className="overlay" style={overlayStyle} onClick={handleOverlayClick}></div>
    </div>
  );
}

SamplePage.propTypes = {
  style: PropTypes.object,
  redirectToSample: PropTypes.bool,
};

SamplePage.defaultProps = {
  style: {},
  redirectToSample: false, // Default value, won't redirect by default
};

export default SamplePage;
