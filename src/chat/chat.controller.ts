import { Body, Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { OpenaiService } from 'src/openai/openai.service';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly openaiService: OpenaiService
    ) {}

    @Get()
    async handleChat(@Body('message') message: string) {
        const dialogflowResponse = await this.chatService.detectIntentText(message);
        const intent = dialogflowResponse.intent;

        if (intent === 'chat_gpt_response') {
            const chatgptPrompt = dialogflowResponse.fields.chatgptprompt.stringValue;
            const chatgptResponse = await this.openaiService.completion(chatgptPrompt);
            return {
                message: message,
                response: chatgptResponse,
            }
        }

        return {
            message: message,
            response: dialogflowResponse,
        }
    }
}