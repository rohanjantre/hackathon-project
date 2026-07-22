import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssetDoc, AssetDocument } from './schemas/asset.schema';

@Injectable()
export class AssetsRepository {
  constructor(
    @InjectModel(AssetDoc.name) private assetModel: Model<AssetDocument>,
  ) {}

  async create(data: Partial<AssetDoc>): Promise<AssetDocument> {
    const created = new this.assetModel(data);
    return created.save();
  }

  async findAll(query: any = {}): Promise<AssetDocument[]> {
    return this.assetModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<AssetDocument | null> {
    return this.assetModel.findById(id).exec();
  }

  async update(id: string, data: Partial<AssetDoc>): Promise<AssetDocument | null> {
    return this.assetModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<AssetDocument | null> {
    return this.assetModel.findByIdAndDelete(id).exec();
  }

  async getDashboardStats(): Promise<any> {
    const total = await this.assetModel.countDocuments();
    const healthy = await this.assetModel.countDocuments({ healthScore: { $gte: 80 } });
    const maintenance = await this.assetModel.countDocuments({ status: 'Maintenance' });
    const critical = await this.assetModel.countDocuments({ criticality: 'High' });
    
    // Quick average health logic
    const assets = await this.assetModel.find({}, { healthScore: 1 }).exec();
    const avgHealth = assets.length > 0 
      ? assets.reduce((acc, curr) => acc + (curr.healthScore || 100), 0) / assets.length 
      : 100;

    return { total, healthy, maintenance, critical, avgHealth: Math.round(avgHealth) };
  }
}
