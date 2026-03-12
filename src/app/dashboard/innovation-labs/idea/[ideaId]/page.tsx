
"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Lightbulb, Target, Scaling, ThumbsUp, UserCheck, MessageSquare, Check, Circle, GanttChart, Play, Goal, Plane, Flag, Milestone, BookCopy, Zap, Download, Send, Trophy } from "lucide-react";
import { ideas, sprints, type Idea, users } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { useRole } from '@/components/role-switcher';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const StatusBadge = ({ status }: { status: Idea['status'] }) => {
    const variant =
        status === 'Rejeitada'
            ? 'destructive'
            : status === 'Submetida'
                ? 'outline'
                : status === 'Em Análise'
                    ? 'secondary'
                    : 'default';

    const colorClass =
        status === 'Aprovada'
            ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
            : status === 'Validada'
                ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                : status === 'Em Sprint'
                    ? 'bg-purple-500/20 text-purple-700 dark:text-purple-400'
                    : status === 'Escalada'
                        ? 'bg-teal-500/20 text-teal-700 dark:text-teal-400'
                        : status === 'Rejeitada'
                            ? 'bg-red-500/20 text-red-700 dark:text-red-400'
                            : '';

    return <Badge variant={variant} className={colorClass}>{status}</Badge>;
}

const SprintTimeline = ({ sprint }: { sprint: any }) => {
    const stages = [
        { name: 'Planejamento', status: ['Planejamento', 'Execução', 'Análise', 'Encerrado'].includes(sprint.status) ? 'complete' : 'incomplete', icon: <GanttChart /> },
        { name: 'Execução', status: ['Execução', 'Análise', 'Encerrado'].includes(sprint.status) ? 'complete' : 'incomplete', icon: <Play /> },
        { name: 'Análise', status: ['Análise', 'Encerrado'].includes(sprint.status) ? 'complete' : 'incomplete', icon: <Goal /> },
        { name: 'Encerramento', status: sprint.status === 'Encerrado' ? 'complete' : 'incomplete', icon: <Flag /> },
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                {stages.map((stage, index) => (
                    <React.Fragment key={stage.name}>
                        <div className="flex flex-col items-center text-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stage.status === 'complete' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                {stage.icon}
                            </div>
                            <p className="text-xs mt-2 font-medium">{stage.name}</p>
                        </div>
                        {index < stages.length - 1 && (
                            <div className={`flex-1 h-1 mx-2 ${stage.status === 'complete' && stages[index + 1].status === 'complete' ? 'bg-primary' : 'bg-muted'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default function IdeaDetailPage() {
    const params = useParams();
    const ideaId = params.ideaId as string;
    const idea = ideas.find(i => i.id === ideaId) as (Idea & { iceScore?: number }) | undefined;
    const sprint = sprints[ideaId];
    const { toast } = useToast();
    
    const { selectedRole } = useRole();
    const isCommittee = ['admin', 'manager', 'mentor'].includes(selectedRole.id);

    if (!idea) {
        return notFound();
    }
    const userAvatar = PlaceHolderImages.find(p => p.id === idea.author.avatar);
    const mentor = users.find(u => u.role === 'Mentor');
    const mentorAvatar = PlaceHolderImages.find(p => p.id === mentor?.avatar);

    const handleStartSprint = () => {
        toast({
            title: "Sprint Iniciado!",
            description: `O sprint para a ideia "${idea.title}" foi configurado e iniciado.`,
        })
    }

    return (
        <div className="space-y-8">
            <Button variant="outline" asChild>
                <Link href={`/dashboard/innovation-labs/${idea.challengeId}`}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar para o Desafio
                </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <StatusBadge status={idea.status} />
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <ThumbsUp className="h-4 w-4" /> {idea.votes} Votos
                                </div>
                            </div>
                            <CardTitle className="text-3xl pt-4">{idea.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 !mt-4">
                                <Avatar className="h-8 w-8">
                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={idea.author.name} />}
                                    <AvatarFallback>{idea.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-foreground">{idea.author.name}</p>
                                    <p className="text-xs">{idea.author.unit}</p>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Problema</h3>
                                <p className="text-muted-foreground">{idea.problem}</p>
                            </div>
                             <div>
                                <h3 className="font-semibold mb-2">Proposta / Hipótese</h3>
                                <p className="text-muted-foreground">{idea.proposal}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {sprint && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Milestone /> Sprint de Experimentação</CardTitle>
                                <CardDescription>Acompanhe o progresso do sprint para validar esta ideia.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <SprintTimeline sprint={sprint} />
                                <Separator />
                                <div className="grid md:grid-cols-2 gap-6 text-sm">
                                    <div className="space-y-1">
                                        <h4 className="font-semibold">Hipótese</h4>
                                        <p className="text-muted-foreground">{sprint.hypothesis}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-semibold">Critérios de Sucesso</h4>
                                        <p className="text-muted-foreground">{sprint.successCriteria}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Check-ins</h4>
                                    <div className="space-y-4">
                                        {sprint.checkIns.map((checkin, index) => (
                                            <div key={index} className="flex gap-3">
                                                <Circle className="h-4 w-4 text-primary mt-1" fill="currentColor"/>
                                                <div>
                                                    <p className="font-semibold">{checkin.date}</p>
                                                    <p className="text-muted-foreground">{checkin.update}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                             <CardFooter>
                                {sprint.result === 'Validado' ? (
                                    <div className="w-full flex flex-col sm:flex-row gap-2">
                                        <Button variant="secondary" className="w-full"><BookCopy className="mr-2"/> Ver Playbook</Button>
                                        <Button className="w-full"><Zap className="mr-2"/> Iniciar Escala</Button>
                                    </div>
                                ) : (
                                    <Button disabled className="w-full">Marcar Sprint como Concluído</Button>
                                )}
                            </CardFooter>
                        </Card>
                    )}

                     {idea.status === 'Validada' && (
                        <Card className="bg-green-500/10 border-green-500/20">
                            <CardHeader>
                                <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2"><Trophy /> Ideia Validada!</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-green-800 dark:text-green-300">Esta ideia foi validada com sucesso no sprint de experimentação. Agora está disponível no Catálogo de Boas Práticas.</p>
                                <div className="flex gap-2">
                                <Button variant="secondary" asChild>
                                    <Link href="/dashboard/innovation-labs/catalog">
                                        <BookCopy className="mr-2"/> Ver Playbook
                                    </Link>
                                </Button>
                                {isCommittee && <Button><Zap className="mr-2"/> Iniciar Processo de Escala</Button>}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Scaling /> Pontuação da Ideia</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-lg">Pontuação ICE</h4>
                                <span className="text-2xl font-bold text-primary">{idea.iceScore}</span>
                            </div>
                            <Progress value={idea.iceScore || 0} className="h-2" />
                            <div className="text-xs text-muted-foreground space-y-2 pt-2">
                                <p><strong>Impacto:</strong> {idea.impact}/10</p>
                                <p><strong>Confiança:</strong> {idea.confidence}/10</p>
                                <p><strong>Esforço:</strong> {idea.effort}/10 (menor é melhor)</p>
                                <p><strong>Alinhamento:</strong> {idea.strategicAlignment}/10</p>
                            </div>
                        </CardContent>
                         {isCommittee && idea.status === 'Submetida' && (
                             <CardFooter className="flex gap-2">
                                <Button variant="destructive" className="w-full">Rejeitar</Button>
                                <Button variant="default" className="w-full">Aprovar</Button>
                            </CardFooter>
                         )}
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare /> Curadoria & Parecer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {mentor && (
                                <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
                                    <Avatar className="h-9 w-9">
                                        {mentorAvatar && <AvatarImage src={mentorAvatar.imageUrl} alt={mentor.name} />}
                                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm">{mentor.name}</p>
                                        <p className="text-xs text-muted-foreground">{mentor.role}</p>
                                        <p className="text-sm text-foreground mt-2">"Ideia com grande potencial de impacto. O esforço parece subestimado, mas o alinhamento com a estratégia da empresa é claro. Recomendo a aprovação para um sprint."</p>
                                    </div>
                                </div>
                           )}
                           {isCommittee && (
                               <div className="pt-4">
                                   <Button className="w-full" disabled>
                                    <Send className="mr-2"/> Enviar Parecer
                                   </Button>
                               </div>
                           )}
                        </CardContent>
                         {idea.status === 'Aprovada' && isCommittee && (
                             <CardFooter>
                                <Dialog>
                                    <DialogTrigger asChild>
                                         <Button className="w-full"><Play className="mr-2"/> Iniciar Sprint</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                        <DialogTitle>Configurar Sprint de Experimentação</DialogTitle>
                                        <DialogDescription>
                                            Defina os parâmetros para o sprint de validação da ideia "{idea.title}".
                                        </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 space-y-4">
                                             <p className="text-sm text-muted-foreground">Esta é uma simulação. Ao clicar em "Confirmar", o sprint será iniciado com dados de exemplo.</p>
                                             <Button className="w-full" onClick={handleStartSprint}>Confirmar e Iniciar Sprint</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                         )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
