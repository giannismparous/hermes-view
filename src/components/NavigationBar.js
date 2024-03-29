import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useMediaQuery } from 'react-responsive'; // Import media query hook
import Hamburger from 'hamburger-react'; // Import Hamburger component
import "../styles/NavigationBar.css";

const hermesViewWhiteImgPath = '../icons/hermes-view-logo-new-white.png';
const hermesViewBlueImgPath = '../icons/hermes-view-logo-new-blue.png';
const hermesViewImg = '../icons/hermes-view-logo.png';

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [logoIsHovered, setLogoIsHovered] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 }); // Check if screen width is <= 768px
  const isMobile2 = useMediaQuery({ maxWidth: 450 }); // Check if screen width is <= 768px

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterLogo = () => {
    setLogoIsHovered(true);
  };
  
  const handleMouseLeaveLogo = () => {
    setLogoIsHovered(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar" style={{ backgroundColor: isHovered ? 'rgb(23,20,38)' : scrollPosition === 0 ? 'transparent' : 'rgba(23,20,38,0.9)' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isMobile ? (
        <div className="nav-bar-items-container">
          <Link to="/" className="hermesview-link">
          {!isMobile2 && <img src={hermesViewWhiteImgPath} alt="hermes view logo" className="hermesview" style={{ height: "30px", width:"150px", top: "0px",left: "0px", marginTop:"20px", marginRight:"50px" }} />}
          {isMobile2 && <img src={hermesViewWhiteImgPath} alt="hermes view logo" className="hermesview" style={{ height: "20px", width:"80px", top: "0px",left: "0px", marginTop:"25px", marginRight:"50px" }} />}
          </Link>
          {!isMobile2 && <Hamburger
            label="Show menu"
            rounded
            hideOutline={false}
            direction="left"
            size={100}
            color="white"
            duration={0.8}
            toggled={menuOpen}
            toggle={toggleMenu}
          />}
          {isMobile2 && <Hamburger
            label="Show menu"
            rounded
            hideOutline={false}
            direction="left"
            size={30}
            color="white"
            duration={0.8}
            toggled={menuOpen}
            toggle={toggleMenu}
          />}
        </div>
      ) : (
        <div className="logo-container">
          <Link to="/" className="logo-container" onClick={toggleMenu}>
            <img src={((scrollPosition === 0 && !isHovered) || logoIsHovered) ? hermesViewBlueImgPath : hermesViewWhiteImgPath} onMouseEnter={handleMouseEnterLogo} onMouseLeave={handleMouseLeaveLogo} alt="Company Logo" className="logo"/>
          </Link>
        </div>
      )}
      {isMobile && (
        <div className={`mobile-menu-overlay ${menuOpen ? 'visible' : ''}`} onClick={toggleMenu}></div>
      )}
      <ul className={`nav-links ${menuOpen ? 'nav-links-activated' : 'nav-links-deactivated'}`}>
        <li><Link to="/" onClick={toggleMenu} className= {(scrollPosition === 0 && !isHovered && !isMobile) ? 'colored' : 'white'}>Home</Link></li>
        <li><Link to="/samples" onClick={toggleMenu} className= {(scrollPosition === 0 && !isHovered && !isMobile) ? 'colored' : 'white'}>Samples</Link></li>
        <li><Link to="/about" onClick={toggleMenu} className= {(scrollPosition === 0 && !isHovered && !isMobile) ? 'colored' : 'white'}>About</Link></li>
        <li><Link to="/contact" onClick={toggleMenu} className= {(scrollPosition === 0 && !isHovered && !isMobile) ? 'colored' : 'white'}>Contact Us</Link></li>
        <li className="social-media-list">
          <a href="https://www.facebook.com/profile.php?id=61555932080153" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className= {(scrollPosition === 0 && !isHovered && !isMobile) ? 'colored' : 'white'}>
            <FontAwesomeIcon icon={faFacebookF}  size='lg'/>
          </a>
          <a href="https://www.instagram.com/hermes_view/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className= {(scrollPosition === 0 && !isHovered && !isMobile) ? 'colored' : 'white'}>
            <FontAwesomeIcon icon={faInstagram} size='lg'/>
          </a>
          <a href="http://www.linkedin.com/shareArticle?mini=true&url=www.hermesview.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className= {(scrollPosition === 0 && !isHovered && !isMobile) ? 'colored' : 'white'}>
            <FontAwesomeIcon icon={faLinkedinIn} size='lg'/>
          </a>
        </li>
      </ul>
      {!isMobile && (
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? 'active' : ''}`}></div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
