import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get()
    async handleChat(@Query('message') message: string) {
        const response = await this.chatService.detectIntentText(message);
        return {
            message: response
        }
    }
}