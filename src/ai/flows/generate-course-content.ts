'use server';

/**
 * @fileOverview An AI agent that generates course content based on participant knowledge and best practices.
 *
 * - generateCourseContent - A function that handles the course content generation process.
 * - GenerateCourseContentInput - The input type for the generateCourseContent function.
 * - GenerateCourseContentOutput - The return type for the generateCourseContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseContentInputSchema = z.object({
  participantKnowledge: z
    .string()
    .describe('The knowledge and insights shared by the participants.'),
  bestPractices: z
    .string()
    .describe('The best practices identified by the participants.'),
  topic: z.string().describe('The topic of the course content.'),
  language: z.string().describe('The language for the response (e.g., "en" or "pt").'),
});

export type GenerateCourseContentInput = z.infer<typeof GenerateCourseContentInputSchema>;

const GenerateCourseContentOutputSchema = z.object({
  courseContent: z.string().describe('The generated course content.'),
  microLessons: z.array(z.string()).describe('The generated micro-lessons.'),
  videoIdeas: z.array(z.string()).describe('Ideas for videos to include in the course.'),
});

export type GenerateCourseContentOutput = z.infer<typeof GenerateCourseContentOutputSchema>;

export async function generateCourseContent(
  input: GenerateCourseContentInput
): Promise<GenerateCourseContentOutput> {
  return generateCourseContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseContentPrompt',
  input: {schema: GenerateCourseContentInputSchema},
  output: {schema: GenerateCourseContentOutputSchema},
  prompt: `You are an expert instructional designer. Your goal is to generate engaging and relevant course content based on the knowledge and best practices shared by participants.

  Respond in the following language: {{{language}}}.

  Topic: {{{topic}}}
  Participant Knowledge: {{{participantKnowledge}}}
  Best Practices: {{{bestPractices}}}

  Generate course content, micro-lessons and video ideas based on the provided information. Focus on actionable insights and practical application.

  Output the result as JSON in the following format:
  {
    "courseContent": "...",
    "microLessons": ["...", "..."],
    "videoIdeas": ["...", "..."]
  }`,
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
