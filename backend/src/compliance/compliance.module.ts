import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';
import { ComplianceRepository } from './compliance.repository';
import { 
  ComplianceCase, ComplianceCaseSchema, 
  Audit, AuditSchema, 
  CAPA, CAPASchema, 
  RootCauseAnalysis, RootCauseAnalysisSchema 
} from './schemas/compliance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComplianceCase.name, schema: ComplianceCaseSchema },
      { name: Audit.name, schema: AuditSchema },
      { name: CAPA.name, schema: CAPASchema },
      { name: RootCauseAnalysis.name, schema: RootCauseAnalysisSchema },
    ]),
  ],
  controllers: [ComplianceController],
  providers: [ComplianceService, ComplianceRepository],
})
export class ComplianceModule {}
