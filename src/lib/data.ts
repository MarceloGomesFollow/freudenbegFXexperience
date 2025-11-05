
export type User = {
  name: string;
  avatar: string; // image id from placeholder-images
  email: string;
  role: 'Participante' | 'Mentor' | 'RH';
  status: 'Ativo' | 'Inativo';
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


export const users: User[] = [
  { name: 'Ana Silva', avatar: 'user-avatar-1', email: 'ana.silva@example.com', role: 'Participante', status: 'Ativo', unit: 'Tecnologia', progress: 75 },
  { name: 'Bruno Costa', avatar: 'user-avatar-2', email: 'bruno.costa@example.com', role: 'Participante', status: 'Ativo', unit: 'Marketing', progress: 50 },
  { name: 'Carla Dias', avatar: 'user-avatar-3', email: 'carla.dias@example.com', role: 'Participante', status: 'Ativo', unit: 'RH', progress: 90 },
  { name: 'Daniel Alves', avatar: 'user-avatar-4', email: 'daniel.alves@example.com', role: 'Participante', status: 'Inativo', unit: 'Vendas', progress: 20 },
  { name: 'Eduarda Lima', avatar: 'user-avatar-5', email: 'eduarda.lima@example.com', role: 'Participante', status: 'Ativo', unit: 'Tecnologia', progress: 60 },
  { name: 'Fábio Pereira', avatar: 'user-avatar-6', email: 'fabio.pereira@example.com', role: 'Mentor', status: 'Ativo', unit: 'Tecnologia', progress: 100 },
  { name: 'Gabriela Ramos', avatar: 'user-avatar-7', email: 'gabriela.ramos@example.com', role: 'RH', status: 'Ativo', unit: 'RH', progress: 100 },
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
    user: { name: 'Ana Silva', avatar: 'user-avatar-1', unit: 'Tecnologia' },
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
    user: { name: 'Bruno Costa', avatar: 'user-avatar-2', unit: 'Marketing' },
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
        location: 'Escritório Rio de Janeiro'
    },
    {
        id: 'industrial-process',
        title: 'Engenheiro de Processos Industriais',
        company: 'Empresa B (Autopeças)',
        department: 'Engenharia Industrial',
        description: 'Vivencie a rotina da engenharia de processos em uma planta de autopeças, identificando oportunidades de melhoria e otimização da linha de montagem.',
        skills: ['Lean Manufacturing', 'Six Sigma', 'AutoCAD', 'Melhoria Contínua'],
        duration: '4 semanas',
        location: 'Planta de Campinas'
    },
    {
        id: 'marketing-analytics',
        title: 'Analista de Dados de Marketing',
        company: 'Empresa A (Marketing)',
        department: 'Business Intelligence',
        description: 'Mergulhe nos dados de campanhas para descobrir insights, otimizar o funil de marketing e apresentar suas descobertas para a liderança.',
        skills: ['SQL', 'Tableau', 'Google Analytics', 'Análise de Dados'],
        duration: '3 semanas',
        location: 'Escritório São Paulo'
    },
    {
        id: 'hr-experience',
        title: 'Especialista em Experiência do Colaborador',
        company: 'Empresa A (RH)',
        department: 'Cultura & Engajamento',
        description: 'Participe do projeto de redesenho da jornada do colaborador, conduzindo entrevistas, analisando feedbacks e propondo melhorias de alto impacto.',
        skills: ['Pesquisa de Usuário', 'Comunicação', 'Design de Serviços'],
        duration: '2 semanas',
        location: 'Escritório Rio de Janeiro'
    }
];
