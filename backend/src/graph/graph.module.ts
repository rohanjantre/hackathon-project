import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { GraphRepository } from './graph.repository';
import { GraphNode, GraphNodeSchema, GraphEdge, GraphEdgeSchema } from './schemas/graph.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GraphNode.name, schema: GraphNodeSchema },
      { name: GraphEdge.name, schema: GraphEdgeSchema },
    ]),
  ],
  controllers: [GraphController],
  providers: [GraphService, GraphRepository],
})
export class GraphModule {}
