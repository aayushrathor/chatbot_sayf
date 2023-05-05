import { OpenaiCompletionInterface } from "src/openai/openai.interface"

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

export interface ChatgptCompletionInterface {
  responseBy: string,
  message: string,
  response: OpenaiCompletionInterface
}

export type CombinedCompletionInterface = HandleChatInterface | ChatgptCompletionInterface
