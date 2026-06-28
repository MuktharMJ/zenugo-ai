import { Mail, MessageSquare, Globe } from 'lucide-react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-page__inner">
          <header className="contact-page__header animate-fade-in-up">
            <span className="section-label">Get in Touch</span>
            <h1 className="contact-page__title">
              Let's start a <span className="gradient-text">conversation</span>
            </h1>
            <p className="contact-page__subtitle">
              Have questions about Zenugo AI? Want to collaborate or share feedback? I'd love to hear from you.
            </p>
          </header>

          <div className="contact-page__grid animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Contact Options */}
            <div className="contact-options">
              <a href="mailto:mjmukthar96@gmail.com" className="contact-card">
                <div className="contact-card__icon"><Mail size={24} /></div>
                <div className="contact-card__content">
                  <h3>Email</h3>
                  <p>mjmukthar96@gmail.com</p>
                </div>
              </a>

              <a href="https://github.com/MuktharMJ" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card__icon"><Globe size={24} /></div>
                <div className="contact-card__content">
                  <h3>GitHub</h3>
                  <p>github.com/MuktharMJ</p>
                </div>
              </a>
              
              <div className="contact-card">
                <div className="contact-card__icon"><MessageSquare size={24} /></div>
                <div className="contact-card__content">
                  <h3>Feedback</h3>
                  <p>Always open to feature requests.</p>
                </div>
              </div>
            </div>

            {/* Form Placeholder */}
            <div className="contact-form-card">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="4" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
