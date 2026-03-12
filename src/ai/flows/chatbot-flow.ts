/**
 * @fileOverview A server-side chatbot flow for Freudy powered by OpenAI.
 *
 * - chatWithFreudy - A function that handles the chat interaction.
 * - ChatWithFreudyInput - The input type for the chatWithFreudy function.
 * - ChatWithFreudyOutput - The return type for the chatWithFreudy function.
 */

import { z } from 'zod';
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
  const parsedInput = ChatWithFreudyInputSchema.parse(input);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
  const platformContext = buildPlatformContext();
  const history = parsedInput.chatHistory.slice(-12);

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    {
      role: 'system',
      content: [
        'You are Freudy, an AI assistant for the DPX Digital platform.',
        'Answer with practical and concise guidance.',
        'If the user asks for unknown details, be transparent and ask for clarification.',
        'Prefer Portuguese when user writes in Portuguese.',
        '',
        'Platform context data:',
        platformContext,
      ].join('\n'),
    },
    ...history.map(message => ({
      role: (message.from === 'ai' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: message.text,
    })),
  ];

  if (history.length === 0 || history[history.length - 1]?.from !== 'user') {
    messages.push({ role: 'user', content: parsedInput.question });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 500,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const result = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };

  const answer = result.choices?.[0]?.message?.content?.trim();
  if (!answer) {
    throw new Error('OpenAI returned an empty response.');
  }

  return { answer };
}

function buildPlatformContext(): string {
  const contextSnapshot = {
    users: data.users.slice(0, 30),
    diaryEntries: data.diaryEntries.slice(-20),
    kpis: data.kpis,
    recentTasks: data.recentTasks.slice(0, 20),
    exchangeOpportunities: data.exchangeOpportunities.slice(0, 10),
    transfers: data.transfers.slice(0, 10),
    candidateApprovals: data.candidateApprovals.slice(0, 10),
  };

  return JSON.stringify(contextSnapshot);
}
