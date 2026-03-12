/**
 * @fileOverview A flow to generate a draft A3 report summarizing digital diary entries and feedback.
 *
 * - generateA3Report - A function that generates the A3 report.
 * - GenerateA3ReportInput - The input type for the generateA3Report function.
 * - GenerateA3ReportOutput - The return type for the generateA3Report function.
 */

import { z } from 'zod';

const GenerateA3ReportInputSchema = z.object({
  diaryEntries: z.string().describe('The digital diary entries of the participant.'),
  feedback: z.string().describe('The feedback received by the participant.'),
  language: z.string().describe('The language for the response (e.g., "en" or "pt").'),
});
export type GenerateA3ReportInput = z.infer<typeof GenerateA3ReportInputSchema>;

const GenerateA3ReportOutputSchema = z.object({
  report: z.string().describe('The generated A3 report.'),
  progress: z.string().describe('Summary of A3 report generation progress.'),
});
export type GenerateA3ReportOutput = z.infer<typeof GenerateA3ReportOutputSchema>;

export async function generateA3Report(input: GenerateA3ReportInput): Promise<GenerateA3ReportOutput> {
  const parsedInput = GenerateA3ReportInputSchema.parse(input);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that helps participants generate A3 reports based on their diary entries and feedback. Return your response as a JSON object with "report" and "progress" fields.`,
        },
        {
          role: 'user',
          content: `Please summarize the following diary entries and feedback into a concise A3 report and provide a summary of progress.\n\nRespond in the following language: ${parsedInput.language}.\n\nDiary Entries: ${parsedInput.diaryEntries}\n\nFeedback: ${parsedInput.feedback}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    }),
    cache: 'no-store' as RequestCache,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const result = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };

  const content = result.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error('OpenAI returned an empty response.');
  }

  const parsed = JSON.parse(content);
  const output = GenerateA3ReportOutputSchema.parse(parsed);
  output.progress = output.progress || 'Draft A3 report generated from diary entries and feedback.';
  return output;
}
