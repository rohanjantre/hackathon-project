import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type WorkflowDocument = Workflow & MongooseDocument;
export type WorkflowExecutionDocument = WorkflowExecution & MongooseDocument;
export type TaskDocument = Task & MongooseDocument;
export type ApprovalDocument = Approval & MongooseDocument;
export type NotificationDocument = Notification & MongooseDocument;
export type ActivityLogDocument = ActivityLog & MongooseDocument;

@Schema({ timestamps: true })
export class Workflow {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  triggerEvent: string;

  @Prop({ type: [Object] }) // e.g., { type: 'SendNotification', target: 'Manager', message: '...' }
  actions: any[];

  @Prop({ default: true })
  isActive: boolean;
}

@Schema({ timestamps: true })
export class WorkflowExecution {
  @Prop()
  workflowId: string;

  @Prop()
  triggerEventId: string;

  @Prop()
  status: string; // 'Running', 'Completed', 'Failed'

  @Prop({ type: Object })
  context: any;
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  priority: string; // 'High', 'Medium', 'Low'

  @Prop()
  owner: string;

  @Prop()
  department: string;

  @Prop({ default: 'Pending' })
  status: string;

  @Prop()
  dueDate: Date;

  @Prop()
  linkedAsset: string;

  @Prop()
  linkedDocument: string;

  @Prop()
  progress: number;
}

@Schema({ timestamps: true })
export class Approval {
  @Prop({ required: true })
  title: string;

  @Prop()
  requester: string;

  @Prop()
  approver: string;

  @Prop({ default: 'Pending' })
  status: string; // 'Pending', 'Approved', 'Rejected', 'Escalated'

  @Prop()
  comments: string;
}

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  recipient: string;

  @Prop()
  priority: string; // 'Critical', 'Warning', 'Information', 'Success'

  @Prop({ default: false })
  isRead: boolean;
}

@Schema({ timestamps: true })
export class ActivityLog {
  @Prop({ required: true })
  action: string;

  @Prop()
  user: string;

  @Prop()
  module: string; // 'Asset', 'Document', 'Compliance', 'AI Copilot'

  @Prop({ type: Object })
  details: any;
}

export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
export const WorkflowExecutionSchema = SchemaFactory.createForClass(WorkflowExecution);
export const TaskSchema = SchemaFactory.createForClass(Task);
export const ApprovalSchema = SchemaFactory.createForClass(Approval);
export const NotificationSchema = SchemaFactory.createForClass(Notification);
export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
