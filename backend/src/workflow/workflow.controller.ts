import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('workflow')
@UseGuards(JwtAuthGuard)
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get('dashboard')
  async getDashboard() { return this.workflowService.getDashboard(); }

  @Get()
  async getWorkflows() { return this.workflowService.getWorkflows(); }

  @Post()
  async createWorkflow(@Body() body: any) { return this.workflowService.createWorkflow(body); }

  @Get('tasks')
  async getTasks() { return this.workflowService.getTasks(); }

  @Post('tasks')
  async createTask(@Body() body: any) { return this.workflowService.createTask(body); }

  @Get('approvals')
  async getApprovals() { return this.workflowService.getApprovals(); }

  @Post('approvals/:id/approve')
  async approveRequest(@Param('id') id: string, @Body('comments') comments: string) {
    return this.workflowService.approveRequest(id, comments);
  }

  @Post('approvals/:id/reject')
  async rejectRequest(@Param('id') id: string, @Body('comments') comments: string) {
    return this.workflowService.rejectRequest(id, comments);
  }

  @Get('notifications')
  async getNotifications() { return this.workflowService.getNotifications(); }

  @Patch('notifications/:id/read')
  async markNotificationRead(@Param('id') id: string) { return this.workflowService.markNotificationRead(id); }

  @Get('activity')
  async getActivities() { return this.workflowService.getActivities(); }
}
