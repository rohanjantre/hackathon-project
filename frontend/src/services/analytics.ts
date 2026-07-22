import api from './auth';

export const analyticsService = {
  getExecutiveDashboard: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getKPIs: async () => {
    const response = await api.get('/analytics/kpis');
    return response.data;
  },

  getPlantComparison: async () => {
    const response = await api.get('/analytics/plants');
    return response.data;
  },

  getCostAnalytics: async () => {
    const response = await api.get('/analytics/costs');
    return response.data;
  },

  getExecutiveSummary: async () => {
    const response = await api.get('/analytics/executive-summary');
    return response.data;
  }
};
