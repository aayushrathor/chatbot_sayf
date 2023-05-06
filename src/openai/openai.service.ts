import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { OpenaiCompletionInterface } from './openai.interface';
import { Cache } from 'cache-manager'

dotenv.config();

@Injectable()
export class OpenaiService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheService: Cache
    ) { }
    private openaiurl = "https://api.openai.com/v1/chat/completions"

    async completion(prompt: string): Promise<OpenaiCompletionInterface> {
        const cacheKey = `openaiCompletion:${prompt}`
        const cachedResult = await this.cacheService.get(cacheKey)
        if (cachedResult) {
            return cachedResult as OpenaiCompletionInterface;
        }

        const response = await axios.post(this.openaiurl, {
            "model": "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        })

        const resultToCache = {
            "prompt": prompt,
            "response": response.data["choices"][0]["message"]
        }
        await this.cacheService.set(cacheKey, resultToCache, 0);
        return resultToCache;
    }
}
