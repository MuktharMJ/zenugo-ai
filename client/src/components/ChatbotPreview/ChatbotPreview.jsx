import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './ChatbotPreview.css';

const DEMO = [
  { role: 'bot', text: "Hi! I'm Zenugo AI 👋 How can I help with your wellness today?" },
  { role: 'user', text: 'How much water should I drink daily?' },
  { role: 'bot', text: "A good baseline is 2-3 liters daily, but it depends on your weight, activity, and climate. Would you like a personalized hydration plan?" },
];

const SUGGESTIONS = [
  'Build a morning routine',
  'Tips for better sleep',
  'Quick home workout',
];

function TypeWriter({ text, speed = 16, onDone }) {
  const [d, setD] = useState('');
  const i = useRef(0);
  useEffect(() => {
    i.current = 0; setD('');
    const iv = setInterval(() => {
      i.current++;
      setD(text.slice(0, i.current));
      if (i.current >= text.length) { clearInterval(iv); onDone?.(); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return <>{d}<span className="cp-cursor" /></>;
}

function ChatbotPreview() {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typingIdx, setTypingIdx] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const bodyRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center']
  });
  const windowY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const windowScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const windowOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Auto-play demo
  useEffect(() => {
    if (typingIdx >= DEMO.length) return;
    const msg = DEMO[typingIdx];
    const delay = typingIdx === 0 ? 800 : 1400;
    const timer = setTimeout(() => {
      if (msg.role === 'bot' && typingIdx > 0) {
        setShowDots(true);
        setTimeout(() => { setShowDots(false); setMessages(p => [...p, msg]); setTypingIdx(p => p + 1); }, 1800);
      } else {
        setMessages(p => [...p, msg]);
        setTypingIdx(p => p + 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [typingIdx]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, showDots]);

  const handleInteract = (e) => { e.preventDefault(); setShowModal(true); };

  return (
    <section className="showcase section" id="chatbot" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="showcase__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label"><Sparkles size={12} /> Experience</span>
          <h2 className="showcase__title">
            See it in action.
          </h2>
          <p className="showcase__sub">
            This is what a conversation with your AI wellness companion feels like.
          </p>
        </motion.div>

        <motion.div
          className="showcase__stage"
          style={{ y: windowY, scale: windowScale, opacity: windowOpacity }}
        >
          {/* Ambient layers */}
          <div className="showcase__glow showcase__glow--1" />
          <div className="showcase__glow showcase__glow--2" />
          <div className="showcase__reflection" />

          <div className="showcase__window" id="chatbot-window">
            {showModal && (
              <div className="showcase__modal-overlay">
                <div className="showcase__modal">
                  <div className="showcase__modal-icon">
                    <img src={logo} alt="" style={{ height: 28, width: 'auto' }} />
                  </div>
                  <h3>Start your wellness journey</h3>
                  <p>Create a free account to unlock personalized AI wellness guidance.</p>
                  <div className="showcase__modal-btns">
                    <Link to="/register" className="btn btn-primary">Get Started</Link>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                  </div>
                  <button className="showcase__modal-x" onClick={() => setShowModal(false)}>&times;</button>
                </div>
              </div>
            )}

            {/* Chrome */}
            <div className="showcase__chrome">
              <div className="showcase__dots">
                <span style={{ background: '#ef4444' }} />
                <span style={{ background: '#f59e0b' }} />
                <span style={{ background: '#10b981' }} />
              </div>
              <span className="showcase__chrome-title">Zenugo AI Chat</span>
              <div className="showcase__status"><span className="showcase__status-dot" />Online</div>
            </div>

            {/* Body */}
            <div className="showcase__body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`showcase__msg showcase__msg--${m.role}`}>
                  {m.role === 'bot' && (
                    <div className="showcase__avatar">
                      <img src={logo} alt="" style={{ height: 14, width: 'auto' }} />
                    </div>
                  )}
                  <div className="showcase__bubble">
                    {m.role === 'bot' && i === messages.length - 1 && typingIdx <= DEMO.length
                      ? <TypeWriter text={m.text} />
                      : m.text}
                  </div>
                </div>
              ))}
              {showDots && (
                <div className="showcase__msg showcase__msg--bot">
                  <div className="showcase__avatar">
                    <img src={logo} alt="" style={{ height: 14, width: 'auto' }} />
                  </div>
                  <div className="showcase__bubble showcase__bubble--dots">
                    <span /><span /><span />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="showcase__suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="showcase__pill" onClick={handleInteract}>{s}</button>
              ))}
            </div>

            {/* Input */}
            <form className="showcase__input" onSubmit={handleInteract} id="chatbot-input-form">
              <input
                type="text"
                placeholder="Ask Zenugo AI anything..."
                onClick={() => setShowModal(true)}
                readOnly
                id="chatbot-input"
                className="showcase__input-field"
              />
              <button type="submit" className="showcase__send" id="chatbot-send" aria-label="Send">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ChatbotPreview;
