/**
 * @fileOverview An AI mentor that analyzes learning data and suggests connections between similar areas and topics.
 *
 * - aiMentorForSharedPractices - A function that suggests connections based on learning data.
 * - AiMentorForSharedPracticesInput - The input type for the aiMentorForSharedPractices function.
 * - AiMentorForSharedPracticesOutput - The return type for the aiMentorForSharedPractices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiMentorForSharedPracticesInputSchema = z.object({
  learningData: z.string().describe('The learning data of the participant.'),
});
export type AiMentorForSharedPracticesInput = z.infer<typeof AiMentorForSharedPracticesInputSchema>;

const AiMentorForSharedPracticesOutputSchema = z.object({
  suggestions: z.string().describe('Suggestions for connections between similar areas and topics.'),
});
export type AiMentorForSharedPracticesOutput = z.infer<typeof AiMentorForSharedPracticesOutputSchema>;

export async function aiMentorForSharedPractices(input: AiMentorForSharedPracticesInput): Promise<AiMentorForSharedPracticesOutput> {
  return aiMentorForSharedPracticesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMentorForSharedPracticesPrompt',
  input: {schema: AiMentorForSharedPracticesInputSchema},
  output: {schema: AiMentorForSharedPracticesOutputSchema},
  prompt: `You are an AI mentor that analyzes learning data and suggests connections between similar areas and topics, promoting the sharing of best practices across the organization.

  Analyze the following learning data and suggest connections between similar areas and topics:

  Learning Data: {{{learningData}}}
  `,
});

const aiMentorForSharedPracticesFlow = ai.defineFlow(
  {
    name: 'aiMentorForSharedPracticesFlow',
    inputSchema: AiMentorForSharedPracticesInputSchema,
    outputSchema: AiMentorForSharedPracticesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
