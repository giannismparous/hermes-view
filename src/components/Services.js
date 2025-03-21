import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCalculator } from 'react-icons/fa';
import CardFlip from 'react-card-flip';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Services.css'; // You can define your styles in Services.css

const Services = () => {

    // Define your services data
    const services = [
        { title: 'Immersive Reservation System', path:'/services/reservation-system', description: 'Do you operate a restaurant or hotel? Have you thought of integrating a reservation system? Why not do it more immersive and engaging? Integrate a reservation system that combines the latest VR technologies', icon_path: '../icons/reservation-white.png' },
        { title: '360 Virtual Reality Tour', path:'/services/360-virtual-tour', description: `Transform your property into a 360 immersive virtual tour, whether it's airplanes, yachts, hotels, malls, restaurants, galleries, museums, or festivals. Navigation has never been easier.`, icon_path: '../icons/360-white.png' },
        { title: '360 Video', path:'/services/360-video', description: 'Make your Virtual Tour even more interactive by integrating 360 videos where real people can talk and engage with your audience.', icon_path: '../icons/360-video-white.png' },
        { title: '3D Modeling', path:'/services/3d-modeling', description: 'Transform tangible objects from the real world to the digital world. From small jewelry to elaborate airplanes.', icon_path: '../icons/3d-modeling-white.png' },
        // { title: 'Social Media', path:'/services/social-media', description: `Boost your brands social media presence with our tailored content.Let us craft engaging content that drives results for your brand.`, icon_path: '../icons/social-white.png' },
        // { title: 'Search Engine Optimization', description: 'Make your venture appear to even more audience. Organic viewers will find you without a problem.', icon_path: '../icons/seo-white.png' },
        // { title: 'Code Integration', description: 'Highly customisable features in every VR tour we offer. We have a solution to any of your problems. Imagination is the limit.', icon_path: '../icons/code-white.png' },
        // { title: 'Digital Marketing', path:'/services/digital-marketing', description: 'We focus on expanding your online reach, driving specific traffic to your website, enhancing brand visibility, and generating leads to acquire new customers.', icon_path: '../icons/digital-marketing-white.png' },
        // { title: 'Performance Marketing', path:'/services/performance-marketing', description: `Fuel your online success with our cross-platform ad performance service. Maximize ROI on Google, Meta, LinkedIn, and TikTok Ads. Let's elevate your brand's reach together!`, icon_path: '../icons/performance-white.png' },
        // { title: 'Website design & development', path:'/services/website-design', description: `Establish your online presence effortlessly with our website creation services. We specialize in crafting stunning websites customized to your brand, whether you're highlighting a portfolio or selling products online.`, icon_path: '../icons/website-white.png' },

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
                        {/* Link to the specified path */}
                        <p className="service-description">{service.description}</p>
                        <Link to={service.path} className="service-link">View Details</Link>
                    </div>
                </CardFlip>
            ))}
        </div>
    );
};

export default Services;
