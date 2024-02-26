import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SamplePage({ style, redirectToSample, modelPath, ...otherProps }) {

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
    <Fragment>
      {redirectToSample && <div {...otherProps}>
      <iframe title="3D Vista Project" src={modelPath} style={style} sandbox="allow-scripts allow-same-origin allow-top-navigation" allowFullScreen></iframe>
      {/* Clickable overlay */}
      {redirectToSample && <div className="overlay" style={overlayStyle} onClick={handleOverlayClick}></div>}
      </div>}
      {!redirectToSample && <div style={{ ...style }} {...otherProps}>
      <iframe title="3D Vista Project" src={modelPath} style={iframeStyle} sandbox="allow-scripts allow-same-origin allow-top-navigation" allowFullScreen></iframe>
      {/* Clickable overlay */}
      {redirectToSample && <div className="overlay" style={overlayStyle} onClick={handleOverlayClick}></div>}
      </div>}
    </Fragment>
    
  );
}

SamplePage.propTypes = {
  style: PropTypes.object,
  redirectToSample: PropTypes.bool,
};

SamplePage.defaultProps = {
  style: {
    width: "100vw",
    height: "100vh"
  },
  redirectToSample: false, // Default value, won't redirect by default
  modelPath: "/samples/sample1/index.htm"
};

export default SamplePage;
