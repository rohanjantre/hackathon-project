import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetsRepository } from './assets.repository';
import { AssetDoc } from './schemas/asset.schema';

@Injectable()
export class AssetsService {
  constructor(private readonly repository: AssetsRepository) {}

  async createAsset(data: Partial<AssetDoc>) {
    return this.repository.create(data);
  }

  async getAssets(query: any) {
    return this.repository.findAll(query);
  }

  async getAssetById(id: string) {
    const asset = await this.repository.findById(id);
    if (!asset) throw new NotFoundException('Asset not found');
    return asset;
  }

  async updateAsset(id: string, data: Partial<AssetDoc>) {
    const asset = await this.repository.update(id, data);
    if (!asset) throw new NotFoundException('Asset not found');
    return asset;
  }

  async deleteAsset(id: string) {
    const asset = await this.repository.delete(id);
    if (!asset) throw new NotFoundException('Asset not found');
    return asset;
  }

  async searchAssets(queryStr: string) {
    return this.repository.findAll({
      $or: [
        { assetName: { $regex: queryStr, $options: 'i' } },
        { assetCode: { $regex: queryStr, $options: 'i' } },
        { department: { $regex: queryStr, $options: 'i' } }
      ]
    });
  }

  async getDashboardStats() {
    return this.repository.getDashboardStats();
  }

  // AI Mock endpoints
  async getAssetDocuments(id: string) {
    const asset = await this.getAssetById(id);
    return asset.linkedDocuments || [];
  }

  async getAssetMaintenance(id: string) {
    const asset = await this.getAssetById(id);
    return asset.maintenanceRecords || [];
  }

  async getAssetIncidents(id: string) {
    const asset = await this.getAssetById(id);
    return asset.incidentReports || [];
  }

  async getAssetAnalytics(id: string) {
    const asset = await this.getAssetById(id);
    // Mock analytics generator based on health
    return {
      healthTrend: Array.from({ length: 6 }).map((_, i) => ({ month: `Month ${i+1}`, score: Math.max(50, asset.healthScore - Math.random() * 10) })),
      failureFreq: [ { name: 'Vibration', value: 4 }, { name: 'Temperature', value: 2 } ]
    };
  }
}
