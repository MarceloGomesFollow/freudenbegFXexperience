
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Users, Lightbulb, Phone, Flag, Shield, Activity, Share, PlaneTakeoff, Plane, PlaneLanding, Handshake, MessageCircle, GitBranch, UserCheck, Star, BookCopy, LayoutDashboard, NotebookText, Beaker, GraduationCap, Briefcase, BrainCircuit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GeneralGuidePage() {
    
    const responsibilities = [
        "Ser protagonista do próprio desenvolvimento.",
        "Buscar ativamente aprendizados e experiências.",
        "Cumprir a agenda e as atividades propostas.",
        "Manter postura ética, respeitando normas e cultura local.",
        "Registrar aprendizados e desafios no Diário de Bordo."
    ];

    const tips = [
        { icon: <Lightbulb className="h-5 w-5 text-accent"/>, text: "Seja curioso: faça perguntas, observe processos e proponha ideias." },
        { icon: <Users className="h-5 w-5 text-accent"/>, text: "Construa networking: interaja com diferentes áreas e colegas." },
        { icon: <Activity className="h-5 w-5 text-accent"/>, text: "Anote tudo: registre insights, dúvidas e aprendizados diariamente." },
        { icon: <Shield className="h-5 w-5 text-accent"/>, text: "Seja flexível: adapte-se a novas rotinas e culturas." },
        { icon: <Phone className="h-5 w-5 text-accent"/>, text: "Peça ajuda sempre que necessário." },
    ];

    const managerResponsibilities = [
        { icon: <Handshake className="h-5 w-5 text-accent"/>, text: "Alinhe expectativas com o colaborador." },
        { icon: <MessageCircle className="h-5 w-5 text-accent"/>, text: "Comunique a equipe sobre a ausência temporária." },
        { icon: <GitBranch className="h-5 w-5 text-accent"/>, text: "Reorganize responsabilidades para cobrir as demandas." },
        { icon: <UserCheck className="h-5 w-5 text-accent"/>, text: "Formalize a cessão com datas e responsáveis." },
    ];


    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Guia Geral do Programa</h2>
                <p className="text-muted-foreground mt-2">
                    Orientações para aproveitar ao máximo a sua experiência no Programa de Intercâmbio Profissional.
                </p>
            </div>
             <Tabs defaultValue="participant" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="participant">Guia do Participante</TabsTrigger>
                    <TabsTrigger value="manager">Guia do Gestor</TabsTrigger>
                    <TabsTrigger value="tutorial"><BookCopy className="mr-2 h-4 w-4"/>Tutorial da Plataforma</TabsTrigger>
                </TabsList>
                <TabsContent value="participant" className="mt-6">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Objetivo do Guia</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Orientar o participante (mentoreado) sobre como aproveitar ao máximo a experiência de intercâmbio, detalhando responsabilidades, expectativas, dicas práticas e recursos de apoio.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Flag className="h-6 w-6 text-primary"/>
                                    Seu Papel como Mentoreado
                                </CardTitle>
                                <CardDescription>
                                    Você é o ator principal da sua jornada de desenvolvimento.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {responsibilities.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Accordion type="single" collapsible defaultValue="item-2" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneTakeoff className="h-5 w-5"/> Antes do Intercâmbio</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <ul className="list-disc space-y-2">
                                        <li>Participar do briefing pré-intercâmbio com RH e gestor.</li>
                                        <li>Revisar normas, políticas e regras da unidade receptora.</li>
                                        <li>Organizar documentos, passagens, hospedagem e seguros.</li>
                                        <li>Assinar os termos de proteção de dados e confidencialidade.</li>
                                        <li>Estudar sobre a unidade receptora e alinhar expectativas com o mentor.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><Plane className="h-5 w-5"/> Durante o Intercâmbio</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <ul className="list-disc space-y-2">
                                        <li>Seguir a agenda definida (Anexo II).</li>
                                        <li>Participar das reuniões semanais com o mentor.</li>
                                        <li>Preencher o Diário de Bordo com aprendizados, desafios e sugestões.</li>
                                        <li>Comunicar-se de forma clara e frequente com o mentor e gestor de origem.</li>
                                        <li>Solicitar feedbacks e estar aberto a sugestões de melhoria.</li>
                                        <li>Respeitar as normas, políticas e cultura da unidade receptora.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneLanding className="h-5 w-5"/> Após o Intercâmbio</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                   <ul className="list-disc space-y-2">
                                        <li>Elaborar o Relatório Final (A3), detalhando atividades, aprendizados e sugestões.</li>
                                        <li>Apresentar os resultados para gestores e equipe.</li>
                                        <li>Compartilhar boas práticas e lições aprendidas com colegas.</li>
                                        <li>Participar da avaliação do programa.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Dicas para Aproveitar Melhor</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {tips.map((tip, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            {tip.icon}
                                            <p className="text-sm text-muted-foreground">{tip.text}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recursos e Contatos</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm">Recursos de Apoio</h4>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                                            <li>Mentor designado pela unidade receptora.</li>
                                            <li>RH local e de origem.</li>
                                            <li>Comitê do Programa.</li>
                                            <li>Materiais de apoio (Guias, Diário de Bordo, etc.).</li>
                                        </ul>
                                    </div>
                                     <div>
                                        <h4 className="font-semibold text-sm">Contatos Importantes</h4>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                                            <li>Nome e contato do mentor (verificado na plataforma).</li>
                                            <li>RH da unidade de origem e receptora (disponível no Apoio RH).</li>
                                            <li>Canal de emergência do programa: emergenciadpx@empresa.com</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="manager" className="mt-6">
                    <div className="space-y-8">
                         <Card>
                            <CardHeader>
                                <CardTitle>Objetivo do Guia</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                   Orientar o gestor cedente sobre os principais cuidados e boas práticas ao liberar um colaborador para participar do projeto FREUDENBERG EXPERIENCE, garantindo alinhamento, suporte e continuidade das atividades da equipe.
                                </p>
                            </CardContent>
                        </Card>

                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneTakeoff className="h-5 w-5"/> Antes da Cessão</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <p className="font-semibold mb-2">Alinhe expectativas com o colaborador:</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>Explique os objetivos do job rotation.</li>
                                        <li>Reforce que é uma oportunidade de desenvolvimento e visibilidade.</li>
                                        <li>Certifique-se de que ele está confortável com a mudança temporária.</li>
                                    </ul>
                                    <p className="font-semibold mb-2">Comunique a equipe:</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>Informe a ausência temporária do colaborador.</li>
                                        <li>Reorganize responsabilidades para cobrir demandas urgentes.</li>
                                    </ul>
                                     <p className="font-semibold mb-2">Formalize a cessão:</p>
                                     <ul className="list-disc space-y-2 pl-5">
                                        <li>Registre a data de início e fim.</li>
                                        <li>Identifique o gestor responsável no destino.</li>
                                        <li>Confirme logística (transporte, hospedagem, alimentação).</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><Plane className="h-5 w-5"/> Durante o Período</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <p className="font-semibold mb-2">Evite sobrecarga ou cobranças indevidas:</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>O colaborador estará 100% dedicado ao projeto de destino.</li>
                                        <li>Não o envolver em atividades da equipe de origem.</li>
                                    </ul>
                                    <p className="font-semibold mb-2">Mantenha contato leve e estratégico:</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>Se necessário, faça alinhamentos pontuais.</li>
                                    </ul>
                                     <p className="font-semibold mb-2">Facilite a adaptação:</p>
                                     <ul className="list-disc space-y-2 pl-5">
                                        <li>Esteja disponível para suporte emocional ou dúvidas.</li>
                                        <li>Incentive o colaborador a aproveitar a experiência.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneLanding className="h-5 w-5"/> Após o Retorno</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                   <p className="font-semibold mb-2">Realize um momento de integração:</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>Promova uma conversa de retorno com o colaborador.</li>
                                        <li>Peça que compartilhe aprendizados e percepções.</li>
                                    </ul>
                                     <p className="font-semibold mb-2">Reavalie responsabilidades:</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>Reintroduza o colaborador às atividades com clareza.</li>
                                        <li>Considere aplicar os conhecimentos adquiridos.</li>
                                    </ul>
                                     <p className="font-semibold mb-2">Compartilhe feedback com o RH ou liderança:</p>
                                     <ul className="list-disc space-y-2 pl-5">
                                        <li>Avalie o impacto da experiência.</li>
                                        <li>Sugira melhorias para futuras ações de job rotation.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Star className="h-6 w-6" /> Lembrete Importante
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-primary/90">
                                    O projeto Freudenberg Experience é uma premiação oferecida aos colaboradores de alta performance e deve ser utilizado como tal. Promover o bem-estar e devido aproveitamento do colaborador, garante sua continuidade e desdobramento positivo junto ao participante e demais funcionários direta ou indiretamente envolvidos.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                 <TabsContent value="tutorial" className="mt-6">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tutorial da Plataforma DPX</CardTitle>
                                <CardDescription>Um guia rápido sobre as principais funcionalidades e como elas se alinham ao programa.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Bem-vindo à Plataforma de Experiência Digital (DPX)! Esta ferramenta foi desenhada para digitalizar e potencializar sua jornada de desenvolvimento profissional. Use este guia para entender os principais recursos à sua disposição.
                                </p>
                            </CardContent>
                        </Card>

                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><LayoutDashboard className="h-5 w-5"/> Dashboards e Visão Geral</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <p>O primeiro contato com a plataforma. A visão do dashboard muda de acordo com seu perfil (Participante, Gestor, Mentor, RH), mostrando sempre os KPIs e informações mais relevantes para sua atuação no programa.</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><NotebookText className="h-5 w-5"/> Diário 4.0: Seu Hub de Aprendizado</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>Esta é a sua principal ferramenta para documentar a experiência. Substitui formulários manuais e centraliza seu progresso.</p>
                                    <ul className="list-disc pl-5">
                                        <li><b>Registro Dinâmico:</b> Crie entradas com texto, anexe fotos de um quadro branco, ou grave um vídeo rápido resumindo seu dia.</li>
                                        <li><b>Feedback Contínuo:</b> Mentores e gestores podem comentar diretamente em suas entradas, fornecendo orientação em tempo real.</li>
                                        <li><b>IA para Insights:</b> Use o botão "Gerar Resumo" para que a IA analise suas anotações, identifique o sentimento geral e extraia os principais aprendizados.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-3">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><Beaker className="h-5 w-5"/> Innovation Labs: Da Ideia ao Impacto</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>Um espaço para transformar seus aprendizados em inovação real.</p>
                                     <ul className="list-disc pl-5">
                                        <li><b>Desafios:</b> Fique de olho nos desafios estratégicos lançados pelas áreas.</li>
                                        <li><b>Submissão de Ideias:</b> Transforme um insight do seu Diário 4.0 em uma proposta de melhoria. A IA pode ajudar a refinar seu título e a estimar o impacto.</li>
                                        <li><b>Sprints e Validação:</b> As ideias mais promissoras são selecionadas para "Sprints de Experimentação", ciclos rápidos para testar hipóteses e medir resultados.</li>
                                        <li><b>Catálogo de Boas Práticas:</b> Ideias validadas viram "playbooks" que podem ser replicados por outras equipes, escalando o sucesso.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><GraduationCap className="h-5 w-5"/> Learning Hub: Conhecimento On-Demand</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>Seu portal para desenvolvimento contínuo e compartilhamento de conhecimento.</p>
                                     <ul className="list-disc pl-5">
                                        <li><b>Cursos e Trilhas:</b> Acesse conteúdos criados por especialistas internos e organizados em trilhas de aprendizado.</li>
                                        <li><b>Crie com IA:</b> Tem um conhecimento para compartilhar? Use a ferramenta "Criar Conteúdo" para que a IA estruture um curso completo para você, com módulos, conteúdo e até um quiz.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-5">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="h-5 w-5"/> Mobilidade e Desenvolvimento</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>Recursos para gerenciar sua carreira e conexões.</p>
                                     <ul className="list-disc pl-5">
                                        <li><b>Central de Intercâmbio:</b> Explore e se inscreva em oportunidades de job rotation.</li>
                                        <li><b>Central de Mentoria:</b> Se você for um mentor, use esta área para acompanhar de perto o progresso e as tarefas dos seus mentorados.</li>
                                        <li><b>Rede Alumni:</b> Mantenha o contato com ex-participantes e continue a troca de experiências mesmo após o fim do programa.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                 </TabsContent>
            </Tabs>
        </div>
    );
}
