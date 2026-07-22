export interface IPredictionEngine {
  calculateFailureProbability(assetId: string): Promise<{ sevenDays: number, thirtyDays: number, ninetyDays: number }>;
}

export interface IRiskScoringService {
  calculateAssetRisk(assetId: string): Promise<number>;
  calculatePlantRisk(): Promise<number>;
}

export interface IRecommendationEngine {
  generateRecommendations(): Promise<any[]>;
}

export interface IMaintenanceOptimizer {
  optimizeSchedule(assetId: string): Promise<any>;
}

export interface IExecutiveSummaryGenerator {
  generateDailyBrief(): Promise<string>;
}

export interface IAnomalyDetectionService {
  detectAnomalies(): Promise<any[]>;
}
