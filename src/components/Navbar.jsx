import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position:'sticky', top:0, zIndex:100,
      background: scrolled ? 'var(--overlay)' : 'rgba(10,22,40,0.8)',
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      borderBottom:'1px solid var(--border)',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none',
      transition:'all 0.3s',
    }}>
      {/* CSK Ticker */}
      <div style={{ background:'var(--gradient-primary)', padding:'5px 0', overflow:'hidden' }}>
        <div style={{ display:'flex', whiteSpace:'nowrap', animation:'ticker 30s linear infinite' }}>
          {[...Array(3)].map((_,i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:24, paddingRight:60, fontSize:'0.72rem', fontWeight:700, color:'#0A1628', letterSpacing:'0.04em' }}>
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

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 20px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:62 }}>

          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0 }}>
            <div style={{
              width:38, height:38, borderRadius:'50%',
              background:'var(--gradient-primary)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 14px var(--primary-glow)', flexShrink:0,
              fontSize:'1.3rem',
            }}>🦁</div>
            <div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.05rem', color:'var(--text)', lineHeight:1 }}>Chennai Super Kings</div>
              <div style={{ fontSize:'0.55rem', color:'var(--primary)', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase' }}>IPL 2026 • Whistle Podu</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display:'flex', alignItems:'center', gap:2 }} className="hidden lg:flex">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to==='/'} style={({ isActive }) => ({
                padding:'6px 13px', borderRadius:8, textDecoration:'none',
                fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.82rem',
                transition:'all 0.2s',
                background: isActive ? 'var(--primary-subtle)' : 'transparent',
                color:      isActive ? 'var(--primary)' : 'var(--text-secondary)',
                border:     isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
              })}>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            {/* Theme toggle */}
            <button onClick={toggle} title={`Switch to ${theme==='dark'?'light':'dark'} mode`} style={{
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:10, padding:'7px 10px', cursor:'pointer',
              fontSize:'1rem', lineHeight:1, color:'var(--text)',
              transition:'all 0.2s', display:'flex', alignItems:'center',
            }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <Link to="/fanzone" className="btn-secondary hidden md:inline-flex" style={{ padding:'7px 16px', fontSize:'0.78rem' }}>🎉 Fan Zone</Link>
            <a href="#" className="btn-primary hidden md:inline-flex" style={{ padding:'8px 18px', fontSize:'0.78rem' }}>🎟️ Tickets</a>

            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} className="lg:hidden" style={{
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:8, padding:'7px 9px', cursor:'pointer',
              display:'flex', flexDirection:'column', gap:4, alignItems:'center',
            }}>
              {[20,14,17].map((w,i) => (
                <span key={i} style={{ display:'block', height:2, width:w, background: open?'var(--primary)':'var(--text-secondary)', borderRadius:2, transition:'all 0.2s' }}/>
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', padding:'12px 20px 20px' }}>
          <div className="mobile-menu-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:12 }}>
            {links.map(({ to, label, icon }) => (
              <NavLink key={to} to={to} end={to==='/'} onClick={() => setOpen(false)}
                style={({ isActive }) => ({
                  display:'flex', alignItems:'center', gap:8,
                  padding:'11px 14px', borderRadius:10, textDecoration:'none',
                  fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.875rem',
                  background: isActive ? 'var(--primary-subtle)' : 'rgba(255,255,255,0.03)',
                  color:      isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  border:     isActive ? '1px solid var(--border-hover)' : '1px solid var(--border)',
                })}>
                <span>{icon}</span>{label}
              </NavLink>
            ))}
          </div>
          <a href="#" className="btn-primary" style={{ display:'flex', justifyContent:'center', width:'100%' }}>🎟️ Buy Tickets</a>
        </div>
      )}
    </nav>
  );
}