import { useState, useRef, useEffect, useCallback } from 'react';
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
  Sparkles,
  Menu,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as chatAPI from '../services/chatService';
import './ChatPage.css';

const SUGGESTIONS = [
  { icon: '💧', text: 'How much water should I drink daily?' },
  { icon: '🌅', text: 'Give me a healthy morning routine' },
  { icon: '😴', text: 'Tips for better sleep quality' },
  { icon: '🏋️', text: 'Quick 15-minute workout plan' },
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

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const renameInputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  // Load a conversation's messages
  const selectConversation = useCallback(async (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setMessages([]);
    setLoadingMessages(true);
    setSidebarOpen(false);

    try {
      const res = await chatAPI.getConversation(id);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error('Failed to load conversation:', err);
    } finally {
      setLoadingMessages(false);
      setTimeout(() => inputRef.current?.focus(), 100);
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
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (err) {
      console.error('Failed to create conversation:', err);
    }
  };

  // Send message
  const handleSendMessage = async (text) => {
    if (!text.trim() || isTyping) return;

    let currentId = activeId;

    // Auto-create conversation if none is active
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

      // Update the conversation title in sidebar
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

  // Logout
  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  // Filter conversations by search
  const filtered = searchQuery.trim()
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  const grouped = groupByDate(filtered);

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="cp">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="cp__overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className={`cp__sidebar ${sidebarOpen ? 'cp__sidebar--open' : ''}`}>
        <div className="cp__sidebar-top">
          <div className="cp__sidebar-header">
            <div className="cp__brand">
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

          <button className="cp__new-chat" onClick={handleNewChat} id="new-chat-btn">
            <Plus size={18} />
            <span>New Chat</span>
          </button>

          <div className="cp__search-wrap">
            <Search size={15} className="cp__search-icon" />
            <input
              className="cp__search"
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-conversations"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="cp__convo-list">
          {loadingConvos ? (
            <div className="cp__convo-loading">
              <div className="cp__spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="cp__convo-empty">
              <MessageSquare size={24} />
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
                            <MessageSquare size={15} className="cp__convo-icon" />
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

        {/* User profile */}
        <div className="cp__sidebar-bottom">
          <div className="cp__user-card">
            <div className="cp__user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="cp__user-info">
              <span className="cp__user-name">{user?.name || 'User'}</span>
              <span className="cp__user-email">{user?.email || ''}</span>
            </div>
          </div>
          <button className="cp__logout" onClick={handleLogout} id="chat-logout-btn">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CHAT AREA ===== */}
      <div className="cp__main">
        {/* Top bar */}
        <div className="cp__topbar">
          <button
            className="cp__menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="cp__topbar-title">
            {activeId
              ? conversations.find((c) => c._id === activeId)?.title || 'Chat'
              : 'Zenugo AI'}
          </span>
          <div className="cp__topbar-status">
            <span className="cp__status-dot" />
            <span>Online</span>
          </div>
        </div>

        {/* Messages or Welcome */}
        {!activeId && messages.length === 0 && !loadingMessages ? (
          // Welcome screen
          <div className="cp__welcome">
            <div className="cp__welcome-content">
              <div className="cp__welcome-icon">
                <HeartPulse size={40} strokeWidth={2} />
              </div>
              <h2 className="cp__welcome-title">
                Welcome to <span className="gradient-text">Zenugo AI</span>
              </h2>
              <p className="cp__welcome-subtitle">
                Your AI-powered health &amp; wellness companion.
                <br />
                Start a conversation or pick a suggestion below.
              </p>
              <div className="cp__welcome-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.text}
                    className="cp__welcome-suggestion"
                    onClick={() => handleSendMessage(s.text)}
                    disabled={isTyping}
                  >
                    <span className="cp__welcome-suggestion-icon">{s.icon}</span>
                    <span>{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Chat messages
          <div className="cp__messages" id="chat-messages">
            {loadingMessages ? (
              <div className="cp__messages-loading">
                <div className="cp__spinner" />
              </div>
            ) : messages.length === 0 && activeId ? (
              // Empty conversation
              <div className="cp__messages-empty">
                <Sparkles size={32} />
                <p>This conversation is empty. Send a message to get started!</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`cp__msg cp__msg--${msg.role}`}>
                  <div className="cp__msg-avatar">
                    {msg.role === 'bot' ? (
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
                      <span className="cp__msg-name">
                        {msg.role === 'bot' ? 'Zenugo AI' : user?.name || 'You'}
                      </span>
                      <span className="cp__msg-time">{formatTime(msg.createdAt)}</span>
                    </div>
                    <div className="cp__msg-text">
                      {msg.text.split('\n').map((line, j) => (
                        <span key={j}>
                          {line}
                          {j < msg.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="cp__msg cp__msg--bot">
                <div className="cp__msg-avatar">
                  <div className="cp__msg-avatar-bot">
                    <HeartPulse size={16} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="cp__msg-content">
                  <div className="cp__msg-header">
                    <span className="cp__msg-name">Zenugo AI</span>
                  </div>
                  <div className="cp__msg-typing">
                    <span className="cp__typing-dot" />
                    <span className="cp__typing-dot" />
                    <span className="cp__typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Input bar */}
        <div className="cp__input-area">
          <form className="cp__input-bar" onSubmit={handleSubmit} id="chat-input-form">
            <input
              ref={inputRef}
              className="cp__input"
              type="text"
              placeholder="Message Zenugo AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              id="chat-input"
            />
            <button
              type="submit"
              className="cp__send"
              disabled={!input.trim() || isTyping}
              id="chat-send"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </form>
          <p className="cp__disclaimer">
            Zenugo AI provides wellness guidance — not medical advice. Always consult a professional.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChatPage;
