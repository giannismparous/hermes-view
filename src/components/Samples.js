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
import { useMediaQuery } from "react-responsive";

function Samples() {

  const isMobile = useMediaQuery({ maxWidth: 1400 }); // Check if screen width is <= 768px

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
    <div className="samples">
      {/* <div className="invis-container"></div> */}
      <div className="helper-container">
        <h2>
          Samples
        </h2>
      </div>
      {!isMobile && <div className="sample-display-container">
          <div className="sample-item">
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_1/"} device={"iphone"} />
            <div className="sample-info">
              <Link to="/projects/1" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Petite Luxury Apartment</AnimatedHeading>
                <AnimatedParagraph>Discover a recently renovated, semi-furnished gem in the heart of Athens. This elegant apartment combines modern comforts with timeless style, offering an ideal urban retreat for discerning individuals.</AnimatedParagraph>
              </Link>
              <Link to="/projects/1" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/5" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Urban Elegance Apartment</AnimatedHeading>
                <AnimatedParagraph>Experience contemporary luxury in this recently built, semi-furnished apartment. Offering a stylish living space with modern amenities. A dedicated assistant is available to provide all the information you need to explore this exquisite property.</AnimatedParagraph>
              </Link>
              <Link to="/projects/5" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_5/"} device={"ipad"} />
          </div>
          <div className="sample-item">
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_4/"} device={"imac"} />
            <div className="sample-info">
              <Link to="/projects/4" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Madania Cafe Bar</AnimatedHeading>
                <AnimatedParagraph>An alternative cafe bistro nestled in Dafni. Step into a world of baroque design, where ornate details and vintage charm create a unique and inviting ambiance. Enjoy a morning coffee, a leisurely lunch, or an evening cocktail.</AnimatedParagraph>
              </Link>
              <Link to="/projects/4" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/sample" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Family Haven AirBnB</AnimatedHeading>
                <AnimatedParagraph>A neat and spacious Airbnb property designed to comfortably accommodate families. This charming residence offers a perfect blend of comfort and convenience. With ample living space, modern amenities, and a warm, inviting atmosphere.</AnimatedParagraph>
              </Link>
              <Link to="/sample" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"/samples/sample1/index.htm"} device={"ipad"} />
          </div>
          <div className="sample-item">
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_3/"} device={"iphone"} />
            <div className="sample-info">
              <Link to="/projects/3" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Athens Metro Mall</AnimatedHeading>
                <AnimatedParagraph>Explore this enormous central shopping center. Have a glance at the dining and fashion options. Promising an unforgettable experience for all who visit.</AnimatedParagraph>
              </Link> 
              <Link to="/projects/3" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/2" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Black And White Fitness</AnimatedHeading>
                <AnimatedParagraph>Fan of fitness lifestyle? From pilates classes that improve flexibility and core strength to TRX sessions that build functional strength and endurance, there's something for every fitness enthusiast.</AnimatedParagraph>
              </Link>
              <Link to="/projects/2" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_2/"} device={"imac"} />
          </div>
          <div className="sample-item">
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_6/"} device={"iphone"} />
            <div className="sample-info">
              <Link to="/projects/6" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Blackpistol barbers</AnimatedHeading>
                <AnimatedParagraph> where classic grooming meets modern style. Located in the heart of the city, this barbershop is renowned for its top-notch service and cool, edgy atmosphere. Whether you're in for a quick trim or a complete transformation, our skilled barbers, Mike and Leon, have you covered.</AnimatedParagraph>
              </Link>
              <Link to="/projects/6" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
          </div>
        </div>}
        {isMobile && 
        <div className="sample-display-container">
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/1" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Petite Luxury Apartment</AnimatedHeading>
                <AnimatedParagraph>Discover a recently renovated, semi-furnished gem in the heart of Athens. This elegant apartment combines modern comforts with timeless style, offering an ideal urban retreat for discerning individuals.</AnimatedParagraph>
              </Link>
              <Link to="/projects/1" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_1/"} device={"iphone"} />
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/5" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Urban Elegance Apartment</AnimatedHeading>
                <AnimatedParagraph>Experience contemporary luxury in this recently built, semi-furnished apartment. Offering a stylish living space with modern amenities. A dedicated assistant is available to provide all the information you need to explore this exquisite property.</AnimatedParagraph>
              </Link>
              <Link to="/projects/5" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_5/"} device={"ipad"} />
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/4" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Madania Cafe Bar</AnimatedHeading>
                <AnimatedParagraph>An alternative cafe bistro nestled in Dafni. Step into a world of baroque design, where ornate details and vintage charm create a unique and inviting ambiance. Enjoy a morning coffee, a leisurely lunch, or an evening cocktail.</AnimatedParagraph>
              </Link>
              <Link to="/projects/4" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_4/"} device={"imac"} />
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/3" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Athens Metro Mall</AnimatedHeading>
                <AnimatedParagraph>Explore this enormous central shopping center. Have a glance at the dining and fashion options. Promising an unforgettable experience for all who visit.</AnimatedParagraph>
              </Link> 
              <Link to="/projects/3" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_3/"} device={"iphone"} />
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/2" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Black And White Fitness</AnimatedHeading>
                <AnimatedParagraph>Fan of fitness lifestyle? From pilates classes that improve flexibility and core strength to TRX sessions that build functional strength and endurance, there's something for every fitness enthusiast.</AnimatedParagraph>
              </Link>
              <Link to="/projects/2" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_2/"} device={"imac"} />
          </div>
          <div className="sample-item">
            <div className="sample-info">
              <Link to="/projects/6" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Blackpistol barbers</AnimatedHeading>
                <AnimatedParagraph> where classic grooming meets modern style. Located in the heart of the city, this barbershop is renowned for its top-notch service and cool, edgy atmosphere. Whether you're in for a quick trim or a complete transformation, our skilled barbers, Mike and Leon, have you covered.</AnimatedParagraph>
              </Link>
              <Link to="/projects/6" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_6/"} device={"iphone"} />
          </div>
        </div>}
        
      <ContactInfo/>
    </div>
  );
}

export default Samples;
