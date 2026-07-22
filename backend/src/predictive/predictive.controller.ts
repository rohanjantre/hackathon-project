import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PredictiveService } from './predictive.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('predictive')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PredictiveController {
  constructor(private readonly predictiveService: PredictiveService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.predictiveService.getDashboard();
  }

  @Get('predictions')
  async getPredictions() {
    return this.predictiveService.getPredictions();
  }

  @Get('recommendations')
  async getRecommendations() {
    return this.predictiveService.getRecommendations();
  }

  @Get('anomalies')
  async getAnomalies() {
    return this.predictiveService.getAnomalies();
  }

  @Get('maintenance-plan')
  async getMaintenancePlan() {
    return this.predictiveService.getMaintenancePlan();
  }

  @Get('executive-summary')
  async getExecutiveSummary() {
    return this.predictiveService.getExecutiveSummary();
  }

  @Post('analyze')
  @Roles('admin', 'engineer')
  async analyzeAsset(@Body('assetId') assetId: string) {
    return this.predictiveService.analyzeAsset(assetId);
  }
}
