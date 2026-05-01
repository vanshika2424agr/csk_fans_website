// When running via `npm run dev`, the Vite proxy (vite.config.js) forwards
// every /api/* request to http://localhost:5000 — no CORS issues in dev.
//
// When deployed (e.g. Vercel + Render) set VITE_API_URL to your backend URL
// and the absolute URL is used instead.
const API_BASE = import.meta.env.VITE_API_URL ?? '';

// ─── Core fetch helper ────────────────────────────────────────────────────────
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const { headers: customHeaders, ...restOptions } = options;

  const config = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
  };

  let res;
  try {
    res = await fetch(url, config);
  } catch (networkErr) {
    // This fires when the server is not running at all
    throw new Error(
      'Cannot reach the server. Make sure the backend is running on port 5000.'
    );
  }

  // Try to parse JSON; if the response is not JSON, create a friendly error
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server returned non-JSON response (${res.status})`);
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }

  return { data, status: res.status };
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export function loginUser(email, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(name, email, password) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function getMe(token) {
  return request('/api/auth/me', {
    headers: authHeaders(token),
  });
}

// ─── Matches ──────────────────────────────────────────────────────────────────
export function fetchMatches() {
  return request('/api/matches');
}

export function fetchMatch(id) {
  return request(`/api/matches/${id}`);
}

// ─── Bookings ─────────────────────────────────────────────────────────────────
export function createBooking(token, matchId, ticketsCount) {
  return request('/api/bookings', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ matchId, ticketsCount: Number(ticketsCount) }),
  });
}

export function fetchMyBookings(token) {
  return request('/api/bookings/my', {
    headers: authHeaders(token),
  });
}
