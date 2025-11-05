'use server';

/**
 * @fileOverview This file defines a Genkit flow for evaluating the strategic alignment of project ideas with company objectives.
 *
 * It includes:
 * - `evaluateStrategicAlignment`: The main function to assess strategic alignment.
 * - `EvaluateStrategicAlignmentInput`: The input type for the function.
 * - `EvaluateStrategicAlignmentOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateStrategicAlignmentInputSchema = z.object({
  projectIdea: z.string().describe('A detailed description of the project idea.'),
  companyObjectives: z
    .string()
    .describe('A clear articulation of the company strategic objectives.'),
});

export type EvaluateStrategicAlignmentInput = z.infer<
  typeof EvaluateStrategicAlignmentInputSchema
>;

const EvaluateStrategicAlignmentOutputSchema = z.object({
  alignmentScore: z
    .number()
    .describe(
      'A numerical score (0-100) representing the degree of alignment with company objectives.'
    ),
  alignmentRationale: z
    .string()
    .describe(
      'A detailed explanation of the alignment score, highlighting specific connections between the project idea and company objectives.'
    ),
  prioritizationRecommendation: z
    .string()
    .describe(
      'A recommendation on whether to prioritize the project, based on the alignment score and rationale.'
    ),
});

export type EvaluateStrategicAlignmentOutput = z.infer<
  typeof EvaluateStrategicAlignmentOutputSchema
>;

export async function evaluateStrategicAlignment(
  input: EvaluateStrategicAlignmentInput
): Promise<EvaluateStrategicAlignmentOutput> {
  return evaluateStrategicAlignmentFlow(input);
}

const evaluateStrategicAlignmentPrompt = ai.definePrompt({
  name: 'evaluateStrategicAlignmentPrompt',
  input: {schema: EvaluateStrategicAlignmentInputSchema},
  output: {schema: EvaluateStrategicAlignmentOutputSchema},
  prompt: `You are an AI assistant specialized in evaluating the strategic alignment of project ideas with company objectives.

  Assess the following project idea:
  {{projectIdea}}

  Against these company objectives:
  {{companyObjectives}}

  Provide an alignment score (0-100), a detailed rationale for the score, and a prioritization recommendation.
  Be as detailed as possible in your alignment rationale.
`,
});

const evaluateStrategicAlignmentFlow = ai.defineFlow(
  {
    name: 'evaluateStrategicAlignmentFlow',
    inputSchema: EvaluateStrategicAlignmentInputSchema,
    outputSchema: EvaluateStrategicAlignmentOutputSchema,
  },
  async input => {
    const {output} = await evaluateStrategicAlignmentPrompt(input);
    return output!;
  }
);

