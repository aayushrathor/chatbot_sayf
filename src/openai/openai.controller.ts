import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, CacheTTL, Controller, Get, UseInterceptors } from '@nestjs/common';
import { OpenaiCompletionInterface } from './openai.interface';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) { }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1440)
    @Get('completion')
    async completion(@Body('prompt') prompt: string): Promise<OpenaiCompletionInterface> {
        return await this.openaiService.completion(prompt);
    }
}
