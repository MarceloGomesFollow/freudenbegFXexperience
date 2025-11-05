'use server';

/**
 * @fileOverview Provides personalized guidance and recommendations on a learning path based on the participant's progress, sentiment, and identified themes.
 *
 * - aiCoachForLearningPaths - A function that provides personalized learning path guidance.
 * - AiCoachForLearningPathsInput - The input type for the aiCoachForLearningPaths function.
 * - AiCoachForLearningPathsOutput - The return type for the aiCoachForLearningPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCoachForLearningPathsInputSchema = z.object({
  progress: z
    .string()
    .describe('The participant learning progress.'),
  sentiment: z.string().describe('The sentiment expressed by the participant.'),
  identifiedThemes: z.string().describe('The themes identified from the participant activities.'),
  learningPath: z.string().describe('The current learning path of the participant.'),
});

export type AiCoachForLearningPathsInput = z.infer<typeof AiCoachForLearningPathsInputSchema>;

const AiCoachForLearningPathsOutputSchema = z.object({
  guidance: z.string().describe('Personalized guidance and recommendations for the learning path.'),
});

export type AiCoachForLearningPathsOutput = z.infer<typeof AiCoachForLearningPathsOutputSchema>;

export async function aiCoachForLearningPaths(
  input: AiCoachForLearningPathsInput
): Promise<AiCoachForLearningPathsOutput> {
  return aiCoachForLearningPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCoachForLearningPathsPrompt',
  input: {schema: AiCoachForLearningPathsInputSchema},
  output: {schema: AiCoachForLearningPathsOutputSchema},
  prompt: `You are an AI coach providing personalized guidance on a learning path.

  Based on the participant's progress: {{{progress}}},
  sentiment: {{{sentiment}}},
  identified themes: {{{identifiedThemes}}},
  and current learning path: {{{learningPath}}},

  provide specific and actionable guidance and recommendations to maximize their learning outcomes.
  The response should be concise and easy to understand.
  Focus on suggesting relevant resources, activities, or adjustments to the learning path.
  Ensure that the recommendations align with the participant's needs and goals.
  Return the guidance in the 'guidance' field.
  `,
});

const aiCoachForLearningPathsFlow = ai.defineFlow(
  {
    name: 'aiCoachForLearningPathsFlow',
    inputSchema: AiCoachForLearningPathsInputSchema,
    outputSchema: AiCoachForLearningPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
