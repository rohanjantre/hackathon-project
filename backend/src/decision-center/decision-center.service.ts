import { Injectable } from '@nestjs/common';
import { DecisionCenterRepository } from './decision-center.repository';

@Injectable()
export class DecisionCenterService {
  constructor(private readonly repository: DecisionCenterRepository) {}

  async getDashboard() { return this.repository.getDashboard(); }
  async getAlerts() { return this.repository.getAlerts(); }
  async getRecommendations() { return this.repository.getRecommendations(); }
  
  async getActionQueue() {
    // Action queue combines recommendations that require decisions
    return this.repository.getRecommendations();
  }

  async getExecutiveBrief() { return this.repository.getExecutiveBrief(); }
  async getLiveStatus() { return this.repository.getLiveStatus(); }

  async approveDecision(id: string) { return this.repository.processAction(id, 'Approve'); }
  async rejectDecision(id: string) { return this.repository.processAction(id, 'Reject'); }
}
