import { Injectable } from '@nestjs/common';
import * as dialogflow from '@google-cloud/dialogflow';
import { DeleteIntentsInterface, ListIntentsInterface } from './intents.interface';

@Injectable()
export class IntentsService {
    constructor() {
        this.intentsClient
    }
    private intentsClient = new dialogflow.IntentsClient();

    private agentPath = this.intentsClient.projectAgentPath(process.env.GOOGLE_DIALOGFLOW_PROJECT_ID);

    async createIntent(intent: any): Promise<any> {

        const trainingPhrasesParts = intent.trainingPhrases.map((phrase: string) => ({
            type: 'EXAMPLE',
            parts: [{ text: phrase }],
        }));

        const messageTexts = intent.messageTexts.map((text: string) => ({
            text: {
                text: [text],
            },
        }));

        const intentData = {
            displayName: intent.displayName,
            trainingPhrases: trainingPhrasesParts,
            messages: messageTexts
        }

        const createIntentRequest = {
            parent: this.agentPath,
            intent: intentData
        };

        const [responses] = await this.intentsClient.createIntent(createIntentRequest);

        return {
            displayName: responses.displayName,
            trainingPhrases: responses.trainingPhrases,
            messages: responses.messages[0].text
        };
    }

    async createIntentsFromJson(intents: any[]) {
        const createdIntents = []
        for (const intent of intents) {
            const createIntent = await this.createIntent(intent);
            createdIntents.push(createIntent)
        }
        return createdIntents
    }

    async listIntents(): Promise<ListIntentsInterface> {
        const request = {
            parent: this.agentPath
        }

        const response = await this.intentsClient.listIntents(request);
        const responseJson = response[0].map((intent: any) => {
            return {
                name: intent.name,
                displayName: intent.displayName,
                messages: intent.messages[0],
                action: intent.action,
                rootFollowupIntentName: intent.rootFollowupIntentName,
                parentFollowupIntentName: intent.parentFollowupIntentName,
                inputContextNames: intent.inputContextNames,
                outputContexts: intent.outputContexts
            }
        })

        return {
            intents: responseJson
        };
    }

    async deleteIntent(intentName: string): Promise<DeleteIntentsInterface> {
        const request = {
            name: intentName
        };
        await this.intentsClient.deleteIntent(request);
        return {
            message: "Intent Deleted",
            intent: intentName
        }
    }
}
