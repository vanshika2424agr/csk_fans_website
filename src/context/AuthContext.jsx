import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem('csk-token') || null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    async function validateToken() {
      if (!token) { setLoading(false); return; }
      try {
        const { data } = await getMe(token);
        setUser(data.user);
      } catch {
        // Token invalid/expired — clear it
        setToken(null);
        setUser(null);
        try { localStorage.removeItem('csk-token'); } catch {}
      } finally {
        setLoading(false);
      }
    }
    validateToken();
  }, [token]);

  const login = useCallback((userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    try { localStorage.setItem('csk-token', tokenValue); } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    try { localStorage.removeItem('csk-token'); } catch {}
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
