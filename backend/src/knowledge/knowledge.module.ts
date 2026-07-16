import { Module } from '@nestjs/common';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Knowledge, KnowledgeSchema } from './schemas/knowledge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Knowledge.name,
        schema: KnowledgeSchema,
      },
    ]),
  ],
  controllers: [KnowledgeController],
  providers: [KnowledgeService]
})
export class KnowledgeModule { }
