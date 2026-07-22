import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComplianceCase, Audit, CAPA, RootCauseAnalysis, ComplianceCaseDocument, AuditDocument, CAPADocument, RootCauseAnalysisDocument } from './schemas/compliance.schema';

@Injectable()
export class ComplianceRepository {
  constructor(
    @InjectModel(ComplianceCase.name) private caseModel: Model<ComplianceCaseDocument>,
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
    @InjectModel(CAPA.name) private capaModel: Model<CAPADocument>,
    @InjectModel(RootCauseAnalysis.name) private rcaModel: Model<RootCauseAnalysisDocument>,
  ) {}

  async createCase(data: Partial<ComplianceCase>) {
    const created = new this.caseModel(data);
    return created.save();
  }

  async getAllCases() {
    return this.caseModel.find().sort({ createdAt: -1 }).exec();
  }

  async getCaseById(id: string) {
    return this.caseModel.findById(id).exec();
  }

  async updateCase(id: string, data: Partial<ComplianceCase>) {
    return this.caseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteCase(id: string) {
    return this.caseModel.findByIdAndDelete(id).exec();
  }

  async getAudits() {
    return this.auditModel.find().sort({ auditDate: -1 }).exec();
  }

  async getDashboardStats() {
    const totalCases = await this.caseModel.countDocuments();
    const criticalViolations = await this.caseModel.countDocuments({ severity: 'High' });
    const openCapas = await this.capaModel.countDocuments({ status: { $ne: 'Closed' } });
    
    return {
      complianceScore: 92, // Mock calculated score
      criticalViolations,
      openCapas,
      totalCases
    };
  }
}
