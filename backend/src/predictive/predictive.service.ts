import { Injectable } from '@nestjs/common';
import { PredictiveRepository } from './predictive.repository';

@Injectable()
export class PredictiveService {
  constructor(private readonly repository: PredictiveRepository) {}

  async getDashboard() {
    return this.repository.getDashboardStats();
  }

  async getPredictions() {
    // Return mock data for UI development if DB is empty
    const predictions = await this.repository.getPredictions();
    if (predictions.length === 0) {
      return [
        {
          _id: '1',
          assetId: 'Pump P-201',
          title: 'Bearing Failure Imminent',
          confidence: 89,
          riskLevel: 'High',
          businessImpact: 'Production halt in Zone A',
          estimatedDowntimeHours: 12,
          recommendedAction: 'Schedule bearing replacement within 5 days',
          expectedCostSaving: 14000,
          evidenceUsed: ['Vibration Analysis Q2', 'Thermal Image Logs']
        }
      ];
    }
    return predictions;
  }

  async getRecommendations() {
    return this.repository.getRecommendations();
  }

  async getAnomalies() {
    return this.repository.getAnomalies();
  }

  async getMaintenancePlan() {
    return this.repository.getMaintenancePlan();
  }

  async getExecutiveSummary() {
    const summary = await this.repository.getExecutiveSummary();
    if (!summary) {
      return {
        executiveSummary: "Pump P-201 has an 89% probability of bearing failure within the next 30 days. Boiler B-02 requires inspection in 4 days. Maintenance optimization could reduce downtime by approximately 14%. Three compliance certificates will expire this month."
      };
    }
    return summary;
  }

  async analyzeAsset(id: string) {
    // Trigger mock AI providers
    return { status: 'Analysis initiated', assetId: id };
  }
}
