import { useState } from 'react';
import PlayerCard from '../components/PlayerCard';

const players = [
  { id:1, name:'MS Dhoni', role:'Wicketkeeper', number:'7', img:'https://placehold.co/400x500/0A1628/FDB913?text=%237+MS+Dhoni&font=roboto', stats:{runs:5243,wickets:0,matches:264}, bio:'Captain Cool — the greatest captain in IPL history. MS Dhoni has led CSK to 5 IPL titles with his ice-cold composure, lightning-quick stumpings, and legendary finishing ability. The heartbeat of CSK.', country:'India', age:44, bat:'Right-hand', bowl:'Right-arm medium' },
  { id:2, name:'Ruturaj Gaikwad', role:'Batsman', number:'31', img:'https://placehold.co/400x500/0A1628/FDB913?text=%2331+Ruturaj%0AGaikwad&font=roboto', stats:{runs:2578,wickets:0,matches:76}, bio:'The heir to the CSK throne. Ruturaj Gaikwad won the Orange Cap in 2021 and was appointed captain in 2024. His elegant stroke play and composure make him the future of CSK batting.', country:'India', age:27, bat:'Right-hand', bowl:'Right-arm off-break' },
  { id:3, name:'Ravindra Jadeja', role:'All-Rounder', number:'8', img:'https://placehold.co/400x500/0A1628/FDB913?text=%238+Ravindra%0AJadeja&font=roboto', stats:{runs:3345,wickets:175,matches:260}, bio:'Sir Jadeja — CSK\'s triple-threat weapon. Electric fielding, crafty left-arm spin, and explosive lower-order batting. One of the greatest all-rounders in IPL history.', country:'India', age:37, bat:'Left-hand', bowl:'Left-arm orthodox' },
  { id:4, name:'Devon Conway', role:'Batsman', number:'88', img:'https://placehold.co/400x500/0A1628/FDB913?text=%2388+Devon%0AConway&font=roboto', stats:{runs:1150,wickets:0,matches:38}, bio:'New Zealand\'s silky left-hander who has become a CSK fan favorite. Conway\'s ability to anchor the innings with elegant stroke-play provides the perfect platform at the top of the order.', country:'New Zealand', age:34, bat:'Left-hand', bowl:'Right-arm off-break' },
  { id:5, name:'Shivam Dube', role:'All-Rounder', number:'25', img:'https://placehold.co/400x500/0A1628/FDB913?text=%2325+Shivam%0ADube&font=roboto', stats:{runs:1542,wickets:18,matches:78}, bio:'The big-hitting left-hander who can clear any ground. Shivam Dube\'s explosive batting in the middle overs and useful medium-pace bowling make him a key asset for CSK in the power-hitting era.', country:'India', age:31, bat:'Left-hand', bowl:'Right-arm medium' },
  { id:6, name:'Deepak Chahar', role:'Bowler', number:'90', img:'https://placehold.co/400x500/0A1628/FDB913?text=%2390+Deepak%0AChahar&font=roboto', stats:{runs:186,wickets:82,matches:79}, bio:'CSK\'s powerplay specialist. Deepak Chahar\'s ability to swing the new ball both ways makes him lethal in the first six overs. Holds the IPL record of 4/13 — the best powerplay figures ever.', country:'India', age:33, bat:'Right-hand', bowl:'Right-arm medium-fast' },
  { id:7, name:'Matheesha Pathirana', role:'Bowler', number:'34', img:'https://placehold.co/400x500/0A1628/FDB913?text=%2334+Matheesha%0APathirana&font=roboto', stats:{runs:12,wickets:38,matches:25}, bio:'The Malinga 2.0! Sri Lanka\'s slinging yorker specialist has become CSK\'s deadliest weapon at the death. His unorthodox sling-arm action generates pace and sharp yorkers that are almost unplayable.', country:'Sri Lanka', age:23, bat:'Right-hand', bowl:'Right-arm fast' },
  { id:8, name:'Moeen Ali', role:'All-Rounder', number:'18', img:'https://placehold.co/400x500/0A1628/FDB913?text=%2318+Moeen%0AAli&font=roboto', stats:{runs:948,wickets:28,matches:44}, bio:'England\'s flamboyant all-rounder who provides CSK with firepower at the top and crucial off-spin in the middle overs. Moeen\'s big-hitting and composed batting make him a match-winner.', country:'England', age:38, bat:'Left-hand', bowl:'Right-arm off-break' },
  { id:9, name:'Ajinkya Rahane', role:'Batsman', number:'45', img:'https://placehold.co/400x500/0A1628/FDB913?text=%2345+Ajinkya%0ARahane&font=roboto', stats:{runs:4340,wickets:0,matches:178}, bio:'The seasoned campaigner who found a second wind at CSK. Rahane\'s classical technique and ability to play anchor innings provide stability to the batting lineup when wickets fall around him.', country:'India', age:37, bat:'Right-hand', bowl:'Right-arm medium' },
  { id:10, name:'Tushar Deshpande', role:'Bowler', number:'2', img:'https://placehold.co/400x500/0A1628/FDB913?text=%232+Tushar%0ADeshpande&font=roboto', stats:{runs:24,wickets:52,matches:42}, bio:'The unsung hero of CSK\'s bowling attack. Tushar\'s ability to hit hard lengths consistently and extract bounce from any surface makes him an effective weapon throughout the innings.', country:'India', age:29, bat:'Right-hand', bowl:'Right-arm fast-medium' },
];

const roles = ['All','Batsman','Bowler','All-Rounder','Wicketkeeper'];
const roleColor = { 'Batsman':'badge-gold','Bowler':'badge-red','All-Rounder':'badge-blue','Wicketkeeper':'badge-purple' };

function PlayerModal({ player, onClose }) {
  if (!player) return null;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} className="modal-grid" style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, maxWidth:720, width:'100%', overflow:'hidden', maxHeight:'90vh', overflowY:'auto', display:'grid', gridTemplateColumns:'1fr 1.4fr' }}>
        <div style={{ position:'relative', minHeight:320, background:'var(--surface2)' }}>
          <img src={player.img} alt={player.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 50%, var(--surface) 100%)' }}/>
          <div style={{ position:'absolute', top:16, left:16 }}><span className={`badge ${roleColor[player.role]||'badge-gold'}`}>{player.role}</span></div>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 16px 16px' }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'5rem', color:'rgba(253,185,19,0.08)', lineHeight:1, userSelect:'none' }}>#{player.number}</div>
          </div>
        </div>
        <div style={{ padding:'28px 28px 28px 20px' }}>
          <button onClick={onClose} style={{ float:'right', background:'var(--primary-subtle)', border:'none', color:'var(--text-secondary)', cursor:'pointer', borderRadius:8, padding:'6px 10px', fontSize:'1rem' }}>✕</button>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'1.8rem', color:'var(--text)', lineHeight:1.1, marginBottom:6 }}>{player.name}</h2>
          <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
            <span className={`badge ${roleColor[player.role]||'badge-gold'}`}>{player.role}</span>
            <span className="badge badge-blue">🌏 {player.country}</span>
            <span style={{ background:'var(--primary-subtle)', color:'var(--text-secondary)', border:'1px solid var(--border)', borderRadius:99, padding:'4px 10px', fontSize:'0.68rem', fontWeight:700 }}>Age {player.age}</span>
          </div>
          <p style={{ color:'var(--text-secondary)', fontSize:'0.85rem', lineHeight:1.7, marginBottom:20 }}>{player.bio}</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
            {[['Batting',player.bat],['Bowling',player.bowl],['Jersey',`#${player.number}`],['Matches',player.stats.matches]].map(([l,v])=>(
              <div key={l} style={{ padding:'10px 14px', background:'var(--primary-subtle)', borderRadius:10, border:'1px solid var(--border)' }}>
                <div style={{ fontSize:'0.6rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:3 }}>{l}</div>
                <div style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--text)' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {[['Runs',(player.stats.runs||0).toLocaleString()],['Wickets',player.stats.wickets||0],['Matches',player.stats.matches||'—']].map(([l,v])=>(
              <div key={l} style={{ textAlign:'center', padding:'12px 8px', background:'var(--primary-subtle)', borderRadius:10, border:'1px solid var(--border-hover)' }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.8rem', color:'var(--primary)', lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:'0.6rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Players() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const list = players.filter(p => (filter==='All' || p.role===filter) && p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 24px' }}>
      <PlayerModal player={selected} onClose={()=>setSelected(null)}/>
      <div style={{ marginBottom:36 }}>
        <p className="section-label">IPL 2026 Season</p>
        <h1 className="section-title" style={{ marginBottom:8 }}>CSK Squad 🦁</h1>
        <p className="section-subtitle">Click any player card to view full profile, stats and career info.</p>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'center', marginBottom:28 }}>
        <div style={{ position:'relative', flex:'1 1 200px', maxWidth:280 }}>
          <svg style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search player..." value={search} onChange={e=>setSearch(e.target.value)} className="input-field" style={{ paddingLeft:36 }}/>
        </div>
        <div className="filter-scroll" style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {roles.map(r=>(
            <button key={r} onClick={()=>setFilter(r)} style={{ padding:'8px 16px', borderRadius:99, cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.8rem', transition:'all 0.2s', background:filter===r?'var(--primary)':'transparent', color:filter===r?'#0A1628':'var(--text-secondary)', border:filter===r?'1.5px solid var(--primary)':'1.5px solid var(--border)', boxShadow:filter===r?'0 0 14px var(--primary-glow)':'none' }}>
              {r} <span style={{ opacity:0.7, fontSize:'0.72rem' }}>({r==='All'?players.length:players.filter(p=>p.role===r).length})</span>
            </button>
          ))}
        </div>
      </div>
      <p style={{ color:'var(--text-muted)', fontSize:'0.78rem', fontWeight:600, marginBottom:22 }}>Showing <span style={{ color:'var(--primary)' }}>{list.length}</span> players</p>
      {list.length > 0 ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:18 }}>
          {list.map((p,i)=>(
            <div key={p.id} onClick={()=>setSelected(p)} className="anim-fade-up" style={{ cursor:'pointer', animationDelay:`${i*55}ms`, animationFillMode:'both' }}>
              <PlayerCard name={p.name} image={p.img} role={p.role} team="CSK" stats={p.stats} number={p.number}/>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding:'80px 0', textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:12 }}>🔍</div>
          <p style={{ color:'var(--text-muted)', fontWeight:600 }}>No players found</p>
        </div>
      )}
    </div>
  );
}
