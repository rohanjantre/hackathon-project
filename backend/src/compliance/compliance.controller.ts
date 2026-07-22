import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('compliance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.complianceService.getDashboard();
  }

  @Post('cases')
  @Roles('admin', 'compliance_officer')
  async createCase(@Body() body: any) {
    return this.complianceService.createCase(body);
  }

  @Get('cases')
  async getCases() {
    return this.complianceService.getCases();
  }

  @Get('cases/:id')
  async getCaseById(@Param('id') id: string) {
    return this.complianceService.getCaseById(id);
  }

  @Patch('cases/:id')
  @Roles('admin', 'compliance_officer')
  async updateCase(@Param('id') id: string, @Body() body: any) {
    return this.complianceService.updateCase(id, body);
  }

  @Delete('cases/:id')
  @Roles('admin')
  async deleteCase(@Param('id') id: string) {
    return this.complianceService.deleteCase(id);
  }

  @Get('audits')
  async getAudits() {
    return this.complianceService.getAudits();
  }
}
