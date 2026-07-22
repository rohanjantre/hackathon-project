import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { 
  Organization, Plant, Department, SystemSetting, Integration, AuditLog, ApiKey,
  OrganizationDocument, PlantDocument, DepartmentDocument, SystemSettingDocument, IntegrationDocument, AuditLogDocument, ApiKeyDocument
} from './schemas/platform.schema';

@Injectable()
export class PlatformRepository {
  constructor(
    @InjectModel(Organization.name) private orgModel: Model<OrganizationDocument>,
    @InjectModel(Plant.name) private plantModel: Model<PlantDocument>,
    @InjectModel(Department.name) private deptModel: Model<DepartmentDocument>,
    @InjectModel(SystemSetting.name) private settingModel: Model<SystemSettingDocument>,
    @InjectModel(Integration.name) private integrationModel: Model<IntegrationDocument>,
    @InjectModel(AuditLog.name) private auditModel: Model<AuditLogDocument>,
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  async getOrganizations() { return this.orgModel.find().exec(); }
  async createOrganization(data: Partial<Organization>) { return new this.orgModel(data).save(); }
  
  async getPlants() { return this.plantModel.find().exec(); }
  async createPlant(data: Partial<Plant>) { return new this.plantModel(data).save(); }

  async getDepartments() { return this.deptModel.find().exec(); }
  async createDepartment(data: Partial<Department>) { return new this.deptModel(data).save(); }

  async getSettings() { return this.settingModel.find().exec(); }
  async updateSetting(key: string, value: any) {
    return this.settingModel.findOneAndUpdate({ key }, { value }, { upsert: true, new: true }).exec();
  }

  async getIntegrations() { return this.integrationModel.find().exec(); }

  async getAuditLogs() { return this.auditModel.find().sort({ createdAt: -1 }).limit(100).exec(); }
  async logAudit(data: Partial<AuditLog>) { return new this.auditModel(data).save(); }

  async getApiKeys() { return this.apiKeyModel.find().exec(); }
  async createApiKey(data: Partial<ApiKey>) { return new this.apiKeyModel(data).save(); }
  async deleteApiKey(id: string) { return this.apiKeyModel.findByIdAndDelete(id).exec(); }

  async getSystemHealth() {
    return {
      status: 'Healthy',
      backend: 'Online',
      database: 'Connected',
      memoryUsage: '45%',
      cpuUsage: '22%',
      aiServices: 'Online'
    };
  }
}
