import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Post('completion')
    async completion(@Body('prompt') prompt: string) : Promise<string> {
        return await this.openaiService.completion(prompt);
    }
}
