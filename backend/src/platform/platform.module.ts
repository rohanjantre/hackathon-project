import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { PlatformRepository } from './platform.repository';
import { 
  Organization, OrganizationSchema,
  Plant, PlantSchema,
  Department, DepartmentSchema,
  SystemSetting, SystemSettingSchema,
  Integration, IntegrationSchema,
  AuditLog, AuditLogSchema,
  ApiKey, ApiKeySchema
} from './schemas/platform.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Plant.name, schema: PlantSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: SystemSetting.name, schema: SystemSettingSchema },
      { name: Integration.name, schema: IntegrationSchema },
      { name: AuditLog.name, schema: AuditLogSchema },
      { name: ApiKey.name, schema: ApiKeySchema },
    ]),
  ],
  controllers: [PlatformController],
  providers: [PlatformService, PlatformRepository],
})
export class PlatformModule {}
