import { useState, useEffect, useRef } from 'react';

/* ─── Poll Data ──────────────────────────── */
const polls = [
  { id:1, question:'Who should be Player of the Tournament?', options:[
    { id:'a', text:'MS Dhoni 🦁', votes:1842 },
    { id:'b', text:'Ruturaj Gaikwad', votes:1323 },
    { id:'c', text:'Ravindra Jadeja', votes:938 },
    { id:'d', text:'Matheesha Pathirana', votes:712 },
  ]},
  { id:2, question:'Most memorable CSK title?', options:[
    { id:'a', text:'2010 — The First One', votes:621 },
    { id:'b', text:'2011 — Back-to-back', votes:489 },
    { id:'c', text:'2018 — The Comeback', votes:1156 },
    { id:'d', text:'2023 — Dhoni\'s Last as Captain', votes:1712 },
  ]},
  { id:3, question:'Best thing about Chepauk match day?', options:[
    { id:'a', text:'The Whistle Podu chant 🎵', votes:1534 },
    { id:'b', text:'Dhoni walking out to bat 🏏', votes:1967 },
    { id:'c', text:'Yellow everywhere 💛', votes:734 },
    { id:'d', text:'Victory celebrations 🎉', votes:878 },
  ]},
];

/* ─── Quiz ────────────────────────────────── */
const quizQuestions = [
  { q:'How many IPL titles has CSK won?', opts:['3','4','5','6'], ans:2 },
  { q:'In which year was CSK founded?', opts:['2006','2008','2010','2012'], ans:1 },
  { q:'Who is the highest run-scorer for CSK in IPL?', opts:['Suresh Raina','MS Dhoni','Ambati Rayudu','Ruturaj Gaikwad'], ans:0 },
  { q:'What is CSK\'s home ground?', opts:['Wankhede Stadium','Eden Gardens','MA Chidambaram Stadium','Chinnaswamy Stadium'], ans:2 },
  { q:'Which bowler took the most wickets for CSK?', opts:['Dwayne Bravo','Ravindra Jadeja','Deepak Chahar','Imran Tahir'], ans:0 },
];

/* ─── Forum Posts ─────────────────────────── */
const forumPosts = [
  { id:1, author:'ThalaDhoni_007',  avatar:'🦁', time:'2 hours ago', title:'Dhoni\'s finishing is still unmatched!',           body:'That 89* against Mumbai was vintage Thala. Age is just a number for Captain Cool!', likes:324, replies:42, tag:'Match Discussion' },
  { id:2, author:'CSKForever_YA',    avatar:'💛', time:'5 hours ago', title:'Pathirana is our secret weapon',                   body:'His yorkers are unplayable! 4/18 today. Best death bowler in the IPL right now.', likes:189, replies:28, tag:'Player Discussion' },
  { id:3, author:'ChepaukRoar',      avatar:'🏟️', time:'8 hours ago', title:'Who else is coming to the RCB match on Apr 26?',  body:'Section D, Row 8! Let\'s make the Whistle Podu the loudest ever! 🔊💛', likes:156, replies:64, tag:'Fan Meetup' },
  { id:4, author:'CricketAnalyst_TN',avatar:'📊', time:'1 day ago', title:'CSK\'s NRR of +1.124 is insane',                     body:'This is the best NRR in the league. Even if we lose 2 more, playoffs are guaranteed.', likes:98, replies:15, tag:'Analysis' },
];
const tagStyle = { 'Match Discussion':'badge-green','Player Discussion':'badge-purple','Fan Meetup':'badge-gold','Analysis':'badge-blue' };

/* ─── Social Feed ─────────────────────────── */
const socialPosts = [
  { platform:'Twitter', handle:'@ChennaiIPL', time:'1h', content:'🦁 WHAT. A. FINISH! Thala Dhoni smashes 89* as we crush MI by 42 runs! #WhistlePodu #CSK #IPL2026', likes:'18.4K', retweets:'5.2K' },
  { platform:'Twitter', handle:'@ChennaiIPL', time:'3h', content:'🎟️ Tickets for CSK vs RCB at Chepauk are LIVE! Grab yours now → chennaiipl.com/tickets 💛', likes:'8.1K', retweets:'2.1K' },
  { platform:'Instagram', handle:'@chennaiipl', time:'6h', content:'📸 Behind the scenes at Chepauk — the boys are training hard for Tuesday\'s big match! 🏏💛', likes:'42.6K', comments:'3.4K' },
  { platform:'Instagram', handle:'@chennaiipl', time:'1d', content:'🏆 5 titles. 1 family. Forever Yellow. Thank you, Yellove Army! #CSK #SuperKings 💛🦁', likes:'68.2K', comments:'5.8K' },
];

/* ─── Countdown ───────────────────────────── */
function Countdown() {
  const target = new Date('2026-04-26T19:30:00+05:30').getTime();
  const [diff, setDiff] = useState(target - Date.now());
  const timer = useRef(null);
  useEffect(() => { timer.current = setInterval(() => setDiff(target - Date.now()), 1000); return () => clearInterval(timer.current); }, [target]);
  if (diff <= 0) return <span style={{ color:'var(--green)', fontWeight:700 }}>🟢 Match is LIVE!</span>;
  const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
  return (
    <div style={{ display:'flex', gap:10 }}>
      {[['Days',d],['Hours',h],['Mins',m],['Secs',s]].map(([label,val]) => (
        <div key={label} style={{ textAlign:'center', padding:'12px 14px', background:'var(--primary-subtle)', borderRadius:12, border:'1px solid var(--border-hover)', minWidth:70 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2rem', color:'var(--primary)', lineHeight:1 }}>{String(val).padStart(2,'0')}</div>
          <div style={{ fontSize:'0.55rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:3 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Poll Widget ─────────────────────────── */
function PollWidget({ poll }) {
  const [voted, setVoted] = useState(null);
  const totalVotes = poll.options.reduce((acc,o) => acc + o.votes + (voted===o.id?1:0), 0);
  return (
    <div className="card" style={{ padding:'24px', marginBottom:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
        <span style={{ fontSize:'1.2rem' }}>📊</span>
        <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--text)' }}>{poll.question}</h3>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {poll.options.map(o => {
          const v = o.votes + (voted===o.id?1:0);
          const pct = totalVotes>0 ? Math.round((v/totalVotes)*100) : 0;
          const sel = voted===o.id;
          return (
            <button key={o.id} onClick={()=>{if(!voted) setVoted(o.id);}} disabled={!!voted} style={{
              position:'relative', padding:'14px 16px', borderRadius:12, cursor:voted?'default':'pointer',
              background:sel?'rgba(253,185,19,0.12)':'rgba(255,255,255,0.03)',
              border:sel?'1.5px solid var(--border-hover)':'1.5px solid var(--border)',
              textAlign:'left', overflow:'hidden', transition:'all 0.2s',
              fontFamily:"'Outfit',sans-serif", color:'var(--text)', fontSize:'0.88rem', fontWeight:600,
            }}>
              {voted && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:sel?'rgba(253,185,19,0.1)':'rgba(255,255,255,0.02)', borderRadius:12, transition:'width 0.6s ease' }}/>}
              <div style={{ position:'relative', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span>{o.text}</span>
                {voted && <span style={{ fontSize:'0.78rem', fontWeight:700, color:sel?'var(--primary)':'var(--text-muted)' }}>{pct}%</span>}
              </div>
            </button>
          );
        })}
      </div>
      {voted && <p style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginTop:12 }}>✅ Total votes: <span style={{ color:'var(--primary)', fontWeight:700 }}>{totalVotes.toLocaleString()}</span></p>}
    </div>
  );
}

/* ─── Quiz Widget ─────────────────────────── */
function QuizWidget() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);
  const q = quizQuestions[idx];
  const pick = (i) => { if (picked!==null) return; setPicked(i); if (i===q.ans) setScore(s=>s+1); };
  const next = () => { if (idx<quizQuestions.length-1) { setIdx(i=>i+1); setPicked(null); } else setDone(true); };

  if (done) return (
    <div className="card" style={{ padding:'32px', textAlign:'center' }}>
      <div style={{ fontSize:'3rem', marginBottom:10 }}>🏆</div>
      <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:8 }}>Quiz Complete!</h3>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'3rem', color:'var(--primary)', lineHeight:1 }}>{score}/{quizQuestions.length}</div>
      <p style={{ color:'var(--text-secondary)', marginTop:12, fontSize:'0.9rem' }}>{score>=4?'🦁 True Super Kings fan!':score>=2?'Good effort! Keep following CSK!':'Time to brush up on your CSK history!'}</p>
      <button className="btn-primary" style={{ marginTop:16 }} onClick={()=>{setIdx(0);setScore(0);setPicked(null);setDone(false);}}>Play Again</button>
    </div>
  );

  return (
    <div className="card" style={{ padding:'24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
        <span className="badge badge-gold">Question {idx+1}/{quizQuestions.length}</span>
        <span style={{ fontSize:'0.78rem', color:'var(--primary)', fontWeight:700 }}>Score: {score}</span>
      </div>
      <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--text)', marginBottom:16 }}>{q.q}</h3>
      <div style={{ display:'grid', gap:8 }}>
        {q.opts.map((o,i)=>(
          <button key={i} onClick={()=>pick(i)} style={{
            padding:'12px 16px', borderRadius:10, cursor:picked!==null?'default':'pointer', textAlign:'left',
            fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.88rem', transition:'all 0.2s',
            background: picked===null ? 'var(--primary-subtle)' : i===q.ans ? 'rgba(34,197,94,0.15)' : picked===i ? 'rgba(239,68,68,0.15)' : 'var(--primary-subtle)',
            border: picked===null ? '1.5px solid var(--border)' : i===q.ans ? '1.5px solid rgba(34,197,94,0.4)' : picked===i ? '1.5px solid rgba(239,68,68,0.4)' : '1.5px solid var(--border)',
            color: picked===null ? 'var(--text)' : i===q.ans ? 'var(--green)' : picked===i ? 'var(--red)' : 'var(--text-muted)',
          }}>{o} {picked!==null && i===q.ans && '✅'}{picked===i && i!==q.ans && '❌'}</button>
        ))}
      </div>
      {picked!==null && <button className="btn-primary" style={{ marginTop:16, width:'100%', justifyContent:'center' }} onClick={next}>{idx<quizQuestions.length-1?'Next Question →':'See Results'}</button>}
    </div>
  );
}

/* ─── Main FanZone ────────────────────────── */
export default function FanZone() {
  const [forumTab, setForumTab] = useState('All');
  const forumTags = ['All','Match Discussion','Player Discussion','Fan Meetup','Analysis'];
  const filteredPosts = forumPosts.filter(p => forumTab==='All' || p.tag===forumTab);

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 24px' }}>
      <div style={{ marginBottom:40 }}>
        <p className="section-label">Chennai Super Kings</p>
        <h1 className="section-title" style={{ marginBottom:10 }}>Fan Zone 🎉</h1>
        <p className="section-subtitle">Polls, quizzes, forums, social updates — everything a true Yellow Army soldier needs!</p>
      </div>

      {/* Countdown */}
      <div className="card" style={{ padding:'32px', marginBottom:40, background:'linear-gradient(135deg,var(--surface),var(--surface2))', borderColor:'var(--border-hover)' }}>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:20 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}><span className="live-dot"/><span style={{ fontSize:'0.68rem', fontWeight:700, color:'var(--green)', letterSpacing:'0.12em', textTransform:'uppercase' }}>Next Match Countdown</span></div>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.4rem', color:'var(--text)', marginBottom:4 }}>🦁 CSK vs Royal Challengers Bengaluru</h2>
            <p style={{ fontSize:'0.82rem', color:'var(--text-muted)' }}>📍 MA Chidambaram Stadium, Chennai · ⏰ 7:30 PM IST · Apr 26, 2026</p>
          </div>
          <Countdown />
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }} className="fan-zone-grid">
        {/* Left: Polls */}
        <div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>🗳️ Fan Polls</h2>
          {polls.map(p => <PollWidget key={p.id} poll={p}/>)}
        </div>
        {/* Right: Quiz + Social */}
        <div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>🧠 CSK Quiz</h2>
          <div style={{ marginBottom:28 }}><QuizWidget/></div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>📱 Social Feed</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {socialPosts.map((s,i)=>(
              <div key={i} className="card" style={{ padding:'20px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', background:s.platform==='Twitter'?'rgba(29,155,240,0.15)':'linear-gradient(135deg,rgba(225,48,108,0.15),rgba(131,58,180,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem' }}>{s.platform==='Twitter'?'𝕏':'📸'}</div>
                    <div><div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.82rem', color:'var(--text)' }}>{s.handle}</div><div style={{ fontSize:'0.62rem', color:'var(--text-muted)' }}>{s.time} ago</div></div>
                  </div>
                  <span className={`badge ${s.platform==='Twitter'?'badge-blue':'badge-purple'}`} style={{ fontSize:'0.55rem' }}>{s.platform}</span>
                </div>
                <p style={{ color:'var(--text-secondary)', fontSize:'0.85rem', lineHeight:1.7, marginBottom:12 }}>{s.content}</p>
                <div style={{ display:'flex', gap:16, fontSize:'0.72rem', color:'var(--text-muted)' }}>
                  <span>❤️ {s.likes}</span>{s.retweets && <span>🔁 {s.retweets}</span>}{s.comments && <span>💬 {s.comments}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forum */}
      <div style={{ marginTop:48 }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>💬 Fan Forum</h2>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
          {forumTags.map(t=>(
            <button key={t} onClick={()=>setForumTab(t)} style={{ padding:'7px 16px', borderRadius:99, cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.78rem', background:forumTab===t?'var(--primary)':'transparent', color:forumTab===t?'#0A1628':'var(--text-muted)', border:forumTab===t?'1.5px solid var(--primary)':'1.5px solid var(--border)', transition:'all 0.2s' }}>{t}</button>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {filteredPosts.map((post,i)=>(
            <div key={post.id} className="card anim-fade-up" style={{ padding:'22px 24px', animationDelay:`${i*60}ms`, animationFillMode:'both' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:'var(--primary-subtle)', border:'1px solid var(--border-hover)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>{post.avatar}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6, flexWrap:'wrap' }}>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.85rem', color:'var(--primary)' }}>{post.author}</span>
                    <span className={`badge ${tagStyle[post.tag]||'badge-gold'}`} style={{ fontSize:'0.55rem' }}>{post.tag}</span>
                    <span style={{ fontSize:'0.68rem', color:'var(--text-muted)', marginLeft:'auto' }}>{post.time}</span>
                  </div>
                  <h4 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--text)', marginBottom:6 }}>{post.title}</h4>
                  <p style={{ color:'var(--text-secondary)', fontSize:'0.85rem', lineHeight:1.7, marginBottom:14 }}>{post.body}</p>
                  <div style={{ display:'flex', gap:20, fontSize:'0.78rem' }}>
                    {[['❤️',post.likes],['💬',`${post.replies} replies`],['🔗','Share']].map(([i,l])=>(
                      <button key={i} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>{i} <span>{l}</span></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:24, textAlign:'center' }}><button className="btn-primary">✍️ Start a New Discussion</button></div>
      </div>

      {/* Newsletter */}
      <div style={{ marginTop:48, borderRadius:20, padding:'48px 36px', textAlign:'center', background:'linear-gradient(135deg,rgba(253,185,19,0.12),rgba(229,162,0,0.06))', border:'1px solid var(--border-hover)' }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'clamp(1.4rem,3.5vw,2rem)', color:'var(--text)', marginBottom:10 }}>Never Miss a Moment 💛</h2>
        <p style={{ color:'var(--text-muted)', fontSize:'0.925rem', lineHeight:1.7, maxWidth:460, margin:'0 auto 24px' }}>Subscribe for exclusive CSK content, early ticket access, and behind-the-scenes updates.</p>
        <div style={{ display:'flex', gap:10, maxWidth:440, margin:'0 auto', flexWrap:'wrap', justifyContent:'center' }}>
          <input type="email" placeholder="your@email.com" className="input-field" style={{ flex:'1 1 220px', textAlign:'center' }}/>
          <button className="btn-primary" style={{ whiteSpace:'nowrap' }}>🚀 Subscribe</button>
        </div>
      </div>
    </div>
  );
}
