import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type OrganizationDocument = Organization & MongooseDocument;
export type PlantDocument = Plant & MongooseDocument;
export type DepartmentDocument = Department & MongooseDocument;
export type SystemSettingDocument = SystemSetting & MongooseDocument;
export type IntegrationDocument = Integration & MongooseDocument;
export type AuditLogDocument = AuditLog & MongooseDocument;
export type ApiKeyDocument = ApiKey & MongooseDocument;

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop()
  industry: string;

  @Prop()
  address: string;

  @Prop()
  contactEmail: string;

  @Prop({ default: 'UTC' })
  timezone: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop()
  logoUrl: string;
}

@Schema({ timestamps: true })
export class Plant {
  @Prop({ required: true })
  name: string;

  @Prop()
  organizationId: string;

  @Prop()
  managerId: string;

  @Prop()
  location: string;

  @Prop({ default: 'Active' })
  status: string;
}

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true })
  name: string;

  @Prop()
  plantId: string;

  @Prop()
  managerId: string;
}

@Schema({ timestamps: true })
export class SystemSetting {
  @Prop({ required: true })
  key: string;

  @Prop({ type: Object })
  value: any;

  @Prop()
  category: string;
}

@Schema({ timestamps: true })
export class Integration {
  @Prop({ required: true })
  name: string; // 'Microsoft Teams', 'SAP', 'SCADA'

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: Object })
  config: any;
}

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ required: true })
  action: string;

  @Prop()
  user: string;

  @Prop()
  ipAddress: string;

  @Prop()
  module: string;

  @Prop()
  status: string;

  @Prop({ type: Object })
  details: any;
}

@Schema({ timestamps: true })
export class ApiKey {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  keyHash: string;

  @Prop()
  prefix: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
export const PlantSchema = SchemaFactory.createForClass(Plant);
export const DepartmentSchema = SchemaFactory.createForClass(Department);
export const SystemSettingSchema = SchemaFactory.createForClass(SystemSetting);
export const IntegrationSchema = SchemaFactory.createForClass(Integration);
export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
