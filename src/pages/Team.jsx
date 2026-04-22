export default function Team() {
  const timeline = [
    { year:'2008', title:'CSK Founded', desc:'Chennai Super Kings established as one of the eight founding franchises of the IPL, led by MS Dhoni.' },
    { year:'2010', title:'First IPL Title 🏆', desc:'CSK won their maiden IPL trophy, defeating Mumbai Indians in the final at DY Patil Stadium.' },
    { year:'2011', title:'Back-to-Back Champions 🏆', desc:'CSK became the first team to win consecutive IPL titles, defeating Royal Challengers Bangalore in the final.' },
    { year:'2014', title:'Champions League T20', desc:'Dominated the CLT20, establishing CSK as the most consistent franchise across T20 competitions.' },
    { year:'2018', title:'The Return — Third Title 🏆', desc:'After a two-year suspension, CSK returned and immediately won their third IPL title under Dhoni\'s captaincy.' },
    { year:'2021', title:'Fourth IPL Title 🏆', desc:'CSK clinched their fourth title, with Ruturaj Gaikwad winning the Orange Cap for most runs.' },
    { year:'2023', title:'Fifth IPL Title 🏆', desc:'CSK won a record-equalling fifth title in MS Dhoni\'s emotional final as captain, with Jadeja leading the bowling attack.' },
    { year:'2024', title:'Gaikwad Takes Over', desc:'Ruturaj Gaikwad appointed as captain, beginning a new era for the franchise with Dhoni as mentor.' },
  ];

  const staff = [
    { name:'Stephen Fleming', role:'Head Coach', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&fit=crop', desc:'One of the longest-serving coaches in IPL. Fleming has been integral to CSK\'s sustained success since 2008.' },
    { name:'Eric Simmons', role:'Bowling Coach', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&fit=crop', desc:'South African bowling expert who has shaped CSK\'s bowling strategies for multiple title-winning campaigns.' },
    { name:'Mike Hussey', role:'Batting Consultant', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&fit=crop', desc:'Former CSK legend "Mr. Cricket" brings invaluable experience and mentorship to the batting lineup.' },
  ];

  const trophies = [
    { year:'2010', opponent:'Mumbai Indians', venue:'DY Patil Stadium' },
    { year:'2011', opponent:'Royal Challengers Bangalore', venue:'MA Chidambaram Stadium' },
    { year:'2018', opponent:'Sunrisers Hyderabad', venue:'Wankhede Stadium' },
    { year:'2021', opponent:'Kolkata Knight Riders', venue:'Dubai International Stadium' },
    { year:'2023', opponent:'Gujarat Titans', venue:'Narendra Modi Stadium' },
  ];

  return (
    <div style={{ maxWidth:1000, margin:'0 auto', padding:'60px 24px' }}>
      <div style={{ marginBottom:36 }}>
        <p className="section-label">Since 2008</p>
        <h1 className="section-title" style={{ marginBottom:10 }}>Our Legacy 🦁</h1>
        <p className="section-subtitle">The story of Chennai Super Kings — India's most successful IPL franchise.</p>
      </div>

      {/* About */}
      <div className="card" style={{ padding:'32px', marginBottom:40, background:'linear-gradient(135deg,var(--surface),var(--surface2))', borderColor:'var(--border-hover)' }}>
        <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:16 }}>
          <div style={{ width:54, height:54, borderRadius:'50%', background:'var(--gradient-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', boxShadow:'0 0 24px var(--primary-glow)' }}>🦁</div>
          <div>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.4rem', color:'var(--text)' }}>Chennai Super Kings</h2>
            <p style={{ fontSize:'0.78rem', color:'var(--primary)', fontWeight:700, letterSpacing:'0.1em' }}>WHISTLE PODU! 💛</p>
          </div>
        </div>
        <p style={{ color:'var(--text-secondary)', fontSize:'0.92rem', lineHeight:1.8 }}>
          Founded in 2008, the Chennai Super Kings are the most iconic franchise in IPL history. Based at the legendary MA Chidambaram Stadium (Chepauk) in Chennai, CSK has won 5 IPL titles, making them one of the most decorated teams. Under the legendary leadership of MS Dhoni, CSK became synonymous with consistency — qualifying for the playoffs in every season they have participated in. The Yellow Army is the most passionate fanbase in cricket.
        </p>
      </div>

      {/* Trophy Cabinet */}
      <div style={{ marginBottom:48 }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>🏆 Trophy Cabinet</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:14 }}>
          {trophies.map((t,i)=>(
            <div key={i} className="card anim-fade-up" style={{ padding:'22px', textAlign:'center', animationDelay:`${i*80}ms`, animationFillMode:'both', background:'linear-gradient(135deg,rgba(253,185,19,0.08),transparent)', borderColor:'var(--border-hover)' }}>
              <div style={{ fontSize:'2.2rem', marginBottom:6 }}>🏆</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.4rem', color:'var(--primary)', lineHeight:1 }}>{t.year}</div>
              <div style={{ fontSize:'0.72rem', fontWeight:600, color:'var(--text-secondary)', marginTop:6 }}>vs {t.opponent}</div>
              <div style={{ fontSize:'0.62rem', color:'var(--text-muted)', marginTop:4 }}>{t.venue}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom:48 }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:24 }}>📜 Iconic Moments</h2>
        <div style={{ position:'relative', paddingLeft:28 }}>
          <div style={{ position:'absolute', left:6, top:0, bottom:0, width:2, background:'var(--border)' }}/>
          {timeline.map((e,i)=>(
            <div key={i} className="anim-fade-up" style={{ position:'relative', marginBottom:24, animationDelay:`${i*80}ms`, animationFillMode:'both' }}>
              <div style={{ position:'absolute', left:-24, top:5, width:12, height:12, borderRadius:'50%', background:e.title.includes('🏆')?'var(--primary)':'var(--surface2)', border:'2px solid var(--primary)', zIndex:1 }}/>
              <div className="card" style={{ padding:'18px 20px' }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.3rem', color:'var(--primary)', lineHeight:1, marginBottom:4 }}>{e.year}</div>
                <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.95rem', color:'var(--text)', marginBottom:6 }}>{e.title}</h3>
                <p style={{ color:'var(--text-secondary)', fontSize:'0.82rem', lineHeight:1.6 }}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coaching Staff */}
      <div style={{ marginBottom:48 }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20 }}>🎓 Coaching Staff</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:16 }}>
          {staff.map((s,i)=>(
            <div key={i} className="card" style={{ display:'flex', gap:16, padding:'18px', alignItems:'center' }}>
              <div style={{ width:56, height:56, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
                <img src={s.img} alt={s.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.92rem', color:'var(--text)' }}>{s.name}</div>
                <span className="badge badge-gold" style={{ fontSize:'0.58rem', marginTop:4, marginBottom:6, display:'inline-block' }}>{s.role}</span>
                <p style={{ color:'var(--text-secondary)', fontSize:'0.78rem', lineHeight:1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stadium */}
      <div className="card" style={{ overflow:'hidden' }}>
        <div style={{ height:200, overflow:'hidden', position:'relative' }}>
          <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&fit=crop" alt="Chepauk" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--surface) 0%, transparent 60%)' }}/>
        </div>
        <div style={{ padding:'22px 28px' }}>
          <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.2rem', color:'var(--text)', marginBottom:6 }}>🏟️ MA Chidambaram Stadium — Chepauk</h3>
          <p style={{ color:'var(--text-secondary)', fontSize:'0.88rem', lineHeight:1.7 }}>
            Home of the Super Kings. Located in the heart of Chennai, Chepauk is one of the oldest cricket grounds in India (est. 1916). Capacity: 38,000. The fortress where the Yellow Army roars — CSK's win rate at home exceeds 65%, making it one of the most intimidating venues in the IPL.
          </p>
        </div>
      </div>
    </div>
  );
}
