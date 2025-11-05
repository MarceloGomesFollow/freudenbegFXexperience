'use server';
/**
 * @fileOverview A chatbot flow that answers questions about the platform using mock data as context.
 *
 * - chatWithFreudy - A function that handles the chat interaction.
 * - ChatWithFreudyInput - The input type for the chatWithFreudy function.
 * - ChatWithFreudyOutput - The return type for the chatWithFreudy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as data from '@/lib/data';

const ChatWithFreudyInputSchema = z.object({
  question: z.string().describe("The user's question for the chatbot."),
  chatHistory: z.array(z.object({
    from: z.enum(['user', 'ai']),
    text: z.string(),
  })).describe('The history of the conversation.'),
});
export type ChatWithFreudyInput = z.infer<typeof ChatWithFreudyInputSchema>;

const ChatWithFreudyOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the user's question."),
});
export type ChatWithFreudyOutput = z.infer<typeof ChatWithFreudyOutputSchema>;

export async function chatWithFreudy(input: ChatWithFreudyInput): Promise<ChatWithFreudyOutput> {
  return chatWithFreudyFlow(input);
}

const mockDataString = `
  Users: ${JSON.stringify(data.users, null, 2)}
  Diary Entries: ${JSON.stringify(data.diaryEntries, null, 2)}
  KPIs: ${JSON.stringify(data.kpis, null, 2)}
  Recent Tasks: ${JSON.stringify(data.recentTasks, null, 2)}
  Exchange Opportunities: ${JSON.stringify(data.exchangeOpportunities, null, 2)}
  Transfers: ${JSON.stringify(data.transfers, null, 2)}
  Candidate Approvals: ${JSON.stringify(data.candidateApprovals, null, 2)}
`;

const prompt = ai.definePrompt({
  name: 'chatWithFreudyPrompt',
  input: {schema: ChatWithFreudyInputSchema},
  output: {schema: ChatWithFreudyOutputSchema},
  prompt: `You are Freudy, an AI assistant for the DPX Digital platform. Your goal is to help users by answering their questions based on the provided context data. Be friendly and concise.

  Here is the entire dataset for the platform:
  ${mockDataString}

  Here is the conversation history:
  {{#each chatHistory}}
  {{from}}: {{text}}
  {{/each}}

  Based on all this information, answer the user's latest question.

  User question: {{{question}}}
  `,
});

const chatWithFreudyFlow = ai.defineFlow(
  {
    name: 'chatWithFreudyFlow',
    inputSchema: ChatWithFreudyInputSchema,
    outputSchema: ChatWithFreudyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
