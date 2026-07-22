import { Controller, Post, Get, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { CopilotService } from './copilot.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SendMessageDto } from './dto/chat.dto';

@Controller('copilot')
@UseGuards(JwtAuthGuard)
export class CopilotController {
  constructor(private readonly copilotService: CopilotService) {}

  @Post('chat')
  async chat(@Req() req: any, @Body() body: SendMessageDto) {
    return this.copilotService.sendMessage(req.user.id, body);
  }

  @Get('history')
  async getHistory(@Req() req: any) {
    return this.copilotService.getHistory(req.user.id);
  }

  @Get('history/:id')
  async getConversation(@Req() req: any, @Param('id') id: string) {
    return this.copilotService.getConversation(req.user.id, id);
  }

  @Delete('history/:id')
  async deleteConversation(@Req() req: any, @Param('id') id: string) {
    return this.copilotService.deleteConversation(req.user.id, id);
  }

  @Get('suggestions')
  async getSuggestions() {
    return this.copilotService.getSuggestions();
  }
}
