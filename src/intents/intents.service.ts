import { Injectable } from '@nestjs/common';
import * as dialogflow from '@google-cloud/dialogflow';

@Injectable()
export class IntentsService {
    constructor() {
        this.intentsClient
    }
    private intentsClient = new dialogflow.IntentsClient();

    private agentPath = this.intentsClient.projectAgentPath(process.env.GOOGLE_DIALOGFLOW_PROJECT_ID);

    async createIntent(intent: any) {

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
        console.log("createIntentRequest: ", createIntentRequest)

        const [responses] = await this.intentsClient.createIntent(createIntentRequest);
        console.log('Intent created: \n');
        return responses;
    }

    async createIntentsFromJson(intents: any[]) {
        for (const intent of intents) {
            await this.createIntent(intent);
        }
    }

    async listIntents() {
        const request = {
            parent: this.agentPath
        }

        const [response] = await this.intentsClient.listIntents(request);
        response.forEach(intent => {
            console.log('==============================');
            console.log(`Intent name: ${intent.name}`);
            console.log(`Intent display name: ${intent.displayName}`);
            console.log(`Message: ${intent.messages[0].text.text[0]}`)
            console.log(`Action: ${intent.action}`);
            console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
            console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);

            console.log('Input contexts:');
            intent.inputContextNames.forEach(inputContextName => {
                console.log(`\tName: ${inputContextName}`);
            });

            console.log('Output contexts:');
            intent.outputContexts.forEach(outputContext => {
                console.log(`\tName: ${outputContext.name}`);
            });
        });
    }
}
