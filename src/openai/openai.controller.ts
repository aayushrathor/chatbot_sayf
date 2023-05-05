import { Body, Controller, Get } from '@nestjs/common';
import { OpenaiCompletionInterface } from './openai.interface';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) { }

    @Get('completion')
    async completion(@Body('prompt') prompt: string): Promise<OpenaiCompletionInterface> {
        return await this.openaiService.completion(prompt);
    }
}
