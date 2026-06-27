import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';
import './AuthPages.css';

function RegisterPage() {
  const { register, user, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect authenticated users away from register
  if (!loading && user) {
    return <Navigate to="/chat" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await register(name, email, password);
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-page__orb auth-page__orb--1" />
      <div className="auth-page__orb auth-page__orb--2" />

      <div className="auth-page__card animate-fade-in-up">
        <div className="auth-page__brand">
          <Link to="/" className="auth-page__logo">
            <span className="auth-page__logo-icon">
              <img src={logo} alt="Zenugo AI Logo" style={{ height: '28px', width: 'auto' }} />
            </span>
            <span className="auth-page__logo-text">Zenugo AI</span>
          </Link>
          <p className="auth-page__subtitle">Create your account to get started.</p>
        </div>

        {error && (
          <div className="auth-page__error" id="register-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-page__form" id="register-form">
          <div className="auth-page__field">
            <label className="auth-page__label" htmlFor="register-name">Full Name</label>
            <input
              className="auth-page__input"
              type="text"
              id="register-name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="auth-page__field">
            <label className="auth-page__label" htmlFor="register-email">Email</label>
            <input
              className="auth-page__input"
              type="email"
              id="register-email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-page__field">
            <label className="auth-page__label" htmlFor="register-password">Password</label>
            <div className="auth-page__input-wrap">
              <input
                className="auth-page__input"
                type={showPassword ? 'text' : 'password'}
                id="register-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-page__eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-page__submit"
            disabled={submitting}
            id="register-submit"
          >
            {submitting ? (
              <span className="auth-page__btn-loading">
                <span className="auth-page__btn-spinner" />
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="auth-page__switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-page__switch-link">Sign in</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
