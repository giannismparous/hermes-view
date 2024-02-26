import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SamplePage({ style, redirectToSample, modelPath, sampleId, ...otherProps }) {
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

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: redirectToSample ? "pointer" : "default",
    zIndex: 1,
  };

  const navigate = useNavigate();

  const handleOverlayClick = () => {
    // Redirect to "/sample" only if redirectToSample is true
    if (redirectToSample) {
      if (sampleId === 1) {
        navigate("/sample");
        console.log("Redirecting to /sample");
      } else if (sampleId === 2) {
        navigate("/projects/1");
        console.log("Redirecting to /projects/1");
      } else if (sampleId === 3) {
        navigate("/projects/2");
        console.log("Redirecting to /projects/2");
      } else if (sampleId === 4) {
        navigate("/projects/3");
        console.log("Redirecting to /projects/3");
      } else if (sampleId === 5) {
        navigate("/3d-model-sample");
        console.log("Redirecting to /3d-model-sample");
      }
    }
  };

  return (
    <Fragment>
      {redirectToSample && (
        <div style={{ ...containerStyle, ...style }} {...otherProps}>
          <iframe title="3D Vista Project" src={modelPath} style={iframeStyle} sandbox="allow-scripts allow-same-origin allow-top-navigation" allowFullScreen></iframe>
          {/* Clickable overlay */}
          <div className="overlay" style={overlayStyle} onClick={handleOverlayClick}></div>
        </div>
      )}
      {!redirectToSample && (
        <div style={{ ...containerStyle, ...style }} {...otherProps}>
          <iframe title="3D Vista Project" src={modelPath} style={iframeStyle} sandbox="allow-scripts allow-same-origin allow-top-navigation" allowFullScreen></iframe>
        </div>
      )}
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
