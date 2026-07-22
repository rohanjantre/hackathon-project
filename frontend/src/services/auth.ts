import axios from 'axios';
import type { LoginPayload, SignupPayload, AuthResponse } from '../types/auth';

// Create Axios instance with Base URL http://localhost:3000 as specified by user
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('forgemind_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// MOCK DATA INJECTION FOR HACKATHON DEMO
const originalGet = api.get;
api.get = async function(url: string, ...args) {
  try {
    if (url.includes('/assets/dashboard')) return { data: (await import('../mock/dashboard.mock')).dashboardOverview } as any;
    if (url.includes('/assets/') && url.includes('/maintenance')) return { data: (await import('../mock/maintenance.mock')).maintenanceRecords } as any;
    if (url.includes('/assets/') && url.includes('/incidents')) return { data: (await import('../mock/incident.mock')).incidents } as any;
    if (url.includes('/assets')) return { data: (await import('../mock/assets.mock')).assets } as any;
    
    if (url.includes('/knowledge/dashboard')) return { data: { totalDocuments: 300, processedDocuments: 280, criticalSOPs: 45, pendingReview: 12 } } as any;
    if (url.includes('/knowledge/documents')) return { data: (await import('../mock/documents.mock')).documents } as any;
    
    if (url.includes('/predictive/dashboard')) return { data: { overallHealth: 92, criticalAssets: 14, downtimePrediction: 124 } } as any;
    if (url.includes('/predictive/predictions')) return { data: (await import('../mock/ai.mock')).aiRecommendations } as any;
    if (url.includes('/predictive/recommendations')) return { data: (await import('../mock/ai.mock')).aiRecommendations } as any;
    
    if (url.includes('/workflow/dashboard')) return { data: { activeWorkflows: 80, pendingTasks: 24, completedToday: 12 } } as any;
    if (url.includes('/workflow/approvals')) return { data: (await import('../mock/workflow.mock')).workflows } as any;
    if (url.includes('/workflow/tasks')) return { data: (await import('../mock/workflow.mock')).workflows } as any; 
    
    if (url.includes('/decision-center/dashboard')) return { data: (await import('../mock/dashboard.mock')).dashboardOverview } as any;
    if (url.includes('/decision-center/alerts')) return { data: (await import('../mock/notifications.mock')).notifications } as any;
    
    if (url.includes('/platform/plants')) return { data: (await import('../mock/plants.mock')).plants } as any;
    if (url.includes('/platform/departments')) return { data: (await import('../mock/departments.mock')).departments } as any;
    if (url.includes('/platform/users')) return { data: (await import('../mock/employees.mock')).employees } as any;

    if (url.includes('/graph/statistics')) return { data: (await import('../mock/graphStatistics.mock')).graphStatistics } as any;
    
    // /graph/node/:id matches must be placed before /graph
    if (url.match(/\/graph\/node\/(.+)/)) {
      const match = url.match(/\/graph\/node\/(.+)/);
      const nodeId = match ? match[1] : '';
      const nodes = (await import('../mock/graphNodes.mock')).graphNodes;
      const edges = (await import('../mock/graphEdges.mock')).graphEdges;
      const node = nodes.find(n => n.nodeId === nodeId) || nodes[0];
      const nodeEdges = edges.filter(e => e.source === nodeId || e.target === nodeId);
      return { data: { node, edges: nodeEdges } } as any;
    }
    
    if (url.includes('/graph')) {
      const nodes = (await import('../mock/graphNodes.mock')).graphNodes;
      const edges = (await import('../mock/graphEdges.mock')).graphEdges;
      return { data: { nodes, edges } } as any;
    }

  } catch (e) {
    console.warn('Mock injection failed for:', url, e);
  }
  
  // Fallback to real backend
  return originalGet.apply(this, [url, ...args]);
};

const originalPost = api.post;
api.post = async function(url: string, ...args) {
  if (url.includes('/user/login') || url.includes('/user/signup')) {
    return { 
      data: { 
        token: 'mock-jwt-token-forgemind', 
        user: { id: 'emp-1', name: 'Rajesh Kumar', role: 'admin', email: 'rajesh.kumar@forgemind.in' } 
      } 
    } as any;
  }
  
  if (url.includes('/graph/rebuild')) {
    return { data: { success: true, message: 'Graph successfully rebuilt' } } as any;
  }
  
  return originalPost.apply(this, [url, ...args]);
};

/**
 * Authentication API Service
 * No backend logic, just direct API calls to existing NestJS endpoints:
 * POST /auth/login
 * POST /auth/signup
 */
export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/user/login', payload);
    return response.data;
  },

  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/user/signup', payload);
    return response.data;
  },
};

export default api;
