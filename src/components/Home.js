import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import useScrollAnimation from './useScrollAnimation';
import SamplePage from "./SamplePage";
import ContactInfo from "./ContactInfo";
import VideoComponent from "./VideoComponent";
import {HashLoader} from "react-spinners";
import reservations_data from "./reservations_data";
import { Helmet } from "react-helmet-async";
import Services from "./Services";
import SampleDisplay from "./SampleDisplay";
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Home() {

  const isMobile = useMediaQuery({ maxWidth: 1400 }); // Check if screen width is <= 768px

  // const logGoogleUser = async() => {
  //   const response = await signInWithGooglePopup();
  //   console.log(response);
  // }

//   const addDateAvailabilityToDb = async() => {

//     const response = updateDateAvailability("sample-restaurant");
// }

  // const addToDb = async() => {

  //     const response = addCollectionAndDocuments("sample-restaurant", reservations_data,1);
  //     console.log(response);
  // }

  


//   const add10DaysToDb = async() => {

//     const response = addCollectionAndDocuments("sample-restaurant", reservations_data,10);
// }

  

  const scrollRef = useScrollAnimation();
  const images = [
    '../slider_images/pic1.jpg',
    '../slider_images/pic2.jpg',
  ];

  const [isVideoReady, setVideoReady] = useState(true);

  const handleVideoReady = () => {
    setVideoReady(true);
  };

  useEffect(() => {
    // When component mounts, set overflow to hidden if video is not ready
    if (!isVideoReady) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Reset to default when video is ready
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoReady]);

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
    <div ref={scrollRef} className="home">
      <Helmet>
        <title>Home - HermesView</title>  
        <meta name="description" content="Welcome. Our company leverages its expertise in 360-degree technology. Our range of services includes 360 virtual reality tours, panoramic photography and reel making."/>
        <link rel="canonical" href="/"/>
      </Helmet>
      {/* <Parallax pages={3}>
        <ParallaxLayer speed={0} factor={1} style={{
        backgroundImage: `url('../other_images/olympus.png')`,
        backgroundPosition: 'center', // Center the image
        backgroundSize: "cover",
        margin: 0, // Add this to remove any default margin
        padding: 0, // Add this to remove any default padding
        }}>
        </ParallaxLayer>
        <ParallaxLayer offset={1} factor={1.5} speed={0} style={{
          backgroundImage: `url('../other_images/sky_bg.gif')`,
          backgroundSize: "cover",
          margin: 0, // Add this to remove any default margin
          padding: 0, // Add this to remove any default padding
        }}>
          </ParallaxLayer>
          <ParallaxLayer speed={0} sticky={{start:0.9,end:1.5}} style={{
          backgroundImage: `url('../other_images/vr-headset.gif')`,
          backgroundPosition: 'center', // Center the image
          margin: 0, // Add this to remove any default margin
          padding: 0, // Add this to remove any default padding
        }}></ParallaxLayer>
      </Parallax> */}
      {/* <ImageSlider images={images} /> */}
      {!isVideoReady && (
        <div className="loading-overlay">
          <div className="loader-container">
            <HashLoader type="Grid" color="#8a5a00" size={80}/>
          </div>
        </div>
      )}
      <VideoComponent onVideoReady={handleVideoReady} />
      {/* <div style={{ opacity: isVideoReady ? 1 : 0 }}> */}
      <section className="custom-font-1 container-1">
        <div className="hermes hermes-container">
          <AnimatedHeading>Hermes</AnimatedHeading>
        </div>
        <p>The messenger of the gods, known for his speed and ability to travel between realms</p>
        <div class="view-container view">
          <AnimatedHeading>View</AnimatedHeading>
        </div>
        <p>Unique perspectives and visual experiences</p><div className="custom-font-2">
        <AnimatedParagraph>Our commitment is to keep our clients at the forefront of immersive experiences.</AnimatedParagraph>
        </div>
      </section>
      <section className="container-2 white-navigation-color">
        <h1 className="our-services">Our Services</h1>
        <Services/>
      </section>
      <section className="sample-container" >
        <div className="centered-header">
          <h2>Projects</h2>
        </div>
        {!isMobile && <div className="sample-display-container">
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
              <Link to="/projects/5" style={{ textDecoration: 'none' }}>
                <AnimatedHeading>Urban Elegance Apartment</AnimatedHeading>
                <AnimatedParagraph>Experience contemporary luxury in this recently built, semi-furnished apartment. Offering a stylish living space with modern amenities. A dedicated assistant is available to provide all the information you need to explore this exquisite property.</AnimatedParagraph>
              </Link>
              <Link to="/projects/5" className="custom-font-5 view-project-text" style={{ color: 'rgb(194,125,106)' }}>View Project</Link>
            </div>
            <SampleDisplay modelPath={"https://giannismparous.github.io/vr_5/"} device={"ipad"}/>
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
        </div>}
        <div className="view-more-projects">
          <Link to="/samples"className="view-more-projects" style={{ color: 'rgb(194,125,106)' }}>View More</Link>
        </div>
      </section>
        <div className="invis-container"/>
        <section className="questions container-4">
          <div className="custom-font-3">
            <h2>Why choose us?</h2>
          </div>
          <div class="text-content">
            <div class="question-container">
              <div class="question-title">
                <strong>Excellent value</strong>
              </div>
              <p>We offer multiple pricing plans that fit each client's needs perfectly while offering the optimal value. Our commitment to superb quality ensures that our 360 virtual reality tours will look fresh and new for years to come, making them a highly cost-effective choice.</p>
            </div>
            <div class="question-container">
              <div class="question-title">
                <strong>Technical know-how</strong>
              </div>
              <p>Maintaining exceptional photographic quality doesn’t entail technical compromise. We consistently lead in technical advancements to ensure optimal delivery for your virtual reality tours. Our custom interfaces offer captivating, cross-platform user experiences, drawing viewers in. Additionally, our tours are meticulously crafted to deliver seamless performance across mobile devices.</p>
            </div>
            <div class="question-container">
              <div class="question-title">
                <strong>Flexibility</strong>
              </div>
              <p>If you require flexibility for your shoot due to various factors such as weather-dependent outdoor shots, feel free to discuss with us how our adaptable approach can cater to your needs.</p>
            </div>
            <div class="question-container">
              <div class="question-title">
                <strong>Smooth project management</strong>
              </div>
              <p>We strive to ensure that every virtual reality tour shoot is as hassle-free as possible for our clients, employing efficient project management from the initial commission to final delivery. Our team is readily available to assist at any point, ensuring that the shoot, production, and delivery proceed smoothly according to plan while also remaining responsive to any potential changes, ready to adapt swiftly to ensure a seamless process from start to finish.</p>
            </div>
            <div class="question-container">
              <div class="question-title">
                <strong>Diverse solutions</strong>
              </div>
              <p>At our core, we excel in providing immersive VR experiences, yet our expertise extends far beyond this realm. We pride ourselves on offering a diverse range of services tailored to meet the multifaceted needs of our clients. From captivating reels and expert video shooting to high-quality photography and comprehensive marketing solutions, we are dedicated to delivering exceptional results across various mediums. Our commitment to excellence ensures that we can cater to a wide array of projects, providing innovative solutions that exceed expectations.</p>
            </div>
          </div>
        </section>
        <section className="container-3" >
          <div class="grid-container">
            <div class="text-column custom-font-4">
              <div class="centered-header ">
                <h2>Ready to take your marketing to the next level?</h2>
              </div>
              <p>Book a demo and discovery call to get a look at:</p>
              <ul>
                <li>&#10004; How HermesView works</li>
                <li>&#10004; How you can promote you property in a more efficient and innovative manner</li>
                <li>&#10004; How you can increase your hotel and restaurant reservations</li>
                <li>&#10004; How we’re different from other VR tour agencies</li>
                <li>&#10004; The most suitable services, tailored for your needs</li>
              </ul>
            </div>
            <div class="form-column">
              <h2>Book a Call With Us</h2>
              <form>
                <div class="form-group">
                  <label for="first_name">First Name*:</label>
                  <input type="text" id="first_name" name="first_name" required />
                </div>
                <div class="form-group">
                  <label for="last_name">Last Name*:</label>
                  <input type="text" id="last_name" name="last_name" required />
                </div>
                <div class="form-group">
                  <label for="location">Location*:</label>
                  <input type="text" id="location" name="location" required />
                </div>
                <div class="form-group">
                  <label for="email">Email*:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                  <label for="message">Message:</label>
                  <textarea id="message" name="message"></textarea>
                </div>
                <div class="form-group">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      <ContactInfo /> 
    </div>
  );
}

export default Home;
