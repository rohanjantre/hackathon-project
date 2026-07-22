import api from './auth';

export interface GraphNode {
  _id: string;
  nodeId: string;
  type: string;
  title: string;
  description?: string;
  metadata?: any;
}

export interface GraphEdge {
  _id: string;
  source: string;
  target: string;
  relationship: string;
  confidence: number;
}

export const graphService = {
  getGraph: async () => {
    const response = await api.get('/graph');
    return response.data;
  },

  getNodes: async () => {
    const response = await api.get('/graph/nodes');
    return response.data;
  },

  getEdges: async () => {
    const response = await api.get('/graph/edges');
    return response.data;
  },

  getNodeDetails: async (id: string) => {
    const response = await api.get(`/graph/node/${id}`);
    return response.data;
  },

  getStatistics: async () => {
    const response = await api.get('/graph/statistics');
    return response.data;
  },

  rebuildGraph: async () => {
    const response = await api.post('/graph/rebuild');
    return response.data;
  }
};
