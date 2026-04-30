import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  home: {
    type: String,
    required: true,
    trim: true,
  },
  away: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
    default: '7:30 PM',
  },
  venue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Completed', 'Live'],
    default: 'Upcoming',
  },
  result: {
    type: String,
    default: null,
  },
  win: {
    type: Boolean,
    default: null,
  },
  availableSeats: {
    type: Number,
    required: true,
    default: 50000,
    min: 0,
  },
  ticketPrice: {
    type: Number,
    required: true,
    default: 1500,
    min: 0,
  },
}, { timestamps: true });

export default mongoose.model('Match', matchSchema);
