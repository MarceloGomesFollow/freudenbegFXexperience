/**
 * @fileOverview A flow to generate a draft A3 report summarizing digital diary entries and feedback.
 *
 * - generateA3Report - A function that generates the A3 report.
 * - GenerateA3ReportInput - The input type for the generateA3Report function.
 * - GenerateA3ReportOutput - The return type for the generateA3Report function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateA3ReportInputSchema = z.object({
  diaryEntries: z.string().describe('The digital diary entries of the participant.'),
  feedback: z.string().describe('The feedback received by the participant.'),
});
export type GenerateA3ReportInput = z.infer<typeof GenerateA3ReportInputSchema>;

const GenerateA3ReportOutputSchema = z.object({
  report: z.string().describe('The generated A3 report.'),
  progress: z.string().describe('Summary of A3 report generation progress.')
});
export type GenerateA3ReportOutput = z.infer<typeof GenerateA3ReportOutputSchema>;

export async function generateA3Report(input: GenerateA3ReportInput): Promise<GenerateA3ReportOutput> {
  return generateA3ReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateA3ReportPrompt',
  input: {schema: GenerateA3ReportInputSchema},
  output: {schema: GenerateA3ReportOutputSchema},
  prompt: `You are an AI assistant that helps participants generate A3 reports based on their diary entries and feedback.

  Please summarize the following diary entries and feedback into a concise A3 report and provide a summary of progress.

  Diary Entries: {{{diaryEntries}}}

  Feedback: {{{feedback}}}
  `,
});

const generateA3ReportFlow = ai.defineFlow(
  {
    name: 'generateA3ReportFlow',
    inputSchema: GenerateA3ReportInputSchema,
    outputSchema: GenerateA3ReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // added a summary of progress
    output!.progress = 'Draft A3 report generated from diary entries and feedback.';
    return output!;
  }
);
