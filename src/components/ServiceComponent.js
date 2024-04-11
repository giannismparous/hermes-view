import React from 'react';
import '../styles/ServiceComponent.css'; // You can define your styles in Services.css


const ServiceComponent = ({ header, paragraph, list }) => {
    return (
        <div className="service-component">
            <div className='service-info-container'>
                <div>
                    <h2>{header}</h2>
                </div>
                <div>
                    <p>{paragraph}</p>
                    <ul>
                        {list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ServiceComponent;
