export interface IDecisionEngine {
  analyzeSituation(context: any): Promise<any>;
}

export interface IPriorityEngine {
  calculatePriority(severity: number, impact: number): Promise<string>;
}

export interface IRiskAggregationEngine {
  aggregateRisks(assetId: string): Promise<number>;
}

export interface IBusinessImpactEngine {
  estimateFinancialImpact(downtime: number): Promise<number>;
}

export interface IRecommendationRanker {
  rankRecommendations(recommendations: any[]): Promise<any[]>;
}

export interface IEvidenceCollector {
  collectEvidence(incidentId: string): Promise<any[]>;
}
