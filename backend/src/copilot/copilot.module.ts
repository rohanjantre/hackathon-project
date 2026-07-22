import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CopilotController } from './copilot.controller';
import { CopilotService } from './copilot.service';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [CopilotController],
  providers: [CopilotService],
})
export class CopilotModule {}
