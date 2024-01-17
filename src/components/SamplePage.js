import React from "react";

function SamplePage({ style }) {
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
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
  };

  return (
    <div style={{ ...defaultStyles, ...style }}>
      <iframe
        title="3D Vista Project"
        src="/samples/sample1/index.htm"
        style={iframeStyle}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default SamplePage;
