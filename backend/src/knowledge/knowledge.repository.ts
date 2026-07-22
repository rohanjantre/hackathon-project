import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KnowledgeDoc, KnowledgeDocument } from './schemas/document.schema';

@Injectable()
export class KnowledgeRepository {
  constructor(
    @InjectModel(KnowledgeDoc.name) private docModel: Model<KnowledgeDocument>,
  ) {}

  async create(data: Partial<KnowledgeDoc>): Promise<KnowledgeDocument> {
    const created = new this.docModel(data);
    return created.save();
  }

  async findAll(query: any = {}): Promise<KnowledgeDocument[]> {
    return this.docModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<KnowledgeDocument | null> {
    return this.docModel.findById(id).exec();
  }

  async update(id: string, data: Partial<KnowledgeDoc>): Promise<KnowledgeDocument | null> {
    return this.docModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<KnowledgeDocument | null> {
    return this.docModel.findByIdAndDelete(id).exec();
  }

  async getStats(): Promise<any> {
    const total = await this.docModel.countDocuments();
    const processing = await this.docModel.countDocuments({ aiReady: false, status: { $ne: 'Failed' } });
    const indexed = await this.docModel.countDocuments({ aiReady: true });
    return { total, processing, indexed };
  }
}
