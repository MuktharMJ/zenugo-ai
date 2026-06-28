import { Mail, Code2, Cpu, Database, Server } from 'lucide-react';
import './DeveloperPage.css';

function DeveloperPage() {
  return (
    <div className="dev-page">
      <div className="container">
        <header className="dev-page__header animate-fade-in-up">
          <span className="section-label">Developer</span>
          <h1 className="dev-page__title">
            Built by <span className="gradient-text">Mukthar M J</span>
          </h1>
          <p className="dev-page__subtitle">
            A passion project turned full-stack AI platform. Exploring the intersection of human wellness and artificial intelligence.
          </p>
        </header>

        <div className="dev-page__content">
          {/* Profile Section */}
          <section className="dev-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="dev-profile">
              <div className="dev-profile__info">
                <h2>About Me</h2>
                <p>
                  I'm a Computer Science student and an aspiring Full-Stack Developer with a deep interest in building AI-powered web applications. 
                  Zenugo AI started as a prototype with the Gemini API and evolved into a production-ready multi-model platform via OpenRouter, designed to showcase modern web architecture and premium UX design.
                </p>
                <div className="dev-profile__links">
                  <a href="https://github.com/MuktharMJ" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mukthar-m-j-/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn
                  </a>
                  <a href="mailto:mjmukthar96@gmail.com" className="btn btn-secondary">
                    <Mail size={18} /> Contact
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture Section */}
          <section className="dev-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="dev-section__title">Project Architecture</h3>
            <div className="dev-grid">
              <div className="arch-card">
                <div className="arch-card__icon"><Code2 size={24} /></div>
                <h4>Frontend</h4>
                <p>React, React Router, Context API. Fully responsive, custom CSS variables for design tokens.</p>
              </div>
              <div className="arch-card">
                <div className="arch-card__icon"><Server size={24} /></div>
                <h4>Backend</h4>
                <p>Node.js, Express. RESTful API with modular route architecture.</p>
              </div>
              <div className="arch-card">
                <div className="arch-card__icon"><Database size={24} /></div>
                <h4>Database</h4>
                <p>MongoDB with Mongoose. Secure session storage and conversation history.</p>
              </div>
              <div className="arch-card">
                <div className="arch-card__icon"><Cpu size={24} /></div>
                <h4>AI Engine</h4>
                <p>OpenRouter API supporting advanced models like OpenAI, DeepSeek, and Gemini for context-aware responses.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DeveloperPage;
