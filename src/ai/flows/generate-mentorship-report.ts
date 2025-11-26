
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
  feedbackDate: z.string().describe('The date the feedback is being given (e.g., "___/___/___").'),
  diaryEntries: z.string().describe("A summary of the mentee's diary entries, highlighting activities and learnings."),
  meetingMinutes: z.string().describe("A summary of the discussions and outcomes from mentorship meetings."),
  tasksCompleted: z.string().describe("A summary of the mentee's performance on assigned tasks and deliverables."),
});
export type GenerateMentorshipReportInput = z.infer<typeof GenerateMentorshipReportInputSchema>;

const GenerateMentorshipReportOutputSchema = z.object({
  report: z.string().describe('The fully generated feedback report content based on the provided template.'),
});
export type GenerateMentorshipReportOutput = z.infer<typeof GenerateMentorshipReportOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateMentorshipReportPrompt',
  input: {schema: GenerateMentorshipReportInputSchema},
  output: {schema: GenerateMentorshipReportOutputSchema},
  prompt: `You are an AI assistant tasked with generating a comprehensive mentorship feedback report. Use the provided data to fill out the following template. Be objective, constructive, and use professional language.

--- FEEDBACK REPORT TEMPLATE ---

**PROGRAMA DE INTERCÂMBIO PROFISSIONAL – FEEDBACK DA UNIDADE RECEPTORA**

- **Participante**: {{{menteeName}}}
- **Mentor**: {{{mentorName}}}
- **Período do Projeto**: {{{projectPeriod}}}
- **Data do Feedback**: {{{feedbackDate}}}

Este formulário tem como objetivo fornecer feedback construtivo, promovendo o desenvolvimento contínuo do profissional avaliado. Seja claro, objetivo e respeitoso em seus comentários.

**1. Desempenho**
Avalie o desempenho do participante em relação às entregas, prazos e qualidade do trabalho desenvolvido durante o projeto.

- **Como você avalia a qualidade das entregas realizadas pelo participante?**
*(Analyze diaryEntries, tasksCompleted, and meetingMinutes to answer this. Comment on quality, attention to detail, and alignment with goals.)*

- **Quais foram os principais pontos fortes demonstrados?**
*(Identify strengths from the provided data, such as proactivity, problem-solving, technical skills, etc.)*

- **Existem pontos de melhoria a serem observados?**
*(Based on the data, suggest areas for improvement in a constructive manner.)*

**2. Engajamento e Postura**
Avalie o comprometimento, participação e atitude do participante durante o projeto.

- **O participante demonstrou comprometimento com o projeto e seus objetivos?**
*(Use diary entries and task completion rates to assess commitment.)*

- **Como foi a postura em reuniões, interações com o time e demais envolvidos?**
*(Infer from meetingMinutes and feedback how the mentee behaved in a team setting.)*

**3. Contribuições Individuais**
Descreva as principais contribuições que o participante trouxe para o projeto.

- **Quais entregas ou iniciativas se destacaram como contribuições significativas?**
*(Highlight key achievements mentioned in the diary or tasks.)*

- **Houve sugestões ou melhorias propostas pelo participante?**
*(Look for mentions of new ideas or process improvements in the provided data.)*

**4. Colaboração e Troca de Experiências**
Avalie a disposição do participante em compartilhar conhecimento, colaborar e aprender com os demais.

- **O colaborador demonstrou efetivamente abertura para compartilhar experiências e conhecimentos com o time?**
*(Analyze interactions mentioned in meeting minutes and diary entries.)*

**5. Comentários Finais sobre o participante**

- **Há comentários adicionais que gostaria de destacar sobre a atuação do participante?**
*(Provide a final summary of the participant's performance.)*

- **Há recomendações para o desenvolvimento profissional do participante?**
*(Suggest next steps for their career path based on their performance.)*

**6. Comentários Finais sobre o projeto**

- **Quais benefícios você pode avaliar para sua unidade com a realização do projeto?**
*(Summarize the value brought by the project.)*

- **Há recomendações de melhoria para o projeto Freudenberg Experience?**
*(Suggest improvements for the overall program.)*

--- END OF TEMPLATE ---

**DATA FOR ANALYSIS:**

- **Diary Entries Summary**: {{{diaryEntries}}}
- **Meeting Minutes Summary**: {{{meetingMinutes}}}
- **Tasks Completed Summary**: {{{tasksCompleted}}}

Generate the full report based on the template and the data provided.
`,
});


export async function generateMentorshipReport(
  input: GenerateMentorshipReportInput
): Promise<GenerateMentorshipReportOutput> {
  return generateMentorshipReportFlow(input);
}


const generateMentorshipReportFlow = ai.defineFlow(
  {
    name: 'generateMentorshipReportFlow',
    inputSchema: GenerateMentorshipReportInputSchema,
    outputSchema: GenerateMentorshipReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
