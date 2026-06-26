import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Plus,
  Search,
  Trash2,
  Pencil,
  Check,
  X,
  LogOut,
  MessageSquare,
  Menu,
  ChevronLeft,
  Droplet,
  Moon,
  Apple,
  Dumbbell,
  Brain,
  Activity,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as chatAPI from '../services/chatService';
import './ChatPage.css';

const SUGGESTIONS = [
  { icon: Dumbbell, text: 'Build a 15-minute home workout plan' },
  { icon: Apple, text: 'Create a healthy, high-protein meal' },
  { icon: Droplet, text: 'How much water should I drink daily?' },
  { icon: Moon, text: 'Give me tips for better sleep quality' },
  { icon: Brain, text: 'How can I reduce daily stress?' },
  { icon: Activity, text: 'Plan a productive morning routine' },
];

const PLACEHOLDERS = [
  'Ask about fitness...',
  'Ask about nutrition...',
  'Improve my sleep...',
  'Build a workout plan...',
  'Create a healthy meal...',
  'Track my hydration...',
  'Plan today\'s wellness routine...',
];

function groupByDate(conversations) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const groups = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    Older: [],
  };

  conversations.forEach((c) => {
    const d = new Date(c.updatedAt || c.createdAt);
    if (d >= today) groups.Today.push(c);
    else if (d >= yesterday) groups.Yesterday.push(c);
    else if (d >= weekAgo) groups['Previous 7 Days'].push(c);
    else groups.Older.push(c);
  });

  return groups;
}

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Memoized Message Component
const ChatMessage = memo(({ msg, user }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBot = msg.role === 'bot';

  return (
    <div className={`cp__msg cp__msg--${msg.role}`}>
      <div className="cp__msg-avatar">
        {isBot ? (
          <div className="cp__msg-avatar-bot">
            <HeartPulse size={16} strokeWidth={2.5} />
          </div>
        ) : (
          <div className="cp__msg-avatar-user">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        )}
      </div>
      <div className="cp__msg-content">
        <div className="cp__msg-header">
          <span className="cp__msg-name">{isBot ? 'Zenugo AI' : user?.name || 'You'}</span>
          <span className="cp__msg-time">{formatTime(msg.createdAt)}</span>
        </div>
        <div className="cp__msg-text">
          {msg.text.split('\n').map((line, j) => (
            <React.Fragment key={j}>
              {line}
              {j < msg.text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        {isBot && (
          <div className="cp__msg-actions">
            <button className="cp__msg-action-btn" onClick={handleCopy} aria-label="Copy">
              {copied ? <Check size={14} className="cp__msg-action-copied" /> : <Copy size={14} />}
            </button>
            {/* Future proof UI placeholders */}
            <button className="cp__msg-action-btn" aria-label="Good response">
              <ThumbsUp size={14} />
            </button>
            <button className="cp__msg-action-btn" aria-label="Bad response">
              <ThumbsDown size={14} />
            </button>
            <button className="cp__msg-action-btn" aria-label="Regenerate">
              <RefreshCw size={14} />
            </button>
            
            {copied && <span className="cp__toast-inline">Copied to clipboard.</span>}
          </div>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

function ChatPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sidebar state
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [loadingConvos, setLoadingConvos] = useState(true);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const renameInputRef = useRef(null);
  const isAutoScrolling = useRef(true);

  // Rotating placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smart Scrolling Logic
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    // If user is within 100px of bottom, auto-scroll is true
    isAutoScrolling.current = scrollHeight - scrollTop - clientHeight < 100;
  };

  const scrollToBottom = () => {
    if (isAutoScrolling.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus rename input
  useEffect(() => {
    if (renamingId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingId]);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const res = await chatAPI.getConversations();
      setConversations(res.data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setLoadingConvos(false);
    }
  };

  // Select conversation
  const selectConversation = useCallback(async (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setMessages([]);
    setLoadingMessages(true);
    setSidebarOpen(false);

    try {
      const res = await chatAPI.getConversation(id);
      setMessages(res.data.messages || []);
      isAutoScrolling.current = true; // force scroll on load
    } catch (err) {
      console.error('Failed to load conversation:', err);
    } finally {
      setLoadingMessages(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [activeId]);

  // Create new chat
  const handleNewChat = async () => {
    try {
      const res = await chatAPI.createConversation();
      setConversations((prev) => [res.data, ...prev]);
      setActiveId(res.data._id);
      setMessages([]);
      setSidebarOpen(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    } catch (err) {
      console.error('Failed to create conversation:', err);
    }
  };

  // Textarea resize logic
  const handleInput = (e) => {
    setInput(e.target.value);
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Send message
  const handleSendMessage = async (text) => {
    if (!text.trim() || isTyping) return;

    let currentId = activeId;
    isAutoScrolling.current = true; // force scroll when user sends msg

    if (!currentId) {
      try {
        const res = await chatAPI.createConversation();
        setConversations((prev) => [res.data, ...prev]);
        currentId = res.data._id;
        setActiveId(currentId);
      } catch (err) {
        console.error('Failed to create conversation:', err);
        return;
      }
    }

    const userMsg = { role: 'user', text: text.trim(), createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const res = await chatAPI.sendMessage(currentId, text.trim());
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: res.data.botMessage.text,
          createdAt: res.data.botMessage.createdAt,
        },
      ]);

      if (res.data.title) {
        setConversations((prev) =>
          prev.map((c) =>
            c._id === currentId
              ? { ...c, title: res.data.title, updatedAt: new Date().toISOString() }
              : c
          )
        );
      }
    } catch (err) {
      console.error(err);
      const fallback =
        err.response?.data?.fallbackReply ||
        '⚠️ Zenugo AI is experiencing high demand right now. Please try again in a few moments.';
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: fallback, createdAt: new Date().toISOString() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  // Delete conversation
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await chatAPI.deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c._id !== id));
      if (activeId === id) {
        setActiveId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  // Start rename
  const startRename = (e, convo) => {
    e.stopPropagation();
    setRenamingId(convo._id);
    setRenameValue(convo.title);
  };

  // Confirm rename
  const confirmRename = async (e) => {
    e.stopPropagation();
    if (!renameValue.trim()) {
      setRenamingId(null);
      return;
    }
    try {
      await chatAPI.renameConversation(renamingId, renameValue.trim());
      setConversations((prev) =>
        prev.map((c) =>
          c._id === renamingId ? { ...c, title: renameValue.trim() } : c
        )
      );
    } catch (err) {
      console.error('Failed to rename:', err);
    }
    setRenamingId(null);
  };

  const cancelRename = (e) => {
    e.stopPropagation();
    setRenamingId(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const filtered = searchQuery.trim()
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  const grouped = groupByDate(filtered);

  const handleHomeClick = () => {
    setActiveId(null);
    setMessages([]);
    setSidebarOpen(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  return (
    <section className="cp">
      {sidebarOpen && <div className="cp__overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ===== SIDEBAR ===== */}
      <aside className={`cp__sidebar ${sidebarOpen ? 'cp__sidebar--open' : ''}`}>
        <div className="cp__sidebar-top">
          <div className="cp__sidebar-header">
            <div 
              className="cp__brand" 
              onClick={handleHomeClick}
              role="button"
              tabIndex={0}
              title="Home"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleHomeClick();
                }
              }}
            >
              <HeartPulse size={20} strokeWidth={2.5} />
              <span>Zenugo AI</span>
            </div>
            <button
              className="cp__sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <button className="cp__new-chat" onClick={handleNewChat}>
            <Plus size={16} />
            <span>New Chat</span>
          </button>

          <div className="cp__search-wrap">
            <Search size={14} className="cp__search-icon" />
            <input
              className="cp__search"
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="cp__convo-list">
          {loadingConvos ? (
            <div className="cp__convo-loading">
              <div className="cp__spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="cp__convo-empty">
              <span>No conversations yet</span>
            </div>
          ) : (
            Object.entries(grouped).map(
              ([label, convos]) =>
                convos.length > 0 && (
                  <div key={label} className="cp__convo-group">
                    <span className="cp__convo-group-label">{label}</span>
                    {convos.map((c) => (
                      <div
                        key={c._id}
                        className={`cp__convo-item ${activeId === c._id ? 'cp__convo-item--active' : ''}`}
                        onClick={() => selectConversation(c._id)}
                      >
                        {renamingId === c._id ? (
                          <div className="cp__convo-rename" onClick={(e) => e.stopPropagation()}>
                            <input
                              ref={renameInputRef}
                              className="cp__convo-rename-input"
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') confirmRename(e);
                                if (e.key === 'Escape') cancelRename(e);
                              }}
                            />
                            <button className="cp__convo-rename-ok" onClick={confirmRename}>
                              <Check size={14} />
                            </button>
                            <button className="cp__convo-rename-cancel" onClick={cancelRename}>
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="cp__convo-title">{c.title}</span>
                            <div className="cp__convo-actions">
                              <button
                                className="cp__convo-action"
                                onClick={(e) => startRename(e, c)}
                                aria-label="Rename"
                              >
                                <Pencil size={13} />
                              </button>
                              <button
                                className="cp__convo-action cp__convo-action--danger"
                                onClick={(e) => handleDelete(e, c._id)}
                                aria-label="Delete"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )
            )
          )}
        </div>

        <div className="cp__sidebar-bottom">
          <div className="cp__user-card">
            <div className="cp__user-avatar cp__user-avatar--gradient">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="cp__user-info">
              <span className="cp__user-name">{user?.name || 'User'}</span>
            </div>
            <button className="cp__logout" onClick={handleLogout} aria-label="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CHAT AREA ===== */}
      <div className="cp__main">
        <div className="cp__topbar">
          <button className="cp__menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <span className="cp__topbar-title">
            {activeId ? conversations.find((c) => c._id === activeId)?.title || 'Chat' : 'New Conversation'}
          </span>
        </div>

        {!activeId && messages.length === 0 && !loadingMessages ? (
          <div className="cp__welcome">
            <div className="cp__welcome-content">
              <HeartPulse className="cp__welcome-logo" size={48} strokeWidth={2} />
              <h2 className="cp__welcome-greeting">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name ? user.name.split(' ')[0] : 'there'}.
              </h2>
              <p className="cp__welcome-quote">"Small healthy habits create big results."</p>
              
              <div className="cp__welcome-suggestions">
                {SUGGESTIONS.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={idx}
                      className="cp__suggestion-card"
                      onClick={() => handleSendMessage(s.text)}
                      disabled={isTyping}
                    >
                      <div className="cp__suggestion-icon-wrap">
                        <Icon size={18} />
                      </div>
                      <span className="cp__suggestion-text">{s.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="cp__messages" 
            id="chat-messages" 
            ref={messagesContainerRef}
            onScroll={handleScroll}
          >
            {loadingMessages ? (
              <div className="cp__messages-loading">
                <div className="cp__spinner" />
              </div>
            ) : (
              <div className="cp__messages-inner">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} msg={msg} user={user} />
                ))}

                {isTyping && (
                  <div className="cp__msg cp__msg--bot cp__msg--typing">
                    <div className="cp__msg-avatar">
                      <div className="cp__msg-avatar-bot">
                        <HeartPulse size={16} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="cp__msg-content">
                      <div className="cp__msg-header">
                        <span className="cp__msg-name">Zenugo AI</span>
                      </div>
                      <div className="cp__typing-indicator">
                        <span className="cp__typing-dot" />
                        <span className="cp__typing-dot" />
                        <span className="cp__typing-dot" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="cp__scroll-anchor" />
              </div>
            )}
          </div>
        )}

        <div className="cp__input-area">
          <form className="cp__input-wrapper" onSubmit={handleSubmit}>
            <div className="cp__input-box">
              <textarea
                ref={textareaRef}
                className="cp__textarea"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                rows={1}
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {!input && (
                <div className="cp__placeholder-wrapper">
                  {PLACEHOLDERS.map((text, idx) => (
                    <span
                      key={idx}
                      className={`cp__placeholder-text ${idx === placeholderIdx ? 'active' : ''}`}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="cp__send-btn"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </form>
          <p className="cp__disclaimer">
            Zenugo AI provides wellness guidance. Not medical advice.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChatPage;
