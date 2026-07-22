import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { AssetsModule } from './assets/assets.module';
import { CopilotModule } from './copilot/copilot.module';
import { GraphModule } from './graph/graph.module';
import { ComplianceModule } from './compliance/compliance.module';
import { PredictiveModule } from './predictive/predictive.module';
import { WorkflowModule } from './workflow/workflow.module';
import { PlatformModule } from './platform/platform.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DecisionCenterModule } from './decision-center/decision-center.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/nestAuth',
    ),
    UserModule,
    AdminModule,
    KnowledgeModule,
    AssetsModule,
    CopilotModule,
    GraphModule,
    ComplianceModule,
    PredictiveModule,
    WorkflowModule,
    PlatformModule,
    AnalyticsModule,
    DecisionCenterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
