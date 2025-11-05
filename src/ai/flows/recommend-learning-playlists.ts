'use server';

/**
 * @fileOverview A learning playlist recommendation AI agent.
 *
 * - recommendLearningPlaylists - A function that recommends learning playlists based on user context.
 * - RecommendLearningPlaylistsInput - The input type for the recommendLearningPlaylists function.
 * - RecommendLearningPlaylistsOutput - The return type for the recommendLearningPlaylists function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendLearningPlaylistsInputSchema = z.object({
  currentProjects: z
    .string()
    .describe('A description of the user\'s current projects.'),
  learningHistory: z
    .string()
    .describe('A description of the user\'s learning history.'),
});
export type RecommendLearningPlaylistsInput = z.infer<
  typeof RecommendLearningPlaylistsInputSchema
>;

const RecommendLearningPlaylistsOutputSchema = z.object({
  playlists: z
    .array(z.string())
    .describe('A list of recommended learning playlists.'),
});
export type RecommendLearningPlaylistsOutput = z.infer<
  typeof RecommendLearningPlaylistsOutputSchema
>;

export async function recommendLearningPlaylists(
  input: RecommendLearningPlaylistsInput
): Promise<RecommendLearningPlaylistsOutput> {
  return recommendLearningPlaylistsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendLearningPlaylistsPrompt',
  input: {schema: RecommendLearningPlaylistsInputSchema},
  output: {schema: RecommendLearningPlaylistsOutputSchema},
  prompt: `You are a learning curator. You will recommend relevant learning playlists based on the user's current projects and learning history.

Current Projects: {{{currentProjects}}}
Learning History: {{{learningHistory}}}

Recommend learning playlists:`,
});

const recommendLearningPlaylistsFlow = ai.defineFlow(
  {
    name: 'recommendLearningPlaylistsFlow',
    inputSchema: RecommendLearningPlaylistsInputSchema,
    outputSchema: RecommendLearningPlaylistsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
