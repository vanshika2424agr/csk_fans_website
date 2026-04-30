const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Helper ──────────────────────────────────
async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const { headers: customHeaders, ...restOptions } = options;
  const config = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
  };

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return { data, status: res.status };
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

// ─── Auth ────────────────────────────────────
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

// ─── Matches ─────────────────────────────────
export function fetchMatches() {
  return request('/api/matches');
}

export function fetchMatch(id) {
  return request(`/api/matches/${id}`);
}

// ─── Bookings ────────────────────────────────
export function createBooking(token, matchId, ticketsCount) {
  return request('/api/bookings', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ matchId, ticketsCount }),
  });
}

export function fetchMyBookings(token) {
  return request('/api/bookings/my', {
    headers: authHeaders(token),
  });
}
