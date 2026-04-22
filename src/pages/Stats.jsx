import { useState } from 'react';

const batting = [
  { pos:1, name:'MS Dhoni',       matches:5, innings:5, runs:312, hs:'89*',  avg:62.4, sr:178.3, '50s':3, '100s':0, '4s':28, '6s':18 },
  { pos:2, name:'Ruturaj Gaikwad',matches:5, innings:5, runs:298, hs:'102*', avg:74.5, sr:142.1, '50s':1, '100s':1, '4s':32, '6s':12 },
  { pos:3, name:'Devon Conway',   matches:5, innings:5, runs:267, hs:'78',   avg:53.4, sr:138.6, '50s':3, '100s':0, '4s':28, '6s':8  },
  { pos:4, name:'Shivam Dube',    matches:5, innings:5, runs:234, hs:'72*',  avg:58.5, sr:168.4, '50s':2, '100s':0, '4s':18, '6s':16 },
  { pos:5, name:'Moeen Ali',      matches:5, innings:5, runs:198, hs:'68',   avg:39.6, sr:156.7, '50s':2, '100s':0, '4s':16, '6s':12 },
  { pos:6, name:'Ravindra Jadeja',matches:5, innings:4, runs:145, hs:'52*',  avg:72.5, sr:152.6, '50s':1, '100s':0, '4s':12, '6s':8  },
  { pos:7, name:'Ajinkya Rahane', matches:5, innings:5, runs:124, hs:'45',   avg:24.8, sr:118.3, '50s':0, '100s':0, '4s':14, '6s':2  },
];
const bowling = [
  { pos:1, name:'Matheesha Pathirana', matches:5, overs:18, wickets:14, best:'4/18', avg:12.1, eco:6.2,  sr:7.7,  dots:42 },
  { pos:2, name:'Ravindra Jadeja',     matches:5, overs:20, wickets:11, best:'3/22', avg:14.5, eco:6.8,  sr:10.9, dots:38 },
  { pos:3, name:'Deepak Chahar',       matches:5, overs:18, wickets:10, best:'3/18', avg:15.6, eco:7.1,  sr:10.8, dots:36 },
  { pos:4, name:'Tushar Deshpande',    matches:5, overs:17, wickets:8,  best:'3/28', avg:18.3, eco:7.8,  sr:12.8, dots:30 },
  { pos:5, name:'Moeen Ali',           matches:5, overs:14, wickets:5,  best:'2/22', avg:22.4, eco:6.4,  sr:16.8, dots:28 },
];
const pointsTable = [
  { team:'Chennai Super Kings', p:5, w:5, l:0, nrr:'+1.124', pts:10 },
  { team:'Kolkata Knight Riders',p:5, w:4, l:1, nrr:'+0.842', pts:8  },
  { team:'Mumbai Indians',      p:5, w:3, l:2, nrr:'+0.321', pts:6  },
  { team:'Rajasthan Royals',    p:5, w:3, l:2, nrr:'+0.112', pts:6  },
  { team:'Sunrisers Hyderabad', p:5, w:2, l:3, nrr:'-0.234', pts:4  },
  { team:'Royal Challengers Bengaluru',p:5,w:2,l:3,nrr:'-0.445',pts:4 },
  { team:'Delhi Capitals',      p:5, w:1, l:4, nrr:'-0.621', pts:2  },
  { team:'Punjab Kings',        p:5, w:0, l:5, nrr:'-1.089', pts:0  },
];
const milestones = [
  { icon:'🏏', value:'1,578',  label:'Total Runs',    sub:'Season 2026' },
  { icon:'🎯', value:'48',     label:'Total Wickets',  sub:'By bowlers' },
  { icon:'💥', value:'76',     label:'Sixes Hit',      sub:'Most in IPL' },
  { icon:'⚡', value:'155.8',  label:'Avg Strike Rate', sub:'Batting SR' },
  { icon:'🛡️', value:'6.2',   label:'Best Economy',   sub:'Pathirana' },
  { icon:'🔥', value:'4/18',   label:'Best Bowling',   sub:'Pathirana' },
];
const tabsList = ['Batting','Bowling','Points Table'];

export default function Stats() {
  const [tab, setTab] = useState('Batting');
  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 24px' }}>
      <div style={{ marginBottom:36 }}>
        <p className="section-label">IPL 2026 Season</p>
        <h1 className="section-title" style={{ marginBottom:10 }}>Team Statistics 📊</h1>
        <p className="section-subtitle">Comprehensive stats, records, and season performance data for CSK.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:14, marginBottom:40 }}>
        {milestones.map((m,i)=>(
          <div key={i} className="card anim-fade-up" style={{ textAlign:'center', padding:'22px 14px', animationDelay:`${i*60}ms`, animationFillMode:'both' }}>
            <div style={{ fontSize:'1.5rem', marginBottom:6 }}>{m.icon}</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.2rem', color:'var(--primary)', lineHeight:1 }}>{m.value}</div>
            <div style={{ fontSize:'0.7rem', fontWeight:700, color:'var(--text)', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:4 }}>{m.label}</div>
            <div style={{ fontSize:'0.62rem', color:'var(--text-muted)', marginTop:2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:0, borderBottom:'1px solid var(--border)', marginBottom:28 }}>
        {tabsList.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'11px 22px', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.875rem', background:'transparent', border:'none', color:tab===t?'var(--primary)':'var(--text-muted)', borderBottom:tab===t?'2px solid var(--primary)':'2px solid transparent', marginBottom:-1, transition:'all 0.2s', whiteSpace:'nowrap' }}>{t}</button>
        ))}
      </div>

      {tab==='Batting' && (
        <div className="anim-fade-in">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16, marginBottom:32 }}>
            {batting.slice(0,3).map((p,i)=>(
              <div key={i} className="card" style={{ padding:'24px', textAlign:'center', background:i===0?'linear-gradient(135deg,rgba(253,185,19,0.1),rgba(229,162,0,0.05))':'var(--card-bg)', borderColor:i===0?'var(--border-hover)':'var(--border)' }}>
                <div style={{ fontSize:'2rem', marginBottom:6 }}>{['🥇','🥈','🥉'][i]}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.1rem', color:'var(--text)', marginBottom:4 }}>{p.name}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'3rem', color:'var(--primary)', lineHeight:1 }}>{p.runs}</div>
                <div style={{ fontSize:'0.65rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', marginTop:4 }}>Runs</div>
                <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:14 }}>
                  {[['HS',p.hs],['Avg',p.avg],['SR',p.sr]].map(([l,v])=>(<div key={l}><div style={{ fontSize:'0.95rem', fontWeight:700, color:'var(--text)' }}>{v}</div><div style={{ fontSize:'0.55rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase' }}>{l}</div></div>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.82rem' }}>
              <thead><tr style={{ borderBottom:'2px solid var(--border-hover)' }}>
                {['#','Player','M','Inn','Runs','HS','Avg','SR','50s','100s','4s','6s'].map(h=>(
                  <th key={h} style={{ padding:'12px 10px', textAlign:h==='Player'?'left':'center', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.68rem', color:'var(--primary)', textTransform:'uppercase', letterSpacing:'0.1em', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{batting.map((p,i)=>(
                <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='var(--primary-subtle)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-muted)', fontWeight:700 }}>{p.pos}</td>
                  <td style={{ padding:'14px 10px', fontFamily:"'Outfit',sans-serif", fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>{p.name}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.matches}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.innings}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', fontWeight:700, color:'var(--primary)', fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem' }}>{p.runs}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--green)', fontWeight:600 }}>{p.hs}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.avg}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--blue)', fontWeight:600 }}>{p.sr}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p['50s']}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:p['100s']>0?'var(--primary)':'var(--text-secondary)', fontWeight:p['100s']>0?700:400 }}>{p['100s']}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p['4s']}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p['6s']}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='Bowling' && (
        <div className="anim-fade-in">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16, marginBottom:32 }}>
            {bowling.slice(0,3).map((p,i)=>(
              <div key={i} className="card" style={{ padding:'24px', textAlign:'center', background:i===0?'linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.03))':'var(--card-bg)', borderColor:i===0?'rgba(239,68,68,0.3)':'var(--border)' }}>
                <div style={{ fontSize:'2rem', marginBottom:6 }}>{['🥇','🥈','🥉'][i]}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.1rem', color:'var(--text)', marginBottom:4 }}>{p.name}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'3rem', color:'var(--red)', lineHeight:1 }}>{p.wickets}</div>
                <div style={{ fontSize:'0.65rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', marginTop:4 }}>Wickets</div>
                <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:14 }}>
                  {[['Best',p.best],['Eco',p.eco],['Avg',p.avg]].map(([l,v])=>(<div key={l}><div style={{ fontSize:'0.95rem', fontWeight:700, color:'var(--text)' }}>{v}</div><div style={{ fontSize:'0.55rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase' }}>{l}</div></div>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.82rem' }}>
              <thead><tr style={{ borderBottom:'2px solid rgba(239,68,68,0.25)' }}>
                {['#','Player','M','Overs','Wkts','Best','Avg','Eco','SR','Dots'].map(h=>(
                  <th key={h} style={{ padding:'12px 10px', textAlign:h==='Player'?'left':'center', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.68rem', color:'var(--red)', textTransform:'uppercase', letterSpacing:'0.1em', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{bowling.map((p,i)=>(
                <tr key={i} style={{ borderBottom:'1px solid var(--border)', transition:'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.04)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-muted)', fontWeight:700 }}>{p.pos}</td>
                  <td style={{ padding:'14px 10px', fontFamily:"'Outfit',sans-serif", fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>{p.name}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.matches}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.overs}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', fontWeight:700, color:'var(--red)', fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem' }}>{p.wickets}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--green)', fontWeight:600 }}>{p.best}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.avg}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--blue)', fontWeight:600 }}>{p.eco}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.sr}</td>
                  <td style={{ padding:'14px 10px', textAlign:'center', color:'var(--text-secondary)' }}>{p.dots}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='Points Table' && (
        <div className="anim-fade-in">
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.82rem' }}>
              <thead><tr style={{ borderBottom:'2px solid var(--border-hover)' }}>
                {['#','Team','P','W','L','NRR','Pts'].map(h=>(
                  <th key={h} style={{ padding:'14px 12px', textAlign:h==='Team'?'left':'center', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.7rem', color:'var(--primary)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{pointsTable.map((t,i)=>{
                const isCSK = t.team.includes('Chennai');
                return (
                  <tr key={i} style={{ borderBottom:'1px solid var(--border)', background:isCSK?'var(--primary-subtle)':'transparent', transition:'background 0.2s' }}>
                    <td style={{ padding:'16px 12px', textAlign:'center', fontWeight:700, color:i<4?'var(--green)':'var(--text-muted)' }}>{i+1}</td>
                    <td style={{ padding:'16px 12px', fontFamily:"'Outfit',sans-serif", fontWeight:isCSK?800:600, color:isCSK?'var(--primary)':'var(--text)', whiteSpace:'nowrap' }}>{isCSK && '🦁 '}{t.team}</td>
                    <td style={{ padding:'16px 12px', textAlign:'center', color:'var(--text-secondary)' }}>{t.p}</td>
                    <td style={{ padding:'16px 12px', textAlign:'center', color:'var(--green)', fontWeight:700 }}>{t.w}</td>
                    <td style={{ padding:'16px 12px', textAlign:'center', color:'var(--red)', fontWeight:600 }}>{t.l}</td>
                    <td style={{ padding:'16px 12px', textAlign:'center', color:t.nrr.startsWith('+')?'var(--green)':'var(--red)', fontWeight:600 }}>{t.nrr}</td>
                    <td style={{ padding:'16px 12px', textAlign:'center' }}><span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.3rem', color:isCSK?'var(--primary)':'var(--text)' }}>{t.pts}</span></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:20, padding:'12px 16px', background:'rgba(34,197,94,0.06)', borderRadius:12, border:'1px solid rgba(34,197,94,0.15)' }}>
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--green)', letterSpacing:'0.08em', textTransform:'uppercase' }}>✅ Top 4 teams qualify for playoffs</span>
          </div>
        </div>
      )}

      <div style={{ marginTop:48 }}>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'1.1rem', color:'var(--text)', marginBottom:20 }}>Season Performance Overview</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14 }}>
          {[
            { label:'Highest Team Score', value:'218/3', sub:'vs Mumbai Indians', color:'var(--green)' },
            { label:'Lowest Score Defended', value:'148/8', sub:'vs Delhi Capitals', color:'var(--red)' },
            { label:'Biggest Win', value:'42 Runs', sub:'vs Mumbai Indians', color:'var(--primary)' },
            { label:'Most Runs (Match)', value:'102*', sub:'Ruturaj Gaikwad', color:'var(--blue)' },
            { label:'Most Wickets (Match)', value:'4/18', sub:'Matheesha Pathirana', color:'var(--purple)' },
            { label:'Fastest Fifty', value:'16 balls', sub:'MS Dhoni', color:'#FBBF24' },
          ].map((item,i)=>(
            <div key={i} className="card" style={{ padding:'20px', borderLeft:`3px solid ${item.color}` }}>
              <div style={{ fontSize:'0.62rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8 }}>{item.label}</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.8rem', color:item.color, lineHeight:1 }}>{item.value}</div>
              <div style={{ fontSize:'0.75rem', color:'var(--text-secondary)', marginTop:6 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
