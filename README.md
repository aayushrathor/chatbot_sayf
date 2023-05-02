## chatbot

## Description

> Chatbot is developed using Dialogflow and NestJs, which serves as a customer support agent. In addition to these technologies, the chatbot also utilizes OpenAI's ChatGPT API for consultation. 

<!-- The combination of these tools allows the chatbot to understand and respond to customer inquiries in a natural and efficient manner, providing a seamless support experience for SayF's users. -->

## Project Structure

```bash 
.
├── src
│   ├── chat
│   │   ├── chat.controller.ts
│   │   ├── chat.module.ts
│   │   └── chat.service.ts
│   ├── intents
│   │   ├── intents.controller.ts
│   │   ├── intents.module.ts
│   │   └── intents.service.ts
│   ├── openai
│   │   ├── openai.controller.ts
│   │   ├── openai.module.ts
│   │   └── openai.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── .env
├── .gitignore
├── intents.json
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API EndPoints

| API Endpoint            | HTTP Method | Description                                                       |
| -----------------------| -----------| ----------------------------------------------------------------- |
| /                      | GET        | Root route for chatbot.                                           |
| /chat                  | GET        | Uses the message in the request body to query the chatbot for an answer. |
| /intents/list-intents  | GET        | Lists all Dialogflow intents.                                     |
| /intents/create-intents| POST       | Creates a new Dialogflow intent.                                  |

