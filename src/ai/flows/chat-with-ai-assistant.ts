'use server';
/**
 * @fileOverview A Genkit flow for interacting with an external AI chatbot API.
 *
 * - chatWithAIAssistant - A function that sends user queries to an AI assistant and retrieves its response.
 * - ChatWithAIAssistantInput - The input type for the chatWithAIAssistant function.
 * - ChatWithAIAssistantOutput - The return type for the chatWithAIAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithAIAssistantInputSchema = z.object({
  text: z.string().describe("The user's message to the AI assistant."),
  language: z
    .enum(['English', 'Indonesian'])
    .describe('The language for the AI assistant (English or Indonesian).'),
  history: z
    .array(z.array(z.string()))
    .describe('Conversation history, an array of [question, answer] pairs.'),
});
export type ChatWithAIAssistantInput = z.infer<
  typeof ChatWithAIAssistantInputSchema
>;

const ChatWithAIAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\s response.'),
});
export type ChatWithAIAssistantOutput = z.infer<
  typeof ChatWithAIAssistantOutputSchema
>;

export async function chatWithAIAssistant(
  input: ChatWithAIAssistantInput
): Promise<ChatWithAIAssistantOutput> {
  return chatWithAIAssistantFlow(input);
}

const chatWithAIAssistantFlow = ai.defineFlow(
  {
    name: 'chatWithAIAssistantFlow',
    inputSchema: ChatWithAIAssistantInputSchema,
    outputSchema: ChatWithAIAssistantOutputSchema,
  },
  async ({text, language, history}) => {
    const apiUrl = 'https://silvio0-silvio-portfolio-api.hf.space/assistant';

    try {
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          language: language,
          history: history,
        }),
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(
          `API request failed with status ${apiResponse.status}: ${errorText}`
        );
      }

      const data = await apiResponse.json();

      // Assuming the external API returns the response in a field named 'response'
      if (!data || typeof data.response !== 'string') {
        throw new Error('Invalid response format from external AI API.');
      }

      return {response: data.response};
    } catch (error: any) {
      console.error('Error in chatWithAIAssistantFlow:', error);
      throw new Error(
        `Failed to communicate with AI assistant: ${error.message}`
      );
    }
  }
);
