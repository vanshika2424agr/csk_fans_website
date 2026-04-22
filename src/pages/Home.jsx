import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Counter({ end, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; ob.disconnect();
      let cur = 0; const step = end / 60;
      const t = setInterval(() => { cur += step; if (cur >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(cur)); }, 16);
    }, { threshold: 0.3 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const topPlayers = [
  { name:'MS Dhoni', role:'Wicketkeeper', img:'https://placehold.co/200x200/0A1628/FDB913?text=MSD+7&font=roboto', stat1:'5,243 runs', stat2:'264 matches' },
  { name:'Ravindra Jadeja', role:'All-Rounder', img:'https://placehold.co/200x200/0A1628/FDB913?text=RJ+8&font=roboto', stat1:'3,345 runs', stat2:'175 wkts' },
  { name:'Ruturaj Gaikwad', role:'Batsman', img:'https://placehold.co/200x200/0A1628/FDB913?text=RG+31&font=roboto', stat1:'2,578 runs', stat2:'Captain' },
];

const recentNews = [
  { cat:'Match Report', img:'public/mumbai-owns-csk-at-chepauk-v0-95h1szg3mfrc1.webp', title:'CSK Crush Mumbai Indians by 42 Runs at Chepauk', date:'Apr 18' },
  { cat:'Club News', img:'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&fit=crop', title:'Dhoni Confirms Continuation as CSK Mentor for 2026', date:'Apr 12' },
  { cat:'Team Update', img:'public/Jadeja_Rahul.webp', title:'Gaikwad Named Captain — A New Era Begins', date:'Apr 5' },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="hero-section" style={{ position:'relative', minHeight:'90vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }}>
          <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1800&fit=crop" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.15 }}/>
          <div style={{ position:'absolute', inset:0, background:'var(--gradient-hero)' }}/>
          <div style={{ position:'absolute', inset:0, background:'var(--gradient-bottom)' }}/>
        </div>
        <div style={{ position:'relative', zIndex:1, maxWidth:1280, margin:'0 auto', padding:'80px 24px', width:'100%' }}>
          <div style={{ maxWidth:640 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:20 }}>
              <span className="live-dot"/><span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.72rem', color:'var(--green)', letterSpacing:'0.14em', textTransform:'uppercase' }}>Live · IPL 2026 Season</span>
            </div>
            <h1 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'clamp(2.8rem,7vw,5.2rem)', lineHeight:1.02, color:'var(--text)', marginBottom:14, letterSpacing:'-0.025em' }}>
              Whistle Podu!<br/><span style={{ color:'var(--primary)' }}>Super Kings 🦁</span>
            </h1>
            <div style={{ display:'flex', gap:12, marginBottom:22, flexWrap:'wrap' }}>
              {[['W5','var(--green)'],['L1','var(--red)'],['#1 Rank','var(--primary)'],['NRR +1.12','var(--blue)']].map(([v,c])=>(
                <div key={v} style={{ padding:'6px 14px', borderRadius:8, background:'var(--primary-subtle)', border:'1px solid var(--border)' }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1rem', color:c }}>{v}</span>
                </div>
              ))}
            </div>
            <p style={{ color:'var(--text-secondary)', fontSize:'1.05rem', lineHeight:1.75, maxWidth:480, marginBottom:32 }}>
              5× IPL Champions. The yellow army marches on — from Chepauk to glory. Experience the roar of the Lions with Chennai's most iconic franchise. 💛
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
              <Link to="/players" className="btn-primary">View Full Squad →</Link>
              <Link to="/schedule" className="btn-secondary">📅 Schedule</Link>
              <Link to="/fanzone" className="btn-secondary">🎉 Fan Zone</Link>
            </div>
          </div>
        </div>
        {/* Live score card */}
        <div className="hidden lg:block" style={{ position:'absolute', right:60, top:'50%', transform:'translateY(-50%)', zIndex:1 }}>
          <div style={{ background:'var(--surface)', border:'1px solid var(--border-hover)', borderRadius:18, padding:'22px 26px', backdropFilter:'blur(16px)', width:255 }}>
            <div style={{ fontSize:'0.62rem', fontWeight:700, color:'var(--primary)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:12 }}>🟢 Live Match</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1rem', color:'var(--text)', marginBottom:4 }}>CSK vs Mumbai Indians</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.8rem', color:'var(--primary)', lineHeight:1, marginBottom:4 }}>182/4</div>
            <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginBottom:14 }}>16.3 overs · Target: 168</div>
            {[['MS Dhoni','42*','(18)'],['Ravindra Jadeja','28*','(14)']].map(([n,r,b])=>(
              <div key={n} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.76rem', color:'var(--text-secondary)', padding:'6px 0', borderBottom:'1px solid var(--border)' }}>
                <span>{n}</span><span style={{ color:'var(--text)', fontWeight:700 }}>{r}<span style={{ color:'var(--text-muted)', fontWeight:400 }}> {b}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))' }}>
            {[['🏆','5','Titles'],['🏏','250+','Matches'],['✅','185','Wins'],['📈','58%','Win Rate'],['⚡','2008','Founded']].map(([icon,v,l],i)=>(
              <div key={l} className="stats-strip-item" style={{ padding:'24px 16px', textAlign:'center', borderRight:i<4?'1px solid var(--border)':'none' }}>
                <div style={{ fontSize:'1.3rem', marginBottom:4 }}>{icon}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.2rem', color:'var(--primary)', lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:'0.62rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT MATCH */}
      <section style={{ maxWidth:1280, margin:'0 auto', padding:'60px 24px 0' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
          <div><p className="section-label">Upcoming</p><h2 className="section-title">Next Match</h2></div>
          <Link to="/schedule" className="btn-secondary" style={{ padding:'8px 18px', fontSize:'0.8rem' }}>Full Schedule →</Link>
        </div>
        <div className="card next-match-card" style={{ padding:'30px 34px', background:'var(--gradient-surface)', borderColor:'var(--border-hover)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:22 }}>
            <span className="live-dot"/><span style={{ fontSize:'0.68rem', fontWeight:700, color:'var(--green)', letterSpacing:'0.12em', textTransform:'uppercase' }}>Apr 26, 2026 · 19:30 IST · MA Chidambaram Stadium, Chennai</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20, marginBottom:22 }}>
            <div style={{ textAlign:'center', flex:1 }}>
              <div style={{ width:60, height:60, borderRadius:'50%', background:'var(--gradient-primary)', margin:'0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 20px var(--primary-glow)', fontSize:'1.5rem' }}>🦁</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.2rem', color:'var(--primary)' }}>CSK</div>
              <span className="badge badge-green" style={{ marginTop:6 }}>Home</span>
            </div>
            <div style={{ textAlign:'center' }}><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.4rem', color:'var(--text-muted)', lineHeight:1 }}>VS</div></div>
            <div style={{ textAlign:'center', flex:1 }}>
              <div style={{ width:60, height:60, borderRadius:'50%', background:'var(--surface2)', border:'2px solid var(--border)', margin:'0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem' }}>🏏</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.2rem', color:'var(--text)' }}>RCB</div>
              <span className="badge badge-blue" style={{ marginTop:6 }}>Away</span>
            </div>
          </div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="#" className="btn-primary">🎟️ Buy Tickets</a>
            <Link to="/schedule" className="btn-secondary">All Fixtures →</Link>
          </div>
        </div>
      </section>

      {/* TOP PERFORMERS */}
      <section style={{ maxWidth:1280, margin:'0 auto', padding:'60px 24px 0' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
          <div><p className="section-label">Season 2026</p><h2 className="section-title">Top Performers</h2></div>
          <Link to="/stats" className="btn-secondary" style={{ padding:'8px 18px', fontSize:'0.8rem' }}>All Stats →</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:14 }}>
          {topPlayers.map((p,i)=>(
            <div key={i} className="card" style={{ display:'flex', gap:16, padding:'18px', alignItems:'center' }}>
              <div style={{ width:60, height:60, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
                <img src={p.img} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}/>
              </div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.92rem', color:'var(--text)', marginBottom:4 }}>{p.name}</div>
                <span className={`badge ${p.role==='Batsman'?'badge-gold':p.role==='Bowler'?'badge-red':p.role==='All-Rounder'?'badge-blue':'badge-purple'}`} style={{ fontSize:'0.6rem' }}>{p.role}</span>
                <div style={{ display:'flex', gap:10, marginTop:8 }}>
                  <span style={{ fontSize:'0.72rem', color:'var(--primary)', fontWeight:700 }}>{p.stat1}</span>
                  <span style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{p.stat2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST NEWS */}
      <section style={{ maxWidth:1280, margin:'0 auto', padding:'60px 24px 0' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
          <div><p className="section-label">What's Happening</p><h2 className="section-title">Latest News</h2></div>
          <Link to="/news" className="btn-secondary" style={{ padding:'8px 18px', fontSize:'0.8rem' }}>All News →</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:16 }}>
          {recentNews.map((n,i)=>(
            <Link key={i} to="/news" style={{ textDecoration:'none' }}>
              <div className="card" style={{ overflow:'hidden' }}>
                <div style={{ height:165, overflow:'hidden', position:'relative' }}>
                  <img src={n.img} alt={n.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
                <div style={{ padding:'14px 16px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <span className="badge badge-gold" style={{ fontSize:'0.6rem' }}>{n.cat}</span>
                    <span style={{ fontSize:'0.67rem', color:'var(--text-muted)' }}>{n.date}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.9rem', color:'var(--text)', lineHeight:1.45 }}>{n.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth:1280, margin:'60px auto 0', padding:'0 24px' }}>
        <div style={{ borderRadius:20, padding:'48px 36px', textAlign:'center', background:'linear-gradient(135deg,rgba(253,185,19,0.12),rgba(229,162,0,0.06))', border:'1px solid var(--border-hover)' }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'clamp(1.6rem,4vw,2.4rem)', color:'var(--text)', marginBottom:10 }}>Join the Yellow Army 💛</h2>
          <p style={{ color:'var(--text-muted)', fontSize:'0.975rem', lineHeight:1.7, marginBottom:26, maxWidth:440, margin:'0 auto 26px' }}>Exclusive tickets, merchandise, player meet-and-greets and fan events. Be part of the CSK legacy.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/fanzone" className="btn-primary">🎉 Join Fan Zone</Link>
            <a href="#" className="btn-secondary">🎟️ Season Tickets</a>
            <Link to="/gallery" className="btn-secondary">📸 Gallery</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
