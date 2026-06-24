import { HeartPulse, ArrowRight } from 'lucide-react';
import './AboutPage.css';

const currentFeatures = [
  'AI Wellness Assistant',
  'Health Guidance',
  'Hydration Recommendations',
  'Personalized Conversations',
  'Context-Aware Responses',
];

const futureRoadmap = [
  'Persistent Chat History',
  'User Accounts',
  'Health Dashboards',
  'Workout Planning',
  'Nutrition Tracking',
  'Mobile Experience',
];

function AboutPage() {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-page__header">
          <span className="section-label">About</span>
          <h1 className="section-title">
            About <span className="gradient-text">Zenugo AI</span>
          </h1>
        </div>

        <p className="about-page__description">
          Zenugo AI is a health and wellness companion designed to provide helpful guidance for hydration, fitness, sleep, nutrition, and everyday wellbeing.
        </p>
        <p className="about-page__description">
          Built using modern AI technology, Zenugo aims to make wellness information more accessible, personalized, and easy to understand.
        </p>

        <div className="about-page__columns">
          <div className="about-page__card">
            <h2 className="about-page__card-title">Current Features</h2>
            <ul className="about-page__list">
              {currentFeatures.map((feature) => (
                <li key={feature} className="about-page__list-item">
                  <span className="about-page__list-icon">
                    <HeartPulse aria-hidden="true" size={14} strokeWidth={2.5} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="about-page__card">
            <h2 className="about-page__card-title">Future Roadmap</h2>
            <ul className="about-page__list">
              {futureRoadmap.map((item) => (
                <li key={item} className="about-page__list-item">
                  <span className="about-page__list-icon">
                    <ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
