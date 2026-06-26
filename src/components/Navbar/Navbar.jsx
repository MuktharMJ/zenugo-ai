import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

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

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <span className="navbar__logo-icon">
            <HeartPulse aria-hidden="true" size={24} strokeWidth={2.5} />
          </span>
          <span className="navbar__logo-text">Zenugo AI</span>
        </Link>

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`} id="navbar-nav">
          <Link
            to="/#features"
            className={`navbar__link ${location.pathname === '/' && location.hash === '#features' ? 'navbar__link--active' : ''}`}
            onClick={() => handleAnchorClick('#features')}
          >
            Features
          </Link>
          <Link
            to="/about"
            className={`navbar__link ${location.pathname === '/about' ? 'navbar__link--active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>

          {!loading && user ? (
            <>
              <Link
                to="/chat"
                className="navbar__link"
                onClick={() => setMobileOpen(false)}
              >
                Chat
              </Link>
              <button
                className="btn btn-primary navbar__cta"
                onClick={handleLogout}
                id="navbar-logout"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar__link"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary navbar__cta"
                onClick={() => setMobileOpen(false)}
                id="navbar-register"
              >
                Get Started
              </Link>
            </>
          )}
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
