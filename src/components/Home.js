import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import useScrollAnimation from './useScrollAnimation';
import SamplePage from "./SamplePage";
import ContactInfo from "./ContactInfo";
import VideoComponent from "./VideoComponent";
import {HashLoader} from "react-spinners";
import { addCollectionAndDocuments, cancelReservationByTableNumber, fetchTablesAvailability, signInWithGooglePopup, updateDateAvailability } from "./firebase.utils";
import reservations_data from "./reservations_data";
import { Helmet } from "react-helmet-async";

function Home() {

  const logGoogleUser = async() => {
    const response = await signInWithGooglePopup();
    console.log(response);
  }

  const addDateAvailabilityToDb = async() => {

    const response = updateDateAvailability("sample-restaurant");
}

  const addToDb = async() => {

      const response = addCollectionAndDocuments("sample-restaurant", reservations_data,1);
      console.log(response);
  }

  const add10DaysToDb = async() => {

    const response = addCollectionAndDocuments("sample-restaurant", reservations_data,10);
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
      <Helmet>
        <title>Home - HermesView</title>  
        <meta name="description" content="Welcome. Our company leverages its expertise in 360-degree technology. Our range of services includes 360 virtual tours, panoramic photography and reel making."/>
        <link rel="canonical" href="/"/>
      </Helmet>
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
            <p>At Hermes View, we pride ourselves on offering state-of-the-art VR tours to cater to the diverse needs of our partners. Our expansive range of services encompasses:</p>
            <ul className="dashed-list">
              <li>Luxurious Villas</li>
              <li>Charming Houses</li>
              <li>Modern Apartments</li>
              <li>Multi-floor Office Buildings</li>
              <li>Lavish yachts and jets</li>
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
      <div className="image-container-icons">
        <div className="image-content-icons">
          <img src="../icons/360.png" alt="360-icon" id="icons" />
          <p>Experience a space in full immersion with our 360 virtual tour service.</p>
        </div>
        <div className="image-content-icons">
          <img src="../icons/360-video.png" alt="360-icon" id="icons" />
          <p>A rig for every occasion. 4K – 12K capture with stereo or monoscopic options.</p>
        </div>
        <div className="image-content-icons">
          <img src="../icons/code.png" alt="360-icon" id="icons" />
          <p>We design, code & deploy each 360 virtual tour bespoke to your requirements.</p>
        </div>
      </div>
      <section className="sample-container animate-on-scroll" style={{ opacity: isVideoReady ? 1 : 0 }}>
        <div className="centered-header">
          <h2>Sample Project</h2>
        </div>
        <SamplePage
          redirectToSample={true} sampleId={1}
          style={{ width: "70vw", height: "35vw", border: "8px solid #8a5a00", borderRadius: "10px", margin: "auto", outline: "none"}}
        />
      </section>
      <section className="questions container">
        <div className="centered-header">
          <h2>Why do discerning clients choose us?</h2>
        </div>
        <div className="text-content">
          <div className="question-container">
            <div className="question-title">
              <strong>Excellent value:</strong>
            </div>
            <p>We offer multiple pricing plans that fit each client's needs perfectly while offering the optimal value. Our commitment to superb quality ensures that our 360 virtual tours will look fresh and new for years to come, making them a highly cost-effective choice.</p>
          </div>
          <div className="question-container">
            <div className="question-title">
              <strong>Technical know-how:</strong>
            </div>
            <p>Maintaining exceptional photographic quality doesn’t entail technical compromise. We consistently lead in technical advancements to ensure optimal delivery for your virtual tours. Our custom interfaces offer captivating, cross-platform user experiences, drawing viewers in. Additionally, our tours are meticulously crafted to deliver seamless performance across mobile devices.</p>
          </div>
          <div className="question-container">
            <div className="question-title">
              <strong>Flexibility:</strong>
            </div>
            <p>If you require flexibility for your shoot due to various factors such as weather-dependent outdoor shots, feel free to discuss with us how our adaptable approach can cater to your needs.</p>
          </div>
          <div className="question-container">
            <div className="question-title">
              <strong>Smooth project management:</strong>
            </div>
            <p>We strive to ensure that every virtual tour shoot is as hassle-free as possible for our clients, employing efficient project management from the initial commission to final delivery. Our team is readily available to assist at any point, ensuring that the shoot, production, and delivery proceed smoothly according to plan while also remaining responsive to any potential changes, ready to adapt swiftly to ensure a seamless process from start to finish.</p>
          </div>
          <div className="question-container">
          <div className="question-title">
              <strong>Diverse solutions:</strong>
            </div>
            <p>At our core, we excel in providing immersive VR experiences, yet our expertise extends far beyond this realm. We pride ourselves on offering a diverse range of services tailored to meet the multifaceted needs of our clients. From captivating reels and expert video shooting to high-quality photography and comprehensive marketing solutions, we are dedicated to delivering exceptional results across various mediums. Our commitment to excellence ensures that we can cater to a wide array of projects, providing innovative solutions that exceed expectations.</p>
          </div>
        </div>
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
      {/* <button onClick={add10DaysToDb}>ADD</button> */}
      {/* <button onClick={addDateAvailabilityToDb}>ADD</button> */}
      {/* <button onClick={removeFromDb}>REMOVE</button> */}
      {/* <button onClick={async () => await fetchTablesAvailability(0, 2)}>AVAILABILITY</button> */}
    </div>
  );
}

export default Home;
