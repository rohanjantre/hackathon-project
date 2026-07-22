import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PredictiveController } from './predictive.controller';
import { PredictiveService } from './predictive.service';
import { PredictiveRepository } from './predictive.repository';
import { 
  Prediction, PredictionSchema,
  Recommendation, RecommendationSchema,
  Anomaly, AnomalySchema,
  MaintenancePlan, MaintenancePlanSchema,
  OperationalInsight, OperationalInsightSchema
} from './schemas/predictive.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Prediction.name, schema: PredictionSchema },
      { name: Recommendation.name, schema: RecommendationSchema },
      { name: Anomaly.name, schema: AnomalySchema },
      { name: MaintenancePlan.name, schema: MaintenancePlanSchema },
      { name: OperationalInsight.name, schema: OperationalInsightSchema },
    ]),
  ],
  controllers: [PredictiveController],
  providers: [PredictiveService, PredictiveRepository],
})
export class PredictiveModule {}
