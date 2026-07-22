import api from './auth';

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  owner: string;
  department: string;
  status: string;
  dueDate: string;
  linkedAsset?: string;
  linkedDocument?: string;
  progress: number;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  recipient: string;
  priority: string;
  isRead: boolean;
  createdAt: string;
}

export const workflowService = {
  getDashboard: async () => {
    const response = await api.get('/workflow/dashboard');
    return response.data;
  },

  getWorkflows: async () => {
    const response = await api.get('/workflow');
    return response.data;
  },

  createWorkflow: async (data: any) => {
    const response = await api.post('/workflow', data);
    return response.data;
  },

  getTasks: async () => {
    const response = await api.get('/workflow/tasks');
    return response.data;
  },

  createTask: async (data: Partial<Task>) => {
    const response = await api.post('/workflow/tasks', data);
    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get('/workflow/notifications');
    return response.data;
  },

  markNotificationRead: async (id: string) => {
    const response = await api.patch(`/workflow/notifications/${id}/read`);
    return response.data;
  },

  getActivities: async () => {
    const response = await api.get('/workflow/activity');
    return response.data;
  },

  getApprovals: async () => {
    const response = await api.get('/workflow/approvals');
    return response.data;
  },

  approveRequest: async (id: string, comments: string) => {
    const response = await api.post(`/workflow/approvals/${id}/approve`, { comments });
    return response.data;
  },

  rejectRequest: async (id: string, comments: string) => {
    const response = await api.post(`/workflow/approvals/${id}/reject`, { comments });
    return response.data;
  }
};
