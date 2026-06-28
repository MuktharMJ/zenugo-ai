import API from './authService';

export const getConversations = () =>
  API.get('/chat');

export const createConversation = () =>
  API.post('/chat/new');

export const getConversation = (id) =>
  API.get(`/chat/${id}`);

export const sendMessage = (id, text) =>
  API.post(`/chat/${id}/message`, { text });

export const deleteConversation = (id) =>
  API.delete(`/chat/${id}`);

export const renameConversation = (id, title) =>
  API.patch(`/chat/${id}/title`, { title });
