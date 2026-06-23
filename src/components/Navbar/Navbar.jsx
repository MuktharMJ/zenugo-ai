import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Chat', href: '#chatbot' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo" id="navbar-logo">
          <span className="navbar__logo-icon">✦</span>
          <span className="navbar__logo-text">Zenugo AI</span>
        </a>

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`} id="navbar-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#hero" className="btn btn-primary navbar__cta" onClick={() => setMobileOpen(false)}>
            Get Started
          </a>
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
