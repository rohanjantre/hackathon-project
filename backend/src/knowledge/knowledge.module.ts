import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeRepository } from './knowledge.repository';
import { KnowledgeDoc, KnowledgeDocumentSchema } from './schemas/document.schema';
import { DocumentProcessorService, OCRService, EntityExtractionService, EmbeddingService, VectorIndexService, SummaryService } from './services/ai-pipeline.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KnowledgeDoc.name, schema: KnowledgeDocumentSchema },
    ]),
  ],
  controllers: [KnowledgeController],
  providers: [
    KnowledgeService,
    KnowledgeRepository,
    DocumentProcessorService,
    OCRService,
    EntityExtractionService,
    EmbeddingService,
    VectorIndexService,
    SummaryService,
  ],
})
export class KnowledgeModule {}
