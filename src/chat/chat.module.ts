import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { OpenaiService } from 'src/openai/openai.service';

@Module({
    imports: [],
    controllers: [ChatController],
    providers: [ChatService, OpenaiService],
})
export class ChatModule {}
