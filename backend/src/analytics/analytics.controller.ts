import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'executive', 'plant_manager')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  async getDashboard() { return this.analyticsService.getDashboard(); }

  @Get('kpis')
  async getKPIs() { return this.analyticsService.getKPIs(); }

  @Get('plants')
  async getPlants() { return this.analyticsService.getPlants(); }

  @Get('costs')
  async getCosts() { return this.analyticsService.getCosts(); }

  @Get('executive-summary')
  async getExecutiveSummary() { return this.analyticsService.getExecutiveSummary(); }
}
