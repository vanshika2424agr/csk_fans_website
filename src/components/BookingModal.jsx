import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Payment simulation phases
const PHASE_FORM = 'form';
const PHASE_PROCESSING = 'processing';
const PHASE_SUCCESS = 'success';

export default function BookingModal({ match, onClose, onSuccess }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(1);
  const [phase, setPhase] = useState(PHASE_FORM);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const ticketRef = useRef(null);

  if (!match) return null;

  const maxTickets = Math.min(match.availableSeats, 10);
  const totalPrice = tickets * match.ticketPrice;
  const isCSKHome = match.home === 'CSK';
  const matchName = `${match.home} vs ${match.away}`;

  const handleBook = async () => {
    if (!user || !token) {
      navigate('/login');
      onClose();
      return;
    }

    setError('');
    setPhase(PHASE_PROCESSING);

    // Fake payment delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const { data } = await createBooking(token, match._id, tickets);
      setBookingData({
        bookingId: data.bookingId,
        matchName,
        tickets,
        totalAmount: totalPrice,
        date: match.date,
        day: match.day,
        time: match.time,
        venue: match.venue,
        home: match.home,
        away: match.away,
      });
      setPhase(PHASE_SUCCESS);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
      setPhase(PHASE_FORM);
    }
  };

  const handleDownloadTicket = () => {
    const ticketEl = ticketRef.current;
    if (!ticketEl) return;

    const printWindow = window.open('', '_blank', 'width=500,height=700');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CSK Match Ticket — ${bookingData.bookingId}</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Outfit', sans-serif; background: #0A1628; color: #F1F5F9; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
          .ticket { width: 100%; max-width: 420px; background: #12203A; border: 2px solid rgba(253,185,19,0.3); border-radius: 20px; overflow: hidden; }
          .ticket-header { background: linear-gradient(135deg, #FDB913, #E5A200); padding: 20px 24px; text-align: center; }
          .ticket-header h1 { color: #0A1628; font-size: 1.4rem; font-weight: 800; }
          .ticket-header p { color: rgba(10,22,40,0.7); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 4px; }
          .ticket-body { padding: 24px; }
          .ticket-teams { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 20px; }
          .ticket-team { text-align: center; font-weight: 700; font-size: 0.95rem; }
          .ticket-team-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin: 0 auto 6px; }
          .ticket-team-icon.csk { background: linear-gradient(135deg, #FDB913, #E5A200); }
          .ticket-team-icon.other { background: #1B3055; border: 2px solid rgba(255,255,255,0.1); }
          .ticket-vs { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: #475569; }
          .ticket-csk { color: #FDB913; }
          .ticket-info { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
          .ticket-info-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 10px 12px; }
          .ticket-info-label { font-size: 0.65rem; color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3px; }
          .ticket-info-value { font-size: 0.85rem; font-weight: 700; color: #F1F5F9; }
          .ticket-info-value.gold { color: #FDB913; }
          .ticket-dashed { border-top: 2px dashed rgba(255,255,255,0.1); margin: 20px 0; position: relative; }
          .ticket-dashed::before, .ticket-dashed::after { content: ''; position: absolute; top: -12px; width: 24px; height: 24px; background: #0A1628; border-radius: 50%; }
          .ticket-dashed::before { left: -12px; }
          .ticket-dashed::after { right: -12px; }
          .ticket-qr { text-align: center; margin-bottom: 16px; }
          .ticket-qr img { width: 140px; height: 140px; border-radius: 10px; background: white; padding: 8px; }
          .ticket-booking-id { text-align: center; font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: #FDB913; letter-spacing: 0.1em; }
          .ticket-footer { text-align: center; font-size: 0.65rem; color: #475569; margin-top: 8px; }
          @media print { body { background: white; } .ticket { border-color: #ccc; } }
        </style>
      </head>
      <body>
        ${ticketEl.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  // ─── PROCESSING PHASE ───
  if (phase === PHASE_PROCESSING) {
    return (
      <>
        <div className="booking-backdrop" />
        <div className="booking-modal">
          <div style={{ padding: '60px 28px', textAlign: 'center' }}>
            <div className="payment-loader">
              <div className="payment-loader__ring" />
              <div className="payment-loader__icon">💳</div>
            </div>
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.15rem', color: 'var(--text)', marginTop: 24, marginBottom: 8 }}>
              Processing Payment...
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Please wait while we confirm your booking
            </p>
            <div className="payment-steps">
              <div className="payment-step payment-step--done">✓ Verifying tickets</div>
              <div className="payment-step payment-step--active">
                <span className="booking-modal__spinner" style={{ width: 14, height: 14 }} /> Processing payment
              </div>
              <div className="payment-step">Confirming booking</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── SUCCESS PHASE ───
  if (phase === PHASE_SUCCESS && bookingData) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `CSK-TICKET:${bookingData.bookingId}|${bookingData.matchName}|${bookingData.tickets}T|₹${bookingData.totalAmount}`
    )}`;

    return (
      <>
        <div className="booking-backdrop" onClick={onClose} />
        <div className="booking-modal" style={{ maxWidth: 480 }}>
          <button className="booking-modal__close" onClick={onClose} aria-label="Close">✕</button>

          {/* Success header */}
          <div style={{ padding: '28px 28px 0', textAlign: 'center' }}>
            <div className="success-check">✓</div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.3rem', color: 'var(--text)', marginTop: 16, marginBottom: 4 }}>
              Booking Confirmed! 🎉
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Your tickets have been booked successfully
            </p>
          </div>

          {/* Booking summary */}
          <div style={{ padding: '20px 28px' }}>
            <div className="booking-summary">
              <div className="booking-summary__row">
                <span>Booking ID</span>
                <span className="booking-summary__highlight">{bookingData.bookingId}</span>
              </div>
              <div className="booking-summary__row">
                <span>Match</span>
                <span>{bookingData.matchName}</span>
              </div>
              <div className="booking-summary__row">
                <span>Date & Time</span>
                <span>{bookingData.date}, {bookingData.day} · {bookingData.time}</span>
              </div>
              <div className="booking-summary__row">
                <span>Venue</span>
                <span>{bookingData.venue}</span>
              </div>
              <div className="booking-summary__row">
                <span>Tickets</span>
                <span>{bookingData.tickets}</span>
              </div>
              <div className="booking-summary__row booking-summary__row--total">
                <span>Total Paid</span>
                <span>₹{bookingData.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Ticket preview (hidden, used for print) */}
          <div ref={ticketRef} style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <div className="ticket">
              <div className="ticket-header">
                <h1>🦁 Chennai Super Kings</h1>
                <p>IPL 2026 · Match Ticket</p>
              </div>
              <div className="ticket-body">
                <div className="ticket-teams">
                  <div className="ticket-team">
                    <div className={`ticket-team-icon ${bookingData.home === 'CSK' ? 'csk' : 'other'}`}>
                      {bookingData.home === 'CSK' ? '🦁' : '🏏'}
                    </div>
                    <span className={bookingData.home === 'CSK' ? 'ticket-csk' : ''}>{bookingData.home}</span>
                  </div>
                  <div className="ticket-vs">VS</div>
                  <div className="ticket-team">
                    <div className={`ticket-team-icon ${bookingData.away === 'CSK' ? 'csk' : 'other'}`}>
                      {bookingData.away === 'CSK' ? '🦁' : '🏏'}
                    </div>
                    <span className={bookingData.away === 'CSK' ? 'ticket-csk' : ''}>{bookingData.away}</span>
                  </div>
                </div>
                <div className="ticket-info">
                  <div className="ticket-info-item">
                    <div className="ticket-info-label">Date</div>
                    <div className="ticket-info-value">{bookingData.date}, {bookingData.day}</div>
                  </div>
                  <div className="ticket-info-item">
                    <div className="ticket-info-label">Time</div>
                    <div className="ticket-info-value">{bookingData.time}</div>
                  </div>
                  <div className="ticket-info-item" style={{ gridColumn: 'span 2' }}>
                    <div className="ticket-info-label">Venue</div>
                    <div className="ticket-info-value">{bookingData.venue}</div>
                  </div>
                  <div className="ticket-info-item">
                    <div className="ticket-info-label">Tickets</div>
                    <div className="ticket-info-value gold">{bookingData.tickets}</div>
                  </div>
                  <div className="ticket-info-item">
                    <div className="ticket-info-label">Amount</div>
                    <div className="ticket-info-value gold">₹{bookingData.totalAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="ticket-dashed"></div>
                <div className="ticket-qr">
                  <img src={qrUrl} alt="QR Code" />
                </div>
                <div className="ticket-booking-id">{bookingData.bookingId}</div>
                <div className="ticket-footer">Present this ticket at the stadium entrance · Whistle Podu! 💛</div>
              </div>
            </div>
          </div>

          {/* QR Code display in modal */}
          <div style={{ textAlign: 'center', padding: '0 28px 8px' }}>
            <img
              src={qrUrl}
              alt="Booking QR Code"
              style={{ width: 120, height: 120, borderRadius: 12, background: 'white', padding: 8, border: '1px solid var(--border)' }}
            />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 8 }}>
              Scan QR at stadium entrance
            </p>
          </div>

          {/* Actions */}
          <div style={{ padding: '12px 28px 28px', display: 'flex', gap: 10 }}>
            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px 20px', fontSize: '0.85rem' }} onClick={handleDownloadTicket}>
              📄 Download Ticket
            </button>
            <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '12px 20px', fontSize: '0.85rem' }} onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </>
    );
  }

  // ─── FORM PHASE (default) ───
  return (
    <>
      {/* Backdrop */}
      <div className="booking-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="booking-modal">
        {/* Close button */}
        <button className="booking-modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Header */}
        <div className="booking-modal__header">
          <div className="booking-modal__match-badge">
            <span className="live-dot" style={{ width: 6, height: 6 }} />
            <span>Upcoming Match</span>
          </div>
          <div className="booking-modal__teams">
            <div className="booking-modal__team">
              <div className={`booking-modal__team-icon ${isCSKHome ? 'booking-modal__team-icon--csk' : ''}`}>
                {isCSKHome ? '🦁' : '🏏'}
              </div>
              <span className={isCSKHome ? 'booking-modal__team-name--csk' : ''}>{match.home}</span>
            </div>
            <div className="booking-modal__vs">VS</div>
            <div className="booking-modal__team">
              <div className={`booking-modal__team-icon ${!isCSKHome ? 'booking-modal__team-icon--csk' : ''}`}>
                {!isCSKHome ? '🦁' : '🏏'}
              </div>
              <span className={!isCSKHome ? 'booking-modal__team-name--csk' : ''}>{match.away}</span>
            </div>
          </div>
          <div className="booking-modal__info">
            <span>📅 {match.date}, {match.day}</span>
            <span>⏰ {match.time}</span>
            <span>📍 {match.venue}</span>
          </div>
        </div>

        <div className="booking-modal__divider" />

        {/* Booking form */}
        <div className="booking-modal__body">
          <div className="booking-modal__row">
            <span className="booking-modal__label">Ticket Price</span>
            <span className="booking-modal__value">₹{match.ticketPrice.toLocaleString()}</span>
          </div>
          <div className="booking-modal__row">
            <span className="booking-modal__label">Available Seats</span>
            <span className="booking-modal__value booking-modal__value--seats">
              {match.availableSeats.toLocaleString()}
            </span>
          </div>

          <div className="booking-modal__ticket-selector">
            <span className="booking-modal__label">Number of Tickets</span>
            <div className="booking-modal__counter">
              <button
                className="booking-modal__counter-btn"
                onClick={() => setTickets(t => Math.max(1, t - 1))}
                disabled={tickets <= 1}
              >−</button>
              <span className="booking-modal__counter-value">{tickets}</span>
              <button
                className="booking-modal__counter-btn"
                onClick={() => setTickets(t => Math.min(maxTickets, t + 1))}
                disabled={tickets >= maxTickets}
              >+</button>
            </div>
          </div>

          <div className="booking-modal__divider" />

          <div className="booking-modal__row booking-modal__total-row">
            <span className="booking-modal__label">Total Amount</span>
            <span className="booking-modal__total-price">₹{totalPrice.toLocaleString()}</span>
          </div>

          {/* Error */}
          {error && (
            <div className="booking-modal__alert booking-modal__alert--error">
              ❌ {error}
            </div>
          )}

          {/* Book button */}
          <button
            className="btn-primary booking-modal__book-btn"
            onClick={handleBook}
            disabled={match.availableSeats === 0}
          >
            {!user ? (
              '🔐 Login to Book'
            ) : match.availableSeats === 0 ? (
              'Sold Out'
            ) : (
              `🎟️ Confirm Booking — ₹${totalPrice.toLocaleString()}`
            )}
          </button>
        </div>
      </div>
    </>
  );
}
