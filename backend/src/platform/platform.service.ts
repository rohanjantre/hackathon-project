import { Injectable } from '@nestjs/common';
import { PlatformRepository } from './platform.repository';

@Injectable()
export class PlatformService {
  constructor(private readonly repository: PlatformRepository) {}

  async getDashboard() {
    const orgs = await this.repository.getOrganizations();
    const plants = await this.repository.getPlants();
    const health = await this.repository.getSystemHealth();
    return {
      organizationsCount: orgs.length,
      plantsCount: plants.length,
      health
    };
  }

  async getOrganizations() { return this.repository.getOrganizations(); }
  async createOrganization(data: any) { 
    await this.repository.logAudit({ action: 'Create Organization', module: 'Platform', details: data });
    return this.repository.createOrganization(data); 
  }

  async getPlants() { return this.repository.getPlants(); }
  async createPlant(data: any) { return this.repository.createPlant(data); }

  async getDepartments() { return this.repository.getDepartments(); }
  
  async getSettings() { return this.repository.getSettings(); }
  async updateSetting(key: string, value: any) { 
    await this.repository.logAudit({ action: 'Update Setting', module: 'Platform', details: { key, value } });
    return this.repository.updateSetting(key, value); 
  }

  async getIntegrations() { return this.repository.getIntegrations(); }
  
  async getAuditLogs() { return this.repository.getAuditLogs(); }

  async getApiKeys() { return this.repository.getApiKeys(); }
  async createApiKey(data: any) {
    const keyHash = Math.random().toString(36).substring(2, 15); // Mock hashing
    return this.repository.createApiKey({ ...data, keyHash, prefix: keyHash.substring(0, 4) });
  }
  async deleteApiKey(id: string) { return this.repository.deleteApiKey(id); }

  async getSystemHealth() { return this.repository.getSystemHealth(); }
}
