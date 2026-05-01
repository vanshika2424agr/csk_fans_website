import Match from '../models/Match.js';

// GET /api/matches
export async function getAllMatches(_req, res) {
  try {
    const matches = await Match.find().sort({ createdAt: 1 });
    console.log(`[getAllMatches] returning ${matches.length} matches`);
    res.json(matches);
  } catch (err) {
    console.error('[getAllMatches] error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch matches.' });
  }
}

// GET /api/matches/:id
export async function getMatchById(req, res) {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found.' });
    }
    res.json(match);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid match ID.' });
    }
    res.status(500).json({ error: err.message || 'Failed to fetch match.' });
  }
}
