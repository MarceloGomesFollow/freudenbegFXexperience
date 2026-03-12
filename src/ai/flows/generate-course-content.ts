
/**
 * @fileOverview Generates course content using OpenAI.
 *
 * - generateCourseContent - Generates structured course content.
 * - GenerateCourseContentInput - Input type.
 * - GenerateCourseContentOutput - Output type.
 */

import { z } from 'zod';

const GenerateCourseContentInputSchema = z.object({
  topic: z.string().min(1),
  knowledgeSource: z.string().optional(),
  details: z.string().optional(),
  documentContent: z.string().optional(),
  numberOfModules: z.number().int().min(1).max(10).optional(),
  language: z.string().min(2),
});

export type GenerateCourseContentInput = z.infer<
  typeof GenerateCourseContentInputSchema
>;

const QuizQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(1),
});

const CourseModuleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  videoLink: z.preprocess(value => (value == null ? undefined : value), z.string().optional()),
  pdfLink: z.preprocess(value => (value == null ? undefined : value), z.string().optional()),
});

const GenerateCourseContentOutputSchema = z.object({
  courseTitle: z.string().min(1),
  modules: z.array(CourseModuleSchema).min(1),
  quiz: z.array(QuizQuestionSchema).min(1),
  videoIdeas: z.array(z.string().min(1)).min(1),
  conclusion: z.string().min(1),
});

export type GenerateCourseContentOutput = z.infer<
  typeof GenerateCourseContentOutputSchema
>;
export type CourseQuizQuestion = z.infer<typeof QuizQuestionSchema>;

export async function generateCourseContent(
  input: GenerateCourseContentInput
): Promise<GenerateCourseContentOutput> {
  const parsedInput = GenerateCourseContentInputSchema.parse(input);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }

  const model =
    process.env.OPENAI_MODEL_COURSE_CONTENT ??
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
      temperature: 0.4,
      max_tokens: 2400,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            'You are an expert instructional designer.',
            'Return ONLY a valid JSON object (no markdown, no code fences).',
            'The JSON schema is:',
            '{',
            '  "courseTitle": string,',
            '  "modules": [{ "title": string, "content": string, "videoLink"?: string, "pdfLink"?: string }],',
            '  "quiz": [{ "question": string, "options": string[], "correctAnswer": string, "explanation": string }],',
            '  "videoIdeas": string[],',
            '  "conclusion": string',
            '}',
            'Ensure quiz.correctAnswer exactly matches one option.',
            'Use natural language matching the requested language code.',
          ].join('\n'),
        },
        {
          role: 'user',
          content: buildPrompt(parsedInput),
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

  const payload = extractJsonObject(rawContent);
  const parsedOutput = GenerateCourseContentOutputSchema.parse(JSON.parse(payload));

  if (parsedInput.numberOfModules && parsedOutput.modules.length !== parsedInput.numberOfModules) {
    parsedOutput.modules = parsedOutput.modules.slice(0, parsedInput.numberOfModules);
  }

  return parsedOutput;
}

function buildPrompt(input: GenerateCourseContentInput): string {
  const lines: string[] = [
    `Language code: ${input.language}`,
    `Course topic: ${input.topic}`,
  ];

  if (input.knowledgeSource) {
    lines.push(`Knowledge source: ${input.knowledgeSource}`);
  }

  if (input.details) {
    lines.push('Extra details:');
    lines.push(input.details);
  }

  if (input.documentContent) {
    lines.push('Document source content:');
    lines.push(input.documentContent);
  }

  if (input.numberOfModules) {
    lines.push(`Generate exactly ${input.numberOfModules} modules.`);
  } else {
    lines.push('Generate a relevant number of modules for this topic.');
  }

  lines.push(
    'Generate practical modules, a friendly quiz, useful video ideas, and an encouraging conclusion.'
  );

  return lines.join('\n\n');
}

function extractJsonObject(rawText: string): string {
  const sanitized = rawText
    .replace(/^```json\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  const start = sanitized.indexOf('{');
  const end = sanitized.lastIndexOf('}');

  if (start === -1 || end === -1 || end < start) {
    throw new Error('Unable to parse JSON output from OpenAI response.');
  }

  return sanitized.slice(start, end + 1);
}
