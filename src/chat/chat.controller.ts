import { Body, Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { OpenaiService } from 'src/openai/openai.service';
import { CombinedCompletionInterface } from './chat.interface';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly openaiService: OpenaiService
    ) { }

    @Get()
    async handleChat(@Body('message') message: string): Promise<CombinedCompletionInterface> {
        const dialogflowResponse = await this.chatService.detectIntentText(message);
        const intent = dialogflowResponse.intent;

        if (intent === "Default Fallback Intent") {
            const chatgptResponse = await this.openaiService.completion(message);
            return {
                responseBy: "chatgpt",
                message: message,
                response: chatgptResponse,
            }
        }

        return {
            responseBy: "dialogflow",
            message: message,
            response: dialogflowResponse,
        }
    }
}
