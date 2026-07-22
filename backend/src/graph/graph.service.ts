import { Injectable, NotFoundException } from '@nestjs/common';
import { GraphRepository } from './graph.repository';

@Injectable()
export class GraphService {
  constructor(private readonly repository: GraphRepository) {}

  async getGraph() {
    const nodes = await this.repository.getAllNodes();
    const edges = await this.repository.getAllEdges();
    return { nodes, edges };
  }

  async getNodes() {
    return this.repository.getAllNodes();
  }

  async getEdges() {
    return this.repository.getAllEdges();
  }

  async getNodeDetails(id: string) {
    const node = await this.repository.getNodeById(id);
    if (!node) throw new NotFoundException('Node not found');
    const edges = await this.repository.getConnectedEdges(id);
    return { node, edges };
  }

  async getStatistics() {
    return this.repository.getStatistics();
  }

  // Mock builder that simulates extracting data from Asset and Knowledge modules
  async rebuildGraph() {
    await this.repository.clearGraph();

    // Mock Assets
    await this.repository.upsertNode({ nodeId: 'AST-001', type: 'Asset', title: 'Centrifugal Pump A-101', metadata: { status: 'Active', health: 85 } });
    await this.repository.upsertNode({ nodeId: 'AST-002', type: 'Asset', title: 'Generator B', metadata: { status: 'Maintenance', health: 60 } });

    // Mock Documents
    await this.repository.upsertNode({ nodeId: 'DOC-100', type: 'Document', title: 'Pump Maintenance SOP', metadata: { category: 'Manual' } });
    await this.repository.upsertNode({ nodeId: 'DOC-101', type: 'Document', title: 'Vibration Analysis Report Q3', metadata: { category: 'Report' } });

    // Mock Engineer
    await this.repository.upsertNode({ nodeId: 'ENG-99', type: 'Engineer', title: 'John Smith', metadata: { role: 'Senior Tech' } });

    // Mock Insights
    await this.repository.upsertNode({ nodeId: 'INS-50', type: 'AI Insight', title: 'Bearing Anomaly Detected', metadata: { confidence: 96 } });

    // Relationships
    await this.repository.upsertEdge('AST-001', 'DOC-100', 'references');
    await this.repository.upsertEdge('INS-50', 'AST-001', 'related_to', 96);
    await this.repository.upsertEdge('INS-50', 'DOC-101', 'generated_from', 99);
    await this.repository.upsertEdge('ENG-99', 'AST-001', 'maintained_by');
    await this.repository.upsertEdge('ENG-99', 'AST-002', 'maintained_by');

    return { message: 'Graph rebuilt successfully with mock data across modules.' };
  }
}
