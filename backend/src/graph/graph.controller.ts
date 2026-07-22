import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { GraphService } from './graph.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('graph')
@UseGuards(JwtAuthGuard)
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  async getGraph() {
    return this.graphService.getGraph();
  }

  @Get('nodes')
  async getNodes() {
    return this.graphService.getNodes();
  }

  @Get('edges')
  async getEdges() {
    return this.graphService.getEdges();
  }

  @Get('node/:id')
  async getNodeDetails(@Param('id') id: string) {
    return this.graphService.getNodeDetails(id);
  }

  @Get('statistics')
  async getStatistics() {
    return this.graphService.getStatistics();
  }

  @Post('rebuild')
  async rebuildGraph() {
    return this.graphService.rebuildGraph();
  }
}
