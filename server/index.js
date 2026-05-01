import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

import dotenv from 'dotenv';
// Always load .env from server/ directory, regardless of where node is called from
dotenv.config({ path: path.resolve(__dirname, '.env') });

import express  from 'express';
import cors     from 'cors';
import mongoose from 'mongoose';

import authRoutes    from './routes/auth.js';
import matchRoutes   from './routes/matches.js';
import bookingRoutes from './routes/bookings.js';
import Match         from './models/Match.js';

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    // Allow any Render.com hosted frontend
    if (origin.endsWith('.onrender.com')) return callback(null, true);
    // Allow explicitly listed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`[CORS] blocked origin: ${origin}`);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));


app.use(express.json());

// Debug logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length) {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = '***';
    console.log('  body:', JSON.stringify(safeBody));
  }
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/matches',  matchRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, _req, res, _next) => {
  console.error('💥 Server error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ─── Env guard ────────────────────────────────────────────────────────────────
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in server/.env — aborting');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set in server/.env — aborting');
  process.exit(1);
}

// ─── Auto-seed (inserts matches if collection is empty) ───────────────────────
const SAMPLE_MATCHES = [
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

async function autoSeed() {
  const count = await Match.countDocuments();
  if (count === 0) {
    console.log('📭 Matches collection is empty — auto-seeding 10 matches...');
    await Match.insertMany(SAMPLE_MATCHES);
    console.log('✅ Auto-seeded 10 matches into MongoDB!');
  } else {
    console.log(`📦 Matches collection already has ${count} documents — skipping seed`);
  }
}

// ─── Connect DB → auto-seed → start server ────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await autoSeed();
    app.listen(PORT, () => {
      console.log(`\n🚀 CSK API running → http://localhost:${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/api/health`);
      console.log(`   Matches: GET http://localhost:${PORT}/api/matches\n`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });