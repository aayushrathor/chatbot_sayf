export interface OpenaiCompletionInterface {
  prompt: string,
  response: {
    role: string,
    content: string
  }
}
