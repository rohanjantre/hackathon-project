import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prediction, Recommendation, Anomaly, MaintenancePlan, OperationalInsight } from './schemas/predictive.schema';
import type { PredictionDocument, RecommendationDocument, AnomalyDocument, MaintenancePlanDocument, OperationalInsightDocument } from './schemas/predictive.schema';

@Injectable()
export class PredictiveRepository {
  constructor(
    @InjectModel(Prediction.name) private predictionModel: Model<PredictionDocument>,
    @InjectModel(Recommendation.name) private recommendationModel: Model<RecommendationDocument>,
    @InjectModel(Anomaly.name) private anomalyModel: Model<AnomalyDocument>,
    @InjectModel(MaintenancePlan.name) private maintenanceModel: Model<MaintenancePlanDocument>,
    @InjectModel(OperationalInsight.name) private insightModel: Model<OperationalInsightDocument>,
  ) {}

  async getDashboardStats() {
    return {
      overallHealth: 88,
      predictedFailures: 3,
      criticalAssets: 5,
      maintenanceDue: 12,
      safetyRiskIndex: 'Low',
      productionRisk: 'Medium',
      downtimePrediction: 14 // hours
    };
  }

  async getPredictions() {
    return this.predictionModel.find().sort({ confidence: -1 }).exec();
  }

  async getRecommendations() {
    return this.recommendationModel.find().sort({ priority: 1 }).exec();
  }

  async getAnomalies() {
    return this.anomalyModel.find().exec();
  }

  async getMaintenancePlan() {
    return this.maintenanceModel.find().sort({ optimizedDate: 1 }).exec();
  }

  async getExecutiveSummary() {
    return this.insightModel.findOne().sort({ createdAt: -1 }).exec();
  }
}
