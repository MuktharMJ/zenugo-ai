import { useEffect, useRef, useState } from 'react';
import { Brain, Droplets, BarChart3, Target } from 'lucide-react';
import './Features.css';

const FEATURES = [
  {
    icon: <Brain aria-hidden="true" size={28} color="#6366f1" strokeWidth={1.5} />,
    title: 'AI Wellness Coach',
    description: 'Get personalized recommendations powered by advanced AI that understands your unique health profile and goals.',
    accent: '#6366f1',
  },
  {
    icon: <Droplets aria-hidden="true" size={28} color="#06b6d4" strokeWidth={1.5} />,
    title: 'Water Intake Tracking',
    description: 'Smart hydration reminders and detailed tracking to keep you optimally hydrated throughout the day.',
    accent: '#06b6d4',
  },
  {
    icon: <BarChart3 aria-hidden="true" size={28} color="#10b981" strokeWidth={1.5} />,
    title: 'Health Insights',
    description: 'Deep analytics and trend analysis that turn your health data into actionable, easy-to-understand insights.',
    accent: '#10b981',
  },
  {
    icon: <Target aria-hidden="true" size={28} color="#f59e0b" strokeWidth={1.5} />,
    title: 'Personalized Guidance',
    description: 'Adaptive plans that evolve with you — nutrition, exercise, sleep, and mindfulness tailored to your lifestyle.',
    accent: '#f59e0b',
  },
];

function FeatureCard({ icon, title, description, accent, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`feature-card ${visible ? 'feature-card--visible' : ''}`}
      style={{ '--card-accent': accent, '--card-delay': `${index * 0.12}s` }}
      id={`feature-card-${index}`}
    >
      <div className="feature-card__icon-wrap">
        <span className="feature-card__icon">{icon}</span>
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
      <div className="feature-card__glow" />
    </div>
  );
}

function Features() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="features__header">
          <span className="section-label">Features</span>
          <h2 className="section-title">
            Everything you need for a <span className="gradient-text">healthier life</span>
          </h2>
          <p className="section-subtitle">
            Zenugo AI combines cutting-edge artificial intelligence with proven wellness science
            to deliver a truly personalized health experience.
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
