import { useState, useRef, useEffect } from 'react';
import { HeartPulse, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ChatbotPreview.css';

const INITIAL_MESSAGES = [
  { role: 'bot', text: "Hi! I'm Zenugo AI 👋 How can I help with your wellness today?" },
];

const SUGGESTED = [
  'How much water should I drink?',
  'Give me a morning routine',
  'Tips for better sleep',
];

function ChatbotPreview() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInteract = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <section className="chatbot section" id="chatbot">
      <div className="container">
        <div className="chatbot__header">
          <span className="section-label">Live Preview</span>
          <h2 className="section-title">
            Meet your <span className="gradient-text">AI companion</span>
          </h2>
          <p className="section-subtitle">
            Experience a taste of how Zenugo AI understands and responds to your wellness needs.
          </p>
        </div>

        <div className="chatbot__window" id="chatbot-window">
          {showModal && (
            <div className="chatbot__modal-overlay">
              <div className="chatbot__modal animate-scale-in">
                <div className="chatbot__modal-icon">
                  <HeartPulse size={32} strokeWidth={2} />
                </div>
                <h3>Start your wellness journey</h3>
                <p>Create a free account to unlock:</p>
                <ul>
                  <li>✨ Personalized AI conversations</li>
                  <li>📚 Unlimited chat history</li>
                  <li>☁️ Secure cloud sync</li>
                  <li>🎯 Wellness recommendations</li>
                </ul>
                <div className="chatbot__modal-actions">
                  <Link to="/register" className="btn btn-primary">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Login
                  </Link>
                </div>
                <button
                  className="chatbot__modal-close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Window chrome */}
          <div className="chatbot__chrome">
            <div className="chatbot__dots">
              <span className="chatbot__dot chatbot__dot--red" />
              <span className="chatbot__dot chatbot__dot--yellow" />
              <span className="chatbot__dot chatbot__dot--green" />
            </div>
            <span className="chatbot__chrome-title">Zenugo AI Chat</span>
            <div className="chatbot__status">
              <span className="chatbot__status-dot" />
              <span>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot__messages" id="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot__msg chatbot__msg--${msg.role}`}>
                {msg.role === 'bot' && (
                  <div className="chatbot__avatar">
                    <HeartPulse aria-hidden="true" size={16} strokeWidth={2.5} />
                  </div>
                )}
                <div className="chatbot__bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          <div className="chatbot__suggestions">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                className="chatbot__suggestion"
                onClick={handleInteract}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className="chatbot__input-bar" onSubmit={handleInteract} id="chatbot-input-form">
            <input
              className="chatbot__input"
              type="text"
              placeholder="Ask Zenugo AI anything..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (!showModal && e.target.value) setShowModal(true);
              }}
              onClick={() => setShowModal(true)}
              id="chatbot-input"
            />
            <button
              type="submit"
              className="chatbot__send"
              id="chatbot-send"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChatbotPreview;
