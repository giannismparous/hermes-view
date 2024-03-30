import React, { Fragment } from "react";
import { useMediaQuery } from 'react-responsive'; // Import media query hook

function SampleDisplay({ device, modelPath }) {
  
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isMobile2 = useMediaQuery({ maxWidth: 420});

    const iframeStyle1= {
    position: "absolute",
    top: "3%",
    left: "7%",
    width: "85%",
    height: "93%",
    border: "none",
  };

  const iframeStyle2= {
    position: "absolute",
    top: "10%",
    left: "5%",
    width: "88%",
    height: "81%",
    border: "none",
  };

  const iframeStyle3= {
    position: "absolute",
    top: "18%",
    left: "6%",
    width: "89%",
    height: "54%",
    border: "none",
  };

  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
    pointerEvents: "none",
  };


  const iphoneContainer = {
    position: "relative",
    width: "400px",
    height: "750px",
  };

  const ipadContainer = {
    position: "relative",
    width: "700px",
    height: "900px",
  };

  const imacContainer = {
    position: "relative",
    width: "800px",
    height: "700px",
  };

  const iphoneContainer2 = {
    position: "relative",
    width: "200px",
    height: "500px",
  };

  const ipadContainer2 = {
    position: "relative",
    width: "400px",
    height: "600px",
  };

  const imacContainer2 = {
    position: "relative",
    width: "400px",
    height: "500px",
  };

  const iphoneContainer3 = {
    position: "relative",
    width: "200px",
    height: "500px",
  };

  const ipadContainer3 = {
    position: "relative",
    width: "250px",
    height: "400px",
  };

  const imacContainer3 = {
    position: "relative",
    width: "250px",
    height: "400px",
  };

  return (
    <Fragment>
        {!isMobile && <>
        {device==="iphone" && <div className="container-iphone" style={iphoneContainer}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle1}></iframe>
            <img src="../other_images/iphone.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        }
        {device==="ipad" && <div className="container-ipad" style={ipadContainer}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle2}></iframe>
            <img src="../other_images/ipad.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        } 
        {device==="imac" && <div className="container-imac" style={imacContainer}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle3}></iframe>
            <img src="../other_images/imac.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        } 
        </>
        }
        {isMobile && !isMobile2 && <>
        {device==="iphone" && <div className="container-iphone" style={iphoneContainer2}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle1}></iframe>
            <img src="../other_images/iphone.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        }
        {device==="ipad" && <div className="container-ipad" style={ipadContainer2}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle2}></iframe>
            <img src="../other_images/ipad.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        } 
        {device==="imac" && <div className="container-imac" style={imacContainer2}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle3}></iframe>
            <img src="../other_images/imac.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        } 
        </>
        }
        {isMobile2 && <>
        {device==="iphone" && <div className="container-iphone" style={iphoneContainer3}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle1}></iframe>
            <img src="../other_images/iphone.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        }
        {device==="ipad" && <div className="container-ipad" style={ipadContainer3}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle2}></iframe>
            <img src="../other_images/ipad.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        } 
        {device==="imac" && <div className="container-imac" style={imacContainer3}>
            <iframe src={modelPath} title="Iphone VR Experience" className="iframe" style={iframeStyle3}></iframe>
            <img src="../other_images/imac.png" alt="Iphone Layout" className="background-image" style={imageStyle}/>
            </div>
        } 
        </>
        }
    </Fragment>
  );
}

export default SampleDisplay;
