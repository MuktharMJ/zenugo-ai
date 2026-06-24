import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to hash after navigation to home page
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  const handleAnchorClick = (hash) => {
    setMobileOpen(false);
    // If already on home page, scroll directly
    if (location.pathname === '/') {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <span className="navbar__logo-icon">✦</span>
          <span className="navbar__logo-text">Zenugo AI</span>
        </Link>

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`} id="navbar-nav">
          <Link
            to="/#features"
            className="navbar__link"
            onClick={() => handleAnchorClick('#features')}
          >
            Features
          </Link>
          <Link
            to="/#chatbot"
            className="navbar__link"
            onClick={() => handleAnchorClick('#chatbot')}
          >
            Chat
          </Link>
          <Link
            to="/about"
            className="navbar__link"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/#hero"
            className="btn btn-primary navbar__cta"
            onClick={() => handleAnchorClick('#hero')}
          >
            Get Started
          </Link>
        </nav>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="navbar-hamburger"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
