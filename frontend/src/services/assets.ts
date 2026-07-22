import api from './auth';

export interface AssetMetadata {
  _id: string;
  assetId?: string;
  assetCode: string;
  assetName: string;
  description?: string;
  category: string;
  department?: string;
  plant?: string;
  location?: string;
  status: string;
  healthScore: number;
  criticality: string;
  assignedEngineer?: string;
  riskLevel: string;
  operatingHours: number;
}

export const assetService = {
  createAsset: async (data: any) => {
    const response = await api.post('/assets', data);
    return response.data;
  },

  getAssets: async (params?: any) => {
    const response = await api.get('/assets', { params });
    return response.data;
  },

  getAssetById: async (id: string) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  updateAsset: async (id: string, data: any) => {
    const response = await api.patch(`/assets/${id}`, data);
    return response.data;
  },

  deleteAsset: async (id: string) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },

  searchAssets: async (query: string) => {
    const response = await api.get('/assets/search', { params: { q: query } });
    return response.data;
  },

  getAssetDashboard: async () => {
    const response = await api.get('/assets/dashboard');
    return response.data;
  },

  getAssetDocuments: async (id: string) => {
    const response = await api.get(`/assets/${id}/documents`);
    return response.data;
  },

  getAssetMaintenance: async (id: string) => {
    const response = await api.get(`/assets/${id}/maintenance`);
    return response.data;
  },

  getAssetIncidents: async (id: string) => {
    const response = await api.get(`/assets/${id}/incidents`);
    return response.data;
  },

  getAssetAnalytics: async (id: string) => {
    const response = await api.get(`/assets/${id}/analytics`);
    return response.data;
  }
};
