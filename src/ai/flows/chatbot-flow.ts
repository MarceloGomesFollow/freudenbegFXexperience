/**
 * @fileOverview Offline chatbot flow for Freudy — knowledge-base driven.
 *
 * - chatWithFreudy - A function that handles the chat interaction.
 * - ChatWithFreudyInput - The input type for the chatWithFreudy function.
 * - ChatWithFreudyOutput - The return type for the chatWithFreudy function.
 *
 * This version works fully offline using keyword matching against
 * the Freudy knowledge base. No API calls required.
 */

import { z } from 'zod';

const ChatWithFreudyInputSchema = z.object({
  question: z.string().describe("The user's question for the chatbot."),
  chatHistory: z.array(z.object({
    from: z.enum(['user', 'ai']),
    text: z.string(),
  })).describe('The history of the conversation.'),
  language: z.enum(['pt', 'en', 'de']).optional().describe('The platform UI language selected by the user.'),
});
export type ChatWithFreudyInput = z.infer<typeof ChatWithFreudyInputSchema>;

const ChatWithFreudyOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the user's question."),
});
export type ChatWithFreudyOutput = z.infer<typeof ChatWithFreudyOutputSchema>;

// ---------------------------------------------------------------------------
// Language detection
// ---------------------------------------------------------------------------

type Lang = 'pt' | 'en' | 'de';

const PT_MARKERS = ['como', 'onde', 'qual', 'quero', 'posso', 'fazer', 'ajude', 'funciona', 'plataforma', 'intercâmbio', 'ideia', 'submeter', 'diário', 'relatório', 'aprovações', 'mentoria', 'aprendizado', 'inovação', 'eventos', 'calendário', 'guia', 'inscrição', 'configurações', 'painel', 'olá', 'oi', 'bom dia', 'boa tarde', 'obrigado'];
const DE_MARKERS = ['wie', 'was', 'wo', 'kann', 'hilf', 'funktioniert', 'plattform', 'austausch', 'idee', 'einreichen', 'tagebuch', 'bericht', 'genehmigungen', 'mentoring', 'lernen', 'innovation', 'veranstaltungen', 'kalender', 'anleitung', 'anmeldung', 'einstellungen', 'hallo', 'guten', 'danke'];

function detectLanguage(text: string): Lang {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  let ptScore = 0;
  let deScore = 0;
  for (const w of words) {
    if (PT_MARKERS.some(m => w.includes(m))) ptScore++;
    if (DE_MARKERS.some(m => w.includes(m))) deScore++;
  }
  if (ptScore > deScore && ptScore > 0) return 'pt';
  if (deScore > ptScore && deScore > 0) return 'de';
  return 'en';
}

// ---------------------------------------------------------------------------
// FAQ knowledge base (extracted from freudy-knowledge-base.ts)
// ---------------------------------------------------------------------------

interface FaqEntry {
  keywords: string[];
  response: Record<Lang, string>;
}

const FAQ: FaqEntry[] = [
  // Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hallo', 'guten tag', 'guten morgen'],
    response: {
      pt: 'Olá! Sou o Freudy, seu concierge na plataforma FX Experience. Posso te ajudar a navegar pelos módulos, encontrar oportunidades de intercâmbio, submeter ideias de inovação e muito mais. Como posso te ajudar hoje?',
      en: 'Hello! I\'m Freudy, your concierge on the FX Experience platform. I can help you navigate modules, find exchange opportunities, submit innovation ideas, and much more. How can I help you today?',
      de: 'Hallo! Ich bin Freudy, Ihr Concierge auf der FX Experience Plattform. Ich kann Ihnen helfen, Module zu navigieren, Austauschmöglichkeiten zu finden, Innovationsideen einzureichen und vieles mehr. Wie kann ich Ihnen heute helfen?',
    },
  },
  // Platform overview
  {
    keywords: ['platform', 'plataforma', 'what can', 'o que posso', 'was kann', 'overview', 'visão geral', 'überblick', 'features', 'funcionalidades'],
    response: {
      pt: 'A FX Experience é a plataforma global de intercâmbio de talentos e desenvolvimento do Grupo Freudenberg. Aqui você pode:\n\n1. Explorar e candidatar-se a oportunidades de intercâmbio (Central de Intercâmbio)\n2. Documentar sua experiência no Diário 4.0\n3. Submeter ideias de inovação (Innovation Labs)\n4. Fazer cursos e trilhas de aprendizado (Learning Hub)\n5. Acompanhar mentoria e reuniões (Mentoria)\n6. Gerar relatórios A3 com IA (Relatórios)\n7. Conectar-se com alumni da rede FX\n\nRecomendo começar pelo Guia Geral no menu lateral para entender cada módulo.',
      en: 'FX Experience is the Freudenberg Group\'s global talent exchange and development platform. Here you can:\n\n1. Browse and apply for exchange opportunities (Exchange Center)\n2. Document your experience in Diary 4.0\n3. Submit innovation ideas (Innovation Labs)\n4. Take courses and learning paths (Learning Hub)\n5. Track mentorship and meetings (Mentorship)\n6. Generate A3 reports with AI (Reports)\n7. Connect with FX alumni\n\nI recommend starting with the General Guide in the sidebar to understand each module.',
      de: 'FX Experience ist die globale Talentaustausch- und Entwicklungsplattform der Freudenberg-Gruppe. Hier können Sie:\n\n1. Austauschmöglichkeiten durchsuchen und sich bewerben (Exchange Center)\n2. Ihre Erfahrungen im Tagebuch 4.0 dokumentieren\n3. Innovationsideen einreichen (Innovation Labs)\n4. Kurse und Lernpfade absolvieren (Learning Hub)\n5. Mentoring und Meetings verfolgen (Mentorship)\n6. A3-Berichte mit KI erstellen (Reports)\n7. Sich mit FX-Alumni vernetzen\n\nIch empfehle, mit dem Allgemeinen Leitfaden im Seitenmenü zu beginnen.',
    },
  },
  // Home Dashboard
  {
    keywords: ['dashboard', 'home', 'painel', 'kpi', 'inicio', 'initial'],
    response: {
      pt: 'O Painel Inicial é seu hub central! Nele você encontra:\n\n1. KPIs em tempo real: Participantes Ativos, Oportunidades Abertas, Desafios de Inovação, Ideias Submetidas\n2. Feed de Atividades mostrando o que os colegas estão conquistando\n3. Mapa Mundial de Talentos com participantes em intercâmbio globalmente\n4. Botões de Ação Rápida\n\nOs KPIs no topo resumem a saúde do programa, e o feed mostra conquistas em tempo real.',
      en: 'The Home Dashboard is your central hub! You\'ll find:\n\n1. Real-time KPIs: Active Participants, Open Opportunities, Innovation Challenges, Ideas Submitted\n2. Activity Feed showing what colleagues are achieving\n3. World Talent Map with participants in exchanges globally\n4. Quick Action buttons\n\nThe KPIs at the top summarize program health, and the activity feed shows achievements in real time.',
      de: 'Das Home-Dashboard ist Ihr zentraler Hub! Sie finden hier:\n\n1. Echtzeit-KPIs: Aktive Teilnehmer, Offene Stellen, Innovationsherausforderungen, Eingereichte Ideen\n2. Aktivitäts-Feed mit Kollegenerfolgen\n3. Weltkarte der Talente mit Teilnehmern im Austausch\n4. Schnellaktions-Buttons',
    },
  },
  // Diary 4.0
  {
    keywords: ['diary', 'diário', 'diario', 'tagebuch', 'journal', 'entry', 'entries', 'entrada', 'goals', 'metas', 'objetivos', 'ziele', 'summary', 'resumo', 'zusammenfassung'],
    response: {
      pt: 'O Diário 4.0 é seu diário digital de intercâmbio. Acesse pelo menu lateral → Diário 4.0.\n\n1. Aba Entradas: Crie entradas como texto, imagem ou vídeo. Anexe até 3 arquivos por entrada. Mentores podem comentar.\n2. Aba Metas: Defina objetivos de desenvolvimento com progresso (0-100%) e evidências.\n3. Resumo IA: Clique "Gerar Resumo" para análise automática com insights e sentimento.\n\nDica: Escreva pelo menos uma entrada por dia — reflexões curtas geram insights poderosos. O resumo IA funciona melhor com 10+ entradas.',
      en: 'Diary 4.0 is your digital exchange journal. Access it via sidebar → Diary 4.0.\n\n1. Entries Tab: Create entries as text, image, or video. Attach up to 3 files. Mentors can comment.\n2. Goals Tab: Define development goals with progress tracking (0-100%) and evidence.\n3. AI Summary: Click "Generate Summary" for automatic analysis with insights and sentiment.\n\nTip: Write at least one entry per day — short reflections compound into powerful insights. AI summary works best with 10+ entries.',
      de: 'Tagebuch 4.0 ist Ihr digitales Austauschjournal. Zugriff über Seitenmenü → Tagebuch 4.0.\n\n1. Einträge: Text-, Bild- oder Videoeinträge erstellen. Bis zu 3 Dateien anhängen.\n2. Ziele: Entwicklungsziele mit Fortschritt (0-100%) und Nachweisen definieren.\n3. KI-Zusammenfassung: "Zusammenfassung erstellen" für automatische Analyse.',
    },
  },
  // Exchange Center
  {
    keywords: ['exchange', 'intercâmbio', 'intercambio', 'austausch', 'opportunity', 'oportunidade', 'apply', 'candidatar', 'bewerben', 'rotation', 'transfer'],
    response: {
      pt: 'A Central de Intercâmbio permite explorar e candidatar-se a oportunidades de rotação entre unidades Freudenberg. Acesse pelo menu lateral → Exchange Center.\n\n1. Cards de oportunidade mostram: título, empresa, departamento, duração, habilidades necessárias, localização\n2. Filtre por área, habilidade ou empresa\n3. Clique "Candidatar-se" para acessar o formulário\n4. Oportunidades com borda dourada são vagas prioritárias — sua melhor chance!\n\nDica: Leia a descrição completa antes de se candidatar. Adapte sua candidatura às habilidades listadas.',
      en: 'The Exchange Center lets you browse and apply for rotation opportunities across Freudenberg units. Access via sidebar → Exchange Center.\n\n1. Opportunity cards show: title, company, department, duration, required skills, location\n2. Filter by area, skill, or company\n3. Click "Apply Now" for the application form\n4. Gold-bordered featured opportunities are high-priority — your best chance!\n\nTip: Read the full description before applying. Tailor your application to match required skills.',
      de: 'Das Exchange Center ermöglicht es Ihnen, Rotationsmöglichkeiten zwischen Freudenberg-Einheiten zu erkunden. Zugriff über Seitenmenü → Exchange Center.\n\n1. Karten zeigen: Titel, Unternehmen, Abteilung, Dauer, erforderliche Fähigkeiten, Standort\n2. Filtern nach Bereich, Fähigkeit oder Unternehmen\n3. "Jetzt bewerben" klicken für das Bewerbungsformular\n4. Gold-umrandete Stellen sind Priorität!',
    },
  },
  // Innovation Labs
  {
    keywords: ['innovation', 'inovação', 'inovacao', 'idea', 'ideia', 'idee', 'submit', 'submeter', 'einreichen', 'challenge', 'desafio', 'herausforderung', 'ice', 'score', 'catalog', 'catálogo', 'katalog', 'labs', 'laboratório'],
    response: {
      pt: 'O Innovation Labs é a plataforma de ideação e inovação. Acesse pelo menu lateral → Innovation Labs.\n\n1. Desafios: Navegue pelos desafios ativos de diferentes áreas de negócio\n2. Submeter Ideia: Crie ideias com título, problema, solução e pontuação ICE (Impacto × Confiança × Alinhamento Estratégico ÷ Esforço)\n3. Workflow: Submetida → Em Análise → Aprovada → Em Sprint → Validada → Escalada\n4. Catálogo: Repositório de melhores práticas validadas\n5. Analytics (Manager/Admin): Funil de inovação, heatmap por departamento\n\nDica: Seja específico no problema e na solução. A IA pode ajudar a refinar sua proposta. Tags corretas direcionam para os avaliadores certos.',
      en: 'Innovation Labs is the ideation and innovation platform. Access via sidebar → Innovation Labs.\n\n1. Challenges: Browse active challenges from different business areas\n2. Submit Idea: Create ideas with title, problem, solution, and ICE score (Impact × Confidence × Strategic Alignment ÷ Effort)\n3. Workflow: Submitted → Under Analysis → Approved → In Sprint → Validated → Escalated\n4. Catalog: Repository of validated best practices\n5. Analytics (Manager/Admin): Innovation funnel, theme heatmap\n\nTip: Be specific about the problem and solution. AI can help refine your proposal. Correct tags route to the right evaluators.',
      de: 'Innovation Labs ist die Ideations- und Innovationsplattform. Zugriff über Seitenmenü → Innovation Labs.\n\n1. Herausforderungen: Aktive Challenges aus verschiedenen Geschäftsbereichen durchsuchen\n2. Idee einreichen: Titel, Problem, Lösung und ICE-Score eingeben\n3. Workflow: Eingereicht → In Analyse → Genehmigt → Im Sprint → Validiert → Eskaliert\n4. Katalog: Repository validierter Best Practices',
    },
  },
  // Learning Hub
  {
    keywords: ['learning', 'aprendizado', 'lernen', 'course', 'curso', 'kurs', 'path', 'trilha', 'lernpfad', 'training', 'treinamento', 'schulung', 'coach', 'playlist'],
    response: {
      pt: 'O Learning Hub é a central de aprendizado contínuo. Acesse pelo menu lateral → Learning.\n\n1. Catálogo de Cursos: Grid com imagem, título, descrição, categoria e módulos\n2. Trilhas de Aprendizado: Sequências curadas de cursos relacionados\n3. Explorar: Navegue todo o conteúdo por categoria\n4. Criação de Curso com IA: Gere cursos completos a partir de um tópico (módulos, quizzes, sugestões de vídeo)\n5. Coach IA: Recomenda trilhas personalizadas com base no seu perfil\n6. Playlists IA: Sugere sequências baseadas no seu histórico\n\nDica: Complete cursos para melhorar suas métricas de perfil. Trilhas são o caminho mais eficiente.',
      en: 'The Learning Hub is your continuous learning center. Access via sidebar → Learning.\n\n1. Course Catalog: Grid with image, title, description, category, and modules\n2. Learning Paths: Curated sequences of related courses\n3. Explore: Browse all content by category\n4. AI Course Creation: Generate complete courses from a topic (modules, quizzes, video suggestions)\n5. AI Coach: Recommends personalized paths based on your profile\n6. AI Playlists: Suggests sequences based on your completion history\n\nTip: Complete courses to boost your profile metrics. Learning paths are the most efficient way to build competencies.',
      de: 'Der Learning Hub ist Ihr Zentrum für kontinuierliches Lernen. Zugriff über Seitenmenü → Learning.\n\n1. Kurskatalog: Raster mit Bild, Titel, Beschreibung, Kategorie und Modulen\n2. Lernpfade: Kuratierte Kurssequenzen\n3. KI-Kurserstellung: Komplette Kurse aus einem Thema generieren\n4. KI-Coach: Empfiehlt personalisierte Pfade',
    },
  },
  // Mentorship
  {
    keywords: ['mentor', 'mentorship', 'mentoria', 'mentee', 'mentorado', 'meeting', 'reunião', 'besprechung', 'progress', 'progresso', 'fortschritt'],
    response: {
      pt: 'O módulo de Mentoria gerencia relações mentor-mentee. Acesse pelo menu lateral → Mentoria.\n\nPara Mentores:\n1. Cards de Mentees com avatar, progresso (0-100%) e alertas (vermelho = crítico, amarelo = atenção)\n2. Tabela de Tarefas com prioridades\n3. Aba Reuniões para agendar sessões 1:1 ou em grupo\n4. Relatório IA de progresso\n\nPara Mentees:\n1. Perfil e contato do seu mentor\n2. Acompanhe seu progresso e tarefas pendentes\n3. Veja sessões agendadas\n\nDica: Mantenha seu diário atualizado — reflete diretamente no dashboard de mentoria.',
      en: 'The Mentorship module manages mentor-mentee relationships. Access via sidebar → Mentorship.\n\nFor Mentors:\n1. Mentee cards with avatar, progress (0-100%), and alert badges (red = critical, yellow = attention)\n2. Task table with priority levels\n3. Meetings tab to schedule 1-on-1 or group sessions\n4. AI progress report\n\nFor Mentees:\n1. Your mentor\'s profile and contact info\n2. Track your progress and pending tasks\n3. View scheduled sessions\n\nTip: Keep your diary updated — it reflects directly on the mentorship dashboard.',
      de: 'Das Mentoring-Modul verwaltet Mentor-Mentee-Beziehungen. Zugriff über Seitenmenü → Mentorship.\n\nFür Mentoren: Mentee-Karten mit Fortschritt und Warnungen, Aufgabentabelle, Meetings-Tab.\nFür Mentees: Mentorprofil, Fortschrittsverfolgung, geplante Sitzungen.',
    },
  },
  // Calendar
  {
    keywords: ['calendar', 'calendário', 'calendario', 'kalender', 'event', 'evento', 'veranstaltung', 'schedule', 'agenda', 'deadline', 'prazo'],
    response: {
      pt: 'O Calendário gerencia eventos e prazos. Acesse pelo menu lateral → Calendário.\n\n1. Visão mensal com pontos coloridos por evento\n2. Painel diário ao clicar em uma data\n3. Visão tabela para lista consolidada\n4. Tipos de evento: Apresentação, Mentoria, Prazo, Treinamento — cada um com cor diferente\n\nSeu calendário mostra mentoria, prazos, treinamentos e apresentações em um só lugar.',
      en: 'The Calendar manages events and deadlines. Access via sidebar → Calendar.\n\n1. Month view with colored event dots\n2. Daily events panel when clicking a date\n3. Table view for consolidated list\n4. Event types: Presentation, Mentoring, Deadline, Training — each with a different color\n\nYour calendar shows mentoring, deadlines, training, and presentations in one place.',
      de: 'Der Kalender verwaltet Termine und Fristen. Zugriff über Seitenmenü → Kalender.\n\nMonatsansicht mit farbigen Punkten, Tagesansicht, Tabellenansicht. Veranstaltungstypen: Präsentation, Mentoring, Frist, Schulung.',
    },
  },
  // Reports / A3
  {
    keywords: ['report', 'relatório', 'relatorio', 'bericht', 'a3', 'generate', 'gerar', 'erstellen', 'summary', 'document'],
    response: {
      pt: 'O módulo de Relatórios gera documentação do programa. Acesse pelo menu lateral → Relatórios.\n\nDestaque — Gerador de Relatório A3:\n1. Entrada: Suas entradas do diário (auto-populadas) + feedback da unidade receptora + conquistas de aprendizado\n2. A IA gera: resumo narrativo, conquistas, desafios, lições aprendidas, recomendações\n3. Editável antes da exportação final\n\nO A3 é seu documento de encerramento de intercâmbio. Quanto mais detalhado seu diário, melhor o A3.\n\nDica: Comece a revisar o modelo do A3 cedo — não espere o último dia.',
      en: 'The Reports module generates program documentation. Access via sidebar → Reports.\n\nKey feature — A3 Report Generator:\n1. Input: Your diary entries (auto-populated) + receiving unit feedback + learning achievements\n2. AI generates: narrative summary, achievements, challenges, lessons learned, recommendations\n3. Editable before final export\n\nThe A3 is your exchange capstone document. The more detailed your diary, the better the A3.\n\nTip: Start reviewing your A3 template early — don\'t wait until the last day.',
      de: 'Das Berichtsmodul erstellt Programmdokumentation. Zugriff über Seitenmenü → Reports.\n\nA3-Bericht-Generator: Tagebucheinträge + Feedback → KI erstellt narrative Zusammenfassung, Erfolge, Herausforderungen, Empfehlungen.',
    },
  },
  // Approvals
  {
    keywords: ['approval', 'aprovação', 'aprovacao', 'genehmigung', 'checklist', 'onboarding', 'lgpd', 'nda'],
    response: {
      pt: 'O módulo de Aprovações (Manager/Admin) gerencia a logística de onboarding com 11 etapas:\n\n1. Aprovação formal do gestor e RH\n2. Assinatura LGPD e NDA\n3. Definição detalhada da agenda\n4. Atribuição de mentor\n5. Emissão de passagens\n6. Reserva de hospedagem\n7. Preparação de documentos pessoais\n8. Revisão de políticas da empresa\n9. Briefing pré-intercâmbio\n10. Verificação de acesso ao diário\n11. Comunicação de contato de emergência\n\nCada item tem status (Pendente/Aprovado/Rejeitado) e responsável. Acesse pelo menu lateral → Aprovações.',
      en: 'The Approvals module (Manager/Admin) manages onboarding logistics with an 11-step checklist:\n\n1. Formal manager and HR approval\n2. LGPD & NDA signature\n3. Detailed agenda definition\n4. Mentor assignment\n5. Travel ticket issuance\n6. Lodging reservation\n7. Personal documents preparation\n8. Company policies review\n9. Pre-exchange briefing\n10. Diary platform access verification\n11. Emergency contact communication\n\nEach item has status (Pending/Approved/Rejected) and responsible party. Access via sidebar → Approvals.',
      de: 'Das Genehmigungsmodul (Manager/Admin) verwaltet das Onboarding mit einer 11-Schritte-Checkliste. Zugriff über Seitenmenü → Approvals.',
    },
  },
  // Admin
  {
    keywords: ['admin', 'administrator', 'administrador', 'analytics', 'análise', 'analyse', 'transfer flow'],
    response: {
      pt: 'O Painel Admin oferece visão completa do programa FX (Admin only). Acesse pelo menu lateral → Admin.\n\n1. KPIs: Total de Transferências, Intercâmbios Ativos, Duração Média, Unidade Mais Ativa\n2. Gráfico de Fluxo de Transferências entre unidades\n3. Tabela completa com nomes, empresas, datas, progresso e status\n4. Mapa Mundial de Talentos\n\nÉ sua visão panorâmica de todo o programa FX.',
      en: 'The Admin Dashboard provides a complete program overview (Admin only). Access via sidebar → Admin.\n\n1. KPIs: Total Transfers, Active Exchanges, Average Stay Duration, Most Active Unit\n2. Transfer Flow Chart between units\n3. Complete transfers table with names, companies, dates, progress, status\n4. World Talent Map\n\nIt\'s your bird\'s-eye view of the entire FX program.',
      de: 'Das Admin-Dashboard bietet eine vollständige Programmübersicht (nur Admin). Zugriff über Seitenmenü → Admin.',
    },
  },
  // Events & FreudTalks
  {
    keywords: ['freudtalks', 'talks', 'showcase', 'recognition', 'reconhecimento', 'anerkennung', 'conference', 'conferência'],
    response: {
      pt: 'O módulo de Eventos inclui:\n\n1. FreudTalks Experience: Conferências internas onde participantes compartilham histórias de intercâmbio\n2. Innovation Showcase: Demonstrações de protótipos e ideias validadas do Innovation Labs\n\nAmbos são ótimas oportunidades de visibilidade! Acesse pelo menu lateral → Eventos.',
      en: 'The Events module includes:\n\n1. FreudTalks Experience: Internal conferences where participants share exchange stories\n2. Innovation Showcase: Demonstrations of Innovation Labs prototypes and validated ideas\n\nBoth are great opportunities for visibility! Access via sidebar → Events.',
      de: 'Das Events-Modul umfasst FreudTalks Experience (interne Konferenzen) und Innovation Showcase (Prototypen-Demos). Zugriff über Seitenmenü → Events.',
    },
  },
  // Alumni
  {
    keywords: ['alumni', 'rede', 'netzwerk', 'network', 'past', 'turma', 'batch', 'connect', 'conectar', 'vernetzen'],
    response: {
      pt: 'A Rede Alumni conecta você com participantes anteriores do FX. Acesse pelo menu lateral → Alumni.\n\n1. Grid com cards: avatar, nome, cargo, unidade, turma\n2. Métricas: ideias submetidas, intercâmbios completos, cursos feitos, talks realizados\n3. Busca/filtro por nome ou unidade\n4. Botão "Enviar Mensagem" para networking\n\nEstas são pessoas que já trilharam o caminho — conecte-se, pergunte, construa relacionamentos duradouros.',
      en: 'The Alumni Network connects you with past FX participants. Access via sidebar → Alumni.\n\n1. Grid with cards: avatar, name, role, unit, batch year\n2. Metrics: ideas submitted, exchanges completed, courses taken, talks given\n3. Search/filter by name or unit\n4. "Send Message" button for networking\n\nThese are people who\'ve walked the path — reach out, ask questions, build lasting relationships.',
      de: 'Das Alumni-Netzwerk verbindet Sie mit ehemaligen FX-Teilnehmern. Zugriff über Seitenmenü → Alumni.',
    },
  },
  // Special Resources / AI tools
  {
    keywords: ['special', 'recursos', 'ressourcen', 'ai tool', 'ferramenta', 'werkzeug', 'business fit', 'ai mentor', 'collaboration', 'colaboração', 'zusammenarbeit', 'freudy ia', 'freudyia'],
    response: {
      pt: 'Os Recursos Especiais são o hub de ferramentas IA. Acesse pelo menu lateral → Recursos Especiais.\n\n1. Freudy AI Mentor: Analisa dados de aprendizado entre equipes para encontrar oportunidades de colaboração\n2. Business Fit AI: Avalia alinhamento estratégico de ideias e projetos — receba score e sugestões\n3. Curadoria Colaborativa: Sistema de feedback em tempo real onde mentores comentam nas entradas do diário\n\nO AI Mentor descobre conexões ocultas entre equipes. O Business Fit avalia suas ideias antes de submetê-las.',
      en: 'Special Resources is the AI tools hub. Access via sidebar → Special Resources.\n\n1. Freudy AI Mentor: Analyzes learning data across teams to find collaboration opportunities\n2. Business Fit AI: Evaluates strategic alignment of ideas — receive a score and improvement suggestions\n3. Collaborative Curation: Real-time feedback system for diary entries\n\nThe AI Mentor discovers hidden connections between teams. Business Fit evaluates your ideas before you submit them.',
      de: 'Spezielle Ressourcen ist der KI-Tools-Hub. Zugriff über Seitenmenü → Special Resources.\n\n1. Freudy AI Mentor: Analysiert Teamdaten für Kollaborationsmöglichkeiten\n2. Business Fit AI: Bewertet strategische Ausrichtung von Ideen',
    },
  },
  // General Guide
  {
    keywords: ['guide', 'guia', 'anleitung', 'onboarding', 'new', 'novo', 'neu', 'start', 'começar', 'anfangen', 'tutorial', 'first', 'primeiro'],
    response: {
      pt: 'O Guia Geral é o ponto de partida ideal! Acesse pelo menu lateral → Guia Geral.\n\nGuia do Participante (3 fases):\n1. Antes: Briefing, revisão de políticas, preparação de documentos, assinatura de termos\n2. Durante: Diário diário, participar de atividades, construir relacionamentos, completar tarefas\n3. Depois: Relatório final, reflexões, feedback, manutenção da rede\n\nGuia do Gestor: Alinhar expectativas, comunicar à equipe, reorganizar trabalho, formalizar cessão.\n\nSe você é novo na FX, comece aqui!',
      en: 'The General Guide is the ideal starting point! Access via sidebar → General Guide.\n\nParticipant Guide (3 phases):\n1. Before: Briefing, policy review, document prep, term signing\n2. During: Daily diary, attend activities, build relationships, complete tasks\n3. After: Final report, reflections, feedback, network maintenance\n\nManager Guide: Align expectations, communicate to team, reorganize work, formalize cession.\n\nIf you\'re new to FX, start here!',
      de: 'Der Allgemeine Leitfaden ist der ideale Startpunkt! Zugriff über Seitenmenü → General Guide.\n\nTeilnehmer-Guide (3 Phasen): Vorher, Während, Nachher. Manager-Guide: Erwartungen abstimmen, Team informieren.',
    },
  },
  // Settings
  {
    keywords: ['settings', 'configurações', 'configuracoes', 'einstellungen', 'profile', 'perfil', 'profil', 'notification', 'notificação', 'logo', 'export', 'exportar'],
    response: {
      pt: 'As Configurações (Admin only) permitem:\n\n1. Gerenciamento de perfil\n2. Configuração de notificações\n3. Upload de logo personalizado\n4. Gerenciamento de unidades Freudenberg\n5. Log de atividades (auditoria com IP, timestamps, ações)\n6. Exportação de dados (download completo como JSON)\n\nAcesse pelo menu lateral → Configurações.',
      en: 'Settings (Admin only) allow:\n\n1. Profile management\n2. Notification configuration\n3. Custom logo upload\n4. Company unit management\n5. Activity log (audit trail with IP, timestamps, actions)\n6. Data export (download all data as JSON)\n\nAccess via sidebar → Settings.',
      de: 'Einstellungen (nur Admin): Profilverwaltung, Benachrichtigungen, Logo-Upload, Einheitenverwaltung, Aktivitätsprotokoll, Datenexport. Zugriff über Seitenmenü → Settings.',
    },
  },
  // Enrollment
  {
    keywords: ['enrollment', 'inscrição', 'inscricao', 'anmeldung', 'register', 'registrar', 'registrieren', 'sign up', 'cadastro'],
    response: {
      pt: 'A Inscrição é seu primeiro passo! Acesse em /enrollment.\n\nCampos do formulário:\n1. Nome, e-mail corporativo, unidade de negócio\n2. Cargo atual\n3. Justificativa e objetivos (10-500 caracteres)\n4. Consentimento LGPD e NDA\n\nPreencha seus dados, explique por que quer participar e concorde com os termos. Sua candidatura vai para o seu gestor.',
      en: 'Enrollment is your first step! Access at /enrollment.\n\nForm fields:\n1. Name, corporate email, business unit\n2. Current role\n3. Justification and objectives (10-500 characters)\n4. LGPD and NDA consent\n\nFill in your details, explain why you want to participate, and agree to the terms. Your application goes to your manager.',
      de: 'Die Anmeldung ist Ihr erster Schritt! Zugriff über /enrollment.\n\nFormularfelder: Name, E-Mail, Geschäftseinheit, Rolle, Begründung, LGPD/NDA-Zustimmung.',
    },
  },
  // AI capabilities
  {
    keywords: ['ai', 'ia', 'ki', 'artificial', 'inteligência', 'künstliche', 'capabilities', 'capacidades', 'fähigkeiten', 'what can ai', 'o que a ia'],
    response: {
      pt: 'A plataforma FX tem 8 capacidades de IA integradas:\n\n1. Resumo IA do Diário — Resume entradas, extrai 3-6 insights, analisa sentimento\n2. Geração de Cursos IA — Cria cursos completos a partir de um tópico\n3. Rascunho do Relatório A3 — Compila diário + feedback em relatório estruturado\n4. Assistente de Ideias de Inovação — Refina descrições e sugere melhorias no ICE\n5. Avaliador de Alinhamento Estratégico — Pontua alinhamento com prioridades da empresa\n6. Recomendador de Trilhas — Sugere trilhas personalizadas por perfil\n7. Relatório de Mentoria — Gera documentação de progresso do mentee\n8. Colaboração Cross-Team — Encontra oportunidades de parceria entre equipes',
      en: 'The FX platform has 8 integrated AI capabilities:\n\n1. Diary AI Summary — Summarizes entries, extracts 3-6 insights, analyzes sentiment\n2. AI Course Generation — Creates complete courses from a topic\n3. A3 Report Draft — Compiles diary + feedback into structured report\n4. Innovation Idea Assistant — Refines descriptions, suggests ICE improvements\n5. Strategic Alignment Evaluator — Scores alignment with company priorities\n6. Learning Path Recommender — Suggests personalized paths by profile\n7. Mentorship Report — Generates mentee progress documentation\n8. Cross-Team Collaboration — Finds partnership opportunities across teams',
      de: 'Die FX-Plattform hat 8 integrierte KI-Fähigkeiten: Tagebuch-Zusammenfassung, Kursgenerierung, A3-Bericht, Ideen-Assistent, Strategische Bewertung, Lernpfad-Empfehlung, Mentoring-Bericht, Cross-Team-Kollaboration.',
    },
  },
  // Thank you / goodbye
  {
    keywords: ['thank', 'obrigado', 'obrigada', 'danke', 'thanks', 'bye', 'tchau', 'tschüss', 'goodbye', 'adeus'],
    response: {
      pt: 'Por nada! Foi um prazer ajudar. Estou sempre aqui no canto inferior direito da tela se precisar de mais alguma coisa. Bom trabalho no programa FX! 🎯',
      en: 'You\'re welcome! It was my pleasure to help. I\'m always here in the bottom-right corner if you need anything else. Great work on the FX program! 🎯',
      de: 'Gern geschehen! Es war mir eine Freude zu helfen. Ich bin immer hier in der unteren rechten Ecke. Viel Erfolg im FX-Programm! 🎯',
    },
  },
];

// ---------------------------------------------------------------------------
// Keyword matching
// ---------------------------------------------------------------------------

function matchResponse(question: string, lang: Lang): string {
  const lower = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let bestScore = 0;
  let bestEntry: FaqEntry | null = null;

  for (const entry of FAQ) {
    let score = 0;
    for (const kw of entry.keywords) {
      const kwNorm = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (lower.includes(kwNorm)) {
        score += kwNorm.length > 4 ? 2 : 1; // longer keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore > 0) {
    return bestEntry.response[lang];
  }

  // Fallback
  const fallback: Record<Lang, string> = {
    pt: 'Que boa pergunta! Deixe-me te direcionar: explore o Guia Geral no menu lateral para uma visão completa da plataforma. Se sua dúvida é sobre um módulo específico, me diga qual — posso explicar em detalhes como funciona o Diário, Exchange Center, Innovation Labs, Learning Hub, Mentoria ou qualquer outro módulo.',
    en: 'Great question! Let me guide you: explore the General Guide in the sidebar for a complete platform overview. If your question is about a specific module, let me know which one — I can explain in detail how the Diary, Exchange Center, Innovation Labs, Learning Hub, Mentorship, or any other module works.',
    de: 'Gute Frage! Erkunden Sie den Allgemeinen Leitfaden im Seitenmenü für eine vollständige Plattformübersicht. Wenn Ihre Frage zu einem bestimmten Modul ist, sagen Sie mir welches — ich kann Details erklären.',
  };
  return fallback[lang];
}

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

export async function chatWithFreudy(input: ChatWithFreudyInput): Promise<ChatWithFreudyOutput> {
  const parsedInput = ChatWithFreudyInputSchema.parse(input);
  const history = parsedInput.chatHistory;

  // Get the latest user question
  const question = parsedInput.question ||
    (history.length > 0 && history[history.length - 1]?.from === 'user'
      ? history[history.length - 1]!.text
      : '');

  if (!question.trim()) {
    return { answer: 'Como posso te ajudar hoje?' };
  }

  const lang = parsedInput.language || detectLanguage(question);
  const answer = matchResponse(question, lang);

  // Simulate a slight delay for natural feel
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));

  return { answer };
}
