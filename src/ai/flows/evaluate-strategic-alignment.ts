'use server';

/**
 * @fileOverview This file defines a server-side flow for evaluating strategic alignment with OpenAI.
 *
 * It includes:
 * - `evaluateStrategicAlignment`: The main function to assess strategic alignment.
 * - `EvaluateStrategicAlignmentInput`: The input type for the function.
 * - `EvaluateStrategicAlignmentOutput`: The output type for the function.
 */

import { z } from 'zod';

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
  const parsedInput = EvaluateStrategicAlignmentInputSchema.parse(input);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }

  const model =
    process.env.OPENAI_MODEL_BUSINESS_FIT ??
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
      temperature: 0.3,
      max_tokens: 700,
      messages: [
        {
          role: 'system',
          content: [
            'You evaluate strategic alignment between projects and company objectives.',
            'Return ONLY valid JSON (no markdown, no code fences).',
            'JSON schema:',
            '{',
            '  "alignmentScore": number between 0 and 100,',
            '  "alignmentRationale": string,',
            '  "prioritizationRecommendation": string',
            '}',
            'If input is weak, still provide best-effort score and recommendations.',
          ].join('\n'),
        },
        {
          role: 'user',
          content: [
            'Project idea:',
            parsedInput.projectIdea,
            '',
            'Company objectives:',
            parsedInput.companyObjectives,
            '',
            'Evaluate alignment and return the JSON.',
          ].join('\n'),
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
  const parsedOutput = EvaluateStrategicAlignmentOutputSchema.parse(
    JSON.parse(jsonPayload)
  );

  return {
    ...parsedOutput,
    alignmentScore: Math.max(0, Math.min(100, Math.round(parsedOutput.alignmentScore))),
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

