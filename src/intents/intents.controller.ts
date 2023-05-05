import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { IntentsService } from './intents.service';
import * as fs from 'fs';
import { DeleteIntentsInterface, ListIntentsInterface } from './intents.interface';

@Controller('intents')
export class IntentsController {
    constructor(private readonly intentsService: IntentsService) { }

    private intents = JSON.parse(fs.readFileSync('intents.json', 'utf8'));

    @Post('create-intents')
    async createIntents(): Promise<any> {
        return await this.intentsService.createIntentsFromJson(this.intents.intents);
    }

    @Get('list-intents')
    async listIntents(): Promise<ListIntentsInterface> {
        return await this.intentsService.listIntents();
    }

    @Delete('delete-intents')
    async deleteIntents(@Body('intentName') intentName: string): Promise<DeleteIntentsInterface> {
        return await this.intentsService.deleteIntent(intentName);
    }
}
