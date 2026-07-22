import api from './auth';

export const decisionService = {
  getControlRoom: async () => {
    const response = await api.get('/decision-center/dashboard');
    return response.data;
  },

  getAlerts: async () => {
    const response = await api.get('/decision-center/alerts');
    return response.data;
  },

  getRecommendations: async () => {
    const response = await api.get('/decision-center/recommendations');
    return response.data;
  },

  getActionQueue: async () => {
    const response = await api.get('/decision-center/action-queue');
    return response.data;
  },

  getExecutiveBrief: async () => {
    const response = await api.get('/decision-center/executive-brief');
    return response.data;
  },

  getLiveStatus: async () => {
    const response = await api.get('/decision-center/live-status');
    return response.data;
  },

  approveDecision: async (id: string) => {
    const response = await api.post('/decision-center/approve', { id });
    return response.data;
  },

  rejectDecision: async (id: string) => {
    const response = await api.post('/decision-center/reject', { id });
    return response.data;
  }
};
