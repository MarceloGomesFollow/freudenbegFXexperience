
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { users, mentorships, tasks, type Task } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Bell, CheckCircle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";


export default function MentorshipPage() {
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
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Central de Mentoria</h2>
                <p className="text-muted-foreground mt-2">
                    Acompanhe o progresso, prazos e entregas dos seus mentorados em um só lugar.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                {myMentees.map(mentee => {
                    const menteeAvatar = PlaceHolderImages.find(p => p.id === mentee.avatar);
                    const menteeTasks = tasks[mentee.email] || [];
                    const pendingTasks = menteeTasks.filter(t => t.status === 'Pendente' || t.status === 'Em Andamento');
                    const lateTasks = menteeTasks.filter(t => t.status === 'Atrasado');

                    return (
                        <Card key={mentee.email} className="flex flex-col">
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
                                     ) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">Nenhuma tarefa pendente.</p>
                                     )}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
