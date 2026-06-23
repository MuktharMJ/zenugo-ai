import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import ChatbotPreview from './components/ChatbotPreview/ChatbotPreview';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ChatbotPreview />
      </main>
      <Footer />
    </div>
  );
}

export default App;