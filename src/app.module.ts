import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { IntentsModule } from './intents/intents.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), ChatModule, IntentsModule, OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
