# PROMPT — Upgrade Freudy Chatbot with Full Platform Knowledge

> **Goal:** Transform Freudy from a basic 3-line system prompt into an expert AI concierge that knows every module, feature, and navigation path of FX Experience. The knowledge base file already exists — you just need to wire it into the chatbot flow.

---

## TASK 1: Update `src/ai/flows/chatbot-flow.ts`

A new file `src/ai/freudy-knowledge-base.ts` already exists with the complete system prompt, temperature, and max_tokens constants. Import and use them.

Replace the ENTIRE content of `src/ai/flows/chatbot-flow.ts` with:

```typescript
/**
 * @fileOverview A server-side chatbot flow for Freudy powered by OpenAI.
 *
 * - chatWithFreudy - A function that handles the chat interaction.
 * - ChatWithFreudyInput - The input type for the chatWithFreudy function.
 * - ChatWithFreudyOutput - The return type for the chatWithFreudy function.
 */

import { z } from 'zod';
import * as data from '@/lib/data';
import { FREUDY_SYSTEM_PROMPT, FREUDY_MAX_TOKENS, FREUDY_TEMPERATURE } from '@/ai/freudy-knowledge-base';

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
      content: FREUDY_SYSTEM_PROMPT + '\n\n═══ LIVE PLATFORM DATA ═══\n\n' + platformContext,
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
      temperature: FREUDY_TEMPERATURE,
      max_tokens: FREUDY_MAX_TOKENS,
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
```

Key changes from the old version:
1. Imports `FREUDY_SYSTEM_PROMPT`, `FREUDY_MAX_TOKENS`, `FREUDY_TEMPERATURE` from the knowledge base file
2. System prompt is now the full knowledge base (personality + all 16 modules + AI capabilities + navigation + proactive suggestions) instead of 3 generic lines
3. Live platform data is appended AFTER the knowledge base with a clear separator
4. max_tokens increased from 500 to 700 (longer responses for detailed guidance)
5. temperature lowered from 0.4 to 0.35 (more precise, less hallucination)

## TASK 2: Verify the knowledge base file exists

Check that `src/ai/freudy-knowledge-base.ts` exists and exports:
- `FREUDY_SYSTEM_PROMPT` (string)
- `FREUDY_MAX_TOKENS` (number = 700)
- `FREUDY_TEMPERATURE` (number = 0.35)

If it does NOT exist, something went wrong — do NOT proceed.

## TASK 3: Update suggested actions in chatbot.tsx

In `src/components/chatbot.tsx`, find the `suggestedActions` array and replace it with more useful suggestions that leverage Freudy's new knowledge:

```typescript
const suggestedActions = [
  { icon: Sparkles, text: language === 'pt' ? 'O que posso fazer na plataforma?' : language === 'de' ? 'Was kann ich auf der Plattform tun?' : 'What can I do on the platform?' },
  { icon: Calendar, text: language === 'pt' ? 'Como funciona o intercâmbio?' : language === 'de' ? 'Wie funktioniert der Austausch?' : 'How does the exchange work?' },
  { icon: MessageSquarePlus, text: language === 'pt' ? 'Me ajude a submeter uma ideia' : language === 'de' ? 'Hilf mir, eine Idee einzureichen' : 'Help me submit an idea' },
];
```

Also add `Sparkles` to the import from lucide-react if not already there.

## TASK 4: Run verification

Run `npm run dev` and verify:
1. No TypeScript errors from the import
2. The chatbot opens and responds
3. Ask Freudy: "What modules does this platform have?" — it should list all modules
4. Ask in Portuguese: "Como submeto uma ideia?" — it should give specific Innovation Labs guidance with path

Do NOT modify any other files. Do NOT change business logic, routing, or UI styling.
