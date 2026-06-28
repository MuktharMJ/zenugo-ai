import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CTASection.css';

function CTASection() {
  return (
    <section className="cta">
      <div className="cta__mesh" />
      <div className="container">
        <motion.div
          className="cta__inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="cta__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Your wellness journey<br />
            <span className="gradient-text">starts here.</span>
          </motion.h2>
          <motion.p
            className="cta__text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Free to start. No credit card. No commitments.<br />
            Just a smarter way to care for yourself.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <Link to="/register" className="btn btn-primary btn--lg cta__btn">
              <span>Get Started Free</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
