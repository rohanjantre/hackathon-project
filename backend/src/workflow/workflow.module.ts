import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { WorkflowRepository } from './workflow.repository';
import { 
  Workflow, WorkflowSchema,
  WorkflowExecution, WorkflowExecutionSchema,
  Task, TaskSchema,
  Approval, ApprovalSchema,
  Notification, NotificationSchema,
  ActivityLog, ActivityLogSchema
} from './schemas/workflow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
      { name: WorkflowExecution.name, schema: WorkflowExecutionSchema },
      { name: Task.name, schema: TaskSchema },
      { name: Approval.name, schema: ApprovalSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
  ],
  controllers: [WorkflowController],
  providers: [WorkflowService, WorkflowRepository],
})
export class WorkflowModule {}
