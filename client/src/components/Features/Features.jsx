import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Brain,
  History,
  Shield,
  Zap,
  Search,
  MessageSquare,
} from 'lucide-react';
import './Features.css';

const FEATURES = [
  {
    num: '01',
    icon: Brain,
    title: 'Context-aware AI',
    headline: 'It remembers. It adapts. It understands you.',
    description: 'Unlike generic health chatbots, Zenugo builds a deep understanding of your wellness profile. Every conversation builds on the last — your goals, preferences, and progress are never forgotten.',
    accent: '#6366f1',
  },
  {
    num: '02',
    icon: History,
    title: 'Persistent memory',
    headline: 'Pick up right where you left off.',
    description: "Your conversations are organized, searchable, and always available. Switch between devices, close your browser, come back next week — your AI companion remembers everything.",
    accent: '#06b6d4',
  },
  {
    num: '03',
    icon: Shield,
    title: 'Privacy by design',
    headline: 'Your health data stays yours. Always.',
    description: 'Enterprise-grade encryption, secure authentication, and a strict no-sharing policy. We built Zenugo for trust, because wellness starts with feeling safe.',
    accent: '#10b981',
  },
];

const SMALL_FEATURES = [
  { icon: Zap, title: 'Real-time responses', desc: 'Ultra-fast AI inference for instant coaching.' },
  { icon: Search, title: 'Instant search', desc: 'Find past advice across all conversations.' },
  { icon: MessageSquare, title: 'Multi-thread', desc: 'Organize topics into focused conversations.' },
];

function FeatureBlock({ num, icon: Icon, title, headline, description, accent, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      className={`feat-block ${isReversed ? 'feat-block--reversed' : ''}`}
      style={{ opacity, y }}
    >
      <div className="feat-block__text">
        <span className="feat-block__num" style={{ color: accent }}>{num}</span>
        <span className="feat-block__label">{title}</span>
        <h3 className="feat-block__headline">{headline}</h3>
        <p className="feat-block__desc">{description}</p>
      </div>
      <div className="feat-block__visual">
        <div className="feat-block__icon-card" style={{ '--feat-accent': accent }}>
          <div className="feat-block__icon-glow" />
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
}

function Features() {
  return (
    <section className="features-v2 section" id="features">
      <div className="features-v2__line" />

      <div className="container">
        <motion.div
          className="features-v2__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">How It Works</span>
          <h2 className="features-v2__title">
            Built for people who take<br />
            their health <span className="gradient-text">seriously.</span>
          </h2>
        </motion.div>

        <div className="features-v2__blocks">
          {FEATURES.map((f, i) => (
            <FeatureBlock key={f.num} {...f} index={i} />
          ))}
        </div>

        {/* Small features strip */}
        <motion.div
          className="features-v2__strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {SMALL_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div className="feat-mini" key={title}>
              <div className="feat-mini__icon">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="feat-mini__title">{title}</h4>
                <p className="feat-mini__desc">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
