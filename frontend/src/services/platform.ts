import api from './auth';

export const platformService = {
  getOrganizations: async () => {
    const response = await api.get('/platform/organizations');
    return response.data;
  },

  createOrganization: async (data: any) => {
    const response = await api.post('/platform/organizations', data);
    return response.data;
  },

  getPlants: async () => {
    const response = await api.get('/platform/plants');
    return response.data;
  },

  getDepartments: async () => {
    const response = await api.get('/platform/departments');
    return response.data;
  },

  getSettings: async () => {
    const response = await api.get('/platform/settings');
    return response.data;
  },

  updateSetting: async (key: string, value: any) => {
    const response = await api.patch('/platform/settings', { key, value });
    return response.data;
  },

  getAuditLogs: async () => {
    const response = await api.get('/platform/audit-logs');
    return response.data;
  },

  getIntegrations: async () => {
    const response = await api.get('/platform/integrations');
    return response.data;
  },

  getApiKeys: async () => {
    const response = await api.get('/platform/api-keys');
    return response.data;
  },

  getSystemHealth: async () => {
    const response = await api.get('/platform/system-health');
    return response.data;
  }
};
