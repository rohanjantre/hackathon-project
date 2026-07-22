import api from './auth';

export interface ComplianceCase {
  _id: string;
  caseId: string;
  assetId: string;
  department?: string;
  regulation: string;
  severity: string;
  status: string;
  assignedTo?: string;
  riskScore: number;
  aiRecommendation?: string;
  dueDate?: string;
}

export const complianceService = {
  getDashboard: async () => {
    const response = await api.get('/compliance/dashboard');
    return response.data;
  },

  getCases: async () => {
    const response = await api.get('/compliance/cases');
    return response.data;
  },

  getCaseById: async (id: string) => {
    const response = await api.get(`/compliance/cases/${id}`);
    return response.data;
  },

  createCase: async (data: Partial<ComplianceCase>) => {
    const response = await api.post('/compliance/cases', data);
    return response.data;
  },

  updateCase: async (id: string, data: Partial<ComplianceCase>) => {
    const response = await api.patch(`/compliance/cases/${id}`, data);
    return response.data;
  },

  deleteCase: async (id: string) => {
    const response = await api.delete(`/compliance/cases/${id}`);
    return response.data;
  },

  getAudits: async () => {
    const response = await api.get('/compliance/audits');
    return response.data;
  }
};
