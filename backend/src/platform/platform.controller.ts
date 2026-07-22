import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('platform')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin') // Restrict to admin level
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('dashboard')
  async getDashboard() { return this.platformService.getDashboard(); }

  @Get('organizations')
  async getOrganizations() { return this.platformService.getOrganizations(); }

  @Post('organizations')
  async createOrganization(@Body() body: any) { return this.platformService.createOrganization(body); }

  @Get('plants')
  async getPlants() { return this.platformService.getPlants(); }

  @Post('plants')
  async createPlant(@Body() body: any) { return this.platformService.createPlant(body); }

  @Get('departments')
  async getDepartments() { return this.platformService.getDepartments(); }

  @Get('settings')
  async getSettings() { return this.platformService.getSettings(); }

  @Patch('settings')
  async updateSetting(@Body() body: { key: string, value: any }) { return this.platformService.updateSetting(body.key, body.value); }

  @Get('integrations')
  async getIntegrations() { return this.platformService.getIntegrations(); }

  @Get('audit-logs')
  async getAuditLogs() { return this.platformService.getAuditLogs(); }

  @Get('api-keys')
  async getApiKeys() { return this.platformService.getApiKeys(); }

  @Post('api-keys')
  async createApiKey(@Body() body: any) { return this.platformService.createApiKey(body); }

  @Delete('api-keys/:id')
  async deleteApiKey(@Param('id') id: string) { return this.platformService.deleteApiKey(id); }

  @Get('system-health')
  async getSystemHealth() { return this.platformService.getSystemHealth(); }
}
