import { Injectable, NotFoundException } from '@nestjs/common';
import { KnowledgeRepository } from './knowledge.repository';
import { DocumentProcessorService } from './services/ai-pipeline.service';

@Injectable()
export class KnowledgeService {
  constructor(
    private readonly repository: KnowledgeRepository,
    private readonly processor: DocumentProcessorService,
  ) {}

  async uploadDocument(file: Express.Multer.File, body: any, userId: string) {
    const docData = {
      title: body.title || file.originalname,
      originalFileName: file.originalname,
      storedFileName: file.filename,
      description: body.description,
      category: body.category || 'Other',
      department: body.department,
      assetId: body.assetId,
      uploadedBy: userId,
      mimeType: file.mimetype,
      extension: file.originalname.split('.').pop() || '',
      size: file.size,
      storagePath: file.path,
      status: 'Uploaded',
      processingStage: 'Initialized',
      aiReady: false,
    };

    const doc = await this.repository.create(docData);
    
    // Trigger async pipeline
    this.processor.runPipeline(doc._id.toString());

    return doc;
  }

  async getDocuments(query: any) {
    return this.repository.findAll(query);
  }

  async getDocumentById(id: string) {
    const doc = await this.repository.findById(id);
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async updateDocument(id: string, updateData: any) {
    const doc = await this.repository.update(id, updateData);
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async deleteDocument(id: string) {
    const doc = await this.repository.delete(id);
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async getDashboardStats() {
    return this.repository.getStats();
  }

  async searchDocuments(queryStr: string) {
    return this.repository.findAll({
      $or: [
        { title: { $regex: queryStr, $options: 'i' } },
        { description: { $regex: queryStr, $options: 'i' } },
        { 'entities.keywords': { $regex: queryStr, $options: 'i' } }
      ]
    });
  }
}
