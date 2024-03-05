import React from "react";
import SamplePage from "./SamplePage";
import "../styles/Samples.css";

function Samples() {

  return (
    <div className="samples">
        <div className="sample-container" style={{ marginTop: "50px" }}>
            <div className="centered-header">
                <h2>Sample 1</h2>
            </div>
            <SamplePage
            redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_1/"} sampleId={2}
            style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
            />
        </div>
        {/* <div className="sample-container">
            <div className="centered-header">
                <h2>Sample 2</h2>
            </div>
            <SamplePage
            redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_3/"} sampleId={4}
            style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
            />
        </div> */}
        <div className="sample-container">
            <div className="centered-header">
                <h2>Sample 3</h2>
            </div>
            <SamplePage
            redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_2/"} sampleId={3}
            style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
            />
        </div>
        <div className="sample-container" style={{marginBottom:'100px'}}>
            <div className="centered-header">
                <h2>3D Model Sample</h2>
            </div>
            <SamplePage
            redirectToSample={true} modelPath={"https://hermesview.com/3d-model-sample/"} sampleId={5}
            style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
            />
        </div>
    </div>
  );
}

export default Samples;
