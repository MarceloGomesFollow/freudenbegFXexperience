/**
 * Translation mapping layer for data.ts Portuguese enum values.
 * Maps hardcoded Portuguese strings from data.ts to i18n translation keys.
 * Business logic comparisons (===, switch) remain unchanged — only display rendering uses this.
 */

const DATA_VALUE_TO_KEY: Record<string, string> = {
  // User roles
  'Participante': 'data.roles.participant',
  'Mentor': 'data.roles.mentor',
  'RH': 'data.roles.hr',
  'Gestor': 'data.roles.manager',
  'Admin': 'data.roles.admin',

  // User status
  'Ativo': 'data.status.active',
  'Inativo': 'data.status.inactive',
  'Aguardando Aprovação': 'data.status.awaitingApproval',

  // Task status
  'Concluído': 'data.status.completed',
  'Em Andamento': 'data.status.inProgress',
  'Pendente': 'data.status.pending',
  'Atrasado': 'data.status.overdue',

  // Transfer status
  'Agendado': 'data.status.scheduled',

  // Goal status
  'Não Iniciado': 'data.status.notStarted',

  // Challenge status
  'Aberto': 'data.challengeStatus.open',
  'Em avaliação': 'data.challengeStatus.evaluating',
  'Em experimento': 'data.challengeStatus.experimenting',
  'Encerrado': 'data.challengeStatus.closed',

  // Idea status
  'Submetida': 'data.ideaStatus.submitted',
  'Em Análise': 'data.ideaStatus.analyzing',
  'Aprovada': 'data.ideaStatus.approved',
  'Rejeitada': 'data.ideaStatus.rejected',
  'Em Sprint': 'data.ideaStatus.inSprint',
  'Validada': 'data.ideaStatus.validated',
  'Escalada': 'data.ideaStatus.escalated',

  // Sprint status
  'Planejamento': 'data.sprintStatus.planning',
  'Execução': 'data.sprintStatus.execution',
  'Análise': 'data.sprintStatus.analysis',

  // Sprint result
  'Validado': 'data.sprintResult.validated',
  'Parcial': 'data.sprintResult.partial',
  'Não Validado': 'data.sprintResult.notValidated',

  // Priority
  'Alta': 'data.priority.high',
  'Média': 'data.priority.medium',
  'Baixa': 'data.priority.low',

  // Idea tags
  'processo': 'data.ideaTags.process',
  'segurança': 'data.ideaTags.safety',
  'custo': 'data.ideaTags.cost',
  'ESG': 'data.ideaTags.esg',
  'produto': 'data.ideaTags.product',
  'rh': 'data.ideaTags.hr',

  // Approval status
  'approved': 'data.approvalStatus.approved',
  'rejected': 'data.approvalStatus.rejected',
  'pending': 'data.approvalStatus.pending',

  // Calendar event types
  'Apresentacao': 'data.eventType.presentation',
  'Mentoria': 'data.eventType.mentoring',
  'Prazo': 'data.eventType.deadline',
  'Treinamento': 'data.eventType.training',

  // Activity feed actions
  'submeteu uma nova ideia': 'data.activity.submittedIdea',
  'concluiu o curso': 'data.activity.completedCourse',
  'fez uma nova entrada no diário': 'data.activity.newDiaryEntry',
  'lançou um novo desafio': 'data.activity.launchedChallenge',
  'iniciou a trilha de aprendizado': 'data.activity.startedLearningPath',
};

/**
 * Translates a Portuguese data value to the current language.
 * If no mapping exists, returns the original value unchanged.
 */
export function translateDataValue(value: string, t: (key: string) => string): string {
  const key = DATA_VALUE_TO_KEY[value];
  if (!key) return value;
  const translated = t(key);
  // If t() returns the key itself (missing translation), fall back to original value
  return translated === key ? value : translated;
}
