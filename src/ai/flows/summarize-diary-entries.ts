/**
 * @fileOverview A server-side flow to summarize diary entries using OpenAI.
 *
 * - summarizeDiaryEntries - A function that summarizes diary entries and extracts key insights.
 * - SummarizeDiaryEntriesInput - The input type for the summarizeDiaryEntries function.
 * - SummarizeDiaryEntriesOutput - The return type for the summarizeDiaryEntries function.
 */

import { z } from 'zod';

const SummarizeDiaryEntriesInputSchema = z.object({
  diaryEntries: z.string().describe('The digital diary entries of the participant.'),
  language: z.string().describe('The language for the response (e.g., "en" or "pt").'),
});

export type SummarizeDiaryEntriesInput = z.infer<typeof SummarizeDiaryEntriesInputSchema>;

const SummarizeDiaryEntriesOutputSchema = z.object({
  summary: z.string().describe('A summary of the diary entries.'),
  insights: z.array(z.string()).describe('Key insights extracted from the diary entries.'),
  sentiment: z.string().describe('The overall sentiment expressed in the diary entries.'),
});

export type SummarizeDiaryEntriesOutput = z.infer<typeof SummarizeDiaryEntriesOutputSchema>;

export async function summarizeDiaryEntries(
  input: SummarizeDiaryEntriesInput
): Promise<SummarizeDiaryEntriesOutput> {
  const parsedInput = SummarizeDiaryEntriesInputSchema.parse(input);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }

  const model =
    process.env.OPENAI_MODEL_DIARY_SUMMARY ??
    process.env.OPENAI_MODEL ??
    'gpt-4o-mini';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        {
          role: 'system',
          content: [
            'You summarize participant diary entries and extract actionable insights.',
            `Reply in language code: ${parsedInput.language}.`,
            'Return ONLY valid JSON (no markdown, no code fences).',
            'JSON schema:',
            '{',
            '  "summary": string,',
            '  "insights": string[],',
            '  "sentiment": string',
            '}',
            'For "insights", provide 3 to 6 concise bullet-like points.',
          ].join('\n'),
        },
        {
          role: 'user',
          content: `Diary entries:\n${parsedInput.diaryEntries}`,
        },
      ],
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

  const rawContent = result.choices?.[0]?.message?.content?.trim();
  if (!rawContent) {
    throw new Error('OpenAI returned an empty response.');
  }

  const jsonPayload = extractJsonObject(rawContent);
  const parsedOutput = SummarizeDiaryEntriesOutputSchema.parse(JSON.parse(jsonPayload));

  return {
    ...parsedOutput,
    insights: parsedOutput.insights.slice(0, 6),
  };
}

function extractJsonObject(rawText: string): string {
  const sanitized = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  const start = sanitized.indexOf('{');
  const end = sanitized.lastIndexOf('}');

  if (start === -1 || end === -1 || end < start) {
    throw new Error('Unable to parse JSON output from OpenAI response.');
  }

  return sanitized.slice(start, end + 1);
}
