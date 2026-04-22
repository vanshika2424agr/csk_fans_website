import { useState } from 'react';

const categories = ['All','Match Day','Training','Fan Moments','Behind the Scenes','Trophy Celebrations'];
const photos = [
  { id:1, src:'public/download.webp', cat:'Match Day', title:'CSK Light Up Chepauk Under the Floodlights', span:'wide' },
  { id:2, src:'public/dhoni.webp', cat:'Match Day', title:'Dhoni Smashes a Six into the Stands', span:'' },
  { id:3, src:'public/download (1).webp', cat:'Training', title:'Gaikwad Practices in the Nets at Chepauk', span:'' },
  { id:4, src:'public/training.webp', cat:'Training', title:'CSK Squad Pre-Season Training Session', span:'wide' },
  { id:5, src:'public/coach.webp', cat:'Behind the Scenes', title:'Coach Fleming Discusses Strategy with Dhoni', span:'' },
  { id:6, src:'public/download (3).webp', cat:'Behind the Scenes', title:'Inside the CSK Dressing Room', span:'' },
  { id:7, src:'public/download (2).webp', cat:'Fan Moments', title:'Yellow Army Takes Over — 38,000 Strong at Chepauk', span:'' },
  { id:8, src:'public/fans.webp', cat:'Fan Moments', title:'Young CSK Fans Meet Their Heroes', span:'' },
  { id:9, src:'public/trophy.webp', cat:'Trophy Celebrations', title:'IPL 2023 — CSK Lift Their 5th Title!', span:'wide' },
  { id:10, src:'public/raises.webp', cat:'Trophy Celebrations', title:'Dhoni Raises the Trophy One Last Time as Captain', span:'' },
  { id:11, src:'public/download.webp', cat:'Match Day', title:'Pathirana\'s Sling-Arm Yorker — Pure Magic', span:'' },
  { id:12, src:'public/Jadeja_Rahul.webp', cat:'Training', title:'Jadeja\'s Fielding Drills — Run-Out Machine', span:'' },
];

function LightBox({ photo, onClose, onPrev, onNext }) {
  if (!photo) return null;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.92)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ maxWidth:900, width:'100%', position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:-50, right:0, background:'rgba(255,255,255,0.1)', border:'none', color:'var(--text)', cursor:'pointer', borderRadius:8, padding:'8px 12px', fontSize:'1rem', zIndex:10 }}>✕</button>
        <div style={{ borderRadius:16, overflow:'hidden', position:'relative' }}>
          <img src={photo.src} alt={photo.title} style={{ width:'100%', display:'block', maxHeight:'75vh', objectFit:'cover' }}/>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', padding:'40px 24px 24px' }}>
            <span className="badge badge-gold" style={{ marginBottom:8 }}>{photo.cat}</span>
            <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'1.1rem', color:'#F1F5F9', lineHeight:1.4 }}>{photo.title}</h3>
          </div>
        </div>
        <button onClick={onPrev} style={{ position:'absolute', left:-60, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'#F1F5F9', cursor:'pointer', borderRadius:'50%', width:44, height:44, fontSize:'1.2rem', display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
        <button onClick={onNext} style={{ position:'absolute', right:-60, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'#F1F5F9', cursor:'pointer', borderRadius:'50%', width:44, height:44, fontSize:'1.2rem', display:'flex', alignItems:'center', justifyContent:'center' }}>→</button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const filtered = photos.filter(p => cat==='All' || p.cat===cat);

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 24px' }}>
      <LightBox photo={lightbox} onClose={()=>setLightbox(null)}
        onPrev={()=>{ const idx = filtered.findIndex(p=>p.id===lightbox.id); setLightbox(filtered[(idx-1+filtered.length)%filtered.length]); }}
        onNext={()=>{ const idx = filtered.findIndex(p=>p.id===lightbox.id); setLightbox(filtered[(idx+1)%filtered.length]); }}
      />
      <div style={{ marginBottom:36 }}>
        <p className="section-label">CSK Memories</p>
        <h1 className="section-title" style={{ marginBottom:10 }}>Photo Gallery 📸</h1>
        <p className="section-subtitle">Relive the best CSK moments — from title celebrations to Chepauk magic.</p>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:32 }}>
        {categories.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{ padding:'8px 18px', borderRadius:99, cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.8rem', background:cat===c?'var(--primary)':'transparent', color:cat===c?'#0A1628':'var(--text-muted)', border:cat===c?'1.5px solid var(--primary)':'1.5px solid var(--border)', transition:'all 0.2s' }}>{c}</button>
        ))}
      </div>
      <p style={{ color:'var(--text-muted)', fontSize:'0.78rem', fontWeight:600, marginBottom:22 }}>Showing <span style={{ color:'var(--primary)' }}>{filtered.length}</span> photos</p>
      {filtered.length > 0 ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
          {filtered.map((p,i)=>(
            <div key={p.id} className={`card anim-fade-up ${p.span==='wide'?'wide-span':''}`} onClick={()=>setLightbox(p)}
              style={{ overflow:'hidden', cursor:'pointer', gridColumn:p.span==='wide'?'span 2':'span 1', animationDelay:`${i*60}ms`, animationFillMode:'both' }}>
              <div style={{ position:'relative', height:p.span==='wide'?280:220, overflow:'hidden' }}>
                <img src={p.src} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'} loading="lazy"/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--bg) 0%, rgba(10,22,40,0.1) 50%, transparent 100%)' }}/>
                <div style={{ position:'absolute', bottom:16, left:16, right:16 }}>
                  <span className="badge badge-gold" style={{ marginBottom:6, fontSize:'0.58rem' }}>{p.cat}</span>
                  <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.88rem', color:'var(--text)', lineHeight:1.4 }}>{p.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding:'80px 0', textAlign:'center' }}><div style={{ fontSize:'3rem', marginBottom:12 }}>📷</div><p style={{ color:'var(--text-muted)', fontWeight:600 }}>No photos in this category</p></div>
      )}
    </div>
  );
}
