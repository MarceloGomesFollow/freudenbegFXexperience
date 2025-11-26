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

export const GenerateMentorshipReportInputSchema = z.object({
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
  report: z.string().describe('The fully generated feedback report as a single string.'),
});
export type GenerateMentorshipReportOutput = z.infer<typeof GenerateMentorshipReportOutputSchema>;

export async function generateMentorshipReport(input: GenerateMentorshipReportInput): Promise<GenerateMentorshipReportOutput> {
  return generateMentorshipReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMentorshipReportPrompt',
  input: {schema: GenerateMentorshipReportInputSchema},
  output: {schema: GenerateMentorshipReportOutputSchema},
  prompt: `Você é um especialista em RH e desenvolvimento de talentos. Sua tarefa é preencher um formulário de feedback para um participante de um programa de intercâmbio profissional.

Use as informações de contexto fornecidas para preencher cada seção do formulário de forma detalhada, construtiva e profissional. Seja claro e objetivo.

**Contexto Fornecido:**
- Resumo do Diário de Bordo do Participante: {{{diaryEntries}}}
- Resumo das Atas de Reunião: {{{meetingMinutes}}}
- Resumo do Desempenho em Tarefas: {{{tasksCompleted}}}

**Formulário de Feedback a ser Preenchido:**

PROGRAMA DE INTERCÂMBIO PROFISSIONAL – FEEDBACK DA UNIDADE RECEPTORA

• Participante: {{{menteeName}}}
• Mentor: {{{mentorName}}}
• Período do Projeto: {{{projectPeriod}}}
• Data do Feedback: {{{feedbackDate}}}

Este formulário tem como objetivo fornecer feedback construtivo, promovendo o desenvolvimento contínuo do profissional avaliado. Seja claro, objetivo e respeitoso em seus comentários.

1. Desempenho
Avalie o desempenho do participante em relação às entregas, prazos e qualidade do trabalho desenvolvido durante o projeto.

• Como você avalia a qualidade das entregas realizadas pelo participante?
(Analise o contexto de 'Desempenho em Tarefas' e 'Diário de Bordo' para descrever a qualidade, pontualidade e esmero das entregas.)

• Quais foram os principais pontos fortes demonstrados?
(Identifique habilidades como proatividade, capacidade analítica, resolução de problemas, etc., com base em todo o contexto.)

• Existem pontos de melhoria a serem observados?
(Sugira áreas para desenvolvimento, como aprofundamento técnico, habilidades de comunicação, etc.)

2. Engajamento e Postura
Avalie o comprometimento, participação e atitude do participante durante o projeto.

• O participante demonstrou comprometimento com o projeto e seus objetivos?
(Use 'Atas de Reunião' e 'Diário de Bordo' para avaliar o engajamento e alinhamento do participante.)

• Como foi a postura em reuniões, interações com o time e demais envolvidos?
(Descreva a comunicação, colaboração e profissionalismo do participante.)

3. Contribuições Individuais
Descreva as principais contribuições que o participante trouxe para o projeto.

• Quais entregas ou iniciativas se destacaram como contribuições significativas?
(Cite exemplos concretos mencionados no contexto, como "resolução do desafio X" ou "proposta de melhoria Y".)

• Houve sugestões ou melhorias propostas pelo participante?
(Detalhe as sugestões mencionadas no 'Diário de Bordo' ou 'Atas de Reunião'.)

4. Colaboração e Troca de Experiências
Avalie a disposição do participante em compartilhar conhecimento, colaborar e aprender com os demais.

• O colaborador demonstrou efetivamente abertura para compartilhar experiências e conhecimentos com o time?
(Descreva como o participante interagiu com a equipe e compartilhou seus aprendizados.)

5. Comentários Finais sobre o participante

• Há comentários adicionais que gostaria de destacar sobre a atuação do participante?
(Faça um resumo geral da performance e do potencial do participante.)

• Há recomendações para o desenvolvimento profissional do participante?
(Sugira próximos passos, cursos, ou áreas de foco para o futuro.)

6. Comentários Finais sobre o projeto

• Quais benefícios você pode avaliar para sua unidade com a realização do projeto?
(Com base no contexto, descreva os ganhos que a unidade receptora obteve com a presença do intercambista.)

• Há recomendações de melhoria para o projeto Freudenberg Experience?
(Gere uma sugestão genérica e positiva sobre o programa.)

7. Assinatura

_________________________
{{{mentorName}}}
(Mentor na Unidade Receptora)
`,
});

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
