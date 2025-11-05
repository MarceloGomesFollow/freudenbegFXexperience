'use server';

/**
 * @fileOverview A flow to summarize diary entries and extract key insights with sentiment analysis.
 *
 * - summarizeDiaryEntries - A function that summarizes diary entries and extracts key insights.
 * - SummarizeDiaryEntriesInput - The input type for the summarizeDiaryEntries function.
 * - SummarizeDiaryEntriesOutput - The return type for the summarizeDiaryEntries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDiaryEntriesInputSchema = z.object({
  diaryEntries: z.string().describe('The digital diary entries of the participant.'),
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
  return summarizeDiaryEntriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDiaryEntriesPrompt',
  input: {schema: SummarizeDiaryEntriesInputSchema},
  output: {schema: SummarizeDiaryEntriesOutputSchema},
  prompt: `You are an AI assistant that helps participants summarize their diary entries and extract key insights with sentiment analysis.

  Please summarize the following diary entries, extract key insights, and determine the overall sentiment.

  Diary Entries: {{{diaryEntries}}}
  `,
});

const summarizeDiaryEntriesFlow = ai.defineFlow(
  {
    name: 'summarizeDiaryEntriesFlow',
    inputSchema: SummarizeDiaryEntriesInputSchema,
    outputSchema: SummarizeDiaryEntriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
