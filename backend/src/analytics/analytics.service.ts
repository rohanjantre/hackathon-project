import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';

@Injectable()
export class AnalyticsService {
  constructor(private readonly repository: AnalyticsRepository) {}

  async getDashboard() { return this.repository.getDashboardOverview(); }
  async getKPIs() { return this.repository.getKPIs(); }
  async getPlants() { return this.repository.getPlants(); }
  async getCosts() { return this.repository.getCosts(); }
  async getExecutiveSummary() { return this.repository.getExecutiveSummary(); }
}
