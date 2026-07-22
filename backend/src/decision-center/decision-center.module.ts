import { Module } from '@nestjs/common';
import { DecisionCenterController } from './decision-center.controller';
import { DecisionCenterService } from './decision-center.service';
import { DecisionCenterRepository } from './decision-center.repository';

@Module({
  controllers: [DecisionCenterController],
  providers: [DecisionCenterService, DecisionCenterRepository],
})
export class DecisionCenterModule {}
