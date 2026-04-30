import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar     from './components/Navbar';
import Footer     from './components/Footer';
import Home       from './pages/Home';
import Players    from './pages/Players';
import Schedule   from './pages/Schedule';
import Stats      from './pages/Stats';
import News       from './pages/News';
import Team       from './pages/Team';
import Gallery    from './pages/Gallery';
import FanZone    from './pages/FanZone';
import Contact    from './pages/Contact';
import Login      from './pages/Login';
import MyBookings from './pages/MyBookings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div style={{ minHeight:'100vh' }}>
            <div style={{
              position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
              background:'radial-gradient(ellipse 80% 40% at 50% -5%, var(--primary-glow) 0%, transparent 70%)',
            }}/>
            <div style={{ position:'relative', zIndex:1 }}>
              <ScrollToTop />
              <Navbar />
              <main>
                <Routes>
                  <Route path="/"            element={<Home />}       />
                  <Route path="/players"     element={<Players />}    />
                  <Route path="/schedule"    element={<Schedule />}   />
                  <Route path="/stats"       element={<Stats />}      />
                  <Route path="/news"        element={<News />}       />
                  <Route path="/team"        element={<Team />}       />
                  <Route path="/gallery"     element={<Gallery />}    />
                  <Route path="/fanzone"     element={<FanZone />}    />
                  <Route path="/contact"     element={<Contact />}    />
                  <Route path="/login"       element={<Login />}      />
                  <Route path="/my-bookings" element={<MyBookings />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
