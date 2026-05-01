import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import mongoose from 'mongoose';
import Match from './models/Match.js';


const matches = [
  {
    home: 'CSK', away: 'Mumbai Indians',
    date: 'Apr 12', day: 'Saturday', time: '7:30 PM',
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'Completed', result: 'CSK won by 42 runs', win: true,
    availableSeats: 0, ticketPrice: 1500,
  },
  {
    home: 'Delhi Capitals', away: 'CSK',
    date: 'Apr 15', day: 'Tuesday', time: '7:30 PM',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'Completed', result: 'CSK won by 6 wickets', win: true,
    availableSeats: 0, ticketPrice: 2000,
  },
  {
    home: 'CSK', away: 'Kolkata Knight Riders',
    date: 'Apr 18', day: 'Friday', time: '7:30 PM',
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'Completed', result: 'CSK won by 28 runs', win: true,
    availableSeats: 0, ticketPrice: 1500,
  },
  {
    home: 'Rajasthan Royals', away: 'CSK',
    date: 'Apr 21', day: 'Monday', time: '7:30 PM',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    status: 'Completed', result: 'Rajasthan Royals won by 4 wickets', win: false,
    availableSeats: 0, ticketPrice: 1800,
  },
  {
    home: 'CSK', away: 'Sunrisers Hyderabad',
    date: 'Apr 24', day: 'Thursday', time: '7:30 PM',
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'Completed', result: 'CSK won by 15 runs', win: true,
    availableSeats: 0, ticketPrice: 1500,
  },
  {
    home: 'CSK', away: 'Royal Challengers Bengaluru',
    date: 'Apr 26', day: 'Saturday', time: '7:30 PM',
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'Upcoming', result: null, win: null,
    availableSeats: 48000, ticketPrice: 2000,
  },
  {
    home: 'Punjab Kings', away: 'CSK',
    date: 'May 1', day: 'Thursday', time: '7:30 PM',
    venue: 'IS Bindra Stadium, Mohali',
    status: 'Upcoming', result: null, win: null,
    availableSeats: 35000, ticketPrice: 1800,
  },
  {
    home: 'CSK', away: 'Gujarat Titans',
    date: 'May 5', day: 'Monday', time: '7:30 PM',
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'Upcoming', result: null, win: null,
    availableSeats: 50000, ticketPrice: 1500,
  },
  {
    home: 'Lucknow Super Giants', away: 'CSK',
    date: 'May 10', day: 'Saturday', time: '3:30 PM',
    venue: 'BRSABV Ekana Stadium, Lucknow',
    status: 'Upcoming', result: null, win: null,
    availableSeats: 42000, ticketPrice: 1800,
  },
  {
    home: 'CSK', away: 'Mumbai Indians',
    date: 'May 14', day: 'Wednesday', time: '7:30 PM',
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'Upcoming', result: null, win: null,
    availableSeats: 50000, ticketPrice: 2500,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing matches
    await Match.deleteMany({});
    console.log('🗑️  Cleared existing matches');

    // Insert seed data
    const inserted = await Match.insertMany(matches);
    console.log(`🏏 Seeded ${inserted.length} matches`);

    inserted.forEach((m, i) => {
      console.log(`   ${i + 1}. ${m.home} vs ${m.away} — ${m.date} (${m.status})`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Seed complete. Database disconnected.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
