import api from './auth';

export interface ChatMessage {
  _id?: string;
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;
  referencedDocuments?: string[];
  referencedAssets?: string[];
  citations?: any[];
  suggestedFollowUps?: string[];
}

export interface Conversation {
  _id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export const copilotService = {
  sendMessage: async (message: string, conversationId?: string) => {
    const response = await api.post('/copilot/chat', { message, conversationId });
    return response.data;
  },

  getConversationHistory: async () => {
    const response = await api.get('/copilot/history');
    return response.data;
  },

  getConversation: async (id: string) => {
    const response = await api.get(`/copilot/history/${id}`);
    return response.data;
  },

  deleteConversation: async (id: string) => {
    const response = await api.delete(`/copilot/history/${id}`);
    return response.data;
  },

  getSuggestions: async () => {
    const response = await api.get('/copilot/suggestions');
    return response.data;
  }
};
