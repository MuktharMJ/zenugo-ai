import { useState, useRef, useEffect } from 'react';
import './ChatbotPreview.css';

const INITIAL_MESSAGES = [
  { role: 'bot', text: "Hi! I'm Zenugo AI 👋 How can I help with your wellness today?" },
];

const SUGGESTED = [
  'How much water should I drink?',
  'Give me a morning routine',
  'Tips for better sleep',
];


function ChatbotPreview() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);



  const sendMessage = async (text) => {
  if (!text.trim()) return;

  const userMsg = { role: 'user', text: text.trim() };
  setMessages((prev) => [...prev, userMsg]);
  setInput('');
  setIsTyping(true);

  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
  messages: [...messages, userMsg],
}),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: 'bot',
        text: data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: 'bot',
        text: 'Failed to connect to Zenugo AI backend.',
      },
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
    <section className="chatbot section" id="chatbot">
      <div className="container">
        <div className="chatbot__header">
          <span className="section-label">Live Preview</span>
          <h2 className="section-title">
            Meet your <span className="gradient-text">AI companion</span>
          </h2>
          <p className="section-subtitle">
            Experience a taste of how Zenugo AI understands and responds to your wellness needs.
          </p>
        </div>

        <div className="chatbot__window" id="chatbot-window">
          {/* Window chrome */}
          <div className="chatbot__chrome">
            <div className="chatbot__dots">
              <span className="chatbot__dot chatbot__dot--red" />
              <span className="chatbot__dot chatbot__dot--yellow" />
              <span className="chatbot__dot chatbot__dot--green" />
            </div>
            <span className="chatbot__chrome-title">Zenugo AI Chat</span>
            <div className="chatbot__status">
              <span className="chatbot__status-dot" />
              <span>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot__messages" id="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot__msg chatbot__msg--${msg.role}`}>
                {msg.role === 'bot' && (
                  <div className="chatbot__avatar">✦</div>
                )}
                <div className="chatbot__bubble">
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
              <div className="chatbot__msg chatbot__msg--bot">
                <div className="chatbot__avatar">✦</div>
                <div className="chatbot__bubble chatbot__bubble--typing">
                  <span className="chatbot__typing-dot" />
                  <span className="chatbot__typing-dot" />
                  <span className="chatbot__typing-dot" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          <div className="chatbot__suggestions">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                className="chatbot__suggestion"
                onClick={() => sendMessage(s)}
                disabled={isTyping}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className="chatbot__input-bar" onSubmit={handleSubmit} id="chatbot-input-form">
            <input
              className="chatbot__input"
              type="text"
              placeholder="Ask Zenugo AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              id="chatbot-input"
            />
            <button
              type="submit"
              className="chatbot__send"
              disabled={!input.trim() || isTyping}
              id="chatbot-send"
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

export default ChatbotPreview;
