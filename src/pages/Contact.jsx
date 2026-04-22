import { useState } from 'react';

const socials = [
  { name:'Instagram', handle:'@chennaiipl', url:'https://instagram.com/chennaiipl', icon:'📸', color:'#E4405F', followers:'16.5M' },
  { name:'X (Twitter)', handle:'@ChennaiIPL', url:'https://twitter.com/ChennaiIPL', icon:'𝕏', color:'#1DA1F2', followers:'11.2M' },
  { name:'YouTube', handle:'Chennai Super Kings', url:'https://youtube.com/@ChennaiSuperKings', icon:'▶️', color:'#FF0000', followers:'8.4M' },
  { name:'Facebook', handle:'Chennai Super Kings', url:'https://facebook.com/ChennaiSuperKings', icon:'📘', color:'#1877F2', followers:'22.1M' },
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const update = (k,v) => setForm(f => ({...f, [k]:v }));
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(()=>setSent(false), 3000); setForm({ name:'', email:'', subject:'', message:'' }); };

  return (
    <div style={{ maxWidth:1000, margin:'0 auto', padding:'60px 24px' }}>
      <div style={{ marginBottom:36 }}>
        <p className="section-label">Get In Touch</p>
        <h1 className="section-title" style={{ marginBottom:10 }}>Contact Us 📧</h1>
        <p className="section-subtitle">Have questions, feedback, or just want to say Whistle Podu? We'd love to hear from you!</p>
      </div>

      {/* Social Links */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14, marginBottom:40 }}>
        {socials.map((s,i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="card" style={{ padding:'20px', textDecoration:'none', display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:`${s.color}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0, border:`1px solid ${s.color}30` }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.88rem', color:'var(--text)' }}>{s.name}</div>
              <div style={{ fontSize:'0.72rem', color:'var(--primary)', fontWeight:600 }}>{s.handle}</div>
              <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', fontWeight:600, marginTop:2 }}>{s.followers} followers</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }} className="hero-grid">
        {/* Contact Form */}
        <div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20 }}>📝 Fan Feedback Form</h2>
          <form onSubmit={submit}>
            <div style={{ display:'grid', gap:14 }}>
              <div>
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Your Name</label>
                <input type="text" required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Enter your name" className="input-field" />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Email Address</label>
                <input type="email" required value={form.email} onChange={e=>update('email',e.target.value)} placeholder="your@email.com" className="input-field" />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Subject</label>
                <select value={form.subject} onChange={e=>update('subject',e.target.value)} className="input-field" style={{ cursor:'pointer' }}>
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="tickets">Ticket Support</option>
                  <option value="merchandise">Merchandise</option>
                  <option value="feedback">Fan Feedback</option>
                  <option value="media">Media / Press</option>
                  <option value="partnerships">Partnerships</option>
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Message</label>
                <textarea required rows={5} value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Write your message here..." className="input-field" style={{ resize:'vertical', minHeight:120 }} />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent:'center', width:'100%' }}>
                {sent ? '✅ Message Sent!' : '📤 Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Info */}
        <div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:'1.3rem', color:'var(--text)', marginBottom:20 }}>📍 Find Us</h2>
          <div className="card" style={{ padding:'24px', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'var(--primary-subtle)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0, border:'1px solid var(--border-hover)' }}>🏟️</div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.95rem', color:'var(--text)' }}>MA Chidambaram Stadium</div>
                <div style={{ fontSize:'0.78rem', color:'var(--text-secondary)' }}>Chepauk, Chennai, Tamil Nadu 600005</div>
              </div>
            </div>
            <div className="divider" style={{ margin:'14px 0' }} />
            <div style={{ display:'grid', gap:14 }}>
              {[
                ['📧','Email','info@chennaiipl.com'],
                ['📞','Phone','+91 44 2846 0000'],
                ['🌐','Website','www.chennaisuperkings.com'],
                ['🕐','Match Day','Gates open 2 hours before first ball'],
              ].map(([icon,label,value]) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:'1rem', width:20, textAlign:'center' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize:'0.65rem', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{label}</div>
                    <div style={{ fontSize:'0.85rem', color:'var(--text)', fontWeight:500 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="card" style={{ padding:'24px' }}>
            <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--text)', marginBottom:8 }}>📬 Newsletter</h3>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.82rem', lineHeight:1.6, marginBottom:16 }}>Get exclusive CSK updates, ticket drops, and behind-the-scenes content delivered to your inbox.</p>
            <div style={{ display:'flex', gap:8 }}>
              <input type="email" placeholder="your@email.com" className="input-field" style={{ flex:1 }}/>
              <button className="btn-primary" style={{ padding:'10px 16px', fontSize:'0.82rem', whiteSpace:'nowrap' }}>Subscribe</button>
            </div>
          </div>

          {/* Quick links */}
          <div className="card" style={{ padding:'24px', marginTop:16 }}>
            <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'1rem', color:'var(--text)', marginBottom:14 }}>🔗 Quick Links</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {['🎟️ Buy Tickets','🛍️ Merchandise','📸 Media Accreditation','🤝 Partnerships','📋 Careers','💡 FAQ'].map(link => (
                <a key={link} href="#" style={{ padding:'10px 14px', borderRadius:10, background:'var(--primary-subtle)', border:'1px solid var(--border)', color:'var(--text)', textDecoration:'none', fontSize:'0.82rem', fontWeight:600, transition:'all 0.2s', display:'block' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-hover)';e.currentTarget.style.color='var(--primary)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text)';}}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
