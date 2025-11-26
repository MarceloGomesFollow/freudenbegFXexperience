'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/ai-coach-for-learning-paths.ts';
import '@/ai/flows/ai-mentor-for-shared-practices.ts';
import '@/ai/flows/evaluate-strategic-alignment.ts';
import '@/ai/flows/generate-a3-report.ts';
import '@/ai/flows/generate-course-content.ts';
import '@/ai/flows/recommend-learning-playlists.ts';
import '@/ai/flows/summarize-diary-entries.ts';
import '@/ai/flows/chatbot-flow.ts';
import '@/ai/flows/generate-mentorship-report.ts';
