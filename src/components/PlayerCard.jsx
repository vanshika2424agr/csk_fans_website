const roleStyle = {
  'Batsman':      { badge:'badge-gold',   bar:'#FDB913' },
  'Bowler':       { badge:'badge-red',    bar:'#EF4444' },
  'All-Rounder':  { badge:'badge-blue',   bar:'#3B82F6' },
  'Wicketkeeper': { badge:'badge-purple', bar:'#A855F7' },
};

export default function PlayerCard({ name='Player', image, role='Batsman', team='CSK', stats={runs:0,wickets:0,matches:0}, number='' }) {
  const rs = roleStyle[role] || roleStyle['Batsman'];
  return (
    <div className="card" style={{ overflow:'hidden', display:'flex', flexDirection:'column', cursor:'pointer' }}>
      <div style={{ position:'relative', height:220, overflow:'hidden', background:'var(--surface2)', flexShrink:0 }}>
        <img src={image || 'https://placehold.co/400x300/1B3055/FDB913?text=Player'} alt={name}
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', transition:'transform 0.4s ease' }}
          onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
          onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          loading="lazy" />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--bg) 0%, rgba(10,22,40,0.2) 60%, transparent 100%)' }} />
        <div style={{ position:'absolute', top:12, left:12 }}><span className={`badge ${rs.badge}`}>{role}</span></div>
        {number && <div style={{ position:'absolute', top:8, right:12, fontFamily:"'Bebas Neue',sans-serif", fontSize:'3.5rem', color:'rgba(253,185,19,0.1)', lineHeight:1, userSelect:'none' }}>{number}</div>}
        <div style={{ position:'absolute', bottom:14, left:16, right:16 }}>
          <div style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.12em', color:'var(--primary)', textTransform:'uppercase', marginBottom:3 }}>{team}</div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', lineHeight:1.2 }}>{name}</div>
        </div>
      </div>
      <div style={{ height:2, background:rs.bar, opacity:0.6 }} />
      <div style={{ padding:'16px', display:'flex', gap:8, flexGrow:1 }}>
        {[{ label:'Runs', value:(stats?.runs||0).toLocaleString() },{ label:'Wickets', value:stats?.wickets||0 },{ label:'Matches', value:stats?.matches||'—' }].map(s=>(
          <div key={s.label} style={{ flex:1, textAlign:'center', padding:'10px 4px', background:'var(--primary-subtle)', borderRadius:10, border:'1px solid var(--border)' }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.5rem', color:'var(--text)', lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:'0.6rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:3 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:'0 16px 16px' }}>
        <button style={{ width:'100%', padding:'10px', borderRadius:10, background:'var(--primary-subtle)', border:'1px solid var(--border-hover)', color:'var(--primary)', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.04em', cursor:'pointer', transition:'all 0.2s', textTransform:'uppercase' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(253,185,19,0.2)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='var(--primary-subtle)';}}
        >View Profile →</button>
      </div>
    </div>
  );
}
