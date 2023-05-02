import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OpenaiService {
    private openaiurl = "https://api.openai.com/v1/chat/completions"

    async completion(prompt: string): Promise<any> {
        const response = await axios.post(this.openaiurl, {
            "model": "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        })

        return {
            "prompt": prompt,
            "response": response.data["choices"][0]["message"]
        }
    }
}