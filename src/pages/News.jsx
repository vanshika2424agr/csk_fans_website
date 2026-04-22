import { useState } from 'react';

const articles = [
  { id:1, cat:'Match Report',   date:'Apr 18, 2026', read:'5 min', img:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=700&fit=crop', title:'CSK Crush Mumbai Indians by 42 Runs in a Chepauk Fortress Display',     body:'A blistering 89* from MS Dhoni combined with Pathirana\'s 4/18 powered CSK to a dominant victory at MA Chidambaram Stadium.' },
  { id:2, cat:'Club News',      date:'Apr 15, 2026', read:'3 min', img:'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=700&fit=crop', title:'Dhoni Confirms Continuation as CSK Mentor and Wicketkeeper for IPL 2026', body:'Thala MS Dhoni has confirmed he will continue with CSK for the 2026 season, delighting millions of fans worldwide.' },
  { id:3, cat:'Player Spotlight',date:'Apr 12, 2026', read:'4 min', img:'https://images.unsplash.com/photo-1624193699042-88771190bc1f?q=80&w=700&fit=crop', title:'Ruturaj Gaikwad — From Understudy to Captain, The CSK Journey',           body:'From Orange Cap winner to captaincy, Ruturaj\'s rise at CSK has been nothing short of extraordinary.' },
  { id:4, cat:'Transfer News',  date:'Apr 8, 2026',  read:'4 min', img:'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=700&fit=crop', title:'CSK\'s Smart Retention Strategy Pays Off — IPL 2026 Auction Analysis',    body:'Retaining the core of Gaikwad, Jadeja, and Pathirana while adding strategic picks has set CSK up for another title tilt.' },
  { id:5, cat:'Match Report',   date:'Apr 5, 2026',  read:'5 min', img:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=700&fit=crop', title:'Jadeja\'s All-Round Brilliance Seals Victory Against Delhi Capitals',     body:'Ravindra Jadeja scored a quickfire 52* and took 3/22 as CSK defeated DC by 6 wickets in Delhi.' },
  { id:6, cat:'Fan Feature',    date:'Apr 1, 2026',  read:'3 min', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700&fit=crop', title:'Whistle Podu! Behind the Scenes at CSK\'s Biggest Fan Festival',          body:'Thousands of CSK supporters gathered at Chepauk for the annual fan festival, featuring player meet-and-greets and live entertainment.' },
];
const categories = ['All','Match Report','Club News','Player Spotlight','Transfer News','Fan Feature'];

export default function News() {
  const [cat, setCat] = useState('All');
  const list = articles.filter(a => cat==='All' || a.cat===cat);

  return (
    <div style={{ maxWidth:1000, margin:'0 auto', padding:'60px 24px' }}>
      <div style={{ marginBottom:36 }}>
        <p className="section-label">Latest Updates</p>
        <h1 className="section-title" style={{ marginBottom:10 }}>News & Updates 📰</h1>
        <p className="section-subtitle">Latest from the CSK camp — match reports, transfer news, and fan features.</p>
      </div>

      {/* Featured */}
      {list.length > 0 && (
        <div className="card" style={{ overflow:'hidden', marginBottom:32 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr' }} className="hero-grid">
            <div style={{ height:300, overflow:'hidden' }}>
              <img src={list[0].img} alt={list[0].title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            </div>
            <div style={{ padding:'28px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12 }}>
                <span className="badge badge-gold">{list[0].cat}</span>
                <span style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{list[0].date} · {list[0].read} read</span>
              </div>
              <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', lineHeight:1.35, marginBottom:10 }}>{list[0].title}</h2>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:18 }}>{list[0].body}</p>
              <button className="btn-primary" style={{ alignSelf:'flex-start', padding:'9px 22px', fontSize:'0.82rem' }}>Read More →</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
        {categories.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{ padding:'7px 16px', borderRadius:99, cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.78rem', background:cat===c?'var(--primary)':'transparent', color:cat===c?'#0A1628':'var(--text-muted)', border:cat===c?'1.5px solid var(--primary)':'1.5px solid var(--border)', transition:'all 0.2s' }}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
        {list.slice(1).map((a,i)=>(
          <div key={a.id} className="card anim-fade-up" style={{ overflow:'hidden', animationDelay:`${i*60}ms`, animationFillMode:'both' }}>
            <div style={{ height:170, overflow:'hidden', position:'relative' }}>
              <img src={a.img} alt={a.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
            </div>
            <div style={{ padding:'16px 18px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <span className="badge badge-gold" style={{ fontSize:'0.6rem' }}>{a.cat}</span>
                <span style={{ fontSize:'0.68rem', color:'var(--text-muted)' }}>{a.date}</span>
              </div>
              <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.92rem', color:'var(--text)', lineHeight:1.4, marginBottom:8 }}>{a.title}</h3>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.82rem', lineHeight:1.65 }}>{a.body.slice(0,100)}…</p>
              <div style={{ marginTop:12, fontSize:'0.72rem', color:'var(--primary)', fontWeight:700, cursor:'pointer' }}>Read More →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
