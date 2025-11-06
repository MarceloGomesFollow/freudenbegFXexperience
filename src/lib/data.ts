

import { type GenerateCourseContentOutput, type CourseQuizQuestion } from "@/ai/flows/generate-course-content";

export type User = {
  name: string;
  avatar: string; // image id from placeholder-images
  email: string;
  role: 'Participante' | 'Mentor' | 'RH';
  status: 'Ativo' | 'Inativo' | 'Aguardando Aprovação';
  unit: string;
  progress: number;
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


export const users: User[] = [
  { name: 'Ana Silva', avatar: 'user-avatar-1', email: 'ana.silva@example.com', role: 'Participante', status: 'Ativo', unit: 'Tecnologia (Empresa A)', progress: 75 },
  { name: 'Bruno Costa', avatar: 'user-avatar-2', email: 'bruno.costa@example.com', role: 'Participante', status: 'Ativo', unit: 'Marketing (Empresa A)', progress: 50 },
  { name: 'Carla Dias', avatar: 'user-avatar-3', email: 'carla.dias@example.com', role: 'Participante', status: 'Aguardando Aprovação', unit: 'RH (Empresa A)', progress: 10 },
  { name: 'Daniel Alves', avatar: 'user-avatar-4', email: 'daniel.alves@example.com', role: 'Participante', status: 'Inativo', unit: 'Vendas (Empresa B)', progress: 20 },
  { name: 'Eduarda Lima', avatar: 'user-avatar-5', email: 'eduarda.lima@example.com', role: 'Participante', status: 'Ativo', unit: 'Tecnologia (Empresa B)', progress: 60 },
  { name: 'Fábio Pereira', avatar: 'user-avatar-6', email: 'fabio.pereira@example.com', role: 'Mentor', status: 'Ativo', unit: 'Tecnologia (Empresa A)', progress: 100 },
  { name: 'Gabriela Ramos', avatar: 'user-avatar-7', email: 'gabriela.ramos@example.com', role: 'RH', status: 'Ativo', unit: 'RH (Empresa A)', progress: 100 },
  { name: 'Heitor Oliveira', avatar: 'user-avatar-8', email: 'heitor.oliveira@example.com', role: 'Participante', status: 'Aguardando Aprovação', unit: 'Compras (Empresa B)', progress: 5 },
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
    { id: 't1', userName: 'Ana Silva', userAvatar: 'user-avatar-1', fromCompany: 'Empresa A', fromDepartment: 'Tecnologia', toCompany: 'Empresa B', toDepartment: 'Inovação', startDate: '01/08/24', endDate: '30/08/24', status: 'Em Andamento' },
    { id: 't2', userName: 'Bruno Costa', userAvatar: 'user-avatar-2', fromCompany: 'Empresa A', fromDepartment: 'Marketing', toCompany: 'Empresa A', toDepartment: 'Vendas', startDate: '15/07/24', endDate: '15/08/24', status: 'Concluído' },
    { id: 't3', userName: 'Eduarda Lima', userAvatar: 'user-avatar-5', fromCompany: 'Empresa B', fromDepartment: 'Tecnologia', toCompany: 'Empresa A', toDepartment: 'P&D', startDate: '01/09/24', endDate: '30/09/24', status: 'Agendado' },
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
    coursesDb.push(course);
}

export const addLearningPathToDb = (path: LearningPath) => {
    learningPathsDb.push(path);
}

export const getLearningItems = (): LearningItem[] => {
    const courses: LearningItem[] = coursesDb.map(c => ({ ...c, type: 'course' }));
    const paths: LearningItem[] = learningPathsDb.map(p => ({...p, type: 'path'}));
    return [...paths, ...courses];
};
