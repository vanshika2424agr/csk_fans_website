import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchMyBookings } from '../services/api';

export default function MyBookings() {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user || !token) {
      navigate('/login', { replace: true });
      return;
    }

    async function load() {
      try {
        const { data } = await fetchMyBookings(token);
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user, token, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div className="booking-modal__spinner" style={{ width: 36, height: 36, margin: '0 auto' }} />
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: 36 }}>
        <p className="section-label">Your Account</p>
        <h1 className="section-title" style={{ marginBottom: 10 }}>My Bookings 🎟️</h1>
        <p className="section-subtitle">
          Hi {user?.name}! Here are all your booked match tickets.
        </p>
      </div>

      {error && (
        <div className="auth-card__error" style={{ marginBottom: 20 }}>❌ {error}</div>
      )}

      {bookings.length === 0 ? (
        <div className="card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎫</div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)', marginBottom: 8 }}>
            No Bookings Yet
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
            You haven't booked any match tickets yet. Head over to the schedule and grab yours!
          </p>
          <Link to="/schedule" className="btn-primary">📅 View Schedule</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {bookings.map((booking, i) => {
            const m = booking.matchId;
            if (!m) return null;
            const isCSKHome = m.home === 'CSK';
            return (
              <div key={booking._id} className="card anim-fade-up" style={{ animationDelay: `${i * 60}ms`, padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 3, background: 'var(--gradient-primary)' }} />
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                        <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.05rem', color: isCSKHome ? 'var(--primary)' : 'var(--text)' }}>
                          {m.home === 'CSK' ? '🦁 CSK' : m.home}
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', padding: '2px 10px', background: 'var(--primary-subtle)', borderRadius: 99, border: '1px solid var(--border)' }}>vs</span>
                        <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.05rem', color: !isCSKHome ? 'var(--primary)' : 'var(--text)' }}>
                          {m.away === 'CSK' ? '🦁 CSK' : m.away}
                        </span>
                      </div>
                      {booking.bookingId && (
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.1rem', color: 'var(--primary)', letterSpacing: '0.08em' }}>
                            {booking.bookingId}
                          </span>
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--text-muted)', fontSize: '0.78rem', flexWrap: 'wrap' }}>
                        <span>📅 {m.date}, {m.day}</span>
                        <span>⏰ {m.time}</span>
                        <span>📍 {m.venue}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="badge badge-gold" style={{ marginBottom: 8 }}>
                        {booking.ticketsCount} Ticket{booking.ticketsCount > 1 ? 's' : ''}
                      </div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', color: 'var(--primary)', lineHeight: 1 }}>
                        ₹{booking.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="divider" style={{ margin: '14px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {booking.bookingId && (
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(booking.bookingId)}`}
                          alt="QR"
                          style={{ width: 36, height: 36, borderRadius: 4, background: 'white', padding: 2 }}
                        />
                      )}
                      <span>Booked: {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <span className="badge badge-green">Confirmed ✓</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
