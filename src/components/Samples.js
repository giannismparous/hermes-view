import React, { useEffect, useRef, useState } from "react";
import SamplePage from "./SamplePage";
import "../styles/Samples.css";
import { Helmet } from "react-helmet-async";
import SampleDisplay from "./SampleDisplay";
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from "react-router-dom";
import ContactInfo from "./ContactInfo";
import Services from "./Services";

function Samples() {

//   return (
//     <div className="samples">
//         <Helmet>
//             <title>Samples - HermesView</title>  
//             <meta name="description" content="Check out our sample projects."/>
//             <link rel="canonical" href="/samples"/>
//         </Helmet>
//         <div className="sample-container" style={{ marginTop: "50px" }}>
//             <div className="centered-header">
//                 <h2>Sample 1</h2>
//             </div>
//             <SamplePage
//             redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_1/"} sampleId={2}
//             style={{ width: "70vw", height: "35vw", border: "8px solid #006699", borderRadius: "10px", margin: "auto", outline: "none"}}
//             />
//         </div>
//         <div className="sample-container">
//             <div className="centered-header">
//                 <h2>Sample 2</h2>
//             </div>
//             <SamplePage
//             redirectToSample={true} modelPath={"https://giannismparous.github.io/vr_2/"} sampleId={3}
//             style={{ width: "70vw", height: "35vw", border: "8px solid #006699", borderRadius: "10px", margin: "auto", outline: "none"}}
//             />
//         </div>
//         <div className="sample-container" style={{marginBottom:'100px'}}>
//             <div className="centered-header">
//                 <h2>3D Model Sample</h2>
//             </div>
//             <SamplePage
//             redirectToSample={true} modelPath={"https://hermesview.com/3d-model-sample/"} sampleId={5}
//             style={{ width: "70vw", height: "35vw", border: "8px solid #006699", borderRadius: "10px", margin: "auto", outline: "none"}}
//             />
//         </div>
//     </div>
//   );
// }

const AnimatedHeading = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 500 },
  });

  return (
    <VisibilitySensor onChange={setIsVisible}>
      <animated.h1 className="heading" style={props}>{children}</animated.h1>
    </VisibilitySensor>
  );
};

const AnimatedParagraph = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 1000 },
  });

  return (
    <VisibilitySensor onChange={setIsVisible}>
      <animated.p className={`animated-paragraph ${className}`} style={props}>{children}</animated.p>
    </VisibilitySensor>
  );
};

return (
    // <div className="samples">
    //     <div className="sample-display-container">
    //       <div className="sample-item">
    //         <SampleDisplay modelPath={"https://giannismparous.github.io/vr_1/"} device={"iphone"} />
    //         <div className="sample-info">
    //           <h2>Kallithea Property</h2>
    //           <p>A petite luxury apartement in Athens, Kallithea.</p>
    //         </div>
    //       </div>
    //       <div className="sample-item">
    //         <div className="sample-info">
    //           <h2>Finders property in Kato Patisia</h2>
    //           <p>A recently built and semi-furnished luxury apartment in Kato Patisia. An assistan provides all the information needed for the exploration of the property.</p>
    //         </div>
    //         <SampleDisplay modelPath={"https://giannismparous.github.io/vr_5/"} device={"ipad"} />
    //       </div>
    //       <div className="sample-item">
    //         <SampleDisplay modelPath={"https://giannismparous.github.io/vr_4/"} device={"imac"} />
    //         <div className="sample-info">
    //           <h2>Madania Cafe Bar</h2>
    //           <p>An alternative cafe bistro in the area of Dafne. Take a look at its baroque design and festive atmosphere.</p>
    //         </div>
    //       </div>
    //       <div className="sample-item">
    //         <div className="sample-info">
    //           <h2>Neos Kosmos AirBnB</h2>
    //           <p>A neat spacious airbnb property read to accomodate families right in the heart of Athens.</p>
    //         </div>
    //         <SampleDisplay modelPath={"/samples/sample1/index.htm"} device={"ipad"} />
    //       </div>
    //     </div>
    //     <div className="sample-item">
    //         <SampleDisplay modelPath={"https://giannismparous.github.io/vr_3/"} device={"imac"} />
    //         <div className="sample-info">
    //           <h2>Athens Metro Mall</h2>
    //           <p>Explore this huge central shopping center. Have a glance at the dining and fashion options.</p>
    //         </div>
    //       </div>
    // </div>
    <div className="samples">
      <div className="invis-container"></div>
      <div className="helper-container">
        <h2>
          Samples
        </h2>
      </div>
      <div className="sample-display-container">
          {/* <div className="sample-item">
            <SampleDisplay modelPath={"/projects/1"} device={"iphone"} />
            <div className="sample-info">
              <AnimatedHeading>Kallithea Property</AnimatedHeading>
              <AnimatedParagraph>A petite luxury apartement in Athens, Kallithea.</AnimatedParagraph>
              <Link to="/projects/1" className="custom-font-5" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
          </div> */}
          <div className="sample-item">
            <div className="sample-info">
              <AnimatedHeading>Finders, Kato Patisia</AnimatedHeading>
              <AnimatedParagraph>A recently built and semi-furnished luxury apartment in Kato Patisia. An assistan provides all the information needed for the exploration of the property.</AnimatedParagraph>
              <Link to="/projects/5" className="custom-font-5" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"/projects/5"} device={"ipad"} />
          </div>
          {/* <div className="sample-item">
            <SampleDisplay modelPath={"/projects/4"} device={"imac"} />
            <div className="sample-info">
              <AnimatedHeading>Madania Cafe Bar</AnimatedHeading>
              <AnimatedParagraph>An alternative cafe bistro in the area of Dafne. Take a look at its baroque design and festive atmosphere.</AnimatedParagraph>
              <Link to="/projects/4" className="custom-font-5" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
          </div> */}
          {/* <div className="sample-item">
            <div className="sample-info">
              <AnimatedHeading>Neos Kosmos AirBnB</AnimatedHeading>
              <AnimatedParagraph>A neat spacious airbnb property read to accomodate families right in the heart of Athens.</AnimatedParagraph>
              <Link to="/sample" className="custom-font-5" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"/samples/sample1/index.htm"} device={"ipad"} />
          </div> */}
          {/* <div className="sample-item">
            <SampleDisplay modelPath={"/projects/3"} device={"iphone"} />
            <div className="sample-info">
              <AnimatedHeading>Athens Metro Mall</AnimatedHeading>
              <AnimatedParagraph>Explore this enormous central shopping center. Have a glance at the dining and fashion options.</AnimatedParagraph>
              <Link to="/projects/3" className="custom-font-5" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
          </div> */}
          {/* <div className="sample-item">
            <div className="sample-info">
              <AnimatedHeading>Black And White Fitness</AnimatedHeading>
              <AnimatedParagraph>Fan of fitness lifestyle? This gym offers anything you'll ever need, from pilates to TRX to weight lifting.</AnimatedParagraph>
              <Link to="/projects/3" className="custom-font-5" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"/projects/2"} device={"imac"} />
        </div> */}
      </div>
      <ContactInfo/>
    </div>
  );
}

export default Samples;
