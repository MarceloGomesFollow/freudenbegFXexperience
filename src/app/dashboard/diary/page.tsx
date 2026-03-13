
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { diaryEntries, users, userGoals, type DiaryEntry, type Goal } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bot, Image as ImageIcon, Paperclip, Send, Video, XCircle, FileText, Pencil, Flag, Upload, PlusCircle, NotebookText } from "lucide-react";
// import { summarizeDiaryEntries } from "@/ai/flows/summarize-diary-entries";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";
import { td } from "@/lib/data-translations";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function DiaryPage() {
    const [newEntry, setNewEntry] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [entries, setEntries] = useState<DiaryEntry[]>(diaryEntries);
    const [summary, setSummary] = useState<{ summary: string; insights: string[]; sentiment: string } | null>(null);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [goals, setGoals] = useState<Goal[]>(userGoals);
    const { toast } = useToast();
    const { language, t } = useLanguage();

    const currentUser = users.find(u => u.email === 'ana.silva@example.com');
    const userAvatar = PlaceHolderImages.find(p => p.id === currentUser?.avatar);

    const handleProgressChange = (goalId: string, newProgress: number) => {
        setGoals(goals.map(g => g.id === goalId ? { ...g, progress: newProgress } : g));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (attachments.length + event.target.files.length > 3) {
                toast({
                    variant: "destructive",
                    title: t('toast.attachmentLimit'),
                    description: t('toast.attachmentLimitDesc'),
                });
                return;
            }
            setAttachments(prev => [...prev, ...Array.from(event.target.files!)]);
        }
    };

    const handleRemoveAttachment = (fileName: string) => {
        setAttachments(attachments.filter(file => file.name !== fileName));
    };

    const handleAddEntry = () => {
        if (newEntry.trim() === "" || !currentUser) return;
        const entry: DiaryEntry = {
            id: `entry${entries.length + 1}`,
            user: { name: currentUser.name, avatar: currentUser.avatar, unit: currentUser.unit },
            date: t('diary.now'),
            type: 'text',
            content: newEntry,
            attachments: attachments.map(f => f.name),
            comments: [],
        };
        setEntries([entry, ...entries]);
        setNewEntry("");
        setAttachments([]);
        toast({
            title: t('toast.entryAdded'),
            description: t('toast.entryAddedDesc')
        })
    };

    const mockSummaries: Record<string, { summary: string; insights: string[]; sentiment: string }> = {
        pt: {
            sentiment: "Positivo / Motivado",
            summary: "As entradas do diário revelam um colaborador altamente engajado com o programa de intercâmbio, demonstrando crescimento profissional consistente e adaptação cultural exemplar. Há uma tendência clara de evolução na confiança ao lidar com desafios interculturais, especialmente em contextos de trabalho em equipe com colegas de diferentes unidades da Freudenberg. O participante mostra forte alinhamento com os valores do grupo e busca ativamente oportunidades de aprendizado.",
            insights: [
                "Forte desenvolvimento de competências interculturais — o participante demonstra capacidade crescente de navegar diferenças culturais em reuniões e projetos colaborativos.",
                "Engajamento consistente com o programa de mentoria — as reflexões indicam que as sessões de mentoria estão gerando impacto direto na tomada de decisões e no planejamento de carreira.",
                "Proatividade em iniciativas de inovação — há registros frequentes de participação em desafios do Innovation Labs e contribuições com ideias para melhorias de processos.",
                "Gestão emocional positiva — mesmo em momentos de desafio (adaptação inicial, saudade de casa), o participante demonstra resiliência e busca apoio adequado.",
                "Oportunidade de melhoria: documentação mais detalhada das lições aprendidas em cada semana poderia potencializar ainda mais o crescimento.",
            ],
        },
        en: {
            sentiment: "Positive / Motivated",
            summary: "The diary entries reveal a highly engaged participant in the exchange program, demonstrating consistent professional growth and exemplary cultural adaptation. There is a clear trend of increasing confidence when dealing with intercultural challenges, especially in teamwork contexts with colleagues from different Freudenberg units. The participant shows strong alignment with the group's values and actively seeks learning opportunities.",
            insights: [
                "Strong development of intercultural competencies — the participant shows growing ability to navigate cultural differences in meetings and collaborative projects.",
                "Consistent engagement with the mentorship program — reflections indicate that mentoring sessions are having a direct impact on decision-making and career planning.",
                "Proactivity in innovation initiatives — there are frequent records of participation in Innovation Labs challenges and contributions with ideas for process improvements.",
                "Positive emotional management — even in challenging moments (initial adaptation, homesickness), the participant demonstrates resilience and seeks appropriate support.",
                "Improvement opportunity: more detailed documentation of lessons learned each week could further enhance growth.",
            ],
        },
        de: {
            sentiment: "Positiv / Motiviert",
            summary: "Die Tagebucheinträge zeigen einen hochengagierten Teilnehmer am Austauschprogramm, der konsistentes berufliches Wachstum und vorbildliche kulturelle Anpassung demonstriert. Es gibt einen klaren Trend zu wachsendem Selbstvertrauen im Umgang mit interkulturellen Herausforderungen, insbesondere in Teamarbeitskontexten mit Kollegen aus verschiedenen Freudenberg-Einheiten. Der Teilnehmer zeigt eine starke Übereinstimmung mit den Werten der Gruppe und sucht aktiv nach Lernmöglichkeiten.",
            insights: [
                "Starke Entwicklung interkultureller Kompetenzen — der Teilnehmer zeigt wachsende Fähigkeit, kulturelle Unterschiede in Meetings und kollaborativen Projekten zu navigieren.",
                "Konsequentes Engagement im Mentoring-Programm — die Reflexionen zeigen, dass die Mentoring-Sitzungen einen direkten Einfluss auf die Entscheidungsfindung und Karriereplanung haben.",
                "Proaktivität bei Innovationsinitiativen — es gibt häufige Aufzeichnungen über die Teilnahme an Innovation Labs-Herausforderungen und Beiträge mit Ideen zur Prozessverbesserung.",
                "Positives Emotionsmanagement — selbst in herausfordernden Momenten (anfängliche Anpassung, Heimweh) zeigt der Teilnehmer Resilienz und sucht angemessene Unterstützung.",
                "Verbesserungsmöglichkeit: eine detailliertere Dokumentation der wöchentlichen Erkenntnisse könnte das Wachstum weiter fördern.",
            ],
        },
    };

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSummary(null);
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2200));
        setSummary(mockSummaries[language] || mockSummaries.pt);
        setIsSummarizing(false);
    };

    const EntryTypeIcon = ({ type }: { type: DiaryEntry['type'] }) => {
        switch (type) {
            case 'image': return <ImageIcon className="h-4 w-4" />;
            case 'video': return <Video className="h-4 w-4" />;
            case 'text': return <FileText className="h-4 w-4" />;
            default: return <Pencil className="h-4 w-4" />;
        }
    }


    const containerVariants = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };
    const itemVariants = {
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <motion.div className="space-y-4 sm:space-y-8" variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    <span className="gold-text">{t('diary.title1')}</span>{" "}
                    <span className="text-foreground">{t('diary.title2')}</span>
                </h2>
                <p className="text-muted-foreground max-w-3xl mt-2">
                    {t('diary.subtitle')}
                </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid gap-4 sm:gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-3 sm:space-y-6">
                    <Tabs defaultValue="diary">
                        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
                            <TabsTrigger value="diary"><NotebookText className="mr-2 h-4 w-4"/>{t('diary.tabs.diary')}</TabsTrigger>
                            <TabsTrigger value="goals"><Flag className="mr-2 h-4 w-4"/>{t('diary.tabs.goals')}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="diary" className="space-y-3 sm:space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('diary.newEntry')}</CardTitle>
                                    <CardDescription>{t('diary.newEntryDesc')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="text" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="text" className="text-xs sm:text-sm"><FileText className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"/><span className="truncate">{t('diary.textTab')}</span></TabsTrigger>
                                            <TabsTrigger value="image" className="text-xs sm:text-sm"><ImageIcon className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"/><span className="truncate">{t('diary.imageTab')}</span></TabsTrigger>
                                            <TabsTrigger value="video" className="text-xs sm:text-sm"><Video className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"/><span className="truncate">{t('diary.videoTab')}</span></TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="text" className="mt-4">
                                            <Textarea 
                                                placeholder={t('diary.textPlaceholder')}
                                                value={newEntry}
                                                onChange={(e) => setNewEntry(e.target.value)}
                                                rows={4}
                                            />
                                        </TabsContent>
                                        <TabsContent value="image" className="mt-4 space-y-2">
                                            <Input type="file" accept="image/*" onChange={handleFileChange} />
                                            <p className="text-xs text-muted-foreground">{t('diary.imageSimulation')}</p>
                                            <Textarea
                                                placeholder={t('diary.imageCaptionPlaceholder')} 
                                                value={newEntry}
                                                onChange={(e) => setNewEntry(e.target.value)}
                                                rows={2}
                                            />
                                        </TabsContent>
                                        <TabsContent value="video" className="mt-4 space-y-2">
                                            <Input type="file" accept="video/*" onChange={handleFileChange} />
                                            <p className="text-xs text-muted-foreground">{t('diary.videoSimulation')}</p>
                                            <Textarea
                                                placeholder={t('diary.videoCaptionPlaceholder')} 
                                                value={newEntry}
                                                onChange={(e) => setNewEntry(e.target.value)}
                                                rows={2}
                                            />
                                        </TabsContent>
                                    </Tabs>
                                    
                                    <div className="mt-4 space-y-2">
                                        <Label className="text-sm font-medium">{t('diary.attachments')}</Label>
                                        <div className="flex items-center gap-2">
                                             <Input id="attachment-upload" type="file" multiple onChange={handleFileChange} className="w-full" />
                                        </div>

                                        {attachments.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {attachments.map((file, index) => (
                                                    <Badge key={index} variant="secondary" className="pl-2 pr-1">
                                                        {file.name}
                                                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => handleRemoveAttachment(file.name)}>
                                                            <XCircle className="h-3 w-3"/>
                                                        </Button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button onClick={handleAddEntry} disabled={!newEntry.trim()}>
                                        <Send className="mr-2 h-4 w-4" /> {t('diary.publishEntry')}
                                    </Button>
                                </CardFooter>
                            </Card>

                            <div className="space-y-3 sm:space-y-6">
                                <h3 className="text-xl font-semibold">{t('diary.entryHistory')}</h3>
                                {entries.map((entry, index) => {
                                    const entryUserAvatar = PlaceHolderImages.find(p => p.id === entry.user.avatar);
                                    return (
                                    <Card key={entry.id} className={index < 3 ? "border-l-2 border-gold" : ""}>
                                        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                            <Avatar>
                                                {entryUserAvatar && <AvatarImage src={entryUserAvatar.imageUrl} alt={entry.user.name} />}
                                                <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold">{entry.user.name}</p>
                                                        <p className="text-xs text-muted-foreground">{entry.user.unit}</p>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{td(language, 'diaryEntries', entry.id, 'date', entry.date)}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <EntryTypeIcon type={entry.type} />
                                                <span>{t('diary.entryOf')} {entry.type}</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground whitespace-pre-wrap mb-4">{td(language, 'diaryEntries', entry.id, 'content', entry.content)}</p>
                                            
                                            {entry.type === 'image' && (
                                                <div className="relative aspect-video w-full max-w-lg mx-auto">
                                                    <Image src="https://picsum.photos/seed/whiteboard/600/400" alt="whiteboard" layout="fill" className="rounded-lg object-cover" data-ai-hint="whiteboard ideas" />
                                                </div>
                                            )}

                                            {entry.type === 'video' && (
                                                <div className="relative aspect-video w-full max-w-lg mx-auto bg-slate-900 rounded-lg flex items-center justify-center">
                                                    <div className="text-center text-white">
                                                        <Video className="h-12 w-12 mx-auto" />
                                                        <p>{t('diary.videoSimLabel')}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {entry.attachments && entry.attachments.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    <p className="text-sm font-semibold">{t('diary.attachmentsLabel')}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {entry.attachments.map((file, index) => (
                                                            <Badge key={index} variant="outline">
                                                                <Paperclip className="mr-2 h-3 w-3" />
                                                                {file}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                        {entry.comments.length > 0 && (
                                            <CardFooter className="flex flex-col items-start gap-4">
                                                {entry.comments.map((comment, index) => {
                                                    const commentUserAvatar = PlaceHolderImages.find(p => p.id === comment.user.avatar);
                                                    return (
                                                        <div key={index} className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg w-full">
                                                            <Avatar className="h-8 w-8">
                                                                {commentUserAvatar && <AvatarImage src={commentUserAvatar.imageUrl} alt={comment.user.name} />}
                                                                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <div>
                                                                        <p className="font-semibold text-sm">{comment.user.name}</p>
                                                                        <p className="text-xs text-muted-foreground">{comment.user.unit}</p>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground ml-auto">{comment.date}</p>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground mt-1">{td(language, 'diaryEntries', entry.id, 'commentText', comment.text)}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </CardFooter>
                                        )}
                                    </Card>
                                )})}
                            </div>
                        </TabsContent>
                        <TabsContent value="goals" className="space-y-3 sm:space-y-6">
                             {goals.map((goal) => (
                                <Card key={goal.id}>
                                    <CardHeader>
                                        <CardTitle>{td(language, 'goals', goal.id, 'title', goal.title)}</CardTitle>
                                        <CardDescription>{td(language, 'goals', goal.id, 'description', goal.description)}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label htmlFor={`progress-${goal.id}`} className="mb-2 flex justify-between">
                                                <span>{t('diary.progress')}</span>
                                                <span className="text-primary font-semibold">{goal.progress}%</span>
                                            </Label>
                                            <Progress value={goal.progress} id={`progress-${goal.id}`} />
                                            <Slider
                                                defaultValue={[goal.progress]}
                                                max={100}
                                                step={5}
                                                onValueChange={(value) => handleProgressChange(goal.id, value[0])}
                                                className="mt-2"
                                            />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>{t('diary.evidence')}</Label>
                                            <Textarea placeholder={t('diary.evidencePlaceholder')} />
                                            <Button variant="outline" size="sm">
                                                <Upload className="mr-2 h-4 w-4" /> {t('diary.attachFile')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>{t('diary.saveGoalProgress')}</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            <Card className="border-dashed">
                                <CardHeader className="text-center">
                                    <PlusCircle className="mx-auto h-8 w-8 text-muted-foreground"/>
                                    <CardTitle className="mt-2">{t('diary.addNewGoal')}</CardTitle>
                                    <CardDescription>{t('diary.addNewGoalDesc')}</CardDescription>
                                </CardHeader>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="lg:col-span-1 space-y-3 sm:space-y-6">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot />
                                {t('diary.aiSummary')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-sm">
                                {t('diary.aiSummaryDesc')}
                            </p>
                            <Button variant="gold" onClick={handleSummarize} className="w-full" disabled={isSummarizing}>
                                {isSummarizing ? t('diary.generating') : t('diary.generateSummary')}
                            </Button>

                            {isSummarizing && (
                                <div className="mt-4 space-y-4">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-16 w-full" />
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            )}

                            {summary && (
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <h4 className="font-semibold">{t('diary.overallSentiment')} <span className="text-primary">{summary.sentiment}</span></h4>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{t('diary.summary')}</h4>
                                        <p className="text-sm text-muted-foreground">{summary.summary}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{t('diary.keyInsights')}</h4>
                                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                                            {summary.insights.map((insight, index) => <li key={index}>{insight}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </motion.div>
    )
}

    

    

    
