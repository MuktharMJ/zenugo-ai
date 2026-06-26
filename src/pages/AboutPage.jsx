import { HeartPulse, CheckCircle2, ShieldCheck, Zap, Server, Code } from 'lucide-react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page" id="about-page-top">
      <div className="container">
        {/* Header section */}
        <header className="about-page__header animate-fade-in-up">
          <span className="section-label">About Zenugo AI</span>
          <h1 className="about-page__title">
            Empowering your <span className="gradient-text">health journey</span> with intelligence
          </h1>
          <p className="about-page__subtitle">
            Zenugo AI is a modern wellness platform designed to combine state-of-the-art artificial intelligence with seamless, secure, and personalized user experiences.
          </p>
        </header>

        {/* Vision & Mission */}
        <section className="about-page__section animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="about-page__grid-2">
            <div className="about-card">
              <h2 className="about-card__title">Our Vision</h2>
              <p className="about-card__text">
                To make personalized, actionable health insights universally accessible. We believe that AI can act as a tireless, empathetic companion that helps everyone live healthier, more balanced lives.
              </p>
            </div>
            <div className="about-card">
              <h2 className="about-card__title">Our Mission</h2>
              <p className="about-card__text">
                To build a secure, privacy-first platform that seamlessly integrates into daily life, providing users with the tools they need to track, understand, and improve their wellness.
              </p>
            </div>
          </div>
        </section>

        {/* Why Zenugo */}
        <section className="about-page__section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="about-page__section-title">Why Zenugo Exists</h2>
          <div className="about-card">
            <p className="about-card__text">
              The health and wellness space is often fragmented. You have trackers, symptom checkers, and generic blogs. Zenugo was created to bring everything into one focused, continuous dialogue. By leveraging AI with long-term memory and contextual understanding, we eliminate the friction of starting over every time you have a health question.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className="about-page__section animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="about-page__section-title">Responsible AI</h2>
          <div className="about-page__grid-3">
            <div className="about-feature">
              <ShieldCheck className="about-feature__icon text-green" size={32} />
              <h3 className="about-feature__title">Privacy First</h3>
              <p className="about-feature__text">We use enterprise-grade encryption. Your conversations remain yours alone.</p>
            </div>
            <div className="about-feature">
              <CheckCircle2 className="about-feature__icon text-blue" size={32} />
              <h3 className="about-feature__title">Evidence-Based</h3>
              <p className="about-feature__text">Our AI models are aligned to provide scientifically sound wellness guidance.</p>
            </div>
            <div className="about-feature">
              <HeartPulse className="about-feature__icon text-pink" size={32} />
              <h3 className="about-feature__title">Empathetic</h3>
              <p className="about-feature__text">Designed to listen, understand, and guide without judgment.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack Highlights */}
        <section className="about-page__section animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="about-page__section-title">Technology Stack</h2>
          <div className="about-page__tech-grid">
            <div className="tech-badge">
              <Code size={18} /> React
            </div>
            <div className="tech-badge">
              <Server size={18} /> Node.js & Express
            </div>
            <div className="tech-badge">
              <Zap size={18} /> Google Gemini AI
            </div>
            <div className="tech-badge">
              <Server size={18} /> MongoDB
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
