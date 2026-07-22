import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type PredictionDocument = Prediction & MongooseDocument;
export type RecommendationDocument = Recommendation & MongooseDocument;
export type AnomalyDocument = Anomaly & MongooseDocument;
export type MaintenancePlanDocument = MaintenancePlan & MongooseDocument;
export type OperationalInsightDocument = OperationalInsight & MongooseDocument;

@Schema({ timestamps: true })
export class Prediction {
  @Prop({ required: true })
  assetId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Number })
  confidence: number;

  @Prop()
  riskLevel: string;

  @Prop()
  businessImpact: string;

  @Prop({ type: Number })
  estimatedDowntimeHours: number;

  @Prop()
  recommendedAction: string;

  @Prop({ type: Number })
  expectedCostSaving: number;

  @Prop([String])
  evidenceUsed: string[];
}

@Schema({ timestamps: true })
export class Recommendation {
  @Prop()
  title: string;

  @Prop()
  priority: string;

  @Prop()
  businessReason: string;

  @Prop([String])
  supportingEvidence: string[];

  @Prop()
  expectedBenefit: string;

  @Prop()
  riskReduction: string;

  @Prop({ type: Number })
  estimatedSavings: number;
}

@Schema({ timestamps: true })
export class Anomaly {
  @Prop()
  assetId: string;

  @Prop()
  description: string;

  @Prop()
  frequency: string;

  @Prop()
  type: string; // 'Repeated Incident', 'Compliance', 'Unexpected Downtime'
}

@Schema({ timestamps: true })
export class MaintenancePlan {
  @Prop()
  assetId: string;

  @Prop()
  optimizedDate: Date;

  @Prop()
  assignedTechnician: string;

  @Prop()
  priority: string;

  @Prop({ type: Number })
  estimatedDurationHours: number;

  @Prop({ type: Number })
  estimatedCost: number;
}

@Schema({ timestamps: true })
export class OperationalInsight {
  @Prop({ type: Number })
  plantScore: number;

  @Prop({ type: Number })
  departmentScore: number;

  @Prop({ type: Number })
  assetScore: number;

  @Prop({ type: Number })
  complianceScore: number;

  @Prop({ type: Number })
  maintenanceScore: number;

  @Prop({ type: Number })
  aiReadinessScore: number;

  @Prop()
  executiveSummary: string;
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);
export const AnomalySchema = SchemaFactory.createForClass(Anomaly);
export const MaintenancePlanSchema = SchemaFactory.createForClass(MaintenancePlan);
export const OperationalInsightSchema = SchemaFactory.createForClass(OperationalInsight);
