import { Injectable } from '@nestjs/common';
import { WorkflowRepository } from './workflow.repository';

@Injectable()
export class WorkflowService {
  constructor(private readonly repository: WorkflowRepository) {}

  async getDashboard() {
    return this.repository.getDashboardStats();
  }

  async createWorkflow(data: any) {
    const workflow = await this.repository.createWorkflow(data);
    await this.repository.logActivity({ action: 'Created Workflow', module: 'Workflow Automation', details: { workflowId: workflow._id } });
    return workflow;
  }

  async getWorkflows() {
    return this.repository.getWorkflows();
  }

  async createTask(data: any) {
    const task = await this.repository.createTask(data);
    await this.repository.createNotification({ title: 'New Task Assigned', message: `You have been assigned: ${data.title}`, priority: 'Warning' });
    return task;
  }

  async getTasks() {
    return this.repository.getTasks();
  }

  async getApprovals() {
    return this.repository.getApprovals();
  }

  async approveRequest(id: string, comments: string) {
    return this.repository.updateApprovalStatus(id, 'Approved', comments);
  }

  async rejectRequest(id: string, comments: string) {
    return this.repository.updateApprovalStatus(id, 'Rejected', comments);
  }

  async getNotifications() {
    return this.repository.getNotifications();
  }

  async markNotificationRead(id: string) {
    return this.repository.markNotificationRead(id);
  }

  async getActivities() {
    return this.repository.getActivityLogs();
  }
}
