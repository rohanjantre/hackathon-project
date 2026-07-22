import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GraphNode, GraphEdge, GraphNodeDocument, GraphEdgeDocument } from './schemas/graph.schema';

@Injectable()
export class GraphRepository {
  constructor(
    @InjectModel(GraphNode.name) private nodeModel: Model<GraphNodeDocument>,
    @InjectModel(GraphEdge.name) private edgeModel: Model<GraphEdgeDocument>,
  ) {}

  async upsertNode(data: Partial<GraphNode>) {
    return this.nodeModel.findOneAndUpdate(
      { nodeId: data.nodeId },
      { $set: data },
      { upsert: true, new: true }
    ).exec();
  }

  async upsertEdge(source: string, target: string, relationship: string, confidence: number = 100) {
    return this.edgeModel.findOneAndUpdate(
      { source, target, relationship },
      { $set: { confidence } },
      { upsert: true, new: true }
    ).exec();
  }

  async getAllNodes() {
    return this.nodeModel.find().exec();
  }

  async getAllEdges() {
    return this.edgeModel.find().exec();
  }

  async getNodeById(nodeId: string) {
    return this.nodeModel.findOne({ nodeId }).exec();
  }

  async getConnectedEdges(nodeId: string) {
    return this.edgeModel.find({ $or: [{ source: nodeId }, { target: nodeId }] }).exec();
  }

  async clearGraph() {
    await this.nodeModel.deleteMany({});
    await this.edgeModel.deleteMany({});
  }

  async getStatistics() {
    const totalNodes = await this.nodeModel.countDocuments();
    const totalEdges = await this.edgeModel.countDocuments();
    
    const assets = await this.nodeModel.countDocuments({ type: 'Asset' });
    const documents = await this.nodeModel.countDocuments({ type: 'Document' });
    const incidents = await this.nodeModel.countDocuments({ type: 'Incident' });
    const insights = await this.nodeModel.countDocuments({ type: 'AI Insight' });

    return { totalNodes, totalEdges, types: { assets, documents, incidents, insights } };
  }
}
