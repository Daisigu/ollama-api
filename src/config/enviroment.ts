import dotenv from 'dotenv';

dotenv.config();

export const environment = {
    port: Number(process.env.PORT) || 3001,
    apiToken: process.env.API_TOKEN,
    ollamaModel: process.env.OLLAMA_MODEL || 'llama3.2-vision:11b'
};