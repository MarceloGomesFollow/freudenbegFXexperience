
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Users, Lightbulb, Phone, Flag, Shield, Activity, Share, PlaneTakeoff, Plane, PlaneLanding } from "lucide-react";

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

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Guia Geral do Participante</h2>
                <p className="text-muted-foreground mt-2">
                    Orientações para aproveitar ao máximo a sua experiência no Programa de Intercâmbio Profissional.
                </p>
            </div>

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
    );
}
