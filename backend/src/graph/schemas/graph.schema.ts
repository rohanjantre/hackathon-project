import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type GraphNodeDocument = GraphNode & MongooseDocument;
export type GraphEdgeDocument = GraphEdge & MongooseDocument;

@Schema({ timestamps: true })
export class GraphNode {
  @Prop({ required: true, unique: true })
  nodeId: string; // e.g. DOC-123 or ASSET-456

  @Prop({ required: true })
  type: string; // 'Asset', 'Document', 'Engineer', 'Incident', etc.

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  metadata: any;
}

@Schema({ timestamps: true })
export class GraphEdge {
  @Prop({ required: true })
  source: string; // nodeId

  @Prop({ required: true })
  target: string; // nodeId

  @Prop({ required: true })
  relationship: string; // 'belongs_to', 'references', 'maintained_by'

  @Prop({ type: Number, default: 100 })
  confidence: number;
}

export const GraphNodeSchema = SchemaFactory.createForClass(GraphNode);
export const GraphEdgeSchema = SchemaFactory.createForClass(GraphEdge);
