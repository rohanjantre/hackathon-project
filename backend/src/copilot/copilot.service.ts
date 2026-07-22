import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';
import { SendMessageDto } from './dto/chat.dto';
import { AIResponse } from './providers/ai.interface';

@Injectable()
export class CopilotService {
  constructor(
    @InjectModel(Conversation.name) private convoModel: Model<ConversationDocument>,
  ) {}

  private async mockRAGPipeline(query: string): Promise<AIResponse> {
    // 1. Search knowledge module
    // 2. Search assets module
    // 3. Pass to AI Provider
    
    // Mock response that acts like an industrial engineer
    const answer = `Based on the latest inspection reports and OEM manual for the specified asset, the root cause is likely a **bearing misalignment**. 
    
### Recommended Actions
1. **Reduce Load**: Decrease turbine load by 15% immediately.
2. **Thermal Check**: Perform a thermal imaging inspection on Bearing Housing #4.
3. **Schedule Balancing**: Plan dynamic balancing during the next maintenance window.

*I have attached the relevant SOPs and maintenance logs for your review.*`;

    return {
      answer,
      confidence: 96.5,
      referencedDocuments: ['Siemens-S7-1500-SOP.pdf', 'Vibration-Log-2023.csv'],
      referencedAssets: ['PUMP-A-101'],
      citations: [
        { doc: 'Siemens-S7-1500-SOP.pdf', page: 42, text: 'If vibration exceeds 4.5mm/s, bearing misalignment is the primary suspect.' }
      ],
      suggestedFollowUps: [
        'Show me the full thermal history for PUMP-A-101',
        'Who performed the last maintenance on this pump?'
      ]
    };
  }

  async sendMessage(userId: string, dto: SendMessageDto) {
    let conversation;

    if (dto.conversationId) {
      conversation = await this.convoModel.findOne({ _id: dto.conversationId, userId });
      if (!conversation) throw new NotFoundException('Conversation not found');
    } else {
      conversation = new this.convoModel({
        userId,
        title: dto.message.substring(0, 40) + '...',
        messages: []
      });
    }

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: dto.message
    });

    // Run RAG pipeline
    const aiRes = await this.mockRAGPipeline(dto.message);

    // Add assistant message
    conversation.messages.push({
      role: 'assistant',
      content: aiRes.answer,
      confidence: aiRes.confidence,
      referencedDocuments: aiRes.referencedDocuments,
      referencedAssets: aiRes.referencedAssets,
      citations: aiRes.citations,
      suggestedFollowUps: aiRes.suggestedFollowUps
    });

    await conversation.save();

    return {
      conversationId: conversation._id,
      message: conversation.messages[conversation.messages.length - 1]
    };
  }

  async getHistory(userId: string) {
    return this.convoModel.find({ userId }).select('-messages').sort({ createdAt: -1 }).exec();
  }

  async getConversation(userId: string, id: string) {
    const convo = await this.convoModel.findOne({ _id: id, userId }).exec();
    if (!convo) throw new NotFoundException();
    return convo;
  }

  async deleteConversation(userId: string, id: string) {
    const result = await this.convoModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!result) throw new NotFoundException();
    return result;
  }

  async getSuggestions() {
    return [
      "Find maintenance procedure for Pump A",
      "Show inspection history for Boiler B",
      "List documents related to Compressor C",
      "Summarize SOP for Generator D",
      "Show all compliance issues"
    ];
  }
}
