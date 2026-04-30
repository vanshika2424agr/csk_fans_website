import Booking from '../models/Booking.js';
import Match from '../models/Match.js';

// POST /api/bookings
export async function createBooking(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, error: 'Request body is empty. Send JSON with Content-Type header.' });
    }
    const { matchId, ticketsCount } = req.body;

    // Validate input
    if (!matchId || !ticketsCount) {
      return res.status(400).json({ success: false, error: 'Match ID and ticket count are required.' });
    }
    if (ticketsCount < 1 || ticketsCount > 10) {
      return res.status(400).json({ success: false, error: 'You can book between 1 and 10 tickets.' });
    }

    // Find the match
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, error: 'Match not found.' });
    }

    // Only allow booking for upcoming matches
    if (match.status !== 'Upcoming') {
      return res.status(400).json({ success: false, error: 'Tickets can only be booked for upcoming matches.' });
    }

    // Check seat availability
    if (ticketsCount > match.availableSeats) {
      return res.status(400).json({
        success: false,
        error: `Only ${match.availableSeats} seats available. You requested ${ticketsCount}.`,
      });
    }

    // Calculate total
    const totalAmount = ticketsCount * match.ticketPrice;
    const matchName = `${match.home} vs ${match.away}`;

    // Create booking (bookingId auto-generated)
    const booking = await Booking.create({
      userId: req.user._id,
      matchId,
      matchName,
      ticketsCount,
      totalAmount,
    });

    // Decrement available seats
    match.availableSeats -= ticketsCount;
    await match.save();

    // Populate match details before returning
    await booking.populate({
      path: 'matchId',
      select: 'home away date day time venue status ticketPrice availableSeats',
    });

    res.status(201).json({
      success: true,
      bookingId: booking.bookingId,
      message: `Booking confirmed! Your ID: ${booking.bookingId}`,
      booking,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid match ID.' });
    }
    res.status(500).json({ success: false, error: err.message || 'Booking failed.' });
  }
}

// GET /api/bookings/my
export async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch bookings.' });
  }
}

// GET /api/bookings (all — for testing)
export async function getAllBookings(_req, res) {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch bookings.' });
  }
}
