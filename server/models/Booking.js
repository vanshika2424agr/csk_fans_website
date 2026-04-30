import mongoose from 'mongoose';
import crypto from 'crypto';

function generateBookingId() {
  const hex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `CSK-${hex}`;
}

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  bookingId: {
    type: String,
    unique: true,
    default: generateBookingId,
  },
  matchName: {
    type: String,
    required: true,
  },
  ticketsCount: {
    type: Number,
    required: [true, 'Number of tickets is required'],
    min: [1, 'Must book at least 1 ticket'],
    max: [10, 'Cannot book more than 10 tickets at once'],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Ensure unique bookingId on save — retry if collision
bookingSchema.pre('save', async function (next) {
  if (this.isNew && !this.bookingId) {
    this.bookingId = generateBookingId();
  }
  next();
});

// Populate match details when querying
bookingSchema.pre(/^find/, function () {
  this.populate({
    path: 'matchId',
    select: 'home away date day time venue status ticketPrice availableSeats',
  });
});

export default mongoose.model('Booking', bookingSchema);
