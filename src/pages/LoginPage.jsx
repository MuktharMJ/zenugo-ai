import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, Eye, EyeOff } from 'lucide-react';
import './AuthPages.css';

function LoginPage() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect authenticated users away from login
  if (!loading && user) {
    return <Navigate to="/chat" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/chat', { replace: true });
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
              <HeartPulse aria-hidden="true" size={28} strokeWidth={2.5} />
            </span>
            <span className="auth-page__logo-text">Zenugo AI</span>
          </Link>
          <p className="auth-page__subtitle">Welcome back! Sign in to continue.</p>
        </div>

        {error && (
          <div className="auth-page__error" id="login-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-page__form" id="login-form">
          <div className="auth-page__field">
            <label className="auth-page__label" htmlFor="login-email">Email</label>
            <input
              className="auth-page__input"
              type="email"
              id="login-email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-page__field">
            <label className="auth-page__label" htmlFor="login-password">Password</label>
            <div className="auth-page__input-wrap">
              <input
                className="auth-page__input"
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
            id="login-submit"
          >
            {submitting ? (
              <span className="auth-page__btn-loading">
                <span className="auth-page__btn-spinner" />
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="auth-page__switch">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="auth-page__switch-link">Create one</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
