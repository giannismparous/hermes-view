import React from 'react';
import useScrollAnimation from './useScrollAnimation';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';

export const projectList1 = [
  {
    id: 1,
    name: 'Property',
    image: '../project_images/mercedes.jpg',
    info: "<p>A public address system (or PA system) is an electronic system comprising microphones, amplifiers, loudspeakers, and related equipment. It increases the apparent volume (loudness) of a human voice, musical instrument, or other acoustic sound source or recorded sound or music. PA systems are used in any public venue that requires that an announcer, performer, etc. be sufficiently audible at a distance or over a large area. Typical applications include sports stadiums, public transportation vehicles and facilities, and live or recorded music venues and events. A PA system may include multiple microphones or other sound sources, a mixing console to combine and modify multiple sources, and multiple amplifiers and loudspeakers for louder volume or wider distribution.</p><p>Simple PA systems are often used in small venues such as school auditoriums, churches, and small bars. PA systems with many speakers are widely used to make announcements in public, institutional and commercial buildings and locations—such as schools, stadiums, and passenger vessels and aircraft. Intercom systems, installed in many buildings, have both speakers throughout a building, and microphones in many rooms so occupants can respond to announcements. PA and Intercom systems are commonly used as part of an emergency communication system.</p>"
  },
  {
    id: 2,
    name: 'Property',
    image: '../project_images/galenica.jpg',
    info: ''
  },
  {
    id: 3,
    name: 'Property',
    image: '../project_images/metromall.jpg',
    info: "<p>These paging microphones are designed as a plug-and-play paging solution to work in combination with the AUDAC multi-zone audio matrixes.</p><br>-Push to talk button <br>-Audio transmission via Dante™/AES67 <br>-Fully flexible & configurable touchscreen (from AUDAC Touch™) <br>-Visual user feedback (LED’s) <br>-48V phantom power & XLR input that allows the use of various microphones <br>-PoE powered"
  },
  {
    id: 4,
    name: 'Property',
    image: '../project_images/intercontinental.jpg', 
    info: "<p>A mixing console or mixing desk is an electronic device for mixing audio signals, used in sound recording and reproduction and sound reinforcement systems. Inputs to the console include microphones, signals from electric or electronic instruments, or recorded sounds. Mixers may control analog or digital signals. The modified signals are summed to produce the combined output signals, which can then be broadcast, amplified through a sound reinforcement system or recorded.</p><p>Mixing consoles are used for applications including recording studios, public address systems, sound reinforcement systems, nightclubs, broadcasting, and post-production. A typical, simple application combines signals from microphones on stage into an amplifier that drives one set of loudspeakers for the audience. A DJ mixer may have only two channels, for mixing two record players. A coffeehouse's tiny stage might only have a six-channel mixer, enough for two singer-guitarists and a percussionist. A nightclub stage's mixer for rock music shows may have 24 channels for mixing the signals from a rhythm section, lead guitar and several vocalists. A mixing console in a professional recording studio may have as many as 96 channels.</p><p>In practice, mixers do more than simply mix signals. They can provide phantom power for condenser microphones; pan control, which changes a sound\'s apparent position in the stereo soundfield; filtering and equalization, which enables sound engineers to boost or cut selected frequencies to improve the sound; dynamic range compression, which allows engineers to increase the overall gain of the system or channel without exceeding the dynamic limits of the system; routing facilities, to send the signal from the mixer to another device, such as a sound recording system or a control room; and monitoring facilities, whereby one of a number of sources can be routed to loudspeakers or headphones for listening, often without affecting the mixer\'s main output.[2] Some mixers have onboard electronic effects, such as reverb. Some mixers intended for small venue live performance applications may include an integrated power amplifier.</p>"
  },
  {
    id: 5,
    name: 'Property',
    image: '../project_images/electra.jpg', 
    info: ""
  },
  {
    id: 6,
    name: 'Property',
    image: '../project_images/electra_athens.jpg', 
  },
  {
    id: 7,
    name: 'Property',
    image: '../project_images/diafano.jpg', 
  },
  {
    id: 8,
    name: 'Property',
    image: '../project_images/adidas.jpg', 
  },
]

export const projectList2=[
    {
    id: 9,
    name: 'Property',
    image: '../project_images/fairy_nail.jpg',
    },
    {
    id: 10,
    name: 'Property',
    image: '../project_images/ashley.jpg', 
    },
    {
    id: 11,
    name: 'Property',
    image: '../project_images/woman_secret.jpg', 
    },
  {
    id: 12,
    name: 'Property',
    image: '../project_images/EBEA.jpg', 
  },
  {
    id: 13,
    name: 'Property',
    image: '../project_images/court_of_appeal.jpg',
  },
  {
    id: 14,
    name: 'Property',
    image: '../project_images/areios_pagos.jpg', 
  },
  {
    id: 15,
    name: 'Property',
    image: '../project_images/ESHEA.jpg', 
  },
];

function Projects() {

  const scrollRef = useScrollAnimation();
  
  return (
    <div className='projects' ref={scrollRef}>
        <section className='projects-main container animate-on-scroll'>
            <h1>About our projects</h1>
        </section>
        <section className='projects-info container animate-on-scroll'>
          <p>Our dedication to pioneering virtual real estate experiences is fortified by our esteemed collaborations with industry frontrunners such as [Partner 1], [Partner 2], [Partner 3], and [Partner 4]. These esteemed entities mirror our zeal for innovation and immersive property presentations. [Partner 1]'s rich legacy in [specific expertise] equips us with avant-garde tools for virtual tours, while [Partner 2]'s unparalleled craftsmanship ensures every virtual space is depicted with precision and clarity. Leveraging the advanced capabilities of [Partner 3], a beacon in [specific domain], we deliver unmatched virtual reality solutions. Meanwhile, [Partner 4]'s expertise in [specific area] ensures that we cater comprehensively to the multifaceted demands of our clientele. Unified by our shared vision, alongside these distinguished partners, we are steadfast in redefining the future of virtual real estate exploration.</p>
        </section> 
        <div className='full-width-bg-colored'>
          <section className='projects-info container animate-on-scroll'>
            <div className='centered-header'>
              <h2>Projects</h2>
            </div>
            <div className="projects-containers-container animate-on-scroll">
                <div className="projects-container1">
                    {projectList1.map(project => (
                    <div key={project.id} className="project-item">
                      <Link to={`/projects/${project.id}`}>
                        <img src={project.image} alt={project.name} className="project-image" />
                        <h3 className="project-name">{project.name}</h3>
                      </Link>
                    </div>
                    ))}
                </div>
                <div className="projects-container2 animate-on-scroll">
                    {projectList2.map(project => (
                        <div key={project.id} className="project-item">
                            <Link to={`/projects/${project.id}`}>
                              <img src={project.image} alt={project.name} className="project-image" />
                              <h3 className="project-name">{project.name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
          </section>
        </div>
    </div>
    
  );
}

export default Projects;
