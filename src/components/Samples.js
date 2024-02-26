import React from "react";
import SamplePage from "./SamplePage";

function Samples() {

  return (
    <div className="samples">
        <SamplePage
          redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_1/"} sampleId={2}
          style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
        />
        <SamplePage
          redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_3/"} sampleId={4}
          style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
        />
        <SamplePage
          redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_2/"} sampleId={3}
          style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
        />
    </div>
  );
}

export default Samples;
