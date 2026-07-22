import { Controller, Post, Get, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('assets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @Roles('admin')
  async createAsset(@Body() body: any) {
    return this.assetsService.createAsset(body);
  }

  @Get()
  async getAssets(@Query() query: any) {
    return this.assetsService.getAssets(query);
  }

  @Get('dashboard')
  async getDashboardStats() {
    return this.assetsService.getDashboardStats();
  }

  @Get('search')
  async searchAssets(@Query('q') q: string) {
    return this.assetsService.searchAssets(q || '');
  }

  @Get(':id')
  async getAssetById(@Param('id') id: string) {
    return this.assetsService.getAssetById(id);
  }

  @Patch(':id')
  @Roles('admin', 'engineer')
  async updateAsset(@Param('id') id: string, @Body() body: any) {
    return this.assetsService.updateAsset(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteAsset(@Param('id') id: string) {
    return this.assetsService.deleteAsset(id);
  }

  @Get(':id/documents')
  async getAssetDocuments(@Param('id') id: string) {
    return this.assetsService.getAssetDocuments(id);
  }

  @Get(':id/maintenance')
  async getAssetMaintenance(@Param('id') id: string) {
    return this.assetsService.getAssetMaintenance(id);
  }

  @Get(':id/incidents')
  async getAssetIncidents(@Param('id') id: string) {
    return this.assetsService.getAssetIncidents(id);
  }

  @Get(':id/analytics')
  async getAssetAnalytics(@Param('id') id: string) {
    return this.assetsService.getAssetAnalytics(id);
  }
}
