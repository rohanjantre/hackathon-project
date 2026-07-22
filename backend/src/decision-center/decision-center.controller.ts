import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DecisionCenterService } from './decision-center.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('decision-center')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DecisionCenterController {
  constructor(private readonly decisionService: DecisionCenterService) {}

  @Get('dashboard')
  async getDashboard() { return this.decisionService.getDashboard(); }

  @Get('alerts')
  async getAlerts() { return this.decisionService.getAlerts(); }

  @Get('recommendations')
  async getRecommendations() { return this.decisionService.getRecommendations(); }

  @Get('action-queue')
  async getActionQueue() { return this.decisionService.getActionQueue(); }

  @Get('executive-brief')
  async getExecutiveBrief() { return this.decisionService.getExecutiveBrief(); }

  @Get('live-status')
  async getLiveStatus() { return this.decisionService.getLiveStatus(); }

  @Post('approve')
  async approveDecision(@Body('id') id: string) { return this.decisionService.approveDecision(id); }

  @Post('reject')
  async rejectDecision(@Body('id') id: string) { return this.decisionService.rejectDecision(id); }
}
