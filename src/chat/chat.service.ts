import { SessionsClient } from '@google-cloud/dialogflow';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ChatService {
    private SessionClient = new SessionsClient()
    private projectId = process.env.GOOGLE_DIALOGFLOW_PROJECT_ID;
    private location = "us-central1";
    private languageCode = process.env.GOOGLE_DIALOGFLOW_LANGUAGE_CODE || 'en-US';

    async detectIntentText(query: string) {
        const sessionID = uuid();
        const sessionPath = this.SessionClient.projectLocationAgentSessionPath(
            this.projectId,
            this.location,
            sessionID
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query
                },
                languageCode: this.languageCode
            }
        };

        const [response] = await this.SessionClient.detectIntent(request);
        const result = response[0].queryResult;

        return {
            text: result.fulfillmentText,
            intent: result.intent.displayName,
            fields: result.parameters.fields
        }
    }
}