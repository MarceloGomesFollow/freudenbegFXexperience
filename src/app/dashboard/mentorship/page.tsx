
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { users, mentorships, tasks, type Task } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Bell, CheckCircle, Clock, ExternalLink, Users as UsersIcon, Calendar, Bot, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { generateMentorshipReport, type GenerateMentorshipReportInput } from '@/ai/flows/generate-mentorship-report';
import { Skeleton } from "@/components/ui/skeleton";
import { z } from 'zod';
import { motion } from "framer-motion";


const MenteesTab = () => {
    const currentUserEmail = 'fabio.pereira@example.com'; // Simulando o mentor logado
    const myMenteesEmails = mentorships.filter(m => m.mentorEmail === currentUserEmail).map(m => m.menteeEmail);
    const myMentees = users.filter(u => myMenteesEmails.includes(u.email));

    const TaskStatusIcon = ({ status }: { status: Task['status'] }) => {
        switch (status) {
            case 'Concluído':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'Pendente':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'Em Andamento':
                return <Clock className="h-4 w-4 text-blue-500" />;
            case 'Atrasado':
                return <Bell className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-muted-foreground" />;
        }
    };

    const PriorityBadge = ({ priority }: { priority: Task['priority'] }) => {
        const variant = {
            'Alta': 'destructive',
            'Média': 'secondary',
            'Baixa': 'outline',
        }[priority] || 'default';
        // @ts-ignore
        return <Badge variant={variant}>{priority}</Badge>;
    }
    
    return (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 mt-6">
            {myMentees.map(mentee => {
                const menteeAvatar = PlaceHolderImages.find(p => p.id === mentee.avatar);
                const menteeTasks = tasks[mentee.email] || [];
                const pendingTasks = menteeTasks.filter(t => t.status === 'Pendente' || t.status === 'Em Andamento');
                const lateTasks = menteeTasks.filter(t => t.status === 'Atrasado');

                return (
                    <Card key={mentee.email} className="flex flex-col card-hover">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-14 w-14">
                                        {menteeAvatar && <AvatarImage src={menteeAvatar.imageUrl} alt={mentee.name} data-ai-hint="person portrait" />}
                                        <AvatarFallback>{mentee.name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{mentee.name}</CardTitle>
                                        <CardDescription>{mentee.role} • {mentee.unit}</CardDescription>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href="#">
                                        Ver Perfil <ExternalLink className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-medium">Progresso no Programa</h4>
                                    <span className="text-sm font-bold text-primary">{mentee.progress}%</span>
                                </div>
                                <Progress value={mentee.progress} />
                            </div>

                            <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Alertas e Próximas Entregas</h4>
                                    {lateTasks.length > 0 && (
                                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive-foreground">
                                            <div className="flex items-start gap-2">
                                            <Bell className="h-4 w-4 mt-0.5 text-destructive"/>
                                            <div>
                                                <p className="font-semibold text-sm text-destructive">{lateTasks.length} {lateTasks.length > 1 ? 'tarefas atrasadas' : 'tarefa atrasada'}</p>
                                                <p className="text-xs">{lateTasks.map(t => t.title).join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )}

                                    {pendingTasks.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[60%]">Tarefa</TableHead>
                                                    <TableHead>Prazo</TableHead>
                                                    <TableHead>Prioridade</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {pendingTasks.map(task => (
                                                    <TableRow key={task.id}>
                                                        <TableCell className="font-medium flex items-center gap-2">
                                                            <TaskStatusIcon status={task.status} /> {task.title}
                                                        </TableCell>
                                                        <TableCell>{task.dueDate}</TableCell>
                                                        <TableCell>
                                                            <PriorityBadge priority={task.priority} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">Nenhuma tarefa pendente.</p>
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};

const MeetingsTab = () => {
    const [meetingType, setMeetingType] = useState<string>();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Reunião Agendada!",
            description: "O convite foi enviado para os participantes."
        });
    }

    const participants = [
        { id: "ana-silva", label: "Ana Silva (Mentorado)" },
        { id: "fabio-pereira", label: "Fábio Pereira (Mentor)" },
        { id: "equipe-projeto", label: "Equipe do Projeto" },
        { id: "gestor-unidade", label: "Gestor da Unidade" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Reuniões Agendadas</CardTitle>
                        <CardDescription>Visualize e gerencie suas próximas reuniões de mentoria.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Alinhamento Inicial - Projeto Onboarding (Ana Silva)</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground"><strong>Data:</strong> 25/07/2024, 10:00</p>
                                    <p className="text-sm text-muted-foreground"><strong>Participantes:</strong> Ana Silva, Fábio Pereira</p>
                                    <div className="space-y-2">
                                        <Label>Ata da Reunião</Label>
                                        <Textarea placeholder="Registre os pontos discutidos, decisões e próximos passos..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Entregas / Action Items</Label>
                                        <div className="flex items-center gap-2">
                                            <Input placeholder="Descreva uma nova tarefa..."/>
                                            <Button><PlusCircle className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                    <Button size="sm">Salvar Ata</Button>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Planejamento Semanal - Sprint 1 (Ana Silva)</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground text-sm">Detalhes da reunião de planejamento semanal.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Agendar Nova Reunião</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="meeting-type">Tipo de Reunião</Label>
                                <Select onValueChange={setMeetingType}>
                                    <SelectTrigger id="meeting-type">
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="info">Informações de Projeto</SelectItem>
                                        <SelectItem value="align">Reunião de alinhamento Inicial</SelectItem>
                                        <SelectItem value="plan">Planejamento Semanal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {meetingType === 'plan' && (
                                <div className="space-y-2">
                                    <Label htmlFor="recurrence">Semanas de Recorrência</Label>
                                    <Input id="recurrence" type="number" placeholder="Ex: 4" />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="date">Data e Hora</Label>
                                <Input id="date" type="datetime-local" />
                            </div>

                            <div className="space-y-2">
                                <Label>Participantes</Label>
                                <div className="space-y-2 rounded-md border p-4">
                                {participants.map((item) => (
                                    <div key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                        <Checkbox id={`participant-${item.id}`} />
                                        <Label htmlFor={`participant-${item.id}`} className="font-normal">{item.label}</Label>
                                    </div>
                                ))}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="objectives">Objetivos</Label>
                                <Textarea id="objectives" placeholder="Descreva os principais objetivos da reunião..." />
                            </div>

                            <Button type="submit" className="w-full">Agendar Reunião</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const AiReportTab = () => {
    const [selectedMentee, setSelectedMentee] = useState<string | null>(null);
    const [generatedReport, setGeneratedReport] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerateReport = async () => {
        if (!selectedMentee) {
            toast({
                variant: 'destructive',
                title: "Selecione um mentorado",
                description: "Você precisa escolher um mentorado para gerar o relatório.",
            });
            return;
        }

        setIsLoading(true);
        setGeneratedReport(null);

        const mentee = users.find(u => u.email === selectedMentee);
        const mentor = users.find(u => u.role === 'Mentor');

        if (!mentee || !mentor) {
            toast({
                variant: 'destructive',
                title: "Erro",
                description: "Não foi possível encontrar os dados do mentorado ou mentor.",
            });
            setIsLoading(false);
            return;
        }

        const reportInput: GenerateMentorshipReportInput = {
            menteeName: mentee.name,
            mentorName: mentor.name,
            projectPeriod: "01/07/2024 a 31/07/2024",
            feedbackDate: new Date().toLocaleDateString('pt-BR'),
            diaryEntries: "O participante demonstrou proatividade, registrando suas atividades e aprendizados diariamente. Destaque para a resolução do desafio X e a proposta de melhoria Y.",
            meetingMinutes: "As reuniões de alinhamento foram produtivas. O mentorado sempre trouxe pautas claras e absorveu bem os feedbacks. Houve um bom progresso nas metas definidas.",
            tasksCompleted: "90% das tarefas foram concluídas no prazo. O relatório A3 final foi entregue com alta qualidade.",
        };
        
        try {
            const result = await generateMentorshipReport(reportInput);
            setGeneratedReport(result.report);
            toast({
                title: "Relatório Gerado!",
                description: "O relatório de feedback foi gerado com sucesso pela IA.",
            });
        } catch (error) {
            console.error("Error generating report:", error);
            toast({
                variant: 'destructive',
                title: "Erro ao Gerar Relatório",
                description: "A IA não conseguiu processar a solicitação. Tente novamente.",
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="mt-6">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Relatório Consolidado com IA</CardTitle>
                    <CardDescription>Selecione um mentorado para gerar um relatório de feedback com base em atas, atividades e diário de bordo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="mentee-select">Selecione o Mentorado</Label>
                        <Select onValueChange={setSelectedMentee}>
                            <SelectTrigger id="mentee-select">
                                <SelectValue placeholder="Escolha um mentorado..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ana.silva@example.com">Ana Silva</SelectItem>
                                <SelectItem value="eduarda.lima@example.com">Eduarda Lima</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <Button variant="gold" className="w-full" onClick={handleGenerateReport} disabled={isLoading}>
                        <Bot className="mr-2 h-4 w-4"/>
                        {isLoading ? 'Gerando...' : 'Gerar Relatório de Feedback'}
                    </Button>
                </CardContent>
                <CardFooter>
                    {isLoading ? (
                         <div className="w-full space-y-4 p-4 border border-dashed rounded-md">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-24 w-full" />
                         </div>
                    ) : generatedReport ? (
                         <div className="w-full p-4 border rounded-md bg-muted/20">
                            <pre className="whitespace-pre-wrap text-sm font-sans">{generatedReport}</pre>
                        </div>
                    ) : (
                        <div className="w-full p-4 border border-dashed rounded-md text-center text-muted-foreground">
                            <p>O relatório gerado pela IA aparecerá aqui.</p>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function MentorshipPage() {
    return (
        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    <span className="gold-text">Central</span>{" "}
                    <span className="text-foreground">de Mentoria</span>
                </h2>
                <p className="mt-2 text-muted-foreground">
                    Acompanhe o progresso, agende reuniões e gere relatórios de seus mentorados.
                </p>
            </motion.div>

            <motion.div variants={itemVariants}>
            <Tabs defaultValue="mentees" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
                    <TabsTrigger value="mentees"><UsersIcon className="mr-2 h-4 w-4"/>Mentees</TabsTrigger>
                    <TabsTrigger value="meetings"><Calendar className="mr-2 h-4 w-4"/>Reuniões</TabsTrigger>
                    <TabsTrigger value="report"><Bot className="mr-2 h-4 w-4"/>Relatório IA</TabsTrigger>
                </TabsList>
                <TabsContent value="mentees">
                    <MenteesTab />
                </TabsContent>
                <TabsContent value="meetings">
                    <MeetingsTab />
                </TabsContent>
                <TabsContent value="report">
                    <AiReportTab />
                </TabsContent>
            </Tabs>
            </motion.div>
        </motion.div>
    );
}
