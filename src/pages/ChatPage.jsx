import { useState, useRef, useEffect } from 'react';
import { HeartPulse } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../services/authService';
import './ChatPage.css';

const INITIAL_MESSAGES = [
  { role: 'bot', text: "Hi! I'm Zenugo AI 👋 How can I help with your wellness today?" },
];

const SUGGESTED = [
  'How much water should I drink?',
  'Give me a morning routine',
  'Tips for better sleep',
];

function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await API.post('/chat', {
        messages: [...messages, userMsg],
      });

      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: res.data.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Failed to connect to Zenugo AI backend.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section className="chat-page">
      <div className="chat-page__container">
        {/* Sidebar / Header */}
        <div className="chat-page__sidebar">
          <div className="chat-page__sidebar-brand">
            <HeartPulse aria-hidden="true" size={20} strokeWidth={2.5} />
            <span>Zenugo AI</span>
          </div>
          <div className="chat-page__user-info">
            <div className="chat-page__user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="chat-page__user-details">
              <span className="chat-page__user-name">{user?.name || 'User'}</span>
              <span className="chat-page__user-status">
                <span className="chat-page__status-dot" />
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="chat-page__main">
          {/* Chrome bar */}
          <div className="chat-page__chrome">
            <div className="chat-page__chrome-dots">
              <span className="chat-page__dot chat-page__dot--red" />
              <span className="chat-page__dot chat-page__dot--yellow" />
              <span className="chat-page__dot chat-page__dot--green" />
            </div>
            <span className="chat-page__chrome-title">Zenugo AI Chat</span>
            <div className="chat-page__chrome-status">
              <span className="chat-page__status-dot" />
              <span>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-page__messages" id="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-page__msg chat-page__msg--${msg.role}`}>
                {msg.role === 'bot' && (
                  <div className="chat-page__avatar">
                    <HeartPulse aria-hidden="true" size={16} strokeWidth={2.5} />
                  </div>
                )}
                <div className="chat-page__bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-page__msg chat-page__msg--bot">
                <div className="chat-page__avatar">
                  <HeartPulse aria-hidden="true" size={16} strokeWidth={2.5} />
                </div>
                <div className="chat-page__bubble chat-page__bubble--typing">
                  <span className="chat-page__typing-dot" />
                  <span className="chat-page__typing-dot" />
                  <span className="chat-page__typing-dot" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          <div className="chat-page__suggestions">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                className="chat-page__suggestion"
                onClick={() => sendMessage(s)}
                disabled={isTyping}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className="chat-page__input-bar" onSubmit={handleSubmit} id="chat-input-form">
            <input
              className="chat-page__input"
              type="text"
              placeholder="Ask Zenugo AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              id="chat-input"
            />
            <button
              type="submit"
              className="chat-page__send"
              disabled={!input.trim() || isTyping}
              id="chat-send"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChatPage;
