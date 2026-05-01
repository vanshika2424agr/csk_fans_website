import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// ─── POST /api/auth/register ───────────────────────────────────────────────────
export async function register(req, res) {
  try {
    console.log('[register] body received:', { ...req.body, password: req.body?.password ? '***' : undefined });

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    const token = generateToken(user._id);
    console.log('[register] success — user:', user.email);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('[register] error:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    res.status(500).json({ error: err.message || 'Registration failed.' });
  }
}

// ─── POST /api/auth/login ──────────────────────────────────────────────────────
export async function login(req, res) {
  try {
    console.log('[login] body received:', { email: req.body?.email, password: req.body?.password ? '***' : undefined });

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // .select('+password') is required because password has select:false in schema
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      console.log('[login] no user found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('[login] password match:', isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);
    console.log('[login] success — user:', user.email);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('[login] error:', err.message);
    res.status(500).json({ error: err.message || 'Login failed.' });
  }
}

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
export async function getMe(req, res) {
  res.json({
    user: { id: req.user._id, name: req.user.name, email: req.user.email },
  });
}
