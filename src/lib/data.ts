

import { type GenerateCourseContentOutput, type CourseQuizQuestion } from "@/ai/flows/generate-course-content";

export type User = {
  name: string;
  avatar: string; // image id from placeholder-images
  email: string;
  role: 'Participante' | 'Mentor' | 'RH' | 'Gestor' | 'Admin';
  status: 'Ativo' | 'Inativo' | 'Aguardando Aprovação';
  unit: string;
  progress: number;
};

export type Company = {
  id: string;
  name: string;
  location: string;
};

export type DiaryEntry = {
  id: string;
  user: Pick<User, 'name' | 'avatar' | 'unit'>;
  date: string;
  type: 'text' | 'image' | 'video';
  content: string;
  attachments?: string[];
  comments: {
    user: Pick<User, 'name' | 'avatar' | 'unit'>;
    text: string;
    date: string;
  }[];
};

export type Goal = {
    id: string;
    title: string;
    description: string;
    status: 'Não Iniciado' | 'Em Andamento' | 'Concluído';
    progress: number;
    evidence: {
        notes: string;
        files: string[];
    };
};

export type Task = {
  id: string;
  title: string;
  status: 'Concluído' | 'Em Andamento' | 'Pendente' | 'Atrasado';
  dueDate: string;
  priority: 'Alta' | 'Média' | 'Baixa';
};

export type Mentorship = {
    mentorEmail: string;
    menteeEmail: string;
};

export type ExchangeOpportunity = {
    id: string;
    title: string;
    company: string;
    department: string;
    description: string;
    skills: string[];
    duration: string;
    location: string;
};

export type Transfer = {
    id: string;
    userName: string;
    userAvatar: string;
    fromCompany: string;
    fromDepartment: string;
    toCompany: string;
    toDepartment: string;
    startDate: string;
    endDate: string;
    status: 'Concluído' | 'Em Andamento' | 'Agendado';
};

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type ChecklistItem = {
    id: string;
    item: string;
    responsible: string;
    status: ApprovalStatus;
};

export type CandidateApproval = {
    userId: string;
    userName: string;
    userAvatar: string;
    unit: string;
    overallStatus: ApprovalStatus;
    checklist: ChecklistItem[];
};

export type Course = {
    id: string;
    category: string;
    imageHint: string;
    imageUrl: string;
    courseTitle: string;
    description: string;
    modules: {
        title: string;
        content: string;
        videoLink?: string;
    }[];
    quiz: CourseQuizQuestion[];
    videoIdeas: string[];
    conclusion: string;
};

export type LearningPath = {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageHint: string;
    courses: string[]; // array of course IDs
};

export type LearningItem = (Course & { type: 'course' }) | (LearningPath & { type: 'path' });

export type LearningAnalyticsKpis = {
    totalEnrollments: number;
    completionRate: number;
    averageScore: number;
    hoursLearned: number;
};

export type UserLearningProgress = {
    userId: string;
    userName: string;
    userAvatar: string;
    completedCourses: number;
    inProgressCourses: number;
    averageScore: number;
};

export type CourseEngagement = {
    courseId: string;
    courseTitle: string;
    likes: number;
    comments: number;
};

export type ChallengeStatus = 'Aberto' | 'Em avaliação' | 'Em experimento' | 'Encerrado';
export type IdeaStatus = 'Submetida' | 'Em Análise' | 'Aprovada' | 'Rejeitada' | 'Em Sprint' | 'Validada' | 'Escalada';
export type SprintStatus = 'Planejamento' | 'Execução' | 'Análise' | 'Encerrado';
export type IdeaTag = 'processo' | 'segurança' | 'custo' | 'ESG' | 'produto' | 'rh';


export type Challenge = {
  id: string;
  title: string;
  description: string;
  targetMetrics: string;
  deadline: string;
  responsible: string;
  status: ChallengeStatus;
  imageUrl: string;
  imageHint: string;
  ideaCount: number;
};

export type Idea = {
  id: string;
  challengeId: string;
  title: string;
  author: Pick<User, 'name' | 'avatar' | 'unit'>;
  problem: string;
  proposal: string;
  impact: number;
  confidence: number;
  effort: number;
  strategicAlignment: number;
  tags: IdeaTag[];
  status: IdeaStatus;
  votes: number;
  submittedDate: string;
};

export type Sprint = {
  ideaId: string;
  hypothesis: string;
  plan: string;
  resources: string;
  risks: string;
  successCriteria: string;
  status: SprintStatus;
  startDate: string;
  endDate: string;
  checkIns: { date: string; update: string }[];
  result: 'Validado' | 'Parcial' | 'Não Validado' | null;
};

export type ActivityFeedItem = {
    id: string;
    type: 'idea' | 'course' | 'diary' | 'challenge' | 'user';
    user: Pick<User, 'name' | 'avatar'>;
    action: string;
    target: string;
    timestamp: string;
    link: string;
};


export const users: User[] = [
  { name: 'Ana Silva', avatar: 'user-avatar-1', email: 'ana.silva@example.com', role: 'Participante', status: 'Ativo', unit: 'Freudenberg-NOK', progress: 75 },
  { name: 'Bruno Costa', avatar: 'user-avatar-2', email: 'bruno.costa@example.com', role: 'Participante', status: 'Ativo', unit: 'EagleBurgmann Brasil', progress: 50 },
  { name: 'Carla Dias', avatar: 'user-avatar-3', email: 'carla.dias@example.com', role: 'Participante', status: 'Aguardando Aprovação', unit: 'Chem-Trend Brasil', progress: 10 },
  { name: 'Daniel Alves', avatar: 'user-avatar-4', email: 'daniel.alves@example.com', role: 'Participante', status: 'Inativo', unit: 'Trelleborg Vibracoustic Brasil', progress: 20 },
  { name: 'Eduarda Lima', avatar: 'user-avatar-5', email: 'eduarda.lima@example.com', role: 'Participante', status: 'Ativo', unit: 'SurTec Brasil', progress: 60 },
  { name: 'Fábio Pereira', avatar: 'user-avatar-6', email: 'fabio.pereira@example.com', role: 'Mentor', status: 'Ativo', unit: 'Klüber Lubrication Brasil', progress: 100 },
  { name: 'Gabriela Ramos', avatar: 'user-avatar-7', email: 'gabriela.ramos@example.com', role: 'RH', status: 'Ativo', unit: 'FRCC SA (escritório regional Freudenberg)', progress: 100 },
  { name: 'Heitor Oliveira', avatar: 'user-avatar-8', email: 'heitor.oliveira@example.com', role: 'Participante', status: 'Aguardando Aprovação', unit: 'Freudenberg Filtration Technologies Brasil', progress: 5 },
  { name: 'Zeke', avatar: 'user-avatar-1', email: 'zeke@example.com', role: 'Admin', status: 'Ativo', unit: 'Freudenberg Performance Materials Brasil', progress: 100 },
];

export const companies: Company[] = [
    { id: 'f-nok', name: 'Freudenberg-NOK', location: 'Diadema – SP' },
    { id: 'f-filt', name: 'Freudenberg Filtration Technologies Brasil', location: 'São José dos Campos – SP' },
    { id: 'f-perf', name: 'Freudenberg Performance Materials Brasil', location: 'São José dos Campos – SP' },
    { id: 'eagle', name: 'EagleBurgmann Brasil', location: 'Campinas – SP' },
    { id: 'trelle', name: 'Trelleborg Vibracoustic Brasil', location: 'São Paulo (SP)' },
    { id: 'chem', name: 'Chem-Trend Brasil', location: 'Valinhos – SP' },
    { id: 'surtec', name: 'SurTec Brasil', location: 'Valinhos – SP' },
    { id: 'kluber', name: 'Klüber Lubrication Brasil', location: 'São Paulo (SP)' },
    { id: 'frcc', name: 'FRCC SA (escritório regional Freudenberg)', location: 'Alphaville (Barueri) – SP' },
];

export const mentorships: Mentorship[] = [
    { mentorEmail: 'fabio.pereira@example.com', menteeEmail: 'ana.silva@example.com' },
    { mentorEmail: 'fabio.pereira@example.com', menteeEmail: 'eduarda.lima@example.com' },
    { mentorEmail: 'gabriela.ramos@example.com', menteeEmail: 'carla.dias@example.com' },
];

export const tasks: { [userEmail: string]: Task[] } = {
    'ana.silva@example.com': [
        { id: 'task-ana-1', title: 'Entregar relatório A3 do projeto de Onboarding', status: 'Pendente', dueDate: 'Em 2 dias', priority: 'Alta' },
        { id: 'task-ana-2', title: 'Agendar validação do protótipo com Unidade de Marketing', status: 'Em Andamento', dueDate: 'Em 1 semana', priority: 'Média' },
        { id: 'task-ana-3', title: 'Completar módulo 3 de Design Thinking', status: 'Concluído', dueDate: 'Há 3 dias', priority: 'Baixa' },
    ],
    'eduarda.lima@example.com': [
        { id: 'task-edu-1', title: 'Análise de dados de engajamento do Diário 4.0', status: 'Atrasado', dueDate: 'Há 2 dias', priority: 'Alta' },
        { id: 'task-edu-2', title: 'Preparar apresentação para o FreudTalks', status: 'Em Andamento', dueDate: 'Em 2 semanas', priority: 'Média' },
    ],
    'carla.dias@example.com': [
         { id: 'task-carla-1', title: 'Revisar políticas de feedback com RH', status: 'Pendente', dueDate: 'Amanhã', priority: 'Alta' },
    ],
};


export const diaryEntries: DiaryEntry[] = [
  {
    id: 'entry1',
    user: { name: 'Ana Silva', avatar: 'user-avatar-1', unit: 'Tecnologia (Empresa A)' },
    date: '3 dias atrás',
    type: 'text',
    content: 'Hoje comecei o módulo de design thinking. Foi muito interessante aprender sobre a importância da empatia no processo de criação. Tive uma ideia para aplicar no nosso próximo projeto de onboarding.',
    comments: [
      {
        user: { name: 'Fábio Pereira', avatar: 'user-avatar-6', unit: 'Tecnologia (Mentor)' },
        text: 'Ótima iniciativa, Ana! Vamos conversar sobre essa ideia na nossa próxima mentoria.',
        date: '2 dias atrás',
      },
    ],
  },
  {
    id: 'entry2',
    user: { name: 'Bruno Costa', avatar: 'user-avatar-2', unit: 'Marketing (Empresa A)' },
    date: '5 dias atrás',
    type: 'image',
    content: 'Participei de um workshop sobre growth hacking. O whiteboard ficou cheio de ideias. Segue a foto para registrar o momento de brainstorming intenso!',
    comments: [],
  },
];

export const userGoals: Goal[] = [
    {
        id: 'goal-1',
        title: 'Desenvolver Protótipo de Onboarding',
        description: 'Criar um protótipo funcional da nova plataforma de onboarding gamificada para validação com o RH.',
        status: 'Em Andamento',
        progress: 40,
        evidence: {
            notes: 'Link para o Figma e rascunho da arquitetura.',
            files: ['prototipo_v1.fig', 'arquitetura.pdf'],
        },
    },
    {
        id: 'goal-2',
        title: 'Apresentar Projeto para Diretoria',
        description: 'Preparar e realizar a apresentação do projeto de onboarding para a diretoria, buscando aprovação para o piloto.',
        status: 'Não Iniciado',
        progress: 0,
        evidence: {
            notes: '',
            files: [],
        },
    },
];

export const kpis = {
  activeParticipants: 4,
  completionRate: 75,
  diaryAdherence: 80,
  feedbackDelivered: 92,
};

export const diaryAdherenceData = [
  { unit: 'Tecnologia', adherence: 95 },
  { unit: 'Marketing', adherence: 80 },
  { unit: 'RH', adherence: 70 },
  { unit: 'Vendas', adherence: 65 },
  { unit: 'Financeiro', adherence: 85 },
];

export const recentTasks: Task[] = [
  { id: 'task1', title: 'Entregar relatório A3 do projeto X', status: 'Pendente', dueDate: 'Em 2 dias', priority: 'Alta' },
  { id: 'task2', title: 'Revisar feedback da unidade receptora', status: 'Em Andamento', dueDate: 'Em 5 dias', priority: 'Média' },
  { id: 'task3', title: 'Preencher diário da semana 4', status: 'Concluído', dueDate: 'Ontem', priority: 'Baixa' },
  { id: 'task4', title: 'Agendar mentoria com Fábio Pereira', status: 'Concluído', dueDate: 'Há 3 dias', priority: 'Média' },
];


export const exchangeOpportunities: ExchangeOpportunity[] = [
    {
        id: 'tech-innovation',
        title: 'Desenvolvedor de Inovação em IA',
        company: 'Empresa A (Tecnologia)',
        department: 'P&D',
        description: 'Junte-se à equipe de inovação para desenvolver e prototipar soluções de IA de ponta que impulsionarão a próxima geração de nossos produtos.',
        skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Prototipagem Rápida'],
        duration: '4 semanas',
        location: 'Remoto/Híbrido'
    },
    {
        id: 'purchasing-negotiation',
        title: 'Comprador Técnico',
        company: 'Empresa B (Autopeças)',
        department: 'Compras',
        description: 'Atue na negociação estratégica com fornecedores de componentes automotivos, buscando otimização de custos e garantia de qualidade para a linha de produção.',
        skills: ['Negociação', 'Análise de Custos', 'Gestão de Fornecedores'],
        duration: '3 semanas',
        location: 'Escritório São Paulo'
    },
    {
        id: 'supplychain-planning',
        title: 'Analista de Planejamento de Demanda',
        company: 'Empresa A (Supply Chain)',
        department: 'Logística',
        description: 'Participe do planejamento de demanda e da gestão de estoques, utilizando ferramentas de previsão para garantir a disponibilidade de produtos.',
        skills: ['Planejamento', 'Previsão de Demanda', 'Gestão de Estoques', 'SAP'],
        duration: '4 semanas',
        location: 'Remoto/Híbrido'
    },
];

export const adminKpis = {
    totalTransfers: 25,
    ongoingTransfers: 8,
    averageStayDays: 28,
    mostActiveOrigin: 'Empresa A - Tecnologia',
    mostActiveDestination: 'Empresa B - Compras',
};

export const transferFlowData = [
    { from: 'Empresa A', to: 'Empresa B', count: 12 },
    { from: 'Empresa B', to: 'Empresa A', count: 6 },
    { from: 'Empresa A', to: 'Empresa A', count: 4 },
    { from: 'Empresa B', to: 'Empresa B', count: 3 },
];

export const transfers: Transfer[] = [
    { id: 't1', userName: 'Ana Silva', userAvatar: 'user-avatar-1', fromCompany: 'Empresa A', fromDepartment: 'Tecnologia', toCompany: 'Empresa B', toDepartment: 'Inovação', startDate: '2025-01-20', endDate: '2025-06-30', status: 'Em Andamento' },
    { id: 't2', userName: 'Bruno Costa', userAvatar: 'user-avatar-2', fromCompany: 'Empresa A', fromDepartment: 'Marketing', toCompany: 'Empresa A', toDepartment: 'Vendas', startDate: '2025-03-15', endDate: '2025-04-15', status: 'Concluído' },
    { id: 't3', userName: 'Eduarda Lima', userAvatar: 'user-avatar-5', fromCompany: 'Empresa B', fromDepartment: 'Tecnologia', toCompany: 'Empresa A', toDepartment: 'P&D', startDate: '2025-07-01', endDate: '2025-07-31', status: 'Agendado' },
];


const checklistTemplate: Omit<ChecklistItem, 'status'>[] = [
    { id: 'approval', item: 'Aprovação formal do gestor e RH', responsible: 'RH/Participante' },
    { id: 'terms', item: 'Assinatura dos Termos (LGPD & NDA)', responsible: 'Participante' },
    { id: 'agenda', item: 'Definição de agenda detalhada', responsible: 'Unidade Receptora' },
    { id: 'mentor', item: 'Definição do(a) mentor(a)', responsible: 'Unidade Receptora' },
    { id: 'tickets', item: 'Emissão de passagens', responsible: 'RH/Participante' },
    { id: 'lodging', item: 'Reserva de hospedagem', responsible: 'RH/Participante' },
    { id: 'docs', item: 'Preparação de documentos pessoais', responsible: 'Participante' },
    { id: 'review', item: 'Revisão de normas e políticas', responsible: 'RH/Participante' },
    { id: 'briefing', item: 'Briefing pré-intercâmbio', responsible: 'RH' },
    { id: 'diary', item: 'Diário de Bordo disponibilizado', responsible: 'RH' },
    { id: 'emergency', item: 'Comunicação de contatos de emergência', responsible: 'RH' },
];

export const candidateApprovals: CandidateApproval[] = [
    {
        userId: 'u3',
        userName: 'Carla Dias',
        userAvatar: 'user-avatar-3',
        unit: 'RH (Empresa A)',
        overallStatus: 'pending',
        checklist: [
            { ...checklistTemplate[0], status: 'approved' },
            { ...checklistTemplate[1], status: 'approved' },
            { ...checklistTemplate[2], status: 'pending' },
            { ...checklistTemplate[3], status: 'pending' },
            { ...checklistTemplate[4], status: 'pending' },
            { ...checklistTemplate[5], status: 'pending' },
            { ...checklistTemplate[6], status: 'approved' },
            { ...checklistTemplate[7], status: 'pending' },
            { ...checklistTemplate[8], status: 'pending' },
            { ...checklistTemplate[9], status: 'approved' },
            { ...checklistTemplate[10], status: 'approved' },
        ],
    },
    {
        userId: 'u8',
        userName: 'Heitor Oliveira',
        userAvatar: 'user-avatar-8',
        unit: 'Compras (Empresa B)',
        overallStatus: 'pending',
        checklist: [
            { ...checklistTemplate[0], status: 'approved' },
            { ...checklistTemplate[1], status: 'pending' },
            { ...checklistTemplate[2], status: 'pending' },
            { ...checklistTemplate[3], status: 'pending' },
            { ...checklistTemplate[4], status: 'pending' },
            { ...checklistTemplate[5], status: 'pending' },
            { ...checklistTemplate[6], status: 'pending' },
            { ...checklistTemplate[7], status: 'pending' },
            { ...checklistTemplate[8], status: 'pending' },
            { ...checklistTemplate[9], status: 'pending' },
            { ...checklistTemplate[10], status: 'pending' },
        ],
    },
];

export let coursesDb: Course[] = [
    {
        id: "tutorial-dpx-platform",
        courseTitle: "Tutorial da Plataforma DPX",
        description: "Aprenda a usar todas as funcionalidades da plataforma DPX Digital para maximizar sua experiência de desenvolvimento profissional.",
        category: "Onboarding",
        imageHint: "digital platform interface",
        imageUrl: "https://picsum.photos/seed/platform-tutorial/600/400",
        modules: [
            {
                title: "Módulo 1: Visão Geral e Navegação",
                content: `Bem-vindo à DPX Digital! Este é o seu guia para explorar todas as funcionalidades da plataforma.

- **Dashboard Principal**: Sua central de comando com KPIs e dados relevantes. A visão muda conforme seu perfil.
- **Barra de Navegação Lateral**: Acesse todos os módulos principais, como Diário 4.0, Learning Hub e Innovation Labs.
- **Simulador de Perfil**: No topo da página, você pode alternar entre as visões de 'Usuário Mentorado', 'Gestor', 'Mentor' e 'Administrador' para entender como a plataforma funciona para cada um.`
            },
            {
                title: "Módulo 2: Diário 4.0 e Agenda",
                content: `O Diário 4.0 é sua principal ferramenta para registrar aprendizados e experiências.

- **Criar Entradas**: Registre atividades com textos, imagens ou vídeos.
- **Anexos e Comentários**: Anexe documentos relevantes e receba feedbacks valiosos de seus mentores diretamente nas suas entradas.
- **Resumo com IA**: Utilize o assistente de IA para gerar um resumo de suas entradas, identificar sentimentos e extrair insights.
- **Agenda**: Fique por dentro de todos os seus compromissos, prazos e eventos do programa.`
            },
            {
                title: "Módulo 3: Innovation Labs",
                content: `Transforme suas ideias em projetos de impacto. Este é o coração da inovação na plataforma.

- **Desafios**: Explore os 'Desafios' abertos por gestores e pelo comitê, que são problemas reais buscando soluções.
- **Submissão de Ideias**: Tem uma solução? Submeta sua 'Ideia', detalhando o problema, a proposta e o impacto esperado. Use a IA para ajudar a refinar sua proposta.
- **Curadoria e Sprints**: As ideias são avaliadas com um score (ICE), votadas e, se aprovadas, entram em um 'Sprint de Experimentação' para validação rápida.
- **Catálogo de Boas Práticas**: Ideias validadas viram 'Playbooks' e ficam disponíveis para que outras áreas possam replicar o sucesso.`
            },
            {
                title: "Módulo 4: Learning Hub",
                content: `Seu portal de conhecimento para desenvolvimento contínuo.

- **Explorar Conteúdo**: Navegue por cursos e 'Trilhas de Aprendizado' disponíveis.
- **Criar com IA**: Use o 'Gerador de Conteúdo' para criar um curso completo a partir de um tópico. A IA irá estruturar módulos, conteúdo e até um quiz.
- **Criar Trilhas**: Agrupe cursos existentes para formar uma jornada de aprendizado lógica e sequencial.`
            },
            {
                title: "Módulo 5: Intercâmbio e Mentoria",
                content: `Ferramentas para ampliar seus horizontes e gerenciar seu desenvolvimento.

- **Central de Intercâmbio**: Encontre oportunidades de job rotation em outras áreas ou empresas do grupo.
- **Central de Mentoria**: Se você é um mentor, acompanhe o progresso e as tarefas dos seus mentorados.
- **Guia Geral**: Consulte as regras, papéis e responsabilidades do programa a qualquer momento.
- **Rede Alumni**: Conecte-se com ex-participantes do programa.`
            }
        ],
        quiz: [
            {
                question: "Onde você pode registrar suas atividades e aprendizados diários?",
                options: ["Innovation Labs", "Diário 4.0", "Learning Hub"],
                correctAnswer: "Diário 4.0",
                explanation: "O Diário 4.0 é o local designado para registrar todas as suas atividades, reflexões e aprendizados durante o programa."
            },
            {
                question: "Qual ferramenta permite criar um novo curso com a ajuda da inteligência artificial?",
                options: ["Gerador de Relatório A3", "Criador de Conteúdo no Learning Hub", "Submissão de Ideia nos Labs"],
                correctAnswer: "Criador de Conteúdo no Learning Hub",
                explanation: "Dentro do Learning Hub, a funcionalidade 'Criar com IA' permite que you gere cursos completos a partir de tópicos e detalhes."
            }
        ],
        videoIdeas: ["Tour guiado pela interface da plataforma.", "Como submeter sua primeira ideia no Innovation Labs."],
        conclusion: "Parabéns! Você concluiu o tutorial da plataforma DPX Digital e está pronto para explorar todo o seu potencial. Boa jornada de desenvolvimento!"
    },
    {
        id: "vendas-01",
        courseTitle: "Venda Consultiva Avançada",
        description: "Aprenda a construir relacionamentos duradouros e a se tornar um conselheiro de confiança para seus clientes.",
        category: "Vendas",
        imageHint: "sales team meeting",
        imageUrl: "https://picsum.photos/seed/sales-team/600/400",
        modules: [
            { title: "Módulo 1: Fundamentos da Venda Consultiva", content: "Conteúdo do Módulo 1..." },
            { title: "Módulo 2: Escuta Ativa e Geração de Rapport", content: "Conteúdo do Módulo 2..." },
            { title: "Módulo 3: Apresentando Soluções de Valor", content: "Conteúdo do Módulo 3..." },
            { title: "Módulo 4: Lidando com Objeções", content: "Conteúdo do Módulo 4..." },
            { title: "Módulo 5: Fechamento e Pós-Venda", content: "Conteúdo do Módulo 5..." },
        ],
        quiz: [
            {
                question: "Qual é o principal foco da venda consultiva?",
                options: ["Vender o produto a qualquer custo", "Entender a necessidade do cliente e oferecer a melhor solução", "Falar sobre as características do produto"],
                correctAnswer: "Entender a necessidade do cliente e oferecer a melhor solução",
                explanation: "Na venda consultiva, o vendedor atua como um consultor, priorizando a resolução do problema do cliente."
            }
        ],
        videoIdeas: ["Simulação de uma reunião de venda consultiva.", "Entrevista com um especialista em negociação."],
        conclusion: "Parabéns por concluir o curso! Você está pronto para aplicar técnicas avançadas de venda e construir relacionamentos de sucesso com seus clientes."
    },
    {
        id: "inovacao-01",
        courseTitle: "Design Thinking na Prática",
        description: "Aplique os princípios do Design Thinking para resolver problemas complexos e inovar em seus projetos.",
        category: "Inovação",
        imageHint: "design thinking workshop",
        imageUrl: "https://picsum.photos/seed/design-workshop/600/400",
        modules: [
            { title: "Módulo 1: Imersão e Empatia", content: "Conteúdo do Módulo 1..." },
            { title: "Módulo 2: Definição do Problema", content: "Conteúdo do Módulo 2..." },
            { title: "Módulo 3: Ideação e Brainstorming", content: "Conteúdo do Módulo 3..." },
            { title: "Módulo 4: Prototipagem e Testes", content: "Conteúdo do Módulo 4..." },
        ],
        quiz: [
            {
                question: "Qual a primeira etapa do Design Thinking?",
                options: ["Prototipagem", "Empatia", "Ideação"],
                correctAnswer: "Empatia",
                explanation: "O processo de Design Thinking começa com a empatia, que é a capacidade de se colocar no lugar do usuário para entender suas dores e necessidades."
            }
        ],
        videoIdeas: ["Case de sucesso de uma empresa que usou Design Thinking.", "Tutorial de ferramentas de prototipagem."],
        conclusion: "Excelente! Agora você tem as ferramentas para aplicar o Design Thinking e gerar soluções inovadoras e centradas no usuário."
    },
    {
        id: "lideranca-01",
        courseTitle: "Liderança Situacional",
        description: "Desenvolva sua capacidade de adaptar seu estilo de liderança a cada situação e a cada membro da equipe.",
        category: "Liderança",
        imageHint: "leadership coaching",
        imageUrl: "https://picsum.photos/seed/leadership-coach/600/400",
        modules: [
            { title: "Módulo 1: O que é Liderança Situacional?", content: "Conteúdo do Módulo 1..." },
            { title: "Módulo 2: Os 4 Estilos de Liderança", content: "Conteúdo do Módulo 2..." },
            { title: "Módulo 3: Níveis de Maturidade da Equipe", content: "Conteúdo do Módulo 3..." },
            { title: "Módulo 4: Diagnosticando a Situação", content: "Conteúdo do Módulo 4..." },
            { title: "Módulo 5: Aplicando o Estilo Correto", content: "Conteúdo do Módulo 5..." },
            { title: "Módulo 6: Desenvolvendo sua Flexibilidade", content: "Conteúdo do Módulo 6..." },
        ],
        quiz: [
            {
                question: "Um colaborador novo na função, mas muito motivado, precisa de qual estilo de liderança?",
                options: ["Direção", "Delegação", "Apoio"],
                correctAnswer: "Direção",
                explanation: "Um colaborador com baixa competência e alto empenho precisa de direção clara para desenvolver suas habilidades, mesmo que já esteja motivado."
            }
        ],
        videoIdeas: ["Role-playing de diferentes estilos de liderança.", "Análise de líderes famosos e seus estilos."],
        conclusion: "Parabéns, líder! Você está mais preparado para adaptar sua liderança, extrair o melhor de sua equipe e alcançar resultados extraordinários."
    }
];

export let learningPathsDb: LearningPath[] = [
    {
        id: 'onboarding-participante',
        title: 'Onboarding para Participantes',
        description: 'Sua jornada inicial para entender a plataforma e se preparar para o sucesso no programa.',
        category: 'Onboarding',
        imageUrl: 'https://picsum.photos/seed/participant-path/600/400',
        imageHint: 'new employee onboarding',
        courses: ['tutorial-dpx-platform', 'inovacao-01'],
    },
    {
        id: 'guia-gestores-mentores',
        title: 'Guia para Gestores e Mentores',
        description: 'Aprenda como acompanhar, avaliar e orientar os participantes para maximizar o impacto do programa.',
        category: 'Gestão',
        imageUrl: 'https://picsum.photos/seed/manager-path/600/400',
        imageHint: 'manager guiding team',
        courses: ['tutorial-dpx-platform', 'lideranca-01'],
    },
    {
        id: 'tech-fundamentals',
        title: 'Fundamentos de Tecnologia',
        description: 'Uma trilha essencial para quem está começando na área de tecnologia.',
        category: 'Tecnologia',
        imageUrl: 'https://picsum.photos/seed/tech-path/600/400',
        imageHint: 'technology abstract',
        courses: ['inovacao-01'],
    }
];

export const addCourseToDb = (course: Course) => {
    // Prevent duplicates
    if (!coursesDb.find(c => c.id === course.id)) {
        coursesDb.push(course);
    }
}

export const addLearningPathToDb = (path: LearningPath) => {
     // Prevent duplicates
    if (!learningPathsDb.find(p => p.id === path.id)) {
        learningPathsDb.push(path);
    }
}

export const getLearningItems = (): LearningItem[] => {
    const courses: LearningItem[] = coursesDb.map(c => ({ ...c, type: 'course' }));
    const paths: LearningItem[] = learningPathsDb.map(p => ({...p, type: 'path'}));
    return [...paths, ...courses];
};

export const learningAnalyticsKpis: LearningAnalyticsKpis = {
    totalEnrollments: 152,
    completionRate: 68,
    averageScore: 88,
    hoursLearned: 430
};

export const userLearningProgress: UserLearningProgress[] = [
    { userId: 'u1', userName: 'Ana Silva', userAvatar: 'user-avatar-1', completedCourses: 3, inProgressCourses: 1, averageScore: 92 },
    { userId: 'u2', userName: 'Bruno Costa', userAvatar: 'user-avatar-2', completedCourses: 1, inProgressCourses: 2, averageScore: 85 },
    { userId: 'u5', userName: 'Eduarda Lima', userAvatar: 'user-avatar-5', completedCourses: 2, inProgressCourses: 1, averageScore: 89 },
];

export const courseEngagement: CourseEngagement[] = [
    { courseId: 'vendas-01', courseTitle: 'Venda Consultiva Avançada', likes: 120, comments: 45 },
    { courseId: 'inovacao-01', courseTitle: 'Design Thinking na Prática', likes: 250, comments: 88 },
    { courseId: 'lideranca-01', courseTitle: 'Liderança Situacional', likes: 180, comments: 62 },
    { courseId: 'tutorial-dpx-platform', courseTitle: 'Tutorial da Plataforma DPX', likes: 350, comments: 12 },
];

export const activityFeed: ActivityFeedItem[] = [
    { id: 'act1', type: 'idea', user: { name: 'Ana Silva', avatar: 'user-avatar-1' }, action: 'submeteu uma nova ideia', target: 'Plataforma de Onboarding Gamificada', timestamp: '2h atrás', link: '/dashboard/innovation-labs/idea/idea-01' },
    { id: 'act2', type: 'course', user: { name: 'Bruno Costa', avatar: 'user-avatar-2' }, action: 'concluiu o curso', target: 'Design Thinking na Prática', timestamp: '8h atrás', link: '/dashboard/learning/inovacao-01' },
    { id: 'act3', type: 'diary', user: { name: 'Eduarda Lima', avatar: 'user-avatar-5' }, action: 'fez uma nova entrada no diário', target: 'Reflexões sobre a semana', timestamp: '1d atrás', link: '/dashboard/diary' },
    { id: 'act4', type: 'challenge', user: { name: 'Gabriela Ramos', avatar: 'user-avatar-7' }, action: 'lançou um novo desafio', target: 'Reduzir Tempo de Onboarding', timestamp: '2d atrás', link: '/dashboard/innovation-labs/challenge-01' },
    { id: 'act5', type: 'user', user: { name: 'Carla Dias', avatar: 'user-avatar-3' }, action: 'iniciou a trilha de aprendizado', target: 'Onboarding para Participantes', timestamp: '3d atrás', link: '/dashboard/learning/onboarding-participante' },
];

// --- Innovation Labs Data ---

export const challenges: Challenge[] = [
    {
        id: 'challenge-01',
        title: 'Reduzir Tempo de Onboarding de Novos Colaboradores',
        description: 'Estamos buscando soluções inovadoras para diminuir o tempo de ramp-up de novos funcionários em 20%, melhorando a experiência e a produtividade inicial.',
        targetMetrics: 'Redução de 20% no tempo de onboarding; Aumento de 15% no NPS interno.',
        deadline: '30/09/2024',
        responsible: 'RH',
        status: 'Aberto',
        imageUrl: 'https://picsum.photos/seed/onboarding/600/400',
        imageHint: 'employee onboarding meeting',
        ideaCount: 3,
    },
    {
        id: 'challenge-02',
        title: 'Otimizar Rota de Produção na Linha 5',
        description: 'A Linha de Produção 5 tem apresentado gargalos que resultam em paradas não programadas. Como podemos otimizar o fluxo e reduzir o tempo de inatividade em 10%?',
        targetMetrics: 'Redução de 10% no tempo de inatividade; Aumento de 5% na produção diária.',
        deadline: '15/10/2024',
        responsible: 'Engenharia',
        status: 'Em avaliação',
        imageUrl: 'https://picsum.photos/seed/factory-line/600/400',
        imageHint: 'factory production line',
        ideaCount: 5,
    }
];

const calculateIceScore = (i: number, c: number, e: number, sa: number) => {
    if (e === 0) return 0;
    return Math.round(((i * c * sa) / e) * 10);
};


export const ideas: Idea[] = [
    {
        id: 'idea-01',
        challengeId: 'challenge-01',
        title: 'Plataforma de Onboarding Gamificada',
        author: { name: 'Ana Silva', avatar: 'user-avatar-1', unit: 'Tecnologia' },
        problem: 'O processo de onboarding atual é muito manual, baseado em PDFs e apresentações, o que gera baixo engajamento e dificuldade em reter informações.',
        proposal: 'Criar um aplicativo móvel com trilhas de aprendizado, quizzes interativos, missões e um sistema de pontos e recompensas para gamificar todo o processo.',
        impact: 9,
        confidence: 8,
        effort: 7,
        strategicAlignment: 9,
        tags: ['rh', 'processo', 'produto'],
        status: 'Em Sprint',
        votes: 15,
        submittedDate: '10/08/2024'
    },
    {
        id: 'idea-02',
        challengeId: 'challenge-01',
        title: 'Buddy System com Mentores Internos',
        author: { name: 'Carla Dias', avatar: 'user-avatar-3', unit: 'RH' },
        problem: 'Novos colaboradores se sentem perdidos e têm dificuldade em encontrar as pessoas certas para tirar dúvidas sobre a cultura e processos internos.',
        proposal: 'Implementar um "Buddy System" formal, onde cada novo colaborador é pareado com um funcionário mais experiente que atuará como um mentor informal nos primeiros 90 dias.',
        impact: 7,
        confidence: 9,
        effort: 3,
        strategicAlignment: 8,
        tags: ['rh', 'processo'],
        status: 'Aprovada',
        votes: 22,
        submittedDate: '12/08/2024'
    },
    {
        id: 'idea-03',
        challengeId: 'challenge-01',
        title: 'Checklist Automatizado no Service Desk',
        author: { name: 'Eduarda Lima', avatar: 'user-avatar-5', unit: 'Tecnologia' },
        problem: 'A criação de acessos e configuração de equipamentos para novos colaboradores é demorada e suscetível a erros manuais, atrasando o primeiro dia produtivo.',
        proposal: 'Desenvolver um workflow automatizado no nosso sistema de Service Desk que, a partir da admissão no RH, cria todas as contas, libera acessos padrão e agenda a configuração do notebook.',
        impact: 8,
        confidence: 9,
        effort: 5,
        strategicAlignment: 7,
        tags: ['processo', 'custo'],
        status: 'Submetida',
        votes: 8,
        submittedDate: '15/08/2024'
    }
].map(idea => ({
    ...idea,
    iceScore: calculateIceScore(idea.impact, idea.confidence, idea.effort, idea.strategicAlignment)
}));


export const sprints: { [ideaId: string]: Sprint } = {
    'idea-01': {
        ideaId: 'idea-01',
        hypothesis: 'Se gamificarmos o onboarding, então o engajamento aumentará em 30% e a retenção de conhecimento melhorará em 25%, medido por quizzes.',
        plan: '1ª semana: Desenvolver protótipo de baixa fidelidade e validar com 5 novos colaboradores. 2ª semana: Desenvolver MVP do app com as funcionalidades de quiz e trilha. 3ª e 4ª semana: Pilotar com um grupo de 10 novos contratados e coletar feedback.',
        resources: '1 Desenvolvedor, 1 Designer UX (part-time)',
        risks: 'Adoção baixa pelos usuários; dificuldade técnica na integração com sistemas de RH.',
        successCriteria: '80% dos participantes do piloto completam a trilha; Média de acertos nos quizzes acima de 85%.',
        status: 'Execução',
        startDate: '20/08/2024',
        endDate: '20/09/2024',
        checkIns: [{ date: '27/08/2024', update: 'Protótipo de baixa fidelidade validado. Feedback positivo sobre a dinâmica de quizzes. Próximo passo é iniciar o desenvolvimento do MVP.' }],
        result: null
    }
};

export const labsAnalytics = {
    kpis: {
        ideasPerChallenge: 2.5,
        approvalRate: 40,
        validationRate: 60,
        avgTimeToEvaluate: 12, // days
        estimatedSavings: 150000,
        realizedSavings: 25000,
    },
    funnelData: [
        { stage: 'Ideias', value: 120 },
        { stage: 'Aprovadas', value: 48 },
        { stage: 'Em Sprint', value: 20 },
        { stage: 'Validadas', value: 12 },
        { stage: 'Escaladas', value: 5 },
    ],
    themesHeatmap: [
        { theme: 'Processos', unit: 'Tecnologia', value: 25 },
        { theme: 'Processos', unit: 'RH', value: 18 },
        { theme: 'Custo', unit: 'Compras', value: 30 },
        { theme: 'Custo', unit: 'Financeiro', value: 22 },
        { theme: 'ESG', unit: 'Marketing', value: 15 },
        { theme: 'Produto', unit: 'Tecnologia', value: 28 },
    ]
};
