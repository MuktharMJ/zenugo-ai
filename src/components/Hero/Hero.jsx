import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../../assets/logo.png';
import './Hero.css';

/* Mini chat messages that auto-play in the hero product shot */
const HERO_MESSAGES = [
  { role: 'user', text: 'How can I improve my sleep quality?' },
  { role: 'bot', text: "Great question! Here are 3 evidence-based strategies:\n\n1. Keep a consistent sleep schedule\n2. Limit screens 1 hour before bed\n3. Keep your room cool (65-68°F)\n\nWant me to create a personalized sleep routine?" },
  { role: 'user', text: 'Yes, for someone who wakes up at 7am' },
];

function TypeWriter({ text, speed = 16, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);
  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) { clearInterval(interval); onDone?.(); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <>{displayed}<span className="hero-chat__cursor" /></>;
}

function HeroChatWindow() {
  const [messages, setMessages] = useState([]);
  const [typingIdx, setTypingIdx] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (typingIdx >= HERO_MESSAGES.length) return;
    const msg = HERO_MESSAGES[typingIdx];
    const delay = typingIdx === 0 ? 1200 : 1800;
    const timer = setTimeout(() => {
      if (msg.role === 'bot') {
        setShowDots(true);
        setTimeout(() => { setShowDots(false); setMessages(p => [...p, msg]); setTypingIdx(p => p + 1); }, 2000);
      } else {
        setMessages(p => [...p, msg]);
        setTypingIdx(p => p + 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [typingIdx]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, showDots]);

  return (
    <div className="hero-chat">
      {/* Chrome */}
      <div className="hero-chat__chrome">
        <div className="hero-chat__dots">
          <span className="hero-chat__dot hero-chat__dot--r" />
          <span className="hero-chat__dot hero-chat__dot--y" />
          <span className="hero-chat__dot hero-chat__dot--g" />
        </div>
        <span className="hero-chat__title">Zenugo AI</span>
        <div className="hero-chat__status"><span className="hero-chat__status-dot" />Online</div>
      </div>
      {/* Messages */}
      <div className="hero-chat__body" ref={chatRef}>
        {messages.map((m, i) => (
          <div key={i} className={`hero-chat__msg hero-chat__msg--${m.role}`}>
            {m.role === 'bot' && (
              <div className="hero-chat__avatar">
                <img src={logo} alt="" style={{ height: 14, width: 'auto' }} />
              </div>
            )}
            <div className="hero-chat__bubble">
              {m.role === 'bot' && i === messages.length - 1 && typingIdx <= HERO_MESSAGES.length ? (
                <TypeWriter text={m.text} />
              ) : (
                m.text.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>
                ))
              )}
            </div>
          </div>
        ))}
        {showDots && (
          <div className="hero-chat__msg hero-chat__msg--bot">
            <div className="hero-chat__avatar">
              <img src={logo} alt="" style={{ height: 14, width: 'auto' }} />
            </div>
            <div className="hero-chat__bubble hero-chat__bubble--dots">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>
      {/* Input */}
      <div className="hero-chat__input-bar">
        <div className="hero-chat__input-field">Ask anything about your health...</div>
        <div className="hero-chat__send-circle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const chatY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const chatRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Background layers */}
      <div className="hero__mesh" />
      <div className="hero__grid" />
      <div className="hero__noise" />

      <div className="hero__layout container">
        {/* ===== TEXT COLUMN ===== */}
        <div className="hero__text">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="hero__badge-dot" />
            AI-Powered Wellness
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__title-top">Your wellness,</span>
            <span className="hero__title-bottom gradient-text">reimagined.</span>
          </motion.h1>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Personalized AI coaching that understands your
            health context, remembers your goals, and guides
            you 24/7. Start in seconds.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/register" className="btn btn-primary btn--lg hero__cta" id="hero-cta-primary">
              <span>Get Started Free</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a 
              href="#features" 
              className="btn btn-secondary btn--lg" 
              id="hero-cta-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How It Works
            </a>
          </motion.div>

          <motion.div
            className="hero__metrics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
          >
            <div className="hero__metric">
              <span className="hero__metric-val">AI</span>
              <span className="hero__metric-lbl">Wellness Coach</span>
            </div>
            <div className="hero__metric-sep" />
            <div className="hero__metric">
              <span className="hero__metric-val">24/7</span>
              <span className="hero__metric-lbl">Guidance</span>
            </div>
            <div className="hero__metric-sep" />
            <div className="hero__metric">
              <span className="hero__metric-val">Free</span>
              <span className="hero__metric-lbl">To Start</span>
            </div>
          </motion.div>
        </div>

        {/* ===== PRODUCT SHOT ===== */}
        <motion.div
          className="hero__visual"
          style={{ y: chatY, rotateZ: chatRotate }}
          initial={{ opacity: 0, y: 60, rotateZ: 2 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shadow layers for depth */}
          <div className="hero__shadow-layer hero__shadow-layer--1" />
          <div className="hero__shadow-layer hero__shadow-layer--2" />

          <HeroChatWindow />

          {/* Floating accent elements */}
          <motion.div className="hero__float hero__float--1" style={{ y: floatY }}>
            <img src={logo} alt="" style={{ height: 20, width: 'auto', opacity: 0.6 }} />
          </motion.div>
          <motion.div
            className="hero__float hero__float--2"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -40]) }}
          >
            <span className="hero__float-badge">✨ Personalized</span>
          </motion.div>
          <motion.div
            className="hero__float hero__float--3"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
          >
            <span className="hero__float-badge">🔒 Private & Secure</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
