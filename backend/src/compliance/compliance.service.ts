import { Injectable, NotFoundException } from '@nestjs/common';
import { ComplianceRepository } from './compliance.repository';
import { ComplianceCase } from './schemas/compliance.schema';

@Injectable()
export class ComplianceService {
  constructor(private readonly repository: ComplianceRepository) {}

  async createCase(data: Partial<ComplianceCase>) {
    return this.repository.createCase(data);
  }

  async getCases() {
    return this.repository.getAllCases();
  }

  async getCaseById(id: string) {
    const complianceCase = await this.repository.getCaseById(id);
    if (!complianceCase) throw new NotFoundException('Case not found');
    return complianceCase;
  }

  async updateCase(id: string, data: Partial<ComplianceCase>) {
    const complianceCase = await this.repository.updateCase(id, data);
    if (!complianceCase) throw new NotFoundException('Case not found');
    return complianceCase;
  }

  async deleteCase(id: string) {
    const complianceCase = await this.repository.deleteCase(id);
    if (!complianceCase) throw new NotFoundException('Case not found');
    return complianceCase;
  }

  async getDashboard() {
    return this.repository.getDashboardStats();
  }

  async getAudits() {
    return this.repository.getAudits();
  }
}
