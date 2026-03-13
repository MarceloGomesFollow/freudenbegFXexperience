
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
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";
import { td } from "@/lib/data-translations";


const MenteesTab = () => {
    const { language, t } = useLanguage();
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
        return <Badge variant={variant}>{translateDataValue(priority, t)}</Badge>;
    }

    return (
        <div className="grid gap-4 sm:gap-8 md:grid-cols-1 lg:grid-cols-2 mt-6">
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
                                        <CardDescription>{translateDataValue(mentee.role, t)} • {mentee.unit}</CardDescription>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href="#">
                                        {t('common.viewProfile')} <ExternalLink className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3 sm:space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-medium">{t('mentorship.programProgress')}</h4>
                                    <span className="text-sm font-bold text-primary">{mentee.progress}%</span>
                                </div>
                                <Progress value={mentee.progress} />
                            </div>

                            <div className="space-y-2">
                                    <h4 className="text-sm font-medium">{t('mentorship.alertsDeliveries')}</h4>
                                    {lateTasks.length > 0 && (
                                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive-foreground">
                                            <div className="flex items-start gap-2">
                                            <Bell className="h-4 w-4 mt-0.5 text-destructive"/>
                                            <div>
                                                <p className="font-semibold text-sm text-destructive">{lateTasks.length} {lateTasks.length > 1 ? t('mentorship.lateTasks') : t('mentorship.lateTask')}</p>
                                                <p className="text-xs">{lateTasks.map(lt => td(language, 'tasks', lt.id, 'title', lt.title)).join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )}

                                    {pendingTasks.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[60%]">{t('mentorship.tableTask')}</TableHead>
                                                    <TableHead>{t('mentorship.tableDeadline')}</TableHead>
                                                    <TableHead>{t('mentorship.tablePriority')}</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {pendingTasks.map(task => (
                                                    <TableRow key={task.id}>
                                                        <TableCell className="font-medium flex items-center gap-2">
                                                            <TaskStatusIcon status={task.status} /> {td(language, 'tasks', task.id, 'title', task.title)}
                                                        </TableCell>
                                                        <TableCell>{td(language, 'tasks', task.id, 'dueDate', task.dueDate)}</TableCell>
                                                        <TableCell>
                                                            <PriorityBadge priority={task.priority} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">{t('mentorship.noTasksPending')}</p>
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
    const { t } = useLanguage();
    const [meetingType, setMeetingType] = useState<string>();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: t('toast.meetingScheduled'),
            description: t('toast.meetingScheduledDesc')
        });
    }

    const participants = [
        { id: "ana-silva", label: "Ana Silva (Mentorado)" },
        { id: "fabio-pereira", label: "Fábio Pereira (Mentor)" },
        { id: "equipe-projeto", label: "Equipe do Projeto" },
        { id: "gestor-unidade", label: "Gestor da Unidade" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-6">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('mentorship.scheduledMeetings')}</CardTitle>
                        <CardDescription>{t('mentorship.scheduledMeetingsDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Alinhamento Inicial - Projeto Onboarding (Ana Silva)</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground"><strong>Data:</strong> 25/07/2024, 10:00</p>
                                    <p className="text-sm text-muted-foreground"><strong>{t('mentorship.participants')}:</strong> Ana Silva, Fábio Pereira</p>
                                    <div className="space-y-2">
                                        <Label>{t('mentorship.meetingMinutes')}</Label>
                                        <Textarea placeholder={t('mentorship.meetingMinutesPlaceholder')} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('mentorship.deliverables')}</Label>
                                        <div className="flex items-center gap-2">
                                            <Input placeholder={t('mentorship.newTaskPlaceholder')}/>
                                            <Button><PlusCircle className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                    <Button size="sm">{t('mentorship.saveMinutes')}</Button>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>{t('mentorship.weeklyPlanningSprint')}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground text-sm">{t('mentorship.weeklyPlanningDetails')}</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('mentorship.scheduleNewMeeting')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="meeting-type">{t('mentorship.meetingType')}</Label>
                                <Select onValueChange={setMeetingType}>
                                    <SelectTrigger id="meeting-type">
                                        <SelectValue placeholder={t('mentorship.selectType')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="info">{t('mentorship.projectInfo')}</SelectItem>
                                        <SelectItem value="align">{t('mentorship.initialAlignment')}</SelectItem>
                                        <SelectItem value="plan">{t('mentorship.weeklyPlanning')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {meetingType === 'plan' && (
                                <div className="space-y-2">
                                    <Label htmlFor="recurrence">{t('mentorship.recurrenceWeeks')}</Label>
                                    <Input id="recurrence" type="number" placeholder={t('mentorship.recurrencePlaceholder')} />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="date">{t('mentorship.dateTime')}</Label>
                                <Input id="date" type="datetime-local" />
                            </div>

                            <div className="space-y-2">
                                <Label>{t('mentorship.participants')}</Label>
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
                                <Label htmlFor="objectives">{t('mentorship.objectives')}</Label>
                                <Textarea id="objectives" placeholder={t('mentorship.objectivesPlaceholder')} />
                            </div>

                            <Button type="submit" className="w-full">{t('mentorship.scheduleMeeting')}</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const AiReportTab = () => {
    const { t } = useLanguage();
    const [selectedMentee, setSelectedMentee] = useState<string | null>(null);
    const [generatedReport, setGeneratedReport] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerateReport = async () => {
        if (!selectedMentee) {
            toast({
                variant: 'destructive',
                title: t('toast.selectMentee'),
                description: t('toast.selectMenteeDesc'),
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
                title: t('toast.reportError'),
                description: t('toast.reportErrorDesc'),
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
                title: t('toast.reportGenerated'),
                description: t('toast.reportGeneratedDesc'),
            });
        } catch (error) {
            console.error("Error generating report:", error);
            toast({
                variant: 'destructive',
                title: t('toast.reportError'),
                description: t('toast.reportErrorDesc'),
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="mt-6">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>{t('mentorship.aiReportTitle')}</CardTitle>
                    <CardDescription>{t('mentorship.aiReportDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="mentee-select">{t('mentorship.selectMentee')}</Label>
                        <Select onValueChange={setSelectedMentee}>
                            <SelectTrigger id="mentee-select">
                                <SelectValue placeholder={t('mentorship.chooseMentee')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ana.silva@example.com">Ana Silva</SelectItem>
                                <SelectItem value="eduarda.lima@example.com">Eduarda Lima</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <Button variant="gold" className="w-full" onClick={handleGenerateReport} disabled={isLoading}>
                        <Bot className="mr-2 h-4 w-4"/>
                        {isLoading ? t('mentorship.generating') : t('mentorship.generateReport')}
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
                            <p>{t('mentorship.reportPlaceholder')}</p>
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
    const { t } = useLanguage();
    return (
        <motion.div className="space-y-4 sm:space-y-8" variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    <span className="gold-text">{t('mentorship.title1')}</span>{" "}
                    <span className="text-foreground">{t('mentorship.title2')}</span>
                </h2>
                <p className="mt-2 text-muted-foreground">
                    {t('mentorship.subtitle')}
                </p>
            </motion.div>

            <motion.div variants={itemVariants}>
            <Tabs defaultValue="mentees" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="mentees" className="text-xs sm:text-sm"><UsersIcon className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"/><span className="truncate">{t('mentorship.tabs.mentees')}</span></TabsTrigger>
                    <TabsTrigger value="meetings" className="text-xs sm:text-sm"><Calendar className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"/><span className="truncate">{t('mentorship.tabs.meetings')}</span></TabsTrigger>
                    <TabsTrigger value="report" className="text-xs sm:text-sm"><Bot className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"/><span className="truncate">{t('mentorship.tabs.report')}</span></TabsTrigger>
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
