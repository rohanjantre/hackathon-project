import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type AssetDocument = AssetDoc & MongooseDocument;

@Schema({ timestamps: true })
export class AssetDoc {
  @Prop({ required: true, unique: true })
  assetCode: string;

  @Prop({ required: true })
  assetName: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  manufacturer: string;

  @Prop()
  model: string;

  @Prop()
  serialNumber: string;

  @Prop()
  department: string;

  @Prop()
  plant: string;

  @Prop()
  location: string;

  @Prop({ default: 'Active' })
  status: string;

  @Prop({ type: Number, default: 100 })
  healthScore: number;

  @Prop({ default: 'Medium' })
  criticality: string;

  @Prop()
  assignedEngineer: string;

  @Prop()
  installationDate: Date;

  @Prop()
  lastInspectionDate: Date;

  @Prop()
  nextInspectionDate: Date;

  @Prop()
  nextMaintenanceDate: Date;

  @Prop({ default: 'Low' })
  riskLevel: string;

  @Prop({ type: Number, default: 0 })
  operatingHours: number;

  @Prop([String])
  linkedDocuments: string[]; // references to KnowledgeDoc IDs

  @Prop([{ type: Object }])
  maintenanceRecords: any[];

  @Prop([{ type: Object }])
  inspectionReports: any[];

  @Prop([{ type: Object }])
  incidentReports: any[];

  @Prop([{ type: Object }])
  complianceRecords: any[];

  @Prop([{ type: Object }])
  aiInsights: any[];
}

export const AssetSchema = SchemaFactory.createForClass(AssetDoc);
