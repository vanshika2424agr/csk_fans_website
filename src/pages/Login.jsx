import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (isLogin) {
        ({ data } = await loginUser(email, password));
      } else {
        if (!name.trim()) { setError('Name is required.'); setLoading(false); return; }
        ({ data } = await registerUser(name, email, password));
      }
      login(data.user, data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-card__logo">
          <div className="auth-card__logo-icon">🦁</div>
          <h1 className="auth-card__title">Chennai Super Kings</h1>
          <p className="auth-card__subtitle">
            {isLogin ? 'Welcome back, Lion! 💛' : 'Join the Yellow Army! 💛'}
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-card__tabs">
          <button
            className={`auth-card__tab ${isLogin ? 'auth-card__tab--active' : ''}`}
            onClick={() => switchMode()}
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-card__tab ${!isLogin ? 'auth-card__tab--active' : ''}`}
            onClick={() => switchMode()}
            type="button"
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="auth-card__form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-card__field">
              <label htmlFor="auth-name" className="auth-card__label">Full Name</label>
              <input
                id="auth-name"
                type="text"
                className="input-field"
                placeholder="MS Dhoni"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          <div className="auth-card__field">
            <label htmlFor="auth-email" className="auth-card__label">Email</label>
            <input
              id="auth-email"
              type="email"
              className="input-field"
              placeholder="fan@csk.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-card__field">
            <label htmlFor="auth-password" className="auth-card__label">Password</label>
            <input
              id="auth-password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className="auth-card__error">❌ {error}</div>
          )}

          <button
            type="submit"
            className="btn-primary auth-card__submit"
            disabled={loading}
          >
            {loading ? (
              <span className="booking-modal__spinner" />
            ) : isLogin ? (
              '🔐 Login'
            ) : (
              '🎉 Create Account'
            )}
          </button>
        </form>

        {/* Switch mode */}
        <p className="auth-card__switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" className="auth-card__switch-btn" onClick={switchMode}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
