import api from './auth';

export interface Prediction {
  _id: string;
  assetId: string;
  title: string;
  confidence: number;
  riskLevel: string;
  businessImpact: string;
  estimatedDowntimeHours: number;
  recommendedAction: string;
  expectedCostSaving: number;
  evidenceUsed: string[];
}

export const predictiveService = {
  getDashboard: async () => {
    const response = await api.get('/predictive/dashboard');
    return response.data;
  },

  getPredictions: async () => {
    const response = await api.get('/predictive/predictions');
    return response.data;
  },

  getRecommendations: async () => {
    const response = await api.get('/predictive/recommendations');
    return response.data;
  },

  getAnomalies: async () => {
    const response = await api.get('/predictive/anomalies');
    return response.data;
  },

  getMaintenancePlan: async () => {
    const response = await api.get('/predictive/maintenance-plan');
    return response.data;
  },

  getExecutiveSummary: async () => {
    const response = await api.get('/predictive/executive-summary');
    return response.data;
  },

  analyzeAsset: async (assetId: string) => {
    const response = await api.post('/predictive/analyze', { assetId });
    return response.data;
  }
};
