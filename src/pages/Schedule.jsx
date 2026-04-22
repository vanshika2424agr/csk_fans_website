import { useState } from 'react';

const matches = [
  { id:1, home:'CSK', away:'Mumbai Indians',     date:'Apr 12', day:'Saturday',  time:'7:30 PM', venue:'MA Chidambaram Stadium, Chennai',   status:'Completed', result:'CSK won by 42 runs',              win:true  },
  { id:2, home:'Delhi Capitals', away:'CSK',      date:'Apr 15', day:'Tuesday',   time:'7:30 PM', venue:'Arun Jaitley Stadium, Delhi',       status:'Completed', result:'CSK won by 6 wickets',            win:true  },
  { id:3, home:'CSK', away:'Kolkata Knight Riders',date:'Apr 18', day:'Friday',   time:'7:30 PM', venue:'MA Chidambaram Stadium, Chennai',   status:'Completed', result:'CSK won by 28 runs',              win:true  },
  { id:4, home:'Rajasthan Royals', away:'CSK',    date:'Apr 21', day:'Monday',    time:'7:30 PM', venue:'Sawai Mansingh Stadium, Jaipur',    status:'Completed', result:'Rajasthan Royals won by 4 wickets',win:false },
  { id:5, home:'CSK', away:'Sunrisers Hyderabad', date:'Apr 24', day:'Thursday',  time:'7:30 PM', venue:'MA Chidambaram Stadium, Chennai',   status:'Completed', result:'CSK won by 15 runs',              win:true  },
  { id:6, home:'CSK', away:'Royal Challengers Bengaluru',date:'Apr 26',day:'Saturday',time:'7:30 PM',venue:'MA Chidambaram Stadium, Chennai', status:'Upcoming', result:null, win:null },
  { id:7, home:'Punjab Kings', away:'CSK',        date:'May 1',  day:'Thursday',  time:'7:30 PM', venue:'IS Bindra Stadium, Mohali',         status:'Upcoming', result:null, win:null },
  { id:8, home:'CSK', away:'Gujarat Titans',      date:'May 5',  day:'Monday',    time:'7:30 PM', venue:'MA Chidambaram Stadium, Chennai',   status:'Upcoming', result:null, win:null },
  { id:9, home:'Lucknow Super Giants', away:'CSK',date:'May 10', day:'Saturday',  time:'3:30 PM', venue:'BRSABV Ekana Stadium, Lucknow',    status:'Upcoming', result:null, win:null },
  { id:10,home:'CSK', away:'Mumbai Indians',      date:'May 14', day:'Wednesday', time:'7:30 PM', venue:'MA Chidambaram Stadium, Chennai',   status:'Upcoming', result:null, win:null },
];

const tabs = ['All','Upcoming','Completed'];
const statusConfig = {
  win:     { label:'Won',     bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.35)',  color:'#4ade80', dot:'#22c55e' },
  loss:    { label:'Lost',    bg:'rgba(239,68,68,0.10)',  border:'rgba(239,68,68,0.3)',   color:'#f87171', dot:'#ef4444' },
  upcoming:{ label:'Upcoming',bg:'rgba(253,185,19,0.10)', border:'rgba(253,185,19,0.3)',  color:'#FDB913', dot:'#FDB913' },
};
function getConfig(m) { if (m.status==='Completed') return m.win ? statusConfig.win : statusConfig.loss; return statusConfig.upcoming; }

export default function Schedule() {
  const [tab, setTab] = useState('All');
  const list = matches.filter(m => tab==='All' || m.status===tab);
  const wins = matches.filter(m => m.status==='Completed' && m.win).length;
  const losses = matches.filter(m => m.status==='Completed' && !m.win).length;
  const upcoming = matches.filter(m => m.status==='Upcoming').length;

  return (
    <div style={{ maxWidth:1000, margin:'0 auto', padding:'60px 24px' }}>
      <div style={{ marginBottom:36 }}>
        <p className="section-label">IPL 2026 Season</p>
        <h1 className="section-title" style={{ marginBottom:10 }}>Match Schedule 📅</h1>
        <p className="section-subtitle">Track every CSK game — every venue, every result.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12, marginBottom:36 }}>
        {[{ label:'Played', value:wins+losses, color:'var(--text)' },{ label:'Won', value:wins, color:'var(--green)' },{ label:'Lost', value:losses, color:'var(--red)' },{ label:'Upcoming', value:upcoming, color:'var(--primary)' }].map(s=>(
          <div key={s.label} className="card" style={{ textAlign:'center', padding:'20px 12px' }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.4rem', color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:'0.68rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:8, marginBottom:28, borderBottom:'1px solid var(--border)', paddingBottom:0 }}>
        {tabs.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'10px 20px', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.85rem', background:'transparent', border:'none', color:tab===t?'var(--primary)':'var(--text-muted)', borderBottom:tab===t?'2px solid var(--primary)':'2px solid transparent', marginBottom:-1, transition:'all 0.2s' }}>{t}</button>
        ))}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {list.map((m,i)=>{
          const cfg = getConfig(m);
          const isCSKHome = m.home==='CSK';
          const isCSKAway = m.away==='CSK';
          return (
            <div key={m.id} className="card anim-fade-up" style={{ animationDelay:`${i*60}ms`, animationFillMode:'both', padding:0, overflow:'hidden' }}>
              <div style={{ height:3, background: m.status==='Upcoming'?'var(--gradient-primary)':m.win?'linear-gradient(90deg,#22c55e,#16a34a)':'linear-gradient(90deg,#ef4444,#dc2626)' }} />
              <div style={{ padding:'20px 24px', display:'flex', flexWrap:'wrap', gap:16, alignItems:'center' }}>
                <div style={{ minWidth:90, textAlign:'center', flexShrink:0 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.5rem', color:'var(--primary)', lineHeight:1 }}>{m.date}</div>
                  <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginTop:2 }}>{m.day}</div>
                  <div style={{ fontSize:'0.72rem', color:'var(--text-secondary)', marginTop:4 }}>{m.time}</div>
                </div>
                <div style={{ width:1, height:60, background:'var(--border)', flexShrink:0 }} className="hidden sm:block" />
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.05rem', color:isCSKHome?'var(--primary)':'var(--text)' }}>{m.home==='CSK'?'🦁 CSK':m.home}</span>
                    <span style={{ fontSize:'0.7rem', fontWeight:700, color:'var(--text-muted)', padding:'2px 10px', background:'var(--primary-subtle)', borderRadius:99, border:'1px solid var(--border)' }}>vs</span>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.05rem', color:isCSKAway?'var(--primary)':'var(--text)' }}>{m.away==='CSK'?'🦁 CSK':m.away}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:7, color:'var(--text-muted)', fontSize:'0.78rem' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {m.venue}
                  </div>
                  {m.result && <div style={{ marginTop:8, fontSize:'0.78rem', fontWeight:600, color:m.win?'var(--green)':'var(--red)' }}>{m.win?'✅':'❌'} {m.result}</div>}
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:10, flexShrink:0 }}>
                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:99, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', background:cfg.bg, border:`1px solid ${cfg.border}`, color:cfg.color }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:cfg.dot, display:'inline-block' }} />{cfg.label}
                  </div>
                  {m.status==='Upcoming' && <button className="btn-primary" style={{ padding:'8px 18px', fontSize:'0.78rem' }}>🎟️ Tickets</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
