import React from "react";

function Sample3DModel() {
  const iframeStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    border: "none",  // Remove borders
    outline: "none", // Remove outline (focus border)
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* You can use an iframe or another component to embed your 3D Vista project */}
      <iframe
        title="3D Model XMAS"
        src="/3DModels/sample1/index.htm"  // Update the path accordingly
        style={iframeStyle}

        allowFullScreen
        
      ></iframe>
    </div>
  );
}

export default Sample3DModel;
