/**
 * @fileOverview An AI mentor that analyzes learning data and suggests connections between similar areas and topics.
 *
 * - aiMentorForSharedPractices - A function that suggests connections based on learning data.
 * - AiMentorForSharedPracticesInput - The input type for the aiMentorForSharedPractices function.
 * - AiMentorForSharedPracticesOutput - The return type for the aiMentorForSharedPractices function.
 */

import { z } from 'zod';

const AiMentorForSharedPracticesInputSchema = z.object({
  learningData: z.string().describe('The learning data of the participant.'),
});
export type AiMentorForSharedPracticesInput = z.infer<typeof AiMentorForSharedPracticesInputSchema>;

const AiMentorForSharedPracticesOutputSchema = z.object({
  suggestions: z.string().describe('Suggestions for connections between similar areas and topics.'),
});
export type AiMentorForSharedPracticesOutput = z.infer<typeof AiMentorForSharedPracticesOutputSchema>;

export async function aiMentorForSharedPractices(input: AiMentorForSharedPracticesInput): Promise<AiMentorForSharedPracticesOutput> {
  const parsedInput = AiMentorForSharedPracticesInputSchema.parse(input);
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
          content: `You are an AI mentor that analyzes learning data and suggests connections between similar areas and topics, promoting the sharing of best practices across the organization. Return your response as a JSON object with a "suggestions" field containing your analysis.`,
        },
        {
          role: 'user',
          content: `Analyze the following learning data and suggest connections between similar areas and topics:\n\nLearning Data: ${parsedInput.learningData}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 1000,
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
  return AiMentorForSharedPracticesOutputSchema.parse(parsed);
}
