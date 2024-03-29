import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCalculator } from 'react-icons/fa';
import CardFlip from 'react-card-flip';
import '../styles/Services.css'; // You can define your styles in Services.css


const Services = () => {

    // Define your services data
    const services = [
        { title: '360 Virtual Tour', description: 'Transform your property into a 360 immersive virtual tour. Navigation has never been easier.', icon_path: '../icons/360-white.png' },
        { title: '360 Video', description: 'Make your Virtual Tour even more interactive by integrating 360 videos.', icon_path: '../icons/360-video-white.png' },
        { title: 'Real Estate Photography', description: 'Elabogantly captured jaw-dropping pictures of your apartment at its optimal state.', icon_path: '../icons/real-estate-photography-white.png' },
        { title: '3D Modeling', description: 'Transfer something from the real world to the digital world. From small jewelry to elaborate airplanes', icon_path: '../icons/3d-modeling-white.png' },
        { title: 'Social Media Marketing', description: 'Promote your business on social media to get even more reach. With VR technologies that far surpass the capabilities of regular photos and videos.', icon_path: '../icons/social-white.png' },
        { title: 'Search Engine Optimization', description: 'Make your venture appear to even more audience. Organic viewers will find you without a problem.', icon_path: '../icons/seo-white.png' },
        { title: 'Immersive Reservation System', description: 'Do you operate a restaurant or a business and thought of integrating a reservation system? Why not do it more immersive and engaging? Integrating a reservation system that combines the latest VR technologies', icon_path: '../icons/reservation-white.png' },
        { title: 'Code Integration', description: 'Highly customisable features in every VR tour we offer. We have a solution to any of your problems. Imagination is the limit.', icon_path: '../icons/code-white.png' },
    ];

    const [flipped, setFlipped] = useState(Array(services.length).fill(false));
    const [prevIndex, setPrevIndex] = useState(0);

    // Function to toggle the flipped state of a card on hover
    const handleHover = (index, isHovered) => {
        const newFlipped = [...flipped];
        if (prevIndex!==index){
            newFlipped[prevIndex] = false;
            setPrevIndex(index);
        }
        newFlipped[index] = isHovered;
        setFlipped(newFlipped);
    };

    return (
        <div className="services-container">
            {services.map((service, index) => (
                <CardFlip key={index} isFlipped={flipped[index]} flipDirection="horizontal">
                    {/* Front of the card */}
                    <div className="service-card front" onMouseEnter={() => handleHover(index, true)}>
                        <img src={service.icon_path} alt={service.title} className="service-icon" style={{ width: "80px" }} />
                        <h3 className="service-title">{service.title}</h3>
                    </div>
                    {/* Back of the card */}
                    <div className="service-card back" onMouseLeave={() => handleHover(index, false)}>
                        <p className="service-description">{service.description}</p>
                    </div>
                </CardFlip>
            ))}
        </div>
    );
};

export default Services;
