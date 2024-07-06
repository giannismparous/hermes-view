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
import { addNewContactForm } from "./firebase.utils";
import Testimonial from "./Testimonial";
import { Carousel } from 'react-bootstrap';

function Home() {

  const testimonials1 = [
    {
        name: 'Ioannis Aloukos',
        date: 'πριν από 6 μήνες',
        content: 'Πρόκειται για εξαιρετικό επαγγελματία, ο οποίος δίνει λύσεις σε όποιο ηλεκτρολογικό πρόβλημα προκύψει. Πάντα είνα πρόθυμος για να δώσει απαντήσεις στο τηλέφωνο και είναι συνεπής στα ραντεβού του.'
    },
    {
        name: 'Ivelina Nikolova',
        date: 'πριν από 3 μήνες',
        content: 'Έμεινα πολύ ευχαριστημένη από την γρήγορη και άμεση εξυπηρέτηση… Φοβερή οργάνωση και ποιοτική εργασία και πολύ ευγενέστατος !! Σας ευχαριστώ Κος Γεώργιος Ν. Βλάχος.'
    },
    {
        name: 'Yiouli Boida',
        date: 'πριν από 7 μήνες',
        content: 'Εξαιρετικός και ευγενικός άνθρωπος. Μου χάλασε η ασφάλεια του ψυγείου και ήρθε αμέσως! Σπάνιο πράγμα για τεχνικό. Σε λίγα λεπτά αποκαταστάθηκε το πρόβλημά μου.'
    },
    {
        name: 'ΓΙΩΡΓΟΣ ΕΞΑΚΟΪΔΗΣ',
        date: 'πριν από 6 μήνες',
        content: 'Ο μόνος ίσως ηλεκτρολόγος που έχει έρθει να με βοηθήσει και δεν ζήτησε λεφτά. πολύ καλό παιδί και πάντα σε βοηθάει ότι και να θες.'
    },
    {
        name: 'Emily kelemeni',
        date: 'πριν από 1 χρόνο',
        content: 'Εξαιρετικός επαγγελματίας! Ο κύριος Γιώργος πολύ ευγενικός! Πολύ καλές τιμές, άψογη δουλειά και πολύ άμεσος! Ευχαριστούμε για την συνεργασία!!! Τον συστήνω ανεπιφύλακτα!'
    },
    {
        name: 'Vagelis Tatsis',
        date: 'πριν από 11 μήνες',
        content: 'Εξαίρετος επαγγελματίας. Ευγενεστατος. Άψογος στην δουλειά του. Ανταποκρίθηκε άμεσα αν και ήταν Κυριακή και μάλιστα με καύσωνα. Συνεπεστατος ήρθε στην ώρα του. Βρήκε αμέσως το πρόβλημα και αποκατέστησε την βλάβη. Τον συστήνω ανεπιφύλακτα!'
    },
];

const testimonials2 = [
    {
        name: 'Fotios Gazis',
        date: 'πριν από 1 χρόνο',
        content: 'Εξαιρετικός ο κυριος Γιώργος πάντα πρόθυμος και εργατικός! Άριστες τιμές και τρομερή δουλειά! Τον προτείνω 100%!!!'
    },
    {
        name: 'Efsevios Kontopoulos',
        date: 'πριν από 7 μήνες',
        content: 'Πολύ γρήγορη και αποτελεσματική εξυπηρέτηση. Ήρθε την ίδια μέρα που του τηλεφωνήσαμε για να συνδέσουμε το τηλέφωνο και το wifi μας. Ευχαριστώ'
    },
    {
        name: 'alex papantoniou',
        date: 'πριν από 9 μήνες',
        content: 'Υπέροχος! Άμεση εξυπηρέτηση, με επαγγελματισμο, επίλυση προβλημάτων και υπέροχη συμπεριφορά! Σας ευχαριστούμε πολύ!'
    },
    {
        name: 'panayiotis papadakis',
        date: 'πριν από 1 χρόνο',
        content: 'Πολύ αξιόπιστος συνεπής βρήκε το πρόβλημα άμεσα και μου έκανε και πλήρης αλλαγή πίνακα και καλωδίωση.τον συνιστώ ανεπιφύλακτα'
    },
    {
        name: 'ΑΡΙΣΤΕΑ ΑΝΤΩΝΙΟΥ',
        date: 'πριν από 7 μήνες',
        content: 'Άψογη εξυπηρέτηση, ευγένεια, τυπικότητα, επαγγελματισμός, διάθεση για εξεύρεση πρακτικών λύσεων και τιμές που ανταποκρίνονται στο σήμερα !!! Θα συνεργαζομουν ξανά !!!!'
    },
    {
        name: 'Hlias Papas',
        date: 'πριν από 8 μήνες',
        content: 'Συστήνω τον Γιώργο ανεπιφύλακτα. Με εξυπηρέτησε άμεσα και με προθυμία ημέρα Κυριακή. Γρήγορος , προσεκτικός και έμπειρος.'
    },
]

const chunkTestimonials = (items, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        chunks.push(items.slice(i, i + chunkSize));
    }
    return chunks;
};

const [carouselConfig, setCarouselConfig] = useState({
    chunks1: chunkTestimonials(testimonials1, 3),
    chunks2: chunkTestimonials(testimonials2, 3),
    itemsPerSlide: 3,
});

useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1650) {
            setCarouselConfig({
                chunks1: chunkTestimonials(testimonials1, 3),
                chunks2: chunkTestimonials(testimonials2, 3),
                itemsPerSlide: 3,
            });
        } else if (window.innerWidth >= 750) {
            setCarouselConfig({
                chunks1: chunkTestimonials(testimonials1, 2),
                chunks2: chunkTestimonials(testimonials2, 2),
                itemsPerSlide: 2
            });
        }
        else {
            setCarouselConfig({
                chunks1: chunkTestimonials(testimonials1, 1),
                chunks2: chunkTestimonials(testimonials2, 1),
                itemsPerSlide: 1
            });
        }
    };

    handleResize(); // Call on component mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);

  const isMobile = useMediaQuery({ maxWidth: 1400 }); // Check if screen width is <= 768px

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    message: "",
  });

  const addNewContactFormToServer = async () => {
    const response = await addNewContactForm(
      "form",
      formData.firstName,
      formData.lastName,
      formData.location,
      formData.email,
      formData.message,
    );
    console.log("Form submitted successfully!");
    alert("Form submitted successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewContactFormToServer();
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

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
      {!isVideoReady && (
        <div className="loading-overlay">
          <div className="loader-container">
            <HashLoader type="Grid" color="#8a5a00" size={80}/>
          </div>
        </div>
      )}
      {/* <VideoComponent onVideoReady={handleVideoReady} /> */}
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

      {/* <div className="container mt-5">
      <section id="testimonials" className="text-center mt-5">
                    <h2 className="section-heading">Αξιολογήσεις πελατών</h2>
                    <div className="testimonials-container">
                        <Carousel className="testimonials-carousel" interval={null}>
                            {carouselConfig.chunks1.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <div className="testimonials-grid">
                                        {chunk.map((testimonial, idx) => (
                                            <Testimonial
                                                key={idx}
                                                name={testimonial.name}
                                                date={testimonial.date}
                                                content={testimonial.content}
                                                stars={testimonial.stars}
                                                profilePic={testimonial.profilePic}
                                            />
                                        ))}
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="testimonials-container">
                        <Carousel className="testimonials-carousel" interval={null}>
                            {carouselConfig.chunks2.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <div className="testimonials-grid">
                                        {chunk.map((testimonial, idx) => (
                                            <Testimonial
                                                key={idx}
                                                name={testimonial.name}
                                                date={testimonial.date}
                                                content={testimonial.content}
                                                stars={testimonial.stars}
                                                profilePic={testimonial.profilePic}
                                            />
                                        ))}
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </section>
                </div> */}

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
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="firstName">First Name*:</label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name*:</label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label for="location">Location*:</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label for="email">Email*:</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div class="form-group">
                  <label for="message">Message:</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
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
