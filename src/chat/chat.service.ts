import { SessionsClient } from '@google-cloud/dialogflow';
import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import { DetectIntentInterface } from './chat.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'

dotenv.config();

@Injectable()
export class ChatService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache
    ) {
        this.authenticateImplicitWithAdc();
    }

    private projectId = process.env.GOOGLE_DIALOGFLOW_PROJECT_ID || "my-project";
    private location = process.env.GOOGLE_DIALOGFLOW_LOCATION || "global";
    private languageCode = process.env.GOOGLE_DIALOGFLOW_LANGUAGE_CODE || 'en-US';

    private config = {
        apiEndpoint: process.env.GOOGLE_DIALOGFLOW_API_ENDPOINT
    }

    private sessionClient = new SessionsClient({ apiEndpoint: this.config.apiEndpoint });

    async authenticateImplicitWithAdc() {
        const storage = new Storage({
            projectId: this.projectId
        });
    }

    async detectIntentText(query: string): Promise<DetectIntentInterface> {
        const cacheKey = `detectIntentText:${query}`

        const cachedResult = await this.cacheService.get(cacheKey)
        if (cachedResult) {
            return cachedResult as DetectIntentInterface;
        }

        const sessionID = uuid();
        const sessionPath = this.sessionClient.projectLocationAgentSessionPath(
            this.projectId,
            this.location,
            sessionID
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: this.languageCode
                },
            }
        };

        const [response] = await this.sessionClient.detectIntent(request);
        const result = response.queryResult;

        const resultToCache = {
            text: result.fulfillmentText,
            intent: result.intent.displayName,
            fields: result.parameters.fields
        }

        await this.cacheService.set(cacheKey, resultToCache, 0)
        return resultToCache;
    }
}
