import Booking from '../models/Booking.js';
import Match   from '../models/Match.js';

// ─── POST /api/bookings ────────────────────────────────────────────────────────
export async function createBooking(req, res) {
  try {
    console.log('[createBooking] user:', req.user?._id, '| body:', req.body);

    const { matchId, ticketsCount } = req.body;

    if (!matchId || !ticketsCount) {
      return res.status(400).json({ success: false, error: 'matchId and ticketsCount are required.' });
    }

    const count = Number(ticketsCount);
    if (isNaN(count) || count < 1 || count > 10) {
      return res.status(400).json({ success: false, error: 'ticketsCount must be between 1 and 10.' });
    }

    const match = await Match.findById(matchId);
    if (!match) {
      console.log('[createBooking] match not found:', matchId);
      return res.status(404).json({ success: false, error: 'Match not found.' });
    }

    if (match.status !== 'Upcoming') {
      return res.status(400).json({ success: false, error: 'Tickets can only be booked for upcoming matches.' });
    }

    if (count > match.availableSeats) {
      return res.status(400).json({
        success: false,
        error: `Only ${match.availableSeats} seats available. You requested ${count}.`,
      });
    }

    const totalAmount = count * match.ticketPrice;
    const matchName   = `${match.home} vs ${match.away}`;

    const booking = await Booking.create({
      userId:       req.user._id,
      matchId,
      matchName,
      ticketsCount: count,
      totalAmount,
    });

    // Reduce available seats atomically
    match.availableSeats -= count;
    await match.save();

    console.log('[createBooking] success — bookingId:', booking.bookingId);

    res.status(201).json({
      success:   true,
      bookingId: booking.bookingId,
      message:   `Booking confirmed! Your ID: ${booking.bookingId}`,
      booking,
    });
  } catch (err) {
    console.error('[createBooking] error:', err.message);
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid match ID format.' });
    }
    res.status(500).json({ success: false, error: err.message || 'Booking failed.' });
  }
}

// ─── GET /api/bookings/my ─────────────────────────────────────────────────────
export async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('[getMyBookings] error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch bookings.' });
  }
}

// ─── GET /api/bookings/all ────────────────────────────────────────────────────
export async function getAllBookings(_req, res) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
    res.json(bookings);
  } catch (err) {
    console.error('[getAllBookings] error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch bookings.' });
  }
}
