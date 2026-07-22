import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { 
  Workflow, WorkflowExecution, Task, Approval, Notification, ActivityLog,
  WorkflowDocument, WorkflowExecutionDocument, TaskDocument, ApprovalDocument, NotificationDocument, ActivityLogDocument
} from './schemas/workflow.schema';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectModel(Workflow.name) private workflowModel: Model<WorkflowDocument>,
    @InjectModel(WorkflowExecution.name) private executionModel: Model<WorkflowExecutionDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Approval.name) private approvalModel: Model<ApprovalDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectModel(ActivityLog.name) private activityModel: Model<ActivityLogDocument>,
  ) {}

  async getDashboardStats() {
    const activeWorkflows = await this.workflowModel.countDocuments({ isActive: true });
    const pendingTasks = await this.taskModel.countDocuments({ status: 'Pending' });
    const approvalsWaiting = await this.approvalModel.countDocuments({ status: 'Pending' });
    const notificationsSent = await this.notificationModel.countDocuments();
    
    return {
      activeWorkflows,
      pendingTasks,
      approvalsWaiting,
      completedToday: 15, // Mock daily logic
      overdueTasks: 2,
      notificationsSent,
      failedWorkflows: 0,
      automationSuccessRate: 100
    };
  }

  // Workflows
  async createWorkflow(data: Partial<Workflow>) { return new this.workflowModel(data).save(); }
  async getWorkflows() { return this.workflowModel.find().exec(); }
  async getWorkflow(id: string) { return this.workflowModel.findById(id).exec(); }

  // Tasks
  async createTask(data: Partial<Task>) { return new this.taskModel(data).save(); }
  async getTasks() { return this.taskModel.find().sort({ createdAt: -1 }).exec(); }

  // Approvals
  async createApproval(data: Partial<Approval>) { return new this.approvalModel(data).save(); }
  async getApprovals() { return this.approvalModel.find().sort({ createdAt: -1 }).exec(); }
  async updateApprovalStatus(id: string, status: string, comments?: string) {
    return this.approvalModel.findByIdAndUpdate(id, { status, comments }, { new: true }).exec();
  }

  // Notifications
  async createNotification(data: Partial<Notification>) { return new this.notificationModel(data).save(); }
  async getNotifications() { return this.notificationModel.find().sort({ createdAt: -1 }).exec(); }
  async markNotificationRead(id: string) { return this.notificationModel.findByIdAndUpdate(id, { isRead: true }).exec(); }

  // Activity Log
  async logActivity(data: Partial<ActivityLog>) { return new this.activityModel(data).save(); }
  async getActivityLogs() { return this.activityModel.find().sort({ createdAt: -1 }).exec(); }
}
