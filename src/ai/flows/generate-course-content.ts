
'use server';

/**
 * @fileOverview An AI agent that generates course content based on participant knowledge and best practices.
 *
 * - generateCourseContent - A function that handles the course content generation process.
 * - GenerateCourseContentInput - The input type for the generateCourseContent function.
 * - GenerateCourseContentOutput - The return type for the generateCoursecontent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseContentInputSchema = z.object({
  topic: z.string().describe('The topic of the course content.'),
  documentContent: z
    .string()
    .optional()
    .describe('The content of the document provided by the user (optional).'),
  numberOfModules: z
    .number()
    .optional()
    .describe('The desired number of modules for the course (optional).'),
  language: z
    .string()
    .describe('The language for the response (e.g., "en" or "pt").'),
});

export type GenerateCourseContentInput = z.infer<
  typeof GenerateCourseContentInputSchema
>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).describe('A list of possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options.'),
  explanation: z
    .string()
    .describe('A brief explanation for the correct answer.'),
});

const CourseModuleSchema = z.object({
  title: z.string().describe('The title of the module.'),
  content: z.string().describe('The detailed content of the module.'),
  videoLink: z.string().optional().describe('An optional link for a video.'),
  pdfLink: z.string().optional().describe('An optional link for a PDF file.'),
});

const GenerateCourseContentOutputSchema = z.object({
  courseTitle: z.string().describe('The main title of the course.'),
  modules: z
    .array(CourseModuleSchema)
    .describe('An array of course modules.'),
  quiz: z.array(QuizQuestionSchema).describe('An array of quiz questions.'),
  videoIdeas: z
    .array(z.string())
    .describe('Ideas for videos to include in the course.'),
  conclusion: z.string().describe('A concluding message for the course.'),
});

export type GenerateCourseContentOutput = z.infer<
  typeof GenerateCourseContentOutputSchema
>;
export type CourseQuizQuestion = z.infer<typeof QuizQuestionSchema>;

export async function generateCourseContent(
  input: GenerateCourseContentInput
): Promise<GenerateCourseContentOutput> {
  return generateCourseContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseContentPrompt',
  input: {schema: GenerateCourseContentInputSchema},
  output: {schema: GenerateCourseContentOutputSchema},
  prompt: `You are an expert instructional designer. Your goal is to transform the provided information into a well-structured and engaging online course.

  Respond in the following language: {{{language}}}.

  The main topic of the course is: {{{topic}}}

  {{#if documentContent}}
  The source content from the document is:
  ---
  {{{documentContent}}}
  ---
  {{/if}}

  Based on the provided information, please generate the following:
  1.  A main 'courseTitle' for the entire course.
  2.  A series of 'modules'. 
      {{#if numberOfModules}}
      Generate exactly {{{numberOfModules}}} modules.
      {{else}}
      Generate a relevant number of modules based on the topic.
      {{/if}}
      Each module should have a 'title' and detailed 'content'. If relevant, suggest placeholders for a 'videoLink' or 'pdfLink'.
  3.  A friendly 'quiz' with a few multiple-choice questions to test understanding. Each question must have 'options', a 'correctAnswer', and a brief 'explanation'.
  4.  A list of creative 'videoIdeas' that could complement the course material.
  5.  A warm and encouraging 'conclusion' message to finalize the course.

  Structure your entire output as a single JSON object matching the defined schema.
  `,
});

const generateCourseContentFlow = ai.defineFlow(
  {
    name: 'generateCourseContentFlow',
    inputSchema: GenerateCourseContentInputSchema,
    outputSchema: GenerateCourseContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    