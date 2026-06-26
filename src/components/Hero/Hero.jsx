import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__grid-overlay" />

      <div className="hero__content container">
        <span className="section-label animate-fade-in-up" style={{ animationDelay: '0.1s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles aria-hidden="true" size={14} /> AI-Powered Wellness Platform
        </span>

        <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <span className="gradient-text">Zenugo AI</span>
        </h1>

        <p className="hero__subtitle animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Your AI-powered health &amp; wellness companion. <br />
          Personalized insights, smart tracking, and 24/7 guidance — all in one place.
        </p>

        <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
          <Link to="/register" className="btn btn-primary btn--lg" id="hero-cta-primary">
            <span>Start Free</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <a href="#chatbot" className="btn btn-secondary btn--lg" id="hero-cta-secondary">
            See It in Action
          </a>
        </div>

        <div className="hero__stats animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="hero__stat">
            <span className="hero__stat-value">AI</span>
            <span className="hero__stat-label">Wellness Coach</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">Daily</span>
            <span className="hero__stat-label">Health Tracking</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">24/7</span>
            <span className="hero__stat-label">Guidance</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
