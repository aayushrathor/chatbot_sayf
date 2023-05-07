export interface CreateIntentInterface {
  displayName: string,
  trainingPhrases: string[],
  messageTexts: string[]
}

export interface ListIntentsInterface {
  intents: {
    name: string,
    displayName: string,
    messages: {
      platform: string,
      text: {
        text: string[]
      },
      message: string
    }[],
    action: string,
    rootFollowupIntentName: string,
    parentFollowupIntentName: string,
    inputContextNames: any[],
    outputContexts: any[]
  }[]
}

export interface DeleteIntentsInterface {
  message: string,
  intent: string
}
