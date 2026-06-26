import { useEffect, useRef, useState } from 'react';
import {
  Brain,
  MessageSquare,
  Lock,
  History,
  Zap,
  Shield,
  Smartphone,
  Search,
  Target,
  Sparkles
} from 'lucide-react';
import './Features.css';

const FEATURES = [
  {
    icon: <Brain aria-hidden="true" size={24} color="#6366f1" strokeWidth={1.5} />,
    title: 'AI Health Assistant',
    description: 'Get personalized recommendations powered by advanced AI.',
    accent: '#6366f1',
    size: 'large'
  },
  {
    icon: <History aria-hidden="true" size={24} color="#06b6d4" strokeWidth={1.5} />,
    title: 'Persistent Chat History',
    description: 'Never lose a conversation. Pick up right where you left off across any device.',
    accent: '#06b6d4',
    size: 'large'
  },
  {
    icon: <MessageSquare aria-hidden="true" size={24} color="#10b981" strokeWidth={1.5} />,
    title: 'Multi-Conversation',
    description: 'Organize your health topics into separate, focused conversations.',
    accent: '#10b981',
    size: 'small'
  },
  {
    icon: <Lock aria-hidden="true" size={24} color="#f59e0b" strokeWidth={1.5} />,
    title: 'Secure Authentication',
    description: 'Enterprise-grade security for your data.',
    accent: '#f59e0b',
    size: 'small'
  },
  {
    icon: <Target aria-hidden="true" size={24} color="#ec4899" strokeWidth={1.5} />,
    title: 'Personalized Guidance',
    description: 'Tailored specifically to your unique wellness goals.',
    accent: '#ec4899',
    size: 'small'
  },
  {
    icon: <Search aria-hidden="true" size={24} color="#8b5cf6" strokeWidth={1.5} />,
    title: 'Conversation Search',
    description: 'Find past advice instantly with fast search capabilities.',
    accent: '#8b5cf6',
    size: 'small'
  },
  {
    icon: <Zap aria-hidden="true" size={24} color="#eab308" strokeWidth={1.5} />,
    title: 'Fast Responses',
    description: 'Experience ultra-fast AI inference for real-time coaching.',
    accent: '#eab308',
    size: 'small'
  },
  {
    icon: <Shield aria-hidden="true" size={24} color="#14b8a6" strokeWidth={1.5} />,
    title: 'Privacy First',
    description: 'Your health data is yours. We never share it.',
    accent: '#14b8a6',
    size: 'small'
  },
  {
    icon: <Smartphone aria-hidden="true" size={24} color="#f43f5e" strokeWidth={1.5} />,
    title: 'Responsive Design',
    description: 'A flawless experience on desktop, tablet, and mobile.',
    accent: '#f43f5e',
    size: 'small'
  },
  {
    icon: <Sparkles aria-hidden="true" size={24} color="#3b82f6" strokeWidth={1.5} />,
    title: 'Modern AI Experience',
    description: 'A beautiful, frictionless UI designed for focus.',
    accent: '#3b82f6',
    size: 'small'
  }
];

function FeatureCard({ icon, title, description, accent, size, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`feature-card feature-card--${size} ${visible ? 'feature-card--visible' : ''}`}
      style={{ '--card-accent': accent, '--card-delay': `${(index % 4) * 0.1}s` }}
      id={`feature-card-${index}`}
    >
      <div className="feature-card__icon-wrap">
        <span className="feature-card__icon">{icon}</span>
      </div>
      <div className="feature-card__content">
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__desc">{description}</p>
      </div>
      <div className="feature-card__glow" />
    </div>
  );
}

function Features() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="features__header">
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">
            Everything you need for a <span className="gradient-text">healthier life</span>
          </h2>
          <p className="section-subtitle">
            Zenugo AI combines state-of-the-art language models with a modern,
            secure platform to deliver an unparalleled wellness experience.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
