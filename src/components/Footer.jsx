import { Link } from 'react-router-dom';

const cols = [
  { title:'Explore', links:[
    { label:'Home', to:'/' },{ label:'Players', to:'/players' },{ label:'Schedule', to:'/schedule' },{ label:'News', to:'/news' },{ label:'Team', to:'/team' },
  ]},
  { title:'Fan Hub', links:[
    { label:'Fan Zone', to:'/fanzone' },{ label:'Gallery', to:'/gallery' },{ label:'Stats', to:'/stats' },{ label:'Contact', to:'/contact' },
  ]},
  { title:'Support', links:[
    { label:'Privacy Policy', to:'#' },{ label:'Terms of Use', to:'#' },{ label:'Careers', to:'#' },{ label:'Feedback', to:'/contact' },
  ]},
];

const socials = [
  { label:'Instagram', href:'https://instagram.com/chennaiipl', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label:'X (Twitter)', href:'https://twitter.com/ChennaiIPL', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label:'YouTube', href:'https://youtube.com/@ChennaiSuperKings', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { label:'Facebook', href:'https://facebook.com/ChennaiSuperKings', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
];

export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', background:'var(--bg)', marginTop:80 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 24px 0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:48 }} className="hero-grid">
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:'50%', background:'var(--gradient-primary)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 18px var(--primary-glow)', fontSize:'1.4rem' }}>🦁</div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.15rem', color:'var(--text)' }}>Chennai Super Kings</div>
                <div style={{ fontSize:'0.6rem', color:'var(--primary)', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>Whistle Podu 💛</div>
              </div>
            </div>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.875rem', lineHeight:1.7, maxWidth:280, marginBottom:20 }}>
              5× IPL Champions. The Lions roar louder every season. Born to dominate. Yellow Army forever. 🦁
            </p>
            <div style={{ display:'flex', gap:20 }}>
              {[['5','Titles'],['185','Wins'],['58%','Win Rate']].map(([v,l])=>(
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.6rem', color:'var(--primary)', lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:'0.6rem', color:'var(--text-muted)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.75rem', color:'var(--text)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:16 }}>{col.title}</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {col.links.map(({ label, to }) => (
                  <li key={label}><Link to={to} style={{ color:'var(--text-secondary)', textDecoration:'none', fontSize:'0.875rem', transition:'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--primary)'} onMouseLeave={e=>e.target.style.color='var(--text-secondary)'}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop:48, paddingTop:20, paddingBottom:24, borderTop:'1px solid var(--border)', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <p style={{ color:'var(--text-muted)', fontSize:'0.8rem' }}>© {new Date().getFullYear()} Chennai Super Kings Cricket Ltd. All rights reserved.</p>
          <div style={{ display:'flex', gap:10 }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width:36, height:36, borderRadius:10, background:'var(--surface)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-secondary)', textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--primary)';e.currentTarget.style.borderColor='var(--border-hover)';}}
                onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.borderColor='var(--border)';}}
              >{s.icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
