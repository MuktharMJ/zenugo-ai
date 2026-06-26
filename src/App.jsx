import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DeveloperPage from './pages/DeveloperPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import './App.css';

const HIDE_FOOTER_PATHS = ['/login', '/register', '/chat'];
const HIDE_NAVBAR_PATHS = ['/chat'];

function App() {
  const location = useLocation();
  const hideFooter = HIDE_FOOTER_PATHS.includes(location.pathname);
  const hideNavbar = HIDE_NAVBAR_PATHS.includes(location.pathname);

  return (
    <div className="app">
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/developer" element={<DeveloperPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;