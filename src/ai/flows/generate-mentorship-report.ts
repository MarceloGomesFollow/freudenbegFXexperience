'use server';
/**
 * @fileOverview A flow to generate a comprehensive mentorship feedback report.
 *
 * - generateMentorshipReport - A function that generates the feedback report.
 * - GenerateMentorshipReportInput - The input type for the generateMentorshipReport function.
 * - GenerateMentorshipReportOutput - The return type for the generateMentorshipReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMentorshipReportInputSchema = z.object({
  menteeName: z.string().describe('The name of the participant being evaluated.'),
  mentorName: z.string().describe('The name of the mentor providing the feedback.'),
  projectPeriod: z.string().describe('The start and end date of the project period (e.g., "De ___/___/___ a ___/___/___").'),
  feedbackDate: z.string().describe('The date the feedback is being given (e.g., "___/___
