export interface DetectIntentInterface {
  text: string,
  intent: string,
  fields: {},
}

export interface HandleChatInterface {
  responseBy: string,
  message: string,
  response: DetectIntentInterface
}
