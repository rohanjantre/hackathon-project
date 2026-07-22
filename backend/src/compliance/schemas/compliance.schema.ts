import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type ComplianceCaseDocument = ComplianceCase & MongooseDocument;
export type AuditDocument = Audit & MongooseDocument;
export type CAPADocument = CAPA & MongooseDocument;
export type RootCauseAnalysisDocument = RootCauseAnalysis & MongooseDocument;

@Schema({ timestamps: true })
export class ComplianceCase {
  @Prop({ required: true, unique: true })
  caseId: string;

  @Prop({ required: true })
  assetId: string;

  @Prop()
  department: string;

  @Prop({ required: true })
  regulation: string;

  @Prop({ default: 'Medium' })
  severity: string;

  @Prop({ default: 'Open' })
  status: string;

  @Prop()
  assignedTo: string;

  @Prop()
  dueDate: Date;

  @Prop({ type: Number, default: 50 })
  riskScore: number;

  @Prop([String])
  evidenceDocuments: string[];

  @Prop()
  aiRecommendation: string;
}

@Schema({ timestamps: true })
export class Audit {
  @Prop({ required: true })
  auditId: string;

  @Prop()
  auditName: string;

  @Prop()
  auditDate: Date;

  @Prop({ type: Number })
  auditScore: number;

  @Prop([String])
  findings: string[];

  @Prop()
  status: string;
}

@Schema({ timestamps: true })
export class CAPA {
  @Prop({ required: true })
  capaId: string;

  @Prop()
  caseId: string; // link to ComplianceCase

  @Prop()
  correctiveAction: string;

  @Prop()
  preventiveAction: string;

  @Prop()
  owner: string;

  @Prop()
  status: string;

  @Prop({ type: Number, default: 0 })
  progress: number;
}

@Schema({ timestamps: true })
export class RootCauseAnalysis {
  @Prop({ required: true })
  caseId: string;

  @Prop()
  problemStatement: string;

  @Prop([String])
  fiveWhys: string[];

  @Prop()
  aiSuggestedRootCause: string;

  @Prop({ type: Number })
  confidence: number;

  @Prop([String])
  recommendedActions: string[];
}

export const ComplianceCaseSchema = SchemaFactory.createForClass(ComplianceCase);
export const AuditSchema = SchemaFactory.createForClass(Audit);
export const CAPASchema = SchemaFactory.createForClass(CAPA);
export const RootCauseAnalysisSchema = SchemaFactory.createForClass(RootCauseAnalysis);
