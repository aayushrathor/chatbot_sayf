import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { IntentsService } from './intents.service';
import * as fs from 'fs';

@Controller('intents')
export class IntentsController {
    constructor(private readonly intentsService: IntentsService) { }

    private intents = JSON.parse(fs.readFileSync('intents.json', 'utf8'));

    @Post('create-intents')
    async createIntents() {
        return await this.intentsService.createIntentsFromJson(this.intents.intents);
    }

    @Get('list-intents')
    async listIntents() {
        return await this.intentsService.listIntents();
    }

    @Delete('delete-intents')
    async deleteIntents(@Body('intentName') intentName: string) {
        return await this.intentsService.deleteIntent(intentName);
    }
}
