import ollama from "ollama";
import { environment } from "../config/enviroment.js";

export class OllamaService {
  static async chat(prompt: string) {
    return await ollama.chat({
      model: environment.ollamaModel,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
  }
}
