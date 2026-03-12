import { z } from 'zod';

const AssistInnovationIdeaInputSchema = z.object({
  problem: z
    .string()
    .min(20)
    .describe('Problem statement provided by the user.'),
  challengeTitle: z
    .string()
    .optional()
    .describe('Optional challenge title selected by the user.'),
});

export type AssistInnovationIdeaInput = z.infer<typeof AssistInnovationIdeaInputSchema>;

const AssistInnovationIdeaOutputSchema = z.object({
  title: z
    .string()
    .min(10)
    .describe('A concise and clear title for the idea.'),
  proposal: z
    .string()
    .min(20)
    .describe('Suggested solution hypothesis for the idea.'),
  impact: z
    .string()
    .min(10)
    .describe('Expected qualitative and/or quantitative impact.'),
  effort: z
    .string()
    .min(5)
    .describe('Estimated effort in team/time format.'),
});

export type AssistInnovationIdeaOutput = z.infer<typeof AssistInnovationIdeaOutputSchema>;

export async function assistInnovationIdea(
  input: AssistInnovationIdeaInput
): Promise<AssistInnovationIdeaOutput> {
  const parsedInput = AssistInnovationIdeaInputSchema.parse(input);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }

  const model =
    process.env.OPENAI_MODEL_IDEA_ASSISTANT ?? process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

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
            'You are an AI assistant for innovation idea submission forms.',
            'Respond in Portuguese (Brazil).',
            'Return ONLY valid JSON (no markdown, no code fences).',
            'JSON schema:',
            '{',
            '  "title": string (at least 10 chars),',
            '  "proposal": string (at least 20 chars),',
            '  "impact": string (at least 10 chars),',
            '  "effort": string (at least 5 chars, e.g. "2 pessoas, 3 semanas")',
            '}',
            'Be specific, practical, and realistic for corporate contexts.',
          ].join('\n'),
        },
        {
          role: 'user',
          content: [
            parsedInput.challengeTitle ? `Desafio vinculado: ${parsedInput.challengeTitle}` : '',
            'Problema identificado:',
            parsedInput.problem,
            '',
            'Gere o título, proposta, impacto e esforço estimado em JSON.',
          ]
            .filter(Boolean)
            .join('\n'),
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
  return AssistInnovationIdeaOutputSchema.parse(JSON.parse(jsonPayload));
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
