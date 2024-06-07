import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SamplePage({ style, redirectToSample, modelPath, sampleId, ...otherProps }) {
  const iframeStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const overlayStyle = (visible) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: redirectToSample ? "pointer" : "default",
    zIndex: 1,
    display: visible ? "block" : "none",
  });

  const navigate = useNavigate();

  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const hideOverlay = setTimeout(() => setOverlayVisible(false), 300);
    return () => clearTimeout(hideOverlay);
  }, []);

  const handleOverlayClick = () => {
    if (redirectToSample) {
      let redirectUrl = "";
      switch (sampleId) {
        case 1:
          redirectUrl = "/sample";
          break;
        case 2:
          redirectUrl = "/projects/1";
          break;
        case 3:
          redirectUrl = "/projects/2";
          break;
        case 4:
          redirectUrl = "/projects/3";
          break;
        case 5:
          redirectUrl = "/3d-model-sample";
          break;
        default:
          redirectUrl = "/";
          break;
      }
      console.log("Redirecting to", redirectUrl);
      window.open(redirectUrl, "_blank"); // Open in a new tab
    }
  };

  return (
    <Fragment>
      <div style={{ ...containerStyle, ...style }} {...otherProps}>
        <div style={overlayStyle(overlayVisible)} onClick={handleOverlayClick}></div>
        <iframe
          title="3D Vista Project"
          src={modelPath}
          style={iframeStyle}
          sandbox="allow-scripts allow-popups allow-top-navigation allow-forms"
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  );
}

SamplePage.propTypes = {
  style: PropTypes.object,
  redirectToSample: PropTypes.bool,
  modelPath: PropTypes.string,
  sampleId: PropTypes.number,
};

SamplePage.defaultProps = {
  style: {
    width: "100vw",
    height: "100vh",
  },
  redirectToSample: false,
  modelPath: "/samples/sample1/index.htm",
  sampleId: 1,
};

export default SamplePage;
