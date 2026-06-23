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
        <span className="section-label animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          🧬 AI-Powered Wellness Platform
        </span>

        <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <span className="gradient-text">Zenugo AI</span>
        </h1>

        <p className="hero__subtitle animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Your AI-powered health &amp; wellness companion. <br />
          Personalized insights, smart tracking, and 24/7 guidance — all in one place.
        </p>

        <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
          <a href="#features" className="btn btn-primary btn--lg" id="hero-cta-primary">
            <span>Get Started</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#chatbot" className="btn btn-secondary btn--lg" id="hero-cta-secondary">
            Try the Chat
          </a>
        </div>

        <div className="hero__stats animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="hero__stat">
            <span className="hero__stat-value">10K+</span>
            <span className="hero__stat-label">Active Users</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">98%</span>
            <span className="hero__stat-label">Satisfaction</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">24/7</span>
            <span className="hero__stat-label">AI Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
