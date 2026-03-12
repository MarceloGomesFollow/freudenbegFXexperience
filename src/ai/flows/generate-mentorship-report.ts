/**
 * @fileOverview A server-side flow to generate a comprehensive mentorship feedback report with OpenAI.
 *
 * - generateMentorshipReport - A function that generates the feedback report.
 * - GenerateMentorshipReportInput - The input type for the generateMentorshipReport function.
 * - GenerateMentorshipReportOutput - The return type for the generateMentorshipReport function.
 */

import { z } from 'zod';

const GenerateMentorshipReportInputSchema = z.object({
  menteeName: z.string().describe('The name of the participant being evaluated.'),
  mentorName: z.string().describe('The name of the mentor providing the feedback.'),
  projectPeriod: z
    .string()
    .describe('The start and end date of the project period (e.g., "De ___/___/___ a ___/___/___").'),
  feedbackDate: z.string().describe('The date the feedback is being given (e.g., "___/___/___").'),
  diaryEntries: z
    .string()
    .describe("A summary of the mentee's diary entries, highlighting activities and learnings."),
  meetingMinutes: z
    .string()
    .describe('A summary of the discussions and outcomes from mentorship meetings.'),
  tasksCompleted: z
    .string()
    .describe("A summary of the mentee's performance on assigned tasks and deliverables."),
});
export type GenerateMentorshipReportInput = z.infer<typeof GenerateMentorshipReportInputSchema>;

const GenerateMentorshipReportOutputSchema = z.object({
  report: z.string().describe('The fully generated feedback report content based on the provided template.'),
});
export type GenerateMentorshipReportOutput = z.infer<typeof GenerateMentorshipReportOutputSchema>;

export async function generateMentorshipReport(
  input: GenerateMentorshipReportInput
): Promise<GenerateMentorshipReportOutput> {
  const parsedInput = GenerateMentorshipReportInputSchema.parse(input);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }

  const model =
    process.env.OPENAI_MODEL_MENTORSHIP_REPORT ?? process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 1800,
      messages: [
        {
          role: 'system',
          content: [
            'You are an AI assistant specialized in professional mentorship feedback.',
            'Write in Brazilian Portuguese (pt-BR), objective and constructive tone.',
            'Do not invent facts not present in the provided inputs.',
            'Return only the final report text in markdown-friendly format.',
          ].join('\n'),
        },
        {
          role: 'user',
          content: buildMentorshipPrompt(parsedInput),
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

  const rawReport = result.choices?.[0]?.message?.content?.trim();
  if (!rawReport) {
    throw new Error('OpenAI returned an empty response.');
  }

  return { report: sanitizeReport(rawReport) };
}

function buildMentorshipPrompt(input: GenerateMentorshipReportInput): string {
  return [
    'Generate a comprehensive mentorship feedback report using the template below.',
    'Fill all sections with practical, evidence-based observations from the provided data.',
    '',
    '--- FEEDBACK REPORT TEMPLATE ---',
    '',
    '**PROGRAMA DE INTERCAMBIO PROFISSIONAL - FEEDBACK DA UNIDADE RECEPTORA**',
    '',
    `- **Participante**: ${input.menteeName}`,
    `- **Mentor**: ${input.mentorName}`,
    `- **Periodo do Projeto**: ${input.projectPeriod}`,
    `- **Data do Feedback**: ${input.feedbackDate}`,
    '',
    'Este formulario tem como objetivo fornecer feedback construtivo, promovendo o desenvolvimento continuo do profissional avaliado. Seja claro, objetivo e respeitoso em seus comentarios.',
    '',
    '**1. Desempenho**',
    '- Como voce avalia a qualidade das entregas realizadas pelo participante?',
    '- Quais foram os principais pontos fortes demonstrados?',
    '- Existem pontos de melhoria a serem observados?',
    '',
    '**2. Engajamento e Postura**',
    '- O participante demonstrou comprometimento com o projeto e seus objetivos?',
    '- Como foi a postura em reunioes, interacoes com o time e demais envolvidos?',
    '',
    '**3. Contribuicoes Individuais**',
    '- Quais entregas ou iniciativas se destacaram como contribuicoes significativas?',
    '- Houve sugestoes ou melhorias propostas pelo participante?',
    '',
    '**4. Colaboracao e Troca de Experiencias**',
    '- O colaborador demonstrou abertura para compartilhar experiencias e conhecimentos com o time?',
    '',
    '**5. Comentarios Finais sobre o participante**',
    '- Ha comentarios adicionais sobre a atuacao do participante?',
    '- Ha recomendacoes para o desenvolvimento profissional do participante?',
    '',
    '**6. Comentarios Finais sobre o projeto**',
    '- Quais beneficios voce avalia para sua unidade com a realizacao do projeto?',
    '- Ha recomendacoes de melhoria para o projeto Freudenberg Experience?',
    '',
    '--- END OF TEMPLATE ---',
    '',
    '**DATA FOR ANALYSIS:**',
    `- **Diary Entries Summary**: ${input.diaryEntries}`,
    `- **Meeting Minutes Summary**: ${input.meetingMinutes}`,
    `- **Tasks Completed Summary**: ${input.tasksCompleted}`,
  ].join('\n');
}

function sanitizeReport(report: string): string {
  return report.replace(/^```(?:markdown|md)?\s*/i, '').replace(/```$/i, '').trim();
}
