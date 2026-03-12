import type { Course, Sprint } from "@/lib/data";

// ─── Translation Map ────────────────────────────────────────────────────────────
// Structure: translations[lang][entity][id][field] = translated string or string[]

type TranslationValue = string | string[];
type TranslationFields = Record<string, TranslationValue>;
type TranslationIds = Record<string, TranslationFields>;
type TranslationEntities = Record<string, TranslationIds>;
type TranslationMap = Record<string, TranslationEntities>;

const translations: TranslationMap = {
  // ═══════════════════════════════════════════════════════════════════════════════
  // PORTUGUESE (exact copies from data.ts)
  // ═══════════════════════════════════════════════════════════════════════════════
  pt: {
    tasks: {
      "task-ana-1": {
        title: "Entregar relatório A3 do projeto de Onboarding",
        dueDate: "Em 2 dias",
      },
      "task-ana-2": {
        title: "Agendar validação do protótipo com Unidade de Marketing",
        dueDate: "Em 1 semana",
      },
      "task-ana-3": {
        title: "Completar módulo 3 de Design Thinking",
        dueDate: "Há 3 dias",
      },
      "task-edu-1": {
        title: "Análise de dados de engajamento do Diário 4.0",
        dueDate: "Há 2 dias",
      },
      "task-edu-2": {
        title: "Preparar apresentação para o FreudTalks",
        dueDate: "Em 2 semanas",
      },
      "task-carla-1": {
        title: "Revisar políticas de feedback com RH",
        dueDate: "Amanhã",
      },
    },
    recentTasks: {
      task1: {
        title: "Entregar relatório A3 do projeto X",
        dueDate: "Em 2 dias",
      },
      task2: {
        title: "Revisar feedback da unidade receptora",
        dueDate: "Em 5 dias",
      },
      task3: {
        title: "Preencher diário da semana 4",
        dueDate: "Ontem",
      },
      task4: {
        title: "Agendar mentoria com Fábio Pereira",
        dueDate: "Há 3 dias",
      },
    },
    diaryEntries: {
      entry1: {
        content:
          "Hoje comecei o módulo de design thinking. Foi muito interessante aprender sobre a importância da empatia no processo de criação. Tive uma ideia para aplicar no nosso próximo projeto de onboarding.",
        commentText:
          "Ótima iniciativa, Ana! Vamos conversar sobre essa ideia na nossa próxima mentoria.",
        date: "3 dias atrás",
      },
      entry2: {
        content:
          "Participei de um workshop sobre growth hacking. O whiteboard ficou cheio de ideias. Segue a foto para registrar o momento de brainstorming intenso!",
        date: "5 dias atrás",
      },
      entry3: {
        content:
          "Finalizei minha primeira semana na unidade receptora. A equipe de P&D me recebeu muito bem e já participei de duas reuniões técnicas sobre formulação de novos produtos. Estou impressionada com o nível de inovação aqui.",
        commentText:
          "Que bom saber que a adaptação está sendo positiva! Continue registrando suas impressões.",
        date: "1 semana atrás",
      },
      entry4: {
        content:
          "Gravei um vídeo resumindo as principais lições aprendidas no workshop de Lean Manufacturing que participei esta semana. A metodologia 5S realmente pode ser aplicada no nosso projeto de onboarding digital!",
        commentText:
          "Excelente conexão entre Lean e o projeto digital. Vamos explorar isso na próxima sessão de mentoria.",
        commentText2:
          "Muito legal o vídeo! Tive insights parecidos quando visitei a linha de produção aqui.",
        date: "1 semana atrás",
      },
      entry5: {
        content:
          "Hoje tive uma reunião com o time de vendas da unidade receptora e percebi como a abordagem consultiva deles é diferente do que praticamos na minha unidade de origem. Eles usam um framework de discovery muito estruturado que quero levar de volta para implementar na nossa equipe.",
        date: "2 semanas atrás",
      },
      entry6: {
        content:
          "Participei do evento FreudTalks sobre sustentabilidade e ESG no grupo Freudenberg. Foto do painel de discussão com representantes de 4 empresas do grupo. Muito inspirador ver o compromisso com práticas sustentáveis em toda a cadeia.",
        commentText:
          "Pena que não pude participar! Poderia compartilhar os slides se tiver acesso?",
        date: "2 semanas atrás",
      },
      entry7: {
        content:
          "Comecei a mapear os processos de compras na Klüber e identifiquei 3 oportunidades de redução de custos que somam aproximadamente R$ 45.000/ano. Vou preparar uma proposta formal para apresentar na próxima reunião com meu mentor.",
        commentText:
          "Números impressionantes, Heitor! Vamos trabalhar juntos na proposta para garantir que os dados estejam sólidos.",
        date: "3 semanas atrás",
      },
      entry8: {
        content:
          "Reflexão sobre o primeiro mês no programa: a maior lição até agora foi entender que cada empresa do grupo tem sua própria cultura, mesmo compartilhando os valores Freudenberg. Aprender a navegar essas diferenças está sendo um desafio enriquecedor.",
        date: "3 semanas atrás",
      },
    },
    goals: {
      "goal-1": {
        title: "Desenvolver Protótipo de Onboarding",
        description:
          "Criar um protótipo funcional da nova plataforma de onboarding gamificada para validação com o RH.",
        evidenceNotes: "Link para o Figma e rascunho da arquitetura.",
      },
      "goal-2": {
        title: "Apresentar Projeto para Diretoria",
        description:
          "Preparar e realizar a apresentação do projeto de onboarding para a diretoria, buscando aprovação para o piloto.",
        evidenceNotes: "",
      },
      "goal-3": {
        title: "Completar Trilha de Liderança Situacional",
        description:
          "Finalizar todos os módulos da trilha de Liderança Situacional no Learning Hub e obter nota mínima de 85% no quiz final.",
        evidenceNotes: "Módulos 1 a 4 concluídos. Falta o módulo 5 e 6 + quiz.",
      },
      "goal-4": {
        title: "Implementar Melhoria de Processo",
        description:
          "Identificar e implementar pelo menos uma melhoria de processo na unidade receptora, documentando resultados mensuráveis.",
        evidenceNotes: "Mapeamento de processos concluído. Proposta em elaboração.",
      },
      "goal-5": {
        title: "Participar de 3 Eventos FreudTalks",
        description:
          "Participar ativamente de pelo menos 3 eventos FreudTalks durante o período do programa como forma de networking e aprendizado.",
        evidenceNotes: "Participou dos eventos de Inovação (Jan), ESG (Fev) e Liderança (Mar).",
      },
      "goal-6": {
        title: "Criar Playbook de Boas Práticas",
        description:
          "Documentar as melhores práticas aprendidas durante o intercâmbio em um playbook que possa ser utilizado por futuros participantes.",
        evidenceNotes: "",
      },
    },
    exchangeOpportunities: {
      "tech-innovation": {
        title: "Desenvolvedor de Inovação em IA",
        description:
          "Junte-se à equipe de inovação para desenvolver e prototipar soluções de IA de ponta que impulsionarão a próxima geração de nossos produtos.",
        skills: ["Python", "TensorFlow", "Scikit-learn", "Prototipagem Rápida"],
        duration: "4 semanas",
        location: "Remoto/Híbrido",
      },
      "purchasing-negotiation": {
        title: "Comprador Técnico",
        description:
          "Atue na negociação estratégica com fornecedores de componentes automotivos, buscando otimização de custos e garantia de qualidade para a linha de produção.",
        skills: ["Negociação", "Análise de Custos", "Gestão de Fornecedores"],
        duration: "3 semanas",
        location: "Escritório São Paulo",
      },
      "supplychain-planning": {
        title: "Analista de Planejamento de Demanda",
        description:
          "Participe do planejamento de demanda e da gestão de estoques, utilizando ferramentas de previsão para garantir a disponibilidade de produtos.",
        skills: ["Planejamento", "Previsão de Demanda", "Gestão de Estoques", "SAP"],
        duration: "4 semanas",
        location: "Remoto/Híbrido",
      },
      "quality-audit": {
        title: "Auditor de Qualidade Interno",
        description:
          "Participe de auditorias internas de qualidade ISO 9001 e IATF 16949, aprendendo metodologias de auditoria e contribuindo para a melhoria contínua dos processos.",
        skills: ["ISO 9001", "IATF 16949", "Auditoria Interna", "Análise de Não-Conformidades"],
        duration: "3 semanas",
        location: "Diadema – SP",
      },
      "esg-sustainability": {
        title: "Analista de Sustentabilidade e ESG",
        description:
          "Contribua para os projetos de ESG do grupo, incluindo relatórios de sustentabilidade, métricas de pegada de carbono e iniciativas de economia circular.",
        skills: ["ESG", "Relatórios GRI", "Pegada de Carbono", "Economia Circular"],
        duration: "4 semanas",
        location: "Alphaville (Barueri) – SP",
      },
      "maintenance-reliability": {
        title: "Engenheiro de Confiabilidade",
        description:
          "Atue no time de manutenção preditiva e confiabilidade, utilizando análise de dados e IoT para otimizar a disponibilidade de equipamentos industriais.",
        skills: ["Manutenção Preditiva", "IoT Industrial", "Análise de Vibração", "FMEA"],
        duration: "4 semanas",
        location: "Campinas – SP",
      },
      "hr-talent-dev": {
        title: "Especialista em Desenvolvimento de Talentos",
        description:
          "Apoie a implementação de programas de desenvolvimento de talentos, incluindo avaliação de competências, planos de desenvolvimento individual e programas de sucessão.",
        skills: ["Gestão de Talentos", "Assessment", "PDI", "Programas de Sucessão"],
        duration: "3 semanas",
        location: "São Paulo (SP)",
      },
    },
    checklist: {
      approval: { item: "Aprovação formal do gestor e RH", responsible: "RH/Participante" },
      terms: { item: "Assinatura dos Termos (LGPD & NDA)", responsible: "Participante" },
      agenda: { item: "Definição de agenda detalhada", responsible: "Unidade Receptora" },
      mentor: { item: "Definição do(a) mentor(a)", responsible: "Unidade Receptora" },
      tickets: { item: "Emissão de passagens", responsible: "RH/Participante" },
      lodging: { item: "Reserva de hospedagem", responsible: "RH/Participante" },
      docs: { item: "Preparação de documentos pessoais", responsible: "Participante" },
      review: { item: "Revisão de normas e políticas", responsible: "RH/Participante" },
      briefing: { item: "Briefing pré-intercâmbio", responsible: "RH" },
      diary: { item: "Diário de Bordo disponibilizado", responsible: "RH" },
      emergency: { item: "Comunicação de contatos de emergência", responsible: "RH" },
    },
    challenges: {
      "challenge-01": {
        title: "Reduzir Tempo de Onboarding de Novos Colaboradores",
        description:
          "Estamos buscando soluções inovadoras para diminuir o tempo de ramp-up de novos funcionários em 20%, melhorando a experiência e a produtividade inicial.",
        targetMetrics:
          "Redução de 20% no tempo de onboarding; Aumento de 15% no NPS interno.",
      },
      "challenge-02": {
        title: "Otimizar Rota de Produção na Linha 5",
        description:
          "A Linha de Produção 5 tem apresentado gargalos que resultam em paradas não programadas. Como podemos otimizar o fluxo e reduzir o tempo de inatividade em 10%?",
        targetMetrics:
          "Redução de 10% no tempo de inatividade; Aumento de 5% na produção diária.",
      },
      "challenge-03": {
        title: "Digitalizar Relatórios de Qualidade",
        description:
          "Os relatórios de qualidade ainda são preenchidos manualmente em papel. Buscamos soluções para digitalizar este processo, reduzindo erros e aumentando a rastreabilidade.",
        targetMetrics:
          "Eliminação de 100% dos formulários em papel; Redução de 30% no tempo de preenchimento.",
      },
      "challenge-04": {
        title: "Reduzir Consumo Energético na Planta",
        description:
          "Nosso consumo energético aumentou 12% no último ano. Precisamos de ideias criativas para reduzir o consumo sem impactar a produtividade.",
        targetMetrics:
          "Redução de 15% no consumo energético; ROI positivo em 12 meses.",
      },
      "challenge-05": {
        title: "Melhorar Integração entre Unidades do Grupo",
        description:
          "Promover maior sinergia e troca de conhecimento entre as diferentes empresas do grupo Freudenberg no Brasil, criando mecanismos de colaboração eficazes.",
        targetMetrics:
          "Aumento de 25% em projetos cross-company; 80% de satisfação em pesquisa de integração.",
      },
    },
    ideas: {
      "idea-01": {
        title: "Plataforma de Onboarding Gamificada",
        problem:
          "O processo de onboarding atual é muito manual, baseado em PDFs e apresentações, o que gera baixo engajamento e dificuldade em reter informações.",
        proposal:
          "Criar um aplicativo móvel com trilhas de aprendizado, quizzes interativos, missões e um sistema de pontos e recompensas para gamificar todo o processo.",
      },
      "idea-02": {
        title: "Buddy System com Mentores Internos",
        problem:
          "Novos colaboradores se sentem perdidos e têm dificuldade em encontrar as pessoas certas para tirar dúvidas sobre a cultura e processos internos.",
        proposal:
          'Implementar um "Buddy System" formal, onde cada novo colaborador é pareado com um funcionário mais experiente que atuará como um mentor informal nos primeiros 90 dias.',
      },
      "idea-03": {
        title: "Checklist Automatizado no Service Desk",
        problem:
          "A criação de acessos e configuração de equipamentos para novos colaboradores é demorada e suscetível a erros manuais, atrasando o primeiro dia produtivo.",
        proposal:
          "Desenvolver um workflow automatizado no nosso sistema de Service Desk que, a partir da admissão no RH, cria todas as contas, libera acessos padrão e agenda a configuração do notebook.",
      },
    },
    sprints: {
      "idea-01": {
        hypothesis:
          "Se gamificarmos o onboarding, então o engajamento aumentará em 30% e a retenção de conhecimento melhorará em 25%, medido por quizzes.",
        plan: "1ª semana: Desenvolver protótipo de baixa fidelidade e validar com 5 novos colaboradores. 2ª semana: Desenvolver MVP do app com as funcionalidades de quiz e trilha. 3ª e 4ª semana: Pilotar com um grupo de 10 novos contratados e coletar feedback.",
        resources: "1 Desenvolvedor, 1 Designer UX (part-time)",
        risks: "Adoção baixa pelos usuários; dificuldade técnica na integração com sistemas de RH.",
        successCriteria:
          "80% dos participantes do piloto completam a trilha; Média de acertos nos quizzes acima de 85%.",
        checkInUpdate:
          "Protótipo de baixa fidelidade validado. Feedback positivo sobre a dinâmica de quizzes. Próximo passo é iniciar o desenvolvimento do MVP.",
      },
    },
    activityFeed: {
      act1: { target: "Plataforma de Onboarding Gamificada" },
      act2: { target: "Design Thinking na Prática" },
      act3: { target: "Reflexões sobre a semana" },
      act4: { target: "Reduzir Tempo de Onboarding" },
      act5: { target: "Onboarding para Participantes" },
    },
    analytics: {
      funnelStages: {
        Ideias: "Ideias",
        Aprovadas: "Aprovadas",
        "Em Sprint": "Em Sprint",
        Validadas: "Validadas",
        Escaladas: "Escaladas",
      },
      heatmapThemes: {
        Processos: "Processos",
        Custo: "Custo",
        ESG: "ESG",
        Produto: "Produto",
      },
      heatmapUnits: {
        Tecnologia: "Tecnologia",
        RH: "RH",
        Compras: "Compras",
        Financeiro: "Financeiro",
        Marketing: "Marketing",
      },
      diaryAdherenceUnits: {
        Tecnologia: "Tecnologia",
        Marketing: "Marketing",
        RH: "RH",
        Vendas: "Vendas",
        Financeiro: "Financeiro",
      },
    },
    courses: {
      "tutorial-dpx-platform": {
        courseTitle: "Tutorial da Plataforma DPX",
        description:
          "Aprenda a usar todas as funcionalidades da plataforma DPX Digital para maximizar sua experiência de desenvolvimento profissional.",
        "module-0-title": "Módulo 1: Visão Geral e Navegação",
        "module-0-content": `Bem-vindo à DPX Digital! Este é o seu guia para explorar todas as funcionalidades da plataforma.

- **Dashboard Principal**: Sua central de comando com KPIs e dados relevantes. A visão muda conforme seu perfil.
- **Barra de Navegação Lateral**: Acesse todos os módulos principais, como Diário 4.0, Learning Hub e Innovation Labs.
- **Simulador de Perfil**: No topo da página, você pode alternar entre as visões de 'Usuário Mentorado', 'Gestor', 'Mentor' e 'Administrador' para entender como a plataforma funciona para cada um.`,
        "module-1-title": "Módulo 2: Diário 4.0 e Agenda",
        "module-1-content": `O Diário 4.0 é sua principal ferramenta para registrar aprendizados e experiências.

- **Criar Entradas**: Registre atividades com textos, imagens ou vídeos.
- **Anexos e Comentários**: Anexe documentos relevantes e receba feedbacks valiosos de seus mentores diretamente nas suas entradas.
- **Resumo com IA**: Utilize o assistente de IA para gerar um resumo de suas entradas, identificar sentimentos e extrair insights.
- **Agenda**: Fique por dentro de todos os seus compromissos, prazos e eventos do programa.`,
        "module-2-title": "Módulo 3: Innovation Labs",
        "module-2-content": `Transforme suas ideias em projetos de impacto. Este é o coração da inovação na plataforma.

- **Desafios**: Explore os 'Desafios' abertos por gestores e pelo comitê, que são problemas reais buscando soluções.
- **Submissão de Ideias**: Tem uma solução? Submeta sua 'Ideia', detalhando o problema, a proposta e o impacto esperado. Use a IA para ajudar a refinar sua proposta.
- **Curadoria e Sprints**: As ideias são avaliadas com um score (ICE), votadas e, se aprovadas, entram em um 'Sprint de Experimentação' para validação rápida.
- **Catálogo de Boas Práticas**: Ideias validadas viram 'Playbooks' e ficam disponíveis para que outras áreas possam replicar o sucesso.`,
        "module-3-title": "Módulo 4: Learning Hub",
        "module-3-content": `Seu portal de conhecimento para desenvolvimento contínuo.

- **Explorar Conteúdo**: Navegue por cursos e 'Trilhas de Aprendizado' disponíveis.
- **Criar com IA**: Use o 'Gerador de Conteúdo' para criar um curso completo a partir de um tópico. A IA irá estruturar módulos, conteúdo e até um quiz.
- **Criar Trilhas**: Agrupe cursos existentes para formar uma jornada de aprendizado lógica e sequencial.`,
        "module-4-title": "Módulo 5: Intercâmbio e Mentoria",
        "module-4-content": `Ferramentas para ampliar seus horizontes e gerenciar seu desenvolvimento.

- **Central de Intercâmbio**: Encontre oportunidades de job rotation em outras áreas ou empresas do grupo.
- **Central de Mentoria**: Se você é um mentor, acompanhe o progresso e as tarefas dos seus mentorados.
- **Guia Geral**: Consulte as regras, papéis e responsabilidades do programa a qualquer momento.
- **Rede Alumni**: Conecte-se com ex-participantes do programa.`,
        "quiz-0-question": "Onde você pode registrar suas atividades e aprendizados diários?",
        "quiz-0-options": ["Innovation Labs", "Diário 4.0", "Learning Hub"],
        "quiz-0-correctAnswer": "Diário 4.0",
        "quiz-0-explanation":
          "O Diário 4.0 é o local designado para registrar todas as suas atividades, reflexões e aprendizados durante o programa.",
        "quiz-1-question":
          "Qual ferramenta permite criar um novo curso com a ajuda da inteligência artificial?",
        "quiz-1-options": [
          "Gerador de Relatório A3",
          "Criador de Conteúdo no Learning Hub",
          "Submissão de Ideia nos Labs",
        ],
        "quiz-1-correctAnswer": "Criador de Conteúdo no Learning Hub",
        "quiz-1-explanation":
          "Dentro do Learning Hub, a funcionalidade 'Criar com IA' permite que you gere cursos completos a partir de tópicos e detalhes.",
        videoIdeas: [
          "Tour guiado pela interface da plataforma.",
          "Como submeter sua primeira ideia no Innovation Labs.",
        ],
        conclusion:
          "Parabéns! Você concluiu o tutorial da plataforma DPX Digital e está pronto para explorar todo o seu potencial. Boa jornada de desenvolvimento!",
      },
      "vendas-01": {
        courseTitle: "Venda Consultiva Avançada",
        description:
          "Aprenda a construir relacionamentos duradouros e a se tornar um conselheiro de confiança para seus clientes.",
        "module-0-title": "Módulo 1: Fundamentos da Venda Consultiva",
        "module-0-content": "Conteúdo do Módulo 1...",
        "module-1-title": "Módulo 2: Escuta Ativa e Geração de Rapport",
        "module-1-content": "Conteúdo do Módulo 2...",
        "module-2-title": "Módulo 3: Apresentando Soluções de Valor",
        "module-2-content": "Conteúdo do Módulo 3...",
        "module-3-title": "Módulo 4: Lidando com Objeções",
        "module-3-content": "Conteúdo do Módulo 4...",
        "module-4-title": "Módulo 5: Fechamento e Pós-Venda",
        "module-4-content": "Conteúdo do Módulo 5...",
        "quiz-0-question": "Qual é o principal foco da venda consultiva?",
        "quiz-0-options": [
          "Vender o produto a qualquer custo",
          "Entender a necessidade do cliente e oferecer a melhor solução",
          "Falar sobre as características do produto",
        ],
        "quiz-0-correctAnswer": "Entender a necessidade do cliente e oferecer a melhor solução",
        "quiz-0-explanation":
          "Na venda consultiva, o vendedor atua como um consultor, priorizando a resolução do problema do cliente.",
        videoIdeas: [
          "Simulação de uma reunião de venda consultiva.",
          "Entrevista com um especialista em negociação.",
        ],
        conclusion:
          "Parabéns por concluir o curso! Você está pronto para aplicar técnicas avançadas de venda e construir relacionamentos de sucesso com seus clientes.",
      },
      "inovacao-01": {
        courseTitle: "Design Thinking na Prática",
        description:
          "Aplique os princípios do Design Thinking para resolver problemas complexos e inovar em seus projetos.",
        "module-0-title": "Módulo 1: Imersão e Empatia",
        "module-0-content": "Conteúdo do Módulo 1...",
        "module-1-title": "Módulo 2: Definição do Problema",
        "module-1-content": "Conteúdo do Módulo 2...",
        "module-2-title": "Módulo 3: Ideação e Brainstorming",
        "module-2-content": "Conteúdo do Módulo 3...",
        "module-3-title": "Módulo 4: Prototipagem e Testes",
        "module-3-content": "Conteúdo do Módulo 4...",
        "quiz-0-question": "Qual a primeira etapa do Design Thinking?",
        "quiz-0-options": ["Prototipagem", "Empatia", "Ideação"],
        "quiz-0-correctAnswer": "Empatia",
        "quiz-0-explanation":
          "O processo de Design Thinking começa com a empatia, que é a capacidade de se colocar no lugar do usuário para entender suas dores e necessidades.",
        videoIdeas: [
          "Case de sucesso de uma empresa que usou Design Thinking.",
          "Tutorial de ferramentas de prototipagem.",
        ],
        conclusion:
          "Excelente! Agora você tem as ferramentas para aplicar o Design Thinking e gerar soluções inovadoras e centradas no usuário.",
      },
      "lideranca-01": {
        courseTitle: "Liderança Situacional",
        description:
          "Desenvolva sua capacidade de adaptar seu estilo de liderança a cada situação e a cada membro da equipe.",
        "module-0-title": "Módulo 1: O que é Liderança Situacional?",
        "module-0-content": "Conteúdo do Módulo 1...",
        "module-1-title": "Módulo 2: Os 4 Estilos de Liderança",
        "module-1-content": "Conteúdo do Módulo 2...",
        "module-2-title": "Módulo 3: Níveis de Maturidade da Equipe",
        "module-2-content": "Conteúdo do Módulo 3...",
        "module-3-title": "Módulo 4: Diagnosticando a Situação",
        "module-3-content": "Conteúdo do Módulo 4...",
        "module-4-title": "Módulo 5: Aplicando o Estilo Correto",
        "module-4-content": "Conteúdo do Módulo 5...",
        "module-5-title": "Módulo 6: Desenvolvendo sua Flexibilidade",
        "module-5-content": "Conteúdo do Módulo 6...",
        "quiz-0-question":
          "Um colaborador novo na função, mas muito motivado, precisa de qual estilo de liderança?",
        "quiz-0-options": ["Direção", "Delegação", "Apoio"],
        "quiz-0-correctAnswer": "Direção",
        "quiz-0-explanation":
          "Um colaborador com baixa competência e alto empenho precisa de direção clara para desenvolver suas habilidades, mesmo que já esteja motivado.",
        videoIdeas: [
          "Role-playing de diferentes estilos de liderança.",
          "Análise de líderes famosos e seus estilos.",
        ],
        conclusion:
          "Parabéns, líder! Você está mais preparado para adaptar sua liderança, extrair o melhor de sua equipe e alcançar resultados extraordinários.",
      },
    },
    learningPaths: {
      "onboarding-participante": {
        title: "Onboarding para Participantes",
        description:
          "Sua jornada inicial para entender a plataforma e se preparar para o sucesso no programa.",
      },
      "guia-gestores-mentores": {
        title: "Guia para Gestores e Mentores",
        description:
          "Aprenda como acompanhar, avaliar e orientar os participantes para maximizar o impacto do programa.",
      },
      "tech-fundamentals": {
        title: "Fundamentos de Tecnologia",
        description:
          "Uma trilha essencial para quem está começando na área de tecnologia.",
      },
    },
    courseEngagement: {
      "vendas-01": { courseTitle: "Venda Consultiva Avançada" },
      "inovacao-01": { courseTitle: "Design Thinking na Prática" },
      "lideranca-01": { courseTitle: "Liderança Situacional" },
      "tutorial-dpx-platform": { courseTitle: "Tutorial da Plataforma DPX" },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ═══════════════════════════════════════════════════════════════════════════════
  en: {
    tasks: {
      "task-ana-1": {
        title: "Deliver A3 report for the Onboarding project",
        dueDate: "In 2 days",
      },
      "task-ana-2": {
        title: "Schedule prototype validation with Marketing Unit",
        dueDate: "In 1 week",
      },
      "task-ana-3": {
        title: "Complete Design Thinking module 3",
        dueDate: "3 days ago",
      },
      "task-edu-1": {
        title: "Diary 4.0 engagement data analysis",
        dueDate: "2 days ago",
      },
      "task-edu-2": {
        title: "Prepare presentation for FreudTalks",
        dueDate: "In 2 weeks",
      },
      "task-carla-1": {
        title: "Review feedback policies with HR",
        dueDate: "Tomorrow",
      },
    },
    recentTasks: {
      task1: {
        title: "Deliver A3 report for project X",
        dueDate: "In 2 days",
      },
      task2: {
        title: "Review feedback from receiving unit",
        dueDate: "In 5 days",
      },
      task3: {
        title: "Fill in week 4 diary",
        dueDate: "Yesterday",
      },
      task4: {
        title: "Schedule mentoring with Fábio Pereira",
        dueDate: "3 days ago",
      },
    },
    diaryEntries: {
      entry1: {
        content:
          "Today I started the design thinking module. It was very interesting to learn about the importance of empathy in the creative process. I had an idea to apply in our next onboarding project.",
        commentText:
          "Great initiative, Ana! Let's talk about this idea in our next mentoring session.",
        date: "3 days ago",
      },
      entry2: {
        content:
          "I attended a workshop on growth hacking. The whiteboard was full of ideas. Here's the photo to capture the intense brainstorming moment!",
        date: "5 days ago",
      },
      entry3: {
        content:
          "I finished my first week at the receiving unit. The R&D team welcomed me warmly and I already participated in two technical meetings on new product formulation. I am impressed with the level of innovation here.",
        commentText:
          "Great to hear that the adaptation is going well! Keep recording your impressions.",
        date: "1 week ago",
      },
      entry4: {
        content:
          "I recorded a video summarizing the main lessons learned at the Lean Manufacturing workshop I attended this week. The 5S methodology can really be applied to our digital onboarding project!",
        commentText:
          "Excellent connection between Lean and the digital project. Let's explore this in the next mentoring session.",
        commentText2:
          "Very cool video! I had similar insights when I visited the production line here.",
        date: "1 week ago",
      },
      entry5: {
        content:
          "Today I had a meeting with the sales team at the receiving unit and realized how different their consultative approach is from what we practice at my home unit. They use a very structured discovery framework that I want to bring back and implement in our team.",
        date: "2 weeks ago",
      },
      entry6: {
        content:
          "I attended the FreudTalks event on sustainability and ESG at the Freudenberg group. Photo of the panel discussion with representatives from 4 group companies. Very inspiring to see the commitment to sustainable practices across the entire chain.",
        commentText:
          "Too bad I couldn't attend! Could you share the slides if you have access?",
        date: "2 weeks ago",
      },
      entry7: {
        content:
          "I started mapping the procurement processes at Klüber and identified 3 cost reduction opportunities totaling approximately R$ 45,000/year. I will prepare a formal proposal to present at the next meeting with my mentor.",
        commentText:
          "Impressive numbers, Heitor! Let's work together on the proposal to make sure the data is solid.",
        date: "3 weeks ago",
      },
      entry8: {
        content:
          "Reflection on the first month in the program: the biggest lesson so far has been understanding that each company in the group has its own culture, even while sharing Freudenberg values. Learning to navigate these differences has been an enriching challenge.",
        date: "3 weeks ago",
      },
    },
    goals: {
      "goal-1": {
        title: "Develop Onboarding Prototype",
        description:
          "Create a functional prototype of the new gamified onboarding platform for validation with HR.",
        evidenceNotes: "Link to Figma and architecture draft.",
      },
      "goal-2": {
        title: "Present Project to Board of Directors",
        description:
          "Prepare and deliver the onboarding project presentation to the board of directors, seeking approval for the pilot.",
        evidenceNotes: "",
      },
      "goal-3": {
        title: "Complete Situational Leadership Path",
        description:
          "Complete all modules of the Situational Leadership path in the Learning Hub and achieve a minimum score of 85% on the final quiz.",
        evidenceNotes: "Modules 1 to 4 completed. Modules 5 and 6 + quiz remaining.",
      },
      "goal-4": {
        title: "Implement Process Improvement",
        description:
          "Identify and implement at least one process improvement at the receiving unit, documenting measurable results.",
        evidenceNotes: "Process mapping completed. Proposal in progress.",
      },
      "goal-5": {
        title: "Attend 3 FreudTalks Events",
        description:
          "Actively participate in at least 3 FreudTalks events during the program period as a form of networking and learning.",
        evidenceNotes: "Attended the Innovation (Jan), ESG (Feb), and Leadership (Mar) events.",
      },
      "goal-6": {
        title: "Create Best Practices Playbook",
        description:
          "Document the best practices learned during the exchange in a playbook that can be used by future participants.",
        evidenceNotes: "",
      },
    },
    exchangeOpportunities: {
      "tech-innovation": {
        title: "AI Innovation Developer",
        description:
          "Join the innovation team to develop and prototype cutting-edge AI solutions that will drive the next generation of our products.",
        skills: ["Python", "TensorFlow", "Scikit-learn", "Rapid Prototyping"],
        duration: "4 weeks",
        location: "Remote/Hybrid",
      },
      "purchasing-negotiation": {
        title: "Technical Buyer",
        description:
          "Work on strategic negotiation with automotive component suppliers, seeking cost optimization and quality assurance for the production line.",
        skills: ["Negotiation", "Cost Analysis", "Supplier Management"],
        duration: "3 weeks",
        location: "São Paulo Office",
      },
      "supplychain-planning": {
        title: "Demand Planning Analyst",
        description:
          "Participate in demand planning and inventory management, using forecasting tools to ensure product availability.",
        skills: ["Planning", "Demand Forecasting", "Inventory Management", "SAP"],
        duration: "4 weeks",
        location: "Remote/Hybrid",
      },
      "quality-audit": {
        title: "Internal Quality Auditor",
        description:
          "Participate in internal quality audits for ISO 9001 and IATF 16949, learning audit methodologies and contributing to continuous process improvement.",
        skills: ["ISO 9001", "IATF 16949", "Internal Auditing", "Non-Conformity Analysis"],
        duration: "3 weeks",
        location: "Diadema – SP",
      },
      "esg-sustainability": {
        title: "Sustainability and ESG Analyst",
        description:
          "Contribute to the group's ESG projects, including sustainability reports, carbon footprint metrics, and circular economy initiatives.",
        skills: ["ESG", "GRI Reports", "Carbon Footprint", "Circular Economy"],
        duration: "4 weeks",
        location: "Alphaville (Barueri) – SP",
      },
      "maintenance-reliability": {
        title: "Reliability Engineer",
        description:
          "Work with the predictive maintenance and reliability team, using data analysis and IoT to optimize industrial equipment availability.",
        skills: ["Predictive Maintenance", "Industrial IoT", "Vibration Analysis", "FMEA"],
        duration: "4 weeks",
        location: "Campinas – SP",
      },
      "hr-talent-dev": {
        title: "Talent Development Specialist",
        description:
          "Support the implementation of talent development programs, including competency assessment, individual development plans, and succession programs.",
        skills: ["Talent Management", "Assessment", "IDP", "Succession Programs"],
        duration: "3 weeks",
        location: "São Paulo (SP)",
      },
    },
    checklist: {
      approval: { item: "Formal approval from manager and HR", responsible: "HR/Participant" },
      terms: { item: "Signing of Terms (LGPD & NDA)", responsible: "Participant" },
      agenda: { item: "Detailed agenda definition", responsible: "Receiving Unit" },
      mentor: { item: "Mentor assignment", responsible: "Receiving Unit" },
      tickets: { item: "Travel ticket issuance", responsible: "HR/Participant" },
      lodging: { item: "Accommodation booking", responsible: "HR/Participant" },
      docs: { item: "Personal documents preparation", responsible: "Participant" },
      review: { item: "Review of standards and policies", responsible: "HR/Participant" },
      briefing: { item: "Pre-exchange briefing", responsible: "HR" },
      diary: { item: "Logbook made available", responsible: "HR" },
      emergency: { item: "Emergency contacts communication", responsible: "HR" },
    },
    challenges: {
      "challenge-01": {
        title: "Reduce Onboarding Time for New Employees",
        description:
          "We are seeking innovative solutions to reduce the ramp-up time for new employees by 20%, improving the experience and initial productivity.",
        targetMetrics:
          "20% reduction in onboarding time; 15% increase in internal NPS.",
      },
      "challenge-02": {
        title: "Optimize Production Route on Line 5",
        description:
          "Production Line 5 has been experiencing bottlenecks resulting in unplanned shutdowns. How can we optimize the flow and reduce downtime by 10%?",
        targetMetrics:
          "10% reduction in downtime; 5% increase in daily production.",
      },
      "challenge-03": {
        title: "Digitize Quality Reports",
        description:
          "Quality reports are still filled out manually on paper. We are looking for solutions to digitize this process, reducing errors and increasing traceability.",
        targetMetrics:
          "Elimination of 100% of paper forms; 30% reduction in fill-out time.",
      },
      "challenge-04": {
        title: "Reduce Energy Consumption at the Plant",
        description:
          "Our energy consumption increased by 12% last year. We need creative ideas to reduce consumption without impacting productivity.",
        targetMetrics:
          "15% reduction in energy consumption; Positive ROI within 12 months.",
      },
      "challenge-05": {
        title: "Improve Integration Between Group Units",
        description:
          "Promote greater synergy and knowledge exchange between the different Freudenberg group companies in Brazil, creating effective collaboration mechanisms.",
        targetMetrics:
          "25% increase in cross-company projects; 80% satisfaction in integration survey.",
      },
    },
    ideas: {
      "idea-01": {
        title: "Gamified Onboarding Platform",
        problem:
          "The current onboarding process is very manual, based on PDFs and presentations, resulting in low engagement and difficulty retaining information.",
        proposal:
          "Create a mobile application with learning paths, interactive quizzes, missions, and a points and rewards system to gamify the entire process.",
      },
      "idea-02": {
        title: "Buddy System with Internal Mentors",
        problem:
          "New employees feel lost and have difficulty finding the right people to ask questions about the culture and internal processes.",
        proposal:
          'Implement a formal "Buddy System" where each new employee is paired with a more experienced colleague who will act as an informal mentor for the first 90 days.',
      },
      "idea-03": {
        title: "Automated Checklist in Service Desk",
        problem:
          "Creating access credentials and configuring equipment for new employees is time-consuming and prone to manual errors, delaying the first productive day.",
        proposal:
          "Develop an automated workflow in our Service Desk system that, upon HR admission, creates all accounts, grants standard access, and schedules notebook configuration.",
      },
    },
    sprints: {
      "idea-01": {
        hypothesis:
          "If we gamify onboarding, engagement will increase by 30% and knowledge retention will improve by 25%, as measured by quizzes.",
        plan: "Week 1: Develop low-fidelity prototype and validate with 5 new employees. Week 2: Develop app MVP with quiz and learning path features. Weeks 3 & 4: Pilot with a group of 10 new hires and collect feedback.",
        resources: "1 Developer, 1 UX Designer (part-time)",
        risks: "Low user adoption; technical difficulty integrating with HR systems.",
        successCriteria:
          "80% of pilot participants complete the learning path; Average quiz score above 85%.",
        checkInUpdate:
          "Low-fidelity prototype validated. Positive feedback on quiz dynamics. Next step is to start MVP development.",
      },
    },
    activityFeed: {
      act1: { target: "Gamified Onboarding Platform" },
      act2: { target: "Design Thinking in Practice" },
      act3: { target: "Reflections on the week" },
      act4: { target: "Reduce Onboarding Time" },
      act5: { target: "Participant Onboarding" },
    },
    analytics: {
      funnelStages: {
        Ideias: "Ideas",
        Aprovadas: "Approved",
        "Em Sprint": "In Sprint",
        Validadas: "Validated",
        Escaladas: "Scaled",
      },
      heatmapThemes: {
        Processos: "Processes",
        Custo: "Cost",
        ESG: "ESG",
        Produto: "Product",
      },
      heatmapUnits: {
        Tecnologia: "Technology",
        RH: "HR",
        Compras: "Purchasing",
        Financeiro: "Finance",
        Marketing: "Marketing",
      },
      diaryAdherenceUnits: {
        Tecnologia: "Technology",
        Marketing: "Marketing",
        RH: "HR",
        Vendas: "Sales",
        Financeiro: "Finance",
      },
    },
    courses: {
      "tutorial-dpx-platform": {
        courseTitle: "DPX Platform Tutorial",
        description:
          "Learn how to use all the features of the DPX Digital platform to maximize your professional development experience.",
        "module-0-title": "Module 1: Overview and Navigation",
        "module-0-content": `Welcome to DPX Digital! This is your guide to exploring all the platform's features.

- **Main Dashboard**: Your command center with KPIs and relevant data. The view changes according to your profile.
- **Side Navigation Bar**: Access all main modules, such as Diary 4.0, Learning Hub, and Innovation Labs.
- **Profile Simulator**: At the top of the page, you can switch between the views of 'Mentored User', 'Manager', 'Mentor', and 'Administrator' to understand how the platform works for each role.`,
        "module-1-title": "Module 2: Diary 4.0 and Calendar",
        "module-1-content": `Diary 4.0 is your main tool for recording learnings and experiences.

- **Create Entries**: Record activities with text, images, or videos.
- **Attachments and Comments**: Attach relevant documents and receive valuable feedback from your mentors directly on your entries.
- **AI Summary**: Use the AI assistant to generate a summary of your entries, identify sentiments, and extract insights.
- **Calendar**: Stay up to date with all your appointments, deadlines, and program events.`,
        "module-2-title": "Module 3: Innovation Labs",
        "module-2-content": `Transform your ideas into impactful projects. This is the heart of innovation on the platform.

- **Challenges**: Explore the 'Challenges' opened by managers and the committee, which are real problems seeking solutions.
- **Idea Submission**: Have a solution? Submit your 'Idea', detailing the problem, the proposal, and the expected impact. Use AI to help refine your proposal.
- **Curation and Sprints**: Ideas are evaluated with a score (ICE), voted on, and if approved, enter an 'Experimentation Sprint' for rapid validation.
- **Best Practices Catalog**: Validated ideas become 'Playbooks' and are available for other areas to replicate the success.`,
        "module-3-title": "Module 4: Learning Hub",
        "module-3-content": `Your knowledge portal for continuous development.

- **Explore Content**: Browse available courses and 'Learning Paths'.
- **Create with AI**: Use the 'Content Generator' to create a complete course from a topic. The AI will structure modules, content, and even a quiz.
- **Create Paths**: Group existing courses to form a logical and sequential learning journey.`,
        "module-4-title": "Module 5: Exchange and Mentorship",
        "module-4-content": `Tools to broaden your horizons and manage your development.

- **Exchange Center**: Find job rotation opportunities in other areas or group companies.
- **Mentorship Center**: If you are a mentor, track the progress and tasks of your mentees.
- **General Guide**: Consult the program's rules, roles, and responsibilities at any time.
- **Alumni Network**: Connect with former program participants.`,
        "quiz-0-question": "Where can you record your daily activities and learnings?",
        "quiz-0-options": ["Innovation Labs", "Diary 4.0", "Learning Hub"],
        "quiz-0-correctAnswer": "Diary 4.0",
        "quiz-0-explanation":
          "Diary 4.0 is the designated place to record all your activities, reflections, and learnings during the program.",
        "quiz-1-question":
          "Which tool allows you to create a new course with the help of artificial intelligence?",
        "quiz-1-options": [
          "A3 Report Generator",
          "Content Creator in Learning Hub",
          "Idea Submission in Labs",
        ],
        "quiz-1-correctAnswer": "Content Creator in Learning Hub",
        "quiz-1-explanation":
          "Within the Learning Hub, the 'Create with AI' feature allows you to generate complete courses from topics and details.",
        videoIdeas: [
          "Guided tour of the platform interface.",
          "How to submit your first idea in Innovation Labs.",
        ],
        conclusion:
          "Congratulations! You have completed the DPX Digital platform tutorial and are ready to explore its full potential. Have a great development journey!",
      },
      "vendas-01": {
        courseTitle: "Advanced Consultative Selling",
        description:
          "Learn how to build lasting relationships and become a trusted advisor for your clients.",
        "module-0-title": "Module 1: Fundamentals of Consultative Selling",
        "module-0-content": "Module 1 content...",
        "module-1-title": "Module 2: Active Listening and Building Rapport",
        "module-1-content": "Module 2 content...",
        "module-2-title": "Module 3: Presenting Value Solutions",
        "module-2-content": "Module 3 content...",
        "module-3-title": "Module 4: Handling Objections",
        "module-3-content": "Module 4 content...",
        "module-4-title": "Module 5: Closing and After-Sales",
        "module-4-content": "Module 5 content...",
        "quiz-0-question": "What is the main focus of consultative selling?",
        "quiz-0-options": [
          "Sell the product at any cost",
          "Understand the client's needs and offer the best solution",
          "Talk about the product's features",
        ],
        "quiz-0-correctAnswer": "Understand the client's needs and offer the best solution",
        "quiz-0-explanation":
          "In consultative selling, the salesperson acts as a consultant, prioritizing the resolution of the client's problem.",
        videoIdeas: [
          "Simulation of a consultative sales meeting.",
          "Interview with a negotiation expert.",
        ],
        conclusion:
          "Congratulations on completing the course! You are ready to apply advanced selling techniques and build successful relationships with your clients.",
      },
      "inovacao-01": {
        courseTitle: "Design Thinking in Practice",
        description:
          "Apply Design Thinking principles to solve complex problems and innovate in your projects.",
        "module-0-title": "Module 1: Immersion and Empathy",
        "module-0-content": "Module 1 content...",
        "module-1-title": "Module 2: Problem Definition",
        "module-1-content": "Module 2 content...",
        "module-2-title": "Module 3: Ideation and Brainstorming",
        "module-2-content": "Module 3 content...",
        "module-3-title": "Module 4: Prototyping and Testing",
        "module-3-content": "Module 4 content...",
        "quiz-0-question": "What is the first stage of Design Thinking?",
        "quiz-0-options": ["Prototyping", "Empathy", "Ideation"],
        "quiz-0-correctAnswer": "Empathy",
        "quiz-0-explanation":
          "The Design Thinking process begins with empathy, which is the ability to put yourself in the user's shoes to understand their pain points and needs.",
        videoIdeas: [
          "Success case of a company that used Design Thinking.",
          "Tutorial on prototyping tools.",
        ],
        conclusion:
          "Excellent! Now you have the tools to apply Design Thinking and generate innovative, user-centered solutions.",
      },
      "lideranca-01": {
        courseTitle: "Situational Leadership",
        description:
          "Develop your ability to adapt your leadership style to each situation and each team member.",
        "module-0-title": "Module 1: What is Situational Leadership?",
        "module-0-content": "Module 1 content...",
        "module-1-title": "Module 2: The 4 Leadership Styles",
        "module-1-content": "Module 2 content...",
        "module-2-title": "Module 3: Team Maturity Levels",
        "module-2-content": "Module 3 content...",
        "module-3-title": "Module 4: Diagnosing the Situation",
        "module-3-content": "Module 4 content...",
        "module-4-title": "Module 5: Applying the Right Style",
        "module-4-content": "Module 5 content...",
        "module-5-title": "Module 6: Developing Your Flexibility",
        "module-5-content": "Module 6 content...",
        "quiz-0-question":
          "A new employee in the role, but highly motivated, needs which leadership style?",
        "quiz-0-options": ["Direction", "Delegation", "Support"],
        "quiz-0-correctAnswer": "Direction",
        "quiz-0-explanation":
          "An employee with low competence and high commitment needs clear direction to develop their skills, even if they are already motivated.",
        videoIdeas: [
          "Role-playing of different leadership styles.",
          "Analysis of famous leaders and their styles.",
        ],
        conclusion:
          "Congratulations, leader! You are better prepared to adapt your leadership, bring out the best in your team, and achieve extraordinary results.",
      },
    },
    learningPaths: {
      "onboarding-participante": {
        title: "Participant Onboarding",
        description:
          "Your initial journey to understand the platform and prepare for success in the program.",
      },
      "guia-gestores-mentores": {
        title: "Guide for Managers and Mentors",
        description:
          "Learn how to monitor, evaluate, and guide participants to maximize the program's impact.",
      },
      "tech-fundamentals": {
        title: "Technology Fundamentals",
        description:
          "An essential path for those starting in the technology field.",
      },
    },
    courseEngagement: {
      "vendas-01": { courseTitle: "Advanced Consultative Selling" },
      "inovacao-01": { courseTitle: "Design Thinking in Practice" },
      "lideranca-01": { courseTitle: "Situational Leadership" },
      "tutorial-dpx-platform": { courseTitle: "DPX Platform Tutorial" },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // GERMAN
  // ═══════════════════════════════════════════════════════════════════════════════
  de: {
    tasks: {
      "task-ana-1": {
        title: "A3-Bericht für das Onboarding-Projekt abgeben",
        dueDate: "In 2 Tagen",
      },
      "task-ana-2": {
        title: "Prototyp-Validierung mit der Marketing-Abteilung planen",
        dueDate: "In 1 Woche",
      },
      "task-ana-3": {
        title: "Design Thinking Modul 3 abschließen",
        dueDate: "Vor 3 Tagen",
      },
      "task-edu-1": {
        title: "Analyse der Engagement-Daten des Tagebuchs 4.0",
        dueDate: "Vor 2 Tagen",
      },
      "task-edu-2": {
        title: "Präsentation für FreudTalks vorbereiten",
        dueDate: "In 2 Wochen",
      },
      "task-carla-1": {
        title: "Feedback-Richtlinien mit der Personalabteilung überprüfen",
        dueDate: "Morgen",
      },
    },
    recentTasks: {
      task1: {
        title: "A3-Bericht für Projekt X abgeben",
        dueDate: "In 2 Tagen",
      },
      task2: {
        title: "Feedback der aufnehmenden Einheit überprüfen",
        dueDate: "In 5 Tagen",
      },
      task3: {
        title: "Tagebuch der Woche 4 ausfüllen",
        dueDate: "Gestern",
      },
      task4: {
        title: "Mentoring mit Fábio Pereira planen",
        dueDate: "Vor 3 Tagen",
      },
    },
    diaryEntries: {
      entry1: {
        content:
          "Heute habe ich mit dem Design-Thinking-Modul begonnen. Es war sehr interessant, etwas über die Bedeutung von Empathie im kreativen Prozess zu lernen. Ich hatte eine Idee, die wir in unserem nächsten Onboarding-Projekt anwenden könnten.",
        commentText:
          "Tolle Initiative, Ana! Lassen Sie uns in unserem nächsten Mentoring-Gespräch über diese Idee sprechen.",
        date: "Vor 3 Tagen",
      },
      entry2: {
        content:
          "Ich habe an einem Workshop über Growth Hacking teilgenommen. Das Whiteboard war voller Ideen. Hier ist das Foto, um den intensiven Brainstorming-Moment festzuhalten!",
        date: "Vor 5 Tagen",
      },
      entry3: {
        content:
          "Ich habe meine erste Woche in der aufnehmenden Einheit abgeschlossen. Das F&E-Team hat mich sehr herzlich empfangen und ich habe bereits an zwei technischen Meetings zur Formulierung neuer Produkte teilgenommen. Ich bin beeindruckt vom Innovationsniveau hier.",
        commentText:
          "Schön zu hören, dass die Eingewöhnung positiv verläuft! Halten Sie weiterhin Ihre Eindrücke fest.",
        date: "vor 1 Woche",
      },
      entry4: {
        content:
          "Ich habe ein Video aufgenommen, das die wichtigsten Erkenntnisse aus dem Lean-Manufacturing-Workshop zusammenfasst, an dem ich diese Woche teilgenommen habe. Die 5S-Methodik kann wirklich auf unser digitales Onboarding-Projekt angewendet werden!",
        commentText:
          "Hervorragende Verbindung zwischen Lean und dem digitalen Projekt. Lassen Sie uns das in der nächsten Mentoring-Sitzung vertiefen.",
        commentText2:
          "Sehr cooles Video! Ich hatte ähnliche Erkenntnisse, als ich die Produktionslinie hier besuchte.",
        date: "vor 1 Woche",
      },
      entry5: {
        content:
          "Heute hatte ich ein Meeting mit dem Vertriebsteam der aufnehmenden Einheit und habe festgestellt, wie unterschiedlich ihr beratender Ansatz von dem ist, was wir in meiner Heimateinheit praktizieren. Sie verwenden ein sehr strukturiertes Discovery-Framework, das ich zurückbringen und in unserem Team implementieren möchte.",
        date: "vor 2 Wochen",
      },
      entry6: {
        content:
          "Ich habe an der FreudTalks-Veranstaltung zum Thema Nachhaltigkeit und ESG in der Freudenberg-Gruppe teilgenommen. Foto der Podiumsdiskussion mit Vertretern von 4 Gruppenunternehmen. Sehr inspirierend, das Engagement für nachhaltige Praktiken in der gesamten Kette zu sehen.",
        commentText:
          "Schade, dass ich nicht teilnehmen konnte! Könnten Sie die Folien teilen, falls Sie Zugang haben?",
        date: "vor 2 Wochen",
      },
      entry7: {
        content:
          "Ich habe begonnen, die Beschaffungsprozesse bei Klüber zu kartieren und habe 3 Möglichkeiten zur Kostensenkung identifiziert, die sich auf ca. R$ 45.000/Jahr belaufen. Ich werde einen formellen Vorschlag für das nächste Treffen mit meinem Mentor vorbereiten.",
        commentText:
          "Beeindruckende Zahlen, Heitor! Lassen Sie uns gemeinsam am Vorschlag arbeiten, um sicherzustellen, dass die Daten solide sind.",
        date: "vor 3 Wochen",
      },
      entry8: {
        content:
          "Reflexion über den ersten Monat im Programm: Die größte Erkenntnis bisher war, dass jedes Unternehmen in der Gruppe seine eigene Kultur hat, obwohl sie die Freudenberg-Werte teilen. Zu lernen, diese Unterschiede zu navigieren, ist eine bereichernde Herausforderung.",
        date: "vor 3 Wochen",
      },
    },
    goals: {
      "goal-1": {
        title: "Onboarding-Prototyp entwickeln",
        description:
          "Einen funktionalen Prototyp der neuen gamifizierten Onboarding-Plattform zur Validierung mit der Personalabteilung erstellen.",
        evidenceNotes: "Link zu Figma und Architekturentwurf.",
      },
      "goal-2": {
        title: "Projekt dem Vorstand präsentieren",
        description:
          "Die Präsentation des Onboarding-Projekts für den Vorstand vorbereiten und durchführen, um die Genehmigung für das Pilotprojekt zu erhalten.",
        evidenceNotes: "",
      },
      "goal-3": {
        title: "Lernpfad Situative Führung abschließen",
        description:
          "Alle Module des Lernpfads Situative Führung im Learning Hub abschließen und eine Mindestpunktzahl von 85% im Abschlussquiz erreichen.",
        evidenceNotes: "Module 1 bis 4 abgeschlossen. Module 5 und 6 + Quiz stehen noch aus.",
      },
      "goal-4": {
        title: "Prozessverbesserung implementieren",
        description:
          "Mindestens eine Prozessverbesserung in der aufnehmenden Einheit identifizieren und umsetzen, mit dokumentierten messbaren Ergebnissen.",
        evidenceNotes: "Prozesskartierung abgeschlossen. Vorschlag in Bearbeitung.",
      },
      "goal-5": {
        title: "An 3 FreudTalks-Veranstaltungen teilnehmen",
        description:
          "Während der Programmdauer aktiv an mindestens 3 FreudTalks-Veranstaltungen als Networking- und Lernmöglichkeit teilnehmen.",
        evidenceNotes: "Teilnahme an den Veranstaltungen Innovation (Jan), ESG (Feb) und Führung (Mär).",
      },
      "goal-6": {
        title: "Best-Practices-Playbook erstellen",
        description:
          "Die während des Austauschs erlernten Best Practices in einem Playbook dokumentieren, das von zukünftigen Teilnehmern verwendet werden kann.",
        evidenceNotes: "",
      },
    },
    exchangeOpportunities: {
      "tech-innovation": {
        title: "KI-Innovationsentwickler",
        description:
          "Schließen Sie sich dem Innovationsteam an, um hochmoderne KI-Lösungen zu entwickeln und zu prototypisieren, die die nächste Generation unserer Produkte vorantreiben werden.",
        skills: ["Python", "TensorFlow", "Scikit-learn", "Rapid Prototyping"],
        duration: "4 Wochen",
        location: "Remote/Hybrid",
      },
      "purchasing-negotiation": {
        title: "Technischer Einkäufer",
        description:
          "Arbeiten Sie an strategischen Verhandlungen mit Zulieferern von Automobilkomponenten, um Kostenoptimierung und Qualitätssicherung für die Produktionslinie zu gewährleisten.",
        skills: ["Verhandlung", "Kostenanalyse", "Lieferantenmanagement"],
        duration: "3 Wochen",
        location: "Büro São Paulo",
      },
      "supplychain-planning": {
        title: "Bedarfsplanungsanalyst",
        description:
          "Nehmen Sie an der Bedarfsplanung und Bestandsverwaltung teil und nutzen Sie Prognosetools, um die Produktverfügbarkeit sicherzustellen.",
        skills: ["Planung", "Bedarfsprognose", "Bestandsmanagement", "SAP"],
        duration: "4 Wochen",
        location: "Remote/Hybrid",
      },
      "quality-audit": {
        title: "Interner Qualitätsauditor",
        description:
          "Nehmen Sie an internen Qualitätsaudits für ISO 9001 und IATF 16949 teil, erlernen Sie Auditmethoden und tragen Sie zur kontinuierlichen Prozessverbesserung bei.",
        skills: ["ISO 9001", "IATF 16949", "Interne Audits", "Abweichungsanalyse"],
        duration: "3 Wochen",
        location: "Diadema – SP",
      },
      "esg-sustainability": {
        title: "Nachhaltigkeits- und ESG-Analyst",
        description:
          "Tragen Sie zu den ESG-Projekten der Gruppe bei, einschließlich Nachhaltigkeitsberichten, CO₂-Fußabdruck-Metriken und Kreislaufwirtschaftsinitiativen.",
        skills: ["ESG", "GRI-Berichte", "CO₂-Fußabdruck", "Kreislaufwirtschaft"],
        duration: "4 Wochen",
        location: "Alphaville (Barueri) – SP",
      },
      "maintenance-reliability": {
        title: "Zuverlässigkeitsingenieur",
        description:
          "Arbeiten Sie im Team für vorausschauende Wartung und Zuverlässigkeit, nutzen Sie Datenanalyse und IoT zur Optimierung der Verfügbarkeit industrieller Anlagen.",
        skills: ["Vorausschauende Wartung", "Industrielles IoT", "Schwingungsanalyse", "FMEA"],
        duration: "4 Wochen",
        location: "Campinas – SP",
      },
      "hr-talent-dev": {
        title: "Spezialist für Talententwicklung",
        description:
          "Unterstützen Sie die Implementierung von Talententwicklungsprogrammen, einschließlich Kompetenzbeurteilung, individueller Entwicklungspläne und Nachfolgeprogramme.",
        skills: ["Talentmanagement", "Assessment", "IEP", "Nachfolgeprogramme"],
        duration: "3 Wochen",
        location: "São Paulo (SP)",
      },
    },
    checklist: {
      approval: {
        item: "Formale Genehmigung von Vorgesetztem und Personalabteilung",
        responsible: "Personal/Teilnehmer",
      },
      terms: { item: "Unterzeichnung der Bedingungen (LGPD & NDA)", responsible: "Teilnehmer" },
      agenda: { item: "Detaillierte Agenda-Definition", responsible: "Aufnehmende Einheit" },
      mentor: { item: "Mentor-Zuweisung", responsible: "Aufnehmende Einheit" },
      tickets: { item: "Reiseticket-Ausstellung", responsible: "Personal/Teilnehmer" },
      lodging: { item: "Unterkunftsbuchung", responsible: "Personal/Teilnehmer" },
      docs: { item: "Vorbereitung persönlicher Dokumente", responsible: "Teilnehmer" },
      review: {
        item: "Überprüfung von Standards und Richtlinien",
        responsible: "Personal/Teilnehmer",
      },
      briefing: { item: "Briefing vor dem Austausch", responsible: "Personal" },
      diary: { item: "Logbuch bereitgestellt", responsible: "Personal" },
      emergency: { item: "Mitteilung der Notfallkontakte", responsible: "Personal" },
    },
    challenges: {
      "challenge-01": {
        title: "Onboarding-Zeit für neue Mitarbeiter reduzieren",
        description:
          "Wir suchen innovative Lösungen, um die Einarbeitungszeit neuer Mitarbeiter um 20% zu verkürzen und dabei die Erfahrung und die anfängliche Produktivität zu verbessern.",
        targetMetrics:
          "20% Reduzierung der Onboarding-Zeit; 15% Steigerung des internen NPS.",
      },
      "challenge-02": {
        title: "Produktionsroute auf Linie 5 optimieren",
        description:
          "Die Produktionslinie 5 weist Engpässe auf, die zu ungeplanten Stillständen führen. Wie können wir den Ablauf optimieren und die Ausfallzeit um 10% reduzieren?",
        targetMetrics:
          "10% Reduzierung der Ausfallzeit; 5% Steigerung der täglichen Produktion.",
      },
      "challenge-03": {
        title: "Qualitätsberichte digitalisieren",
        description:
          "Qualitätsberichte werden noch manuell auf Papier ausgefüllt. Wir suchen Lösungen zur Digitalisierung dieses Prozesses, um Fehler zu reduzieren und die Rückverfolgbarkeit zu erhöhen.",
        targetMetrics:
          "Eliminierung von 100% der Papierformulare; 30% Reduzierung der Ausfüllzeit.",
      },
      "challenge-04": {
        title: "Energieverbrauch im Werk senken",
        description:
          "Unser Energieverbrauch ist im letzten Jahr um 12% gestiegen. Wir brauchen kreative Ideen, um den Verbrauch zu senken, ohne die Produktivität zu beeinträchtigen.",
        targetMetrics:
          "15% Reduzierung des Energieverbrauchs; Positiver ROI innerhalb von 12 Monaten.",
      },
      "challenge-05": {
        title: "Integration zwischen den Gruppeneinheiten verbessern",
        description:
          "Förderung von mehr Synergie und Wissensaustausch zwischen den verschiedenen Freudenberg-Gruppenunternehmen in Brasilien durch die Schaffung effektiver Kooperationsmechanismen.",
        targetMetrics:
          "25% Steigerung bei unternehmensübergreifenden Projekten; 80% Zufriedenheit in der Integrationsbefragung.",
      },
    },
    ideas: {
      "idea-01": {
        title: "Gamifizierte Onboarding-Plattform",
        problem:
          "Der aktuelle Onboarding-Prozess ist sehr manuell, basiert auf PDFs und Präsentationen, was zu geringem Engagement und Schwierigkeiten bei der Informationsspeicherung führt.",
        proposal:
          "Eine mobile Anwendung mit Lernpfaden, interaktiven Quizzen, Missionen und einem Punkte- und Belohnungssystem erstellen, um den gesamten Prozess zu gamifizieren.",
      },
      "idea-02": {
        title: "Buddy-System mit internen Mentoren",
        problem:
          "Neue Mitarbeiter fühlen sich verloren und haben Schwierigkeiten, die richtigen Ansprechpartner für Fragen zur Kultur und zu internen Prozessen zu finden.",
        proposal:
          'Ein formales "Buddy-System" einführen, bei dem jeder neue Mitarbeiter mit einem erfahreneren Kollegen zusammengebracht wird, der in den ersten 90 Tagen als informeller Mentor fungiert.',
      },
      "idea-03": {
        title: "Automatisierte Checkliste im Service Desk",
        problem:
          "Die Erstellung von Zugängen und die Konfiguration von Geräten für neue Mitarbeiter ist zeitaufwändig und fehleranfällig, was den ersten produktiven Tag verzögert.",
        proposal:
          "Einen automatisierten Workflow in unserem Service-Desk-System entwickeln, der nach der Aufnahme in der Personalabteilung alle Konten erstellt, Standardzugänge gewährt und die Notebook-Konfiguration plant.",
      },
    },
    sprints: {
      "idea-01": {
        hypothesis:
          "Wenn wir das Onboarding gamifizieren, wird das Engagement um 30% steigen und die Wissensbeibehaltung um 25% verbessert, gemessen durch Quizze.",
        plan: "1. Woche: Low-Fidelity-Prototyp entwickeln und mit 5 neuen Mitarbeitern validieren. 2. Woche: App-MVP mit Quiz- und Lernpfad-Funktionen entwickeln. 3. und 4. Woche: Pilotprojekt mit einer Gruppe von 10 neuen Mitarbeitern durchführen und Feedback sammeln.",
        resources: "1 Entwickler, 1 UX-Designer (Teilzeit)",
        risks: "Geringe Benutzerakzeptanz; technische Schwierigkeiten bei der Integration mit HR-Systemen.",
        successCriteria:
          "80% der Pilotteilnehmer absolvieren den Lernpfad; Durchschnittliche Quiz-Punktzahl über 85%.",
        checkInUpdate:
          "Low-Fidelity-Prototyp validiert. Positives Feedback zur Quiz-Dynamik. Nächster Schritt ist der Beginn der MVP-Entwicklung.",
      },
    },
    activityFeed: {
      act1: { target: "Gamifizierte Onboarding-Plattform" },
      act2: { target: "Design Thinking in der Praxis" },
      act3: { target: "Reflexionen über die Woche" },
      act4: { target: "Onboarding-Zeit reduzieren" },
      act5: { target: "Onboarding für Teilnehmer" },
    },
    analytics: {
      funnelStages: {
        Ideias: "Ideen",
        Aprovadas: "Genehmigt",
        "Em Sprint": "Im Sprint",
        Validadas: "Validiert",
        Escaladas: "Skaliert",
      },
      heatmapThemes: {
        Processos: "Prozesse",
        Custo: "Kosten",
        ESG: "ESG",
        Produto: "Produkt",
      },
      heatmapUnits: {
        Tecnologia: "Technologie",
        RH: "Personal",
        Compras: "Einkauf",
        Financeiro: "Finanzen",
        Marketing: "Marketing",
      },
      diaryAdherenceUnits: {
        Tecnologia: "Technologie",
        Marketing: "Marketing",
        RH: "Personal",
        Vendas: "Vertrieb",
        Financeiro: "Finanzen",
      },
    },
    courses: {
      "tutorial-dpx-platform": {
        courseTitle: "DPX-Plattform Tutorial",
        description:
          "Lernen Sie alle Funktionen der DPX Digital Plattform kennen, um Ihre berufliche Entwicklungserfahrung zu maximieren.",
        "module-0-title": "Modul 1: Übersicht und Navigation",
        "module-0-content": `Willkommen bei DPX Digital! Dies ist Ihr Leitfaden, um alle Funktionen der Plattform zu erkunden.

- **Haupt-Dashboard**: Ihre Kommandozentrale mit KPIs und relevanten Daten. Die Ansicht ändert sich je nach Ihrem Profil.
- **Seitennavigationsleiste**: Greifen Sie auf alle Hauptmodule zu, wie Tagebuch 4.0, Learning Hub und Innovation Labs.
- **Profilsimulator**: Oben auf der Seite können Sie zwischen den Ansichten von 'Mentorierter Benutzer', 'Manager', 'Mentor' und 'Administrator' wechseln, um zu verstehen, wie die Plattform für jede Rolle funktioniert.`,
        "module-1-title": "Modul 2: Tagebuch 4.0 und Kalender",
        "module-1-content": `Das Tagebuch 4.0 ist Ihr wichtigstes Werkzeug zur Aufzeichnung von Lernerfahrungen und Erlebnissen.

- **Einträge erstellen**: Erfassen Sie Aktivitäten mit Texten, Bildern oder Videos.
- **Anhänge und Kommentare**: Fügen Sie relevante Dokumente bei und erhalten Sie wertvolles Feedback von Ihren Mentoren direkt in Ihren Einträgen.
- **KI-Zusammenfassung**: Nutzen Sie den KI-Assistenten, um eine Zusammenfassung Ihrer Einträge zu erstellen, Stimmungen zu identifizieren und Erkenntnisse zu gewinnen.
- **Kalender**: Bleiben Sie über alle Ihre Termine, Fristen und Programmveranstaltungen auf dem Laufenden.`,
        "module-2-title": "Modul 3: Innovation Labs",
        "module-2-content": `Verwandeln Sie Ihre Ideen in wirkungsvolle Projekte. Dies ist das Herzstück der Innovation auf der Plattform.

- **Herausforderungen**: Erkunden Sie die von Managern und dem Komitee eröffneten 'Herausforderungen', die reale Probleme darstellen, die nach Lösungen suchen.
- **Ideeneinreichung**: Haben Sie eine Lösung? Reichen Sie Ihre 'Idee' ein, indem Sie das Problem, den Vorschlag und die erwartete Wirkung beschreiben. Nutzen Sie KI, um Ihren Vorschlag zu verfeinern.
- **Kuration und Sprints**: Ideen werden mit einem Score (ICE) bewertet, abgestimmt und, wenn genehmigt, in einen 'Experimentier-Sprint' zur schnellen Validierung aufgenommen.
- **Best-Practices-Katalog**: Validierte Ideen werden zu 'Playbooks' und stehen anderen Bereichen zur Verfügung, um den Erfolg zu replizieren.`,
        "module-3-title": "Modul 4: Learning Hub",
        "module-3-content": `Ihr Wissensportal für kontinuierliche Entwicklung.

- **Inhalte erkunden**: Durchsuchen Sie verfügbare Kurse und 'Lernpfade'.
- **Mit KI erstellen**: Verwenden Sie den 'Inhaltsgenerator', um einen vollständigen Kurs aus einem Thema zu erstellen. Die KI strukturiert Module, Inhalte und sogar ein Quiz.
- **Pfade erstellen**: Gruppieren Sie bestehende Kurse, um eine logische und sequenzielle Lernreise zu gestalten.`,
        "module-4-title": "Modul 5: Austausch und Mentoring",
        "module-4-content": `Werkzeuge, um Ihren Horizont zu erweitern und Ihre Entwicklung zu steuern.

- **Austauschzentrale**: Finden Sie Job-Rotation-Möglichkeiten in anderen Bereichen oder Unternehmen der Gruppe.
- **Mentoring-Zentrale**: Wenn Sie Mentor sind, verfolgen Sie den Fortschritt und die Aufgaben Ihrer Mentees.
- **Allgemeiner Leitfaden**: Konsultieren Sie jederzeit die Regeln, Rollen und Verantwortlichkeiten des Programms.
- **Alumni-Netzwerk**: Vernetzen Sie sich mit ehemaligen Programmteilnehmern.`,
        "quiz-0-question":
          "Wo können Sie Ihre täglichen Aktivitäten und Erkenntnisse festhalten?",
        "quiz-0-options": ["Innovation Labs", "Tagebuch 4.0", "Learning Hub"],
        "quiz-0-correctAnswer": "Tagebuch 4.0",
        "quiz-0-explanation":
          "Das Tagebuch 4.0 ist der vorgesehene Ort, um alle Ihre Aktivitäten, Reflexionen und Erkenntnisse während des Programms festzuhalten.",
        "quiz-1-question":
          "Welches Werkzeug ermöglicht es Ihnen, einen neuen Kurs mithilfe künstlicher Intelligenz zu erstellen?",
        "quiz-1-options": [
          "A3-Berichtsgenerator",
          "Inhaltsersteller im Learning Hub",
          "Ideeneinreichung in den Labs",
        ],
        "quiz-1-correctAnswer": "Inhaltsersteller im Learning Hub",
        "quiz-1-explanation":
          "Im Learning Hub ermöglicht die Funktion 'Mit KI erstellen' die Generierung vollständiger Kurse aus Themen und Details.",
        videoIdeas: [
          "Geführte Tour durch die Plattformoberfläche.",
          "So reichen Sie Ihre erste Idee in den Innovation Labs ein.",
        ],
        conclusion:
          "Herzlichen Glückwunsch! Sie haben das Tutorial der DPX Digital Plattform abgeschlossen und sind bereit, das volle Potenzial zu entdecken. Viel Erfolg auf Ihrer Entwicklungsreise!",
      },
      "vendas-01": {
        courseTitle: "Fortgeschrittener Beratungsverkauf",
        description:
          "Lernen Sie, dauerhafte Beziehungen aufzubauen und ein vertrauenswürdiger Berater für Ihre Kunden zu werden.",
        "module-0-title": "Modul 1: Grundlagen des Beratungsverkaufs",
        "module-0-content": "Inhalt von Modul 1...",
        "module-1-title": "Modul 2: Aktives Zuhören und Aufbau von Rapport",
        "module-1-content": "Inhalt von Modul 2...",
        "module-2-title": "Modul 3: Wertlösungen präsentieren",
        "module-2-content": "Inhalt von Modul 3...",
        "module-3-title": "Modul 4: Umgang mit Einwänden",
        "module-3-content": "Inhalt von Modul 4...",
        "module-4-title": "Modul 5: Abschluss und After-Sales",
        "module-4-content": "Inhalt von Modul 5...",
        "quiz-0-question": "Was ist der Hauptfokus des Beratungsverkaufs?",
        "quiz-0-options": [
          "Das Produkt um jeden Preis verkaufen",
          "Die Bedürfnisse des Kunden verstehen und die beste Lösung anbieten",
          "Über die Produkteigenschaften sprechen",
        ],
        "quiz-0-correctAnswer":
          "Die Bedürfnisse des Kunden verstehen und die beste Lösung anbieten",
        "quiz-0-explanation":
          "Beim Beratungsverkauf agiert der Verkäufer als Berater und priorisiert die Lösung des Kundenproblems.",
        videoIdeas: [
          "Simulation eines Beratungsverkaufsgesprächs.",
          "Interview mit einem Verhandlungsexperten.",
        ],
        conclusion:
          "Herzlichen Glückwunsch zum Abschluss des Kurses! Sie sind bereit, fortgeschrittene Verkaufstechniken anzuwenden und erfolgreiche Beziehungen zu Ihren Kunden aufzubauen.",
      },
      "inovacao-01": {
        courseTitle: "Design Thinking in der Praxis",
        description:
          "Wenden Sie Design-Thinking-Prinzipien an, um komplexe Probleme zu lösen und in Ihren Projekten zu innovieren.",
        "module-0-title": "Modul 1: Immersion und Empathie",
        "module-0-content": "Inhalt von Modul 1...",
        "module-1-title": "Modul 2: Problemdefinition",
        "module-1-content": "Inhalt von Modul 2...",
        "module-2-title": "Modul 3: Ideenfindung und Brainstorming",
        "module-2-content": "Inhalt von Modul 3...",
        "module-3-title": "Modul 4: Prototyping und Tests",
        "module-3-content": "Inhalt von Modul 4...",
        "quiz-0-question": "Was ist die erste Phase des Design Thinking?",
        "quiz-0-options": ["Prototyping", "Empathie", "Ideenfindung"],
        "quiz-0-correctAnswer": "Empathie",
        "quiz-0-explanation":
          "Der Design-Thinking-Prozess beginnt mit Empathie, also der Fähigkeit, sich in die Lage des Benutzers zu versetzen, um seine Probleme und Bedürfnisse zu verstehen.",
        videoIdeas: [
          "Erfolgsgeschichte eines Unternehmens, das Design Thinking eingesetzt hat.",
          "Tutorial zu Prototyping-Tools.",
        ],
        conclusion:
          "Ausgezeichnet! Jetzt haben Sie die Werkzeuge, um Design Thinking anzuwenden und innovative, benutzerzentrierte Lösungen zu entwickeln.",
      },
      "lideranca-01": {
        courseTitle: "Situative Führung",
        description:
          "Entwickeln Sie Ihre Fähigkeit, Ihren Führungsstil an jede Situation und jedes Teammitglied anzupassen.",
        "module-0-title": "Modul 1: Was ist Situative Führung?",
        "module-0-content": "Inhalt von Modul 1...",
        "module-1-title": "Modul 2: Die 4 Führungsstile",
        "module-1-content": "Inhalt von Modul 2...",
        "module-2-title": "Modul 3: Reifegrade des Teams",
        "module-2-content": "Inhalt von Modul 3...",
        "module-3-title": "Modul 4: Die Situation diagnostizieren",
        "module-3-content": "Inhalt von Modul 4...",
        "module-4-title": "Modul 5: Den richtigen Stil anwenden",
        "module-4-content": "Inhalt von Modul 5...",
        "module-5-title": "Modul 6: Ihre Flexibilität entwickeln",
        "module-5-content": "Inhalt von Modul 6...",
        "quiz-0-question":
          "Ein neuer Mitarbeiter in der Funktion, aber sehr motiviert, benötigt welchen Führungsstil?",
        "quiz-0-options": ["Anweisung", "Delegation", "Unterstützung"],
        "quiz-0-correctAnswer": "Anweisung",
        "quiz-0-explanation":
          "Ein Mitarbeiter mit geringer Kompetenz und hohem Engagement braucht klare Anweisungen, um seine Fähigkeiten zu entwickeln, auch wenn er bereits motiviert ist.",
        videoIdeas: [
          "Rollenspiel verschiedener Führungsstile.",
          "Analyse berühmter Führungspersönlichkeiten und ihrer Stile.",
        ],
        conclusion:
          "Herzlichen Glückwunsch, Führungskraft! Sie sind besser darauf vorbereitet, Ihre Führung anzupassen, das Beste aus Ihrem Team herauszuholen und außergewöhnliche Ergebnisse zu erzielen.",
      },
    },
    learningPaths: {
      "onboarding-participante": {
        title: "Onboarding für Teilnehmer",
        description:
          "Ihre erste Reise, um die Plattform zu verstehen und sich auf den Erfolg im Programm vorzubereiten.",
      },
      "guia-gestores-mentores": {
        title: "Leitfaden für Manager und Mentoren",
        description:
          "Lernen Sie, wie Sie Teilnehmer begleiten, bewerten und anleiten, um die Wirkung des Programms zu maximieren.",
      },
      "tech-fundamentals": {
        title: "Technologie-Grundlagen",
        description:
          "Ein essentieller Pfad für Einsteiger im Technologiebereich.",
      },
    },
    courseEngagement: {
      "vendas-01": { courseTitle: "Fortgeschrittener Beratungsverkauf" },
      "inovacao-01": { courseTitle: "Design Thinking in der Praxis" },
      "lideranca-01": { courseTitle: "Situative Führung" },
      "tutorial-dpx-platform": { courseTitle: "DPX-Plattform Tutorial" },
    },
  },
};

// ─── Helper Functions ────────────────────────────────────────────────────────────

/**
 * Generic field translator.
 * Returns the translated string for a given lang/entity/id/field combination,
 * or the fallback value if no translation exists.
 */
export function td(
  lang: string,
  entity: string,
  id: string,
  field: string,
  fallback: string
): string {
  const value = translations[lang]?.[entity]?.[id]?.[field];
  if (typeof value === "string") return value;
  return fallback;
}

/**
 * Array field translator.
 * Returns the translated string array for a given lang/entity/id/field combination,
 * or the fallback array if no translation exists.
 */
export function tdArray(
  lang: string,
  entity: string,
  id: string,
  field: string,
  fallback: string[]
): string[] {
  const value = translations[lang]?.[entity]?.[id]?.[field];
  if (Array.isArray(value)) return value as string[];
  return fallback;
}

/**
 * Returns a translated Course object by spreading the original course
 * and overriding translated fields. Only translates text fields;
 * preserves id, category, imageHint, imageUrl, etc.
 */
export function translateCourse(lang: string, course: Course): Course {
  const id = course.id;

  const translatedModules = course.modules.map((mod, i) => ({
    ...mod,
    title: td(lang, "courses", id, `module-${i}-title`, mod.title),
    content: td(lang, "courses", id, `module-${i}-content`, mod.content),
  }));

  const translatedQuiz = course.quiz.map((q, i) => ({
    ...q,
    question: td(lang, "courses", id, `quiz-${i}-question`, q.question),
    options: tdArray(lang, "courses", id, `quiz-${i}-options`, q.options),
    correctAnswer: td(lang, "courses", id, `quiz-${i}-correctAnswer`, q.correctAnswer),
    explanation: td(lang, "courses", id, `quiz-${i}-explanation`, q.explanation),
  }));

  return {
    ...course,
    courseTitle: td(lang, "courses", id, "courseTitle", course.courseTitle),
    description: td(lang, "courses", id, "description", course.description),
    modules: translatedModules,
    quiz: translatedQuiz,
    videoIdeas: tdArray(lang, "courses", id, "videoIdeas", course.videoIdeas),
    conclusion: td(lang, "courses", id, "conclusion", course.conclusion),
  };
}

/**
 * Returns a translated Sprint object by spreading the original sprint
 * and overriding translated fields. Preserves dates, status, result, ideaId.
 */
export function translateSprint(lang: string, sprint: Sprint): Sprint {
  const id = sprint.ideaId;

  const translatedCheckIns = sprint.checkIns.map((ci) => ({
    ...ci,
    update: td(lang, "sprints", id, "checkInUpdate", ci.update),
  }));

  return {
    ...sprint,
    hypothesis: td(lang, "sprints", id, "hypothesis", sprint.hypothesis),
    plan: td(lang, "sprints", id, "plan", sprint.plan),
    resources: td(lang, "sprints", id, "resources", sprint.resources),
    risks: td(lang, "sprints", id, "risks", sprint.risks),
    successCriteria: td(lang, "sprints", id, "successCriteria", sprint.successCriteria),
    checkIns: translatedCheckIns,
  };
}
