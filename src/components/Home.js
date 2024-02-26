import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import useScrollAnimation from './useScrollAnimation';
import SamplePage from "./SamplePage";
import ContactInfo from "./ContactInfo";
import VideoComponent from "./VideoComponent";
import {HashLoader} from "react-spinners";
import { addCollectionAndDocuments, cancelReservationByTableNumber, fetchTablesAvailability, signInWithGooglePopup } from "./firebase.utils";
import reservations_data from "./reservations_data";

function Home() {

  const logGoogleUser = async() => {
    const response = await signInWithGooglePopup();
    console.log(response);
  }

  const addToDb = async() => {

      const response = addCollectionAndDocuments("sample-restaurant", reservations_data);
      console.log(response);
  }

  const removeFromDb = async () => {
    try {
      // Assuming the reservation ID is known and provided here
      const reservationId = 2;
      const tableNumber = 6;
      
      await cancelReservationByTableNumber(reservationId, tableNumber);
      console.log(`Reservation with id: ${reservationId} was canceled for table ${tableNumber}`);
    } catch (error) {
      console.error("Error encountered while removing reservation", error);
    }
  };

  const scrollRef = useScrollAnimation();
  const images = [
    '../slider_images/pic1.jpg',
    '../slider_images/pic2.jpg',
  ];

  const [isVideoReady, setVideoReady] = useState(false);

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

  return (
    <div ref={scrollRef} className="home">
      {/* <ImageSlider images={images} /> */}
      {!isVideoReady && (
        <div className="loading-overlay">
          <div className="loader-container">
            <HashLoader type="Grid" color="#8a5a00" size={80}/>
          </div>
        </div>
      )}
      <VideoComponent onVideoReady={handleVideoReady} />
      <div style={{ opacity: isVideoReady ? 1 : 0 }}>
      <section className="container golden-container animate-on-scroll" style={{ opacity: isVideoReady ? 1 : 0 }}>
        <h1>Welcome to HermesView</h1>
        <p>Our company leverages its expertise in 360-degree technology to craft captivating brand experiences designed to inform and captivate viewers. Our commitment is to keep our clients at the forefront of immersive experiences. Our range of services includes 360 virtual tours, 360 car interiors, 360 photography as well as spherical photography. </p>
      </section>
      <section className="container services animate-on-scroll" style={{ opacity: isVideoReady ? 1 : 0 }}>
        <div className="centered-header">
          <h2>Our Services</h2>
        </div>
        <div className="services-content">
          <div className="text-content">
            <p>At Hermes View, we pride ourselves on offering state-of-the-art VR tours to cater to the diverse needs of real estate agencies. Our expansive range of services encompasses:</p>
            <ul className="dashed-list">
              <li>Luxurious Villas</li>
              <li>Charming Houses</li>
              <li>Modern Apartments</li>
              <li>Multi-floor Office Buildings</li>
              <li>Vibrant Retail Outlets</li>
              <li>Dynamic Co-working Spaces</li>
              <li>Inviting Gyms and Fitness Centers</li>
              <li>Serene Spa and Wellness Retreats</li>
              <li>Exclusive Event and Exhibition Halls</li>
            </ul>
            <p>With Hermes View, real estate agencies can present properties in the most captivating and innovative manner, ensuring prospective clients experience every facet of a space, no matter the type. Elevate your listings and captivate your audience with our immersive VR tours.</p>
          </div>
          <div className="image-content">
            <img src='../other_images/services.jpg' alt="Services" id="services_img" />
          </div>
        </div>
      </section>
      <div class="image-container-icons">
        <div class="image-content-icons">
          <img src="../icons/360.png" alt="360-icon" id="icons" />
          <p>Experience a space in full immersion with our 360 virtual tour service.</p>
        </div>
        <div class="image-content-icons">
          <img src="../icons/360-video.png" alt="360-icon" id="icons" />
          <p>A rig for every occasion. 4K – 12K capture with stereo or monoscopic options.</p>
        </div>
        <div class="image-content-icons">
          <img src="../icons/code.png" alt="360-icon" id="icons" />
          <p>We design, code & deploy each 360 virtual tour bespoke to your requirements.</p>
        </div>
      </div>
      <section className="sample-container animate-on-scroll" style={{ opacity: isVideoReady ? 1 : 0 }}>
        <div className="centered-header">
          <h2>Sample Project</h2>
        </div>
        <SamplePage
          redirectToSample={true}
          style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
        />
      </section>
      <section className="container animate-on-scroll" style={{ opacity: isVideoReady ? 1 : 0 }}>
        <div className="centered-header">
          <h2>Get in Touch</h2>
        </div>
        <p><a href="/contact">Contact us</a> to elevate your real estate experience together. Reach out to us today and discover how we can transform your property presentations with our cutting-edge VR tours</p>
      </section>
      </div>
      <ContactInfo style={{ opacity: isVideoReady ? 1 : 0 }}/>
      {/* <button onClick={logGoogleUser}>LOGIN</button> */}
      {/* <button onClick={addToDb}>ADD</button> */}
      {/* <button onClick={removeFromDb}>REMOVE</button> */}
      {/* <button onClick={async () => await fetchTablesAvailability(0, 2)}>AVAILABILITY</button> */}
    </div>
  );
}

export default Home;
