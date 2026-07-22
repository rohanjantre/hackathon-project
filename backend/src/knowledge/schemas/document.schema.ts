import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type KnowledgeDocument = KnowledgeDoc & MongooseDocument;

@Schema({ timestamps: true })
export class KnowledgeDoc {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  originalFileName: string;

  @Prop({ required: true })
  storedFileName: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  department: string;

  @Prop()
  assetId: string;

  @Prop({ required: true })
  uploadedBy: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  extension: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  storagePath: string;

  @Prop()
  thumbnail: string;

  @Prop({ default: 1 })
  version: number;

  @Prop([String])
  tags: string[];

  @Prop({ default: 'Uploaded' })
  status: string; // Uploaded, Queued, OCR Processing, Entity Extraction, Embedding, Indexed, Ready, Failed, Archived

  @Prop()
  processingStage: string;

  @Prop({ default: false })
  aiReady: boolean;

  @Prop({ type: Number })
  confidence: number;

  @Prop()
  summary: string;

  @Prop({ type: Object })
  entities: any;

  @Prop([String])
  relatedDocuments: string[];

  @Prop([String])
  relatedAssets: string[];
}

export const KnowledgeDocumentSchema = SchemaFactory.createForClass(KnowledgeDoc);
