export interface IComplianceAnalyzer {
  analyzeRegulation(documentId: string, assetId: string): Promise<any>;
}

export interface IRootCauseGenerator {
  generateRootCause(incidentId: string, logs: string[]): Promise<any>;
}

export interface ICAPARecommendationEngine {
  suggestCAPA(rootCauseId: string): Promise<any>;
}

export interface IRiskPredictor {
  predictAuditRisk(department: string): Promise<number>;
}
