import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { to:'/',         label:'Home',     icon:'🏠' },
  { to:'/players',  label:'Players',  icon:'🏏' },
  { to:'/schedule', label:'Schedule', icon:'📅' },
  { to:'/stats',    label:'Stats',    icon:'📊' },
  { to:'/news',     label:'News',     icon:'📰' },
  { to:'/team',     label:'Team',     icon:'🦁' },
  { to:'/gallery',  label:'Gallery',  icon:'📸' },
  { to:'/fanzone',  label:'Fan Zone', icon:'🎉' },
  { to:'/contact',  label:'Contact',  icon:'📧' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  // Get user initials for avatar
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        {/* CSK Ticker */}
        <div className="navbar__ticker">
          <div className="navbar__ticker-track">
            {[...Array(3)].map((_,i) => (
              <span key={i} className="navbar__ticker-content">
                <span>🦁 WHISTLE PODU! CSK vs Mumbai Indians | 182/4 (16.3 ov)</span>
                <span>•</span>
                <span>MS Dhoni 42*(18) | Jadeja 3/22 (4 ov)</span>
                <span>•</span>
                <span>🏆 5× Champions | Season: W5 L1 | Rank #1 | NRR +1.124</span>
                <span>•</span>
                <span>Next: Apr 26 vs RCB | Chepauk 7:30 PM</span>
              </span>
            ))}
          </div>
        </div>

        <div className="navbar__container">
          <div className="navbar__inner">

            {/* Logo */}
            <Link to="/" className="navbar__logo" onClick={() => setOpen(false)}>
              <div className="navbar__logo-icon">🦁</div>
              <div className="navbar__logo-text">
                <div className="navbar__logo-title">Chennai Super Kings</div>
                <div className="navbar__logo-subtitle">IPL 2026 • Whistle Podu</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="navbar__links-desktop">
              {links.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to==='/'} className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }>
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Right controls */}
            <div className="navbar__controls">
              {/* Theme toggle */}
              <button
                onClick={toggle}
                title={`Switch to ${theme==='dark'?'light':'dark'} mode`}
                className="navbar__theme-btn"
                aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Auth controls — desktop */}
              {user ? (
                <>
                  <Link to="/my-bookings" className="btn-secondary navbar__cta-secondary" onClick={() => setOpen(false)}>
                    🎟️ My Bookings
                  </Link>
                  <div className="navbar__user-menu">
                    <div className="navbar__avatar" title={user.name}>
                      {initials}
                    </div>
                    <button onClick={handleLogout} className="navbar__logout-btn" title="Logout">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/schedule" className="btn-secondary navbar__cta-secondary" onClick={() => setOpen(false)}>
                    🎟️ Tickets
                  </Link>
                  <Link to="/login" className="btn-primary navbar__cta-primary" onClick={() => setOpen(false)}>
                    🔐 Login
                  </Link>
                </>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className={`navbar__hamburger ${open ? 'navbar__hamburger--open' : ''}`}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <span className="navbar__hamburger-line" />
                <span className="navbar__hamburger-line" />
                <span className="navbar__hamburger-line" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={`navbar__mobile-menu ${open ? 'navbar__mobile-menu--open' : ''}`}
          aria-hidden={!open}
        >
          <div className="navbar__mobile-grid">
            {links.map(({ to, label, icon }) => (
              <NavLink key={to} to={to} end={to==='/'} onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                }>
                <span className="navbar__mobile-link-icon">{icon}</span>
                {label}
              </NavLink>
            ))}
            {/* Auth links in mobile menu */}
            {user && (
              <NavLink to="/my-bookings" onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                }>
                <span className="navbar__mobile-link-icon">🎟️</span>
                My Bookings
              </NavLink>
            )}
          </div>
          <div className="navbar__mobile-actions">
            {user ? (
              <>
                <div className="navbar__mobile-user-info">
                  <div className="navbar__avatar" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>
                    {initials}
                  </div>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: '0.85rem', color: 'var(--text)' }}>
                    {user.name}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-secondary navbar__mobile-cta">
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary navbar__mobile-cta" onClick={() => setOpen(false)}>
                  🔐 Login / Register
                </Link>
                <Link to="/schedule" className="btn-secondary navbar__mobile-cta" onClick={() => setOpen(false)}>
                  🎟️ Book Tickets
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`navbar__backdrop ${open ? 'navbar__backdrop--visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}