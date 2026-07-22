import api from './auth';

export interface DocumentMetadata {
  _id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  assetId: string;
  status: string;
  processingStage: string;
  aiReady: boolean;
  size: number;
  extension: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  entities?: any;
  confidence?: number;
  summary?: string;
  uploadedBy: string;
}

export const documentService = {
  uploadDocument: async (file: File, metadata: any) => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.category) formData.append('category', metadata.category);
    if (metadata.department) formData.append('department', metadata.department);
    if (metadata.assetId) formData.append('assetId', metadata.assetId);

    const response = await api.post('/knowledge/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getDocuments: async (params?: any) => {
    const response = await api.get('/knowledge/documents', { params });
    return response.data;
  },

  getDocument: async (id: string) => {
    const response = await api.get(`/knowledge/document/${id}`);
    return response.data;
  },

  updateDocument: async (id: string, data: any) => {
    const response = await api.patch(`/knowledge/document/${id}`, data);
    return response.data;
  },

  deleteDocument: async (id: string) => {
    const response = await api.delete(`/knowledge/document/${id}`);
    return response.data;
  },

  searchDocuments: async (query: string) => {
    const response = await api.get('/knowledge/search', { params: { q: query } });
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/knowledge/dashboard');
    return response.data;
  },

  getRecentDocuments: async () => {
    const response = await api.get('/knowledge/recent');
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/knowledge/categories');
    return response.data;
  }
};
