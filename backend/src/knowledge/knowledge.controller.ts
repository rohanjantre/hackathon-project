import { Controller, Post, Get, Patch, Delete, Param, Body, UseInterceptors, UploadedFile, Req, Query, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { KnowledgeService } from './knowledge.service';
import { UploadDocumentDto, UpdateDocumentDto } from './dto/document.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('knowledge')
@UseGuards(JwtAuthGuard, RolesGuard)
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      }
    }),
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  }))
  async uploadDocument(@UploadedFile() file: Express.Multer.File, @Body() body: UploadDocumentDto, @Req() req: any) {
    const userId = req.user.id;
    return this.knowledgeService.uploadDocument(file, body, userId);
  }

  @Get('documents')
  async getDocuments(@Query() query: any) {
    return this.knowledgeService.getDocuments(query);
  }

  @Get('document/:id')
  async getDocument(@Param('id') id: string) {
    return this.knowledgeService.getDocumentById(id);
  }

  @Patch('document/:id')
  async updateDocument(@Param('id') id: string, @Body() body: UpdateDocumentDto) {
    return this.knowledgeService.updateDocument(id, body);
  }

  @Delete('document/:id')
  @Roles('admin') // Only Admin can delete
  async deleteDocument(@Param('id') id: string) {
    return this.knowledgeService.deleteDocument(id);
  }

  @Get('search')
  async searchDocuments(@Query('q') q: string) {
    return this.knowledgeService.searchDocuments(q || '');
  }

  @Get('dashboard')
  async getDashboardStats() {
    return this.knowledgeService.getDashboardStats();
  }

  @Get('recent')
  async getRecentDocuments() {
    return this.knowledgeService.getDocuments({ limit: 10 });
  }

  @Get('categories')
  async getCategories() {
    return [
      'Manual', 'SOP', 'Inspection', 'Maintenance', 'Incident', 
      'Safety', 'Compliance', 'Engineering Drawing', 'P&ID', 
      'Vendor Manual', 'Technical Specification', 'Policy', 'Procedure', 'Other'
    ];
  }

  @Post('archive/:id')
  async archiveDocument(@Param('id') id: string) {
    return this.knowledgeService.updateDocument(id, { status: 'Archived' });
  }

  @Post('restore/:id')
  async restoreDocument(@Param('id') id: string) {
    return this.knowledgeService.updateDocument(id, { status: 'Ready' }); // Or whatever appropriate status
  }
}
