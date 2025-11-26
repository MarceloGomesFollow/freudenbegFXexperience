
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { diaryEntries, users, userGoals, type DiaryEntry, type Goal } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bot, Image as ImageIcon, Paperclip, Send, Video, XCircle, FileText, Pencil, Flag, Upload, PlusCircle, NotebookText } from "lucide-react";
import { summarizeDiaryEntries } from "@/ai/flows/summarize-diary-entries";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

export default function DiaryPage() {
    const [newEntry, setNewEntry] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [entries, setEntries] = useState<DiaryEntry[]>(diaryEntries);
    const [summary, setSummary] = useState<{ summary: string; insights: string[]; sentiment: string } | null>(null);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [goals, setGoals] = useState<Goal[]>(userGoals);
    const { toast } = useToast();
    const { language } = useLanguage();

    const currentUser = users.find(u => u.email === 'ana.silva@example.com');
    const userAvatar = PlaceHolderImages.find(p => p.id === currentUser?.avatar);

    const handleProgressChange = (goalId: string, newProgress: number) => {
        setGoals(goals.map(g => g.id === goalId ? { ...g, progress: newProgress } : g));
    };

    const handleAddAttachment = () => {
        if (attachments.length < 3) {
            setAttachments([...attachments, `documento_simulado_${attachments.length + 1}.pdf`]);
        } else {
            toast({
                variant: "destructive",
                title: "Limite de anexos atingido",
                description: "Você pode anexar no máximo 3 arquivos.",
            });
        }
    };

    const handleRemoveAttachment = (fileName: string) => {
        setAttachments(attachments.filter(file => file !== fileName));
    };

    const handleAddEntry = () => {
        if (newEntry.trim() === "" || !currentUser) return;
        const entry: DiaryEntry = {
            id: `entry${entries.length + 1}`,
            user: { name: currentUser.name, avatar: currentUser.avatar, unit: currentUser.unit },
            date: "Agora",
            type: 'text',
            content: newEntry,
            attachments: attachments,
            comments: [],
        };
        setEntries([entry, ...entries]);
        setNewEntry("");
        setAttachments([]);
        toast({
            title: "Entrada Adicionada!",
            description: "Seu registro foi salvo no diário."
        })
    };

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSummary(null);
        try {
            const allEntriesText = entries.map(e => e.content).join("\n\n");
            const result = await summarizeDiaryEntries({ diaryEntries: allEntriesText, language });
            setSummary(result);
        } catch (error) {
            console.error("Error summarizing entries:", error);
            toast({
                variant: "destructive",
                title: "Erro na Sumarização",
                description: "Não foi possível gerar o resumo. Tente novamente.",
            });
        } finally {
            setIsSummarizing(false);
        }
    };

    const EntryTypeIcon = ({ type }: { type: DiaryEntry['type'] }) => {
        switch (type) {
            case 'image': return <ImageIcon className="h-4 w-4" />;
            case 'video': return <Video className="h-4 w-4" />;
            case 'text': return <FileText className="h-4 w-4" />;
            default: return <Pencil className="h-4 w-4" />;
        }
    }


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Diário 4.0</h2>
             <p className="text-muted-foreground max-w-3xl">
                Este é o seu espaço para substituir os formulários manuais. Registre suas atividades, reflexões e aprendizados de forma dinâmica com textos, fotos e vídeos que ficam integrados ao seu histórico.
            </p>
            
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="diary">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="diary"><NotebookText className="mr-2 h-4 w-4"/>Diário</TabsTrigger>
                            <TabsTrigger value="goals"><Flag className="mr-2 h-4 w-4"/>Metas</TabsTrigger>
                        </TabsList>
                        <TabsContent value="diary" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Nova Entrada no Diário</CardTitle>
                                    <CardDescription>O que você fez ou aprendeu hoje?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="text" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4"/>Texto</TabsTrigger>
                                            <TabsTrigger value="image"><ImageIcon className="mr-2 h-4 w-4"/>Imagem</TabsTrigger>
                                            <TabsTrigger value="video"><Video className="mr-2 h-4 w-4"/>Vídeo</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="text" className="mt-4">
                                            <Textarea 
                                                placeholder="Registre suas atividades, reflexões e aprendizados..." 
                                                value={newEntry}
                                                onChange={(e) => setNewEntry(e.target.value)}
                                                rows={4}
                                            />
                                        </TabsContent>
                                        <TabsContent value="image" className="mt-4 space-y-2">
                                            <Input type="file" disabled />
                                            <p className="text-xs text-muted-foreground">Simulação: Upload de imagem desabilitado.</p>
                                            <Textarea 
                                                placeholder="Adicione uma legenda para a sua imagem..." 
                                                value={newEntry}
                                                onChange={(e) => setNewEntry(e.target.value)}
                                                rows={2}
                                            />
                                        </TabsContent>
                                        <TabsContent value="video" className="mt-4 space-y-2">
                                            <Input type="file" disabled />
                                            <p className="text-xs text-muted-foreground">Simulação: Upload de vídeo desabilitado.</p>
                                            <Textarea 
                                                placeholder="Adicione uma descrição para o seu vídeo..." 
                                                value={newEntry}
                                                onChange={(e) => setNewEntry(e.target.value)}
                                                rows={2}
                                            />
                                        </TabsContent>
                                    </Tabs>
                                    
                                    <div className="mt-4 space-y-2">
                                        <Label className="text-sm font-medium">Anexos (Opcional)</Label>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={handleAddAttachment} disabled={attachments.length >= 3}>
                                                <Paperclip className="mr-2 h-4 w-4" />
                                                Adicionar Arquivo
                                            </Button>
                                        </div>

                                        {attachments.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {attachments.map((file, index) => (
                                                    <Badge key={index} variant="secondary" className="pl-2 pr-1">
                                                        {file}
                                                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => handleRemoveAttachment(file)}>
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
                                        <Send className="mr-2 h-4 w-4" /> Publicar Entrada
                                    </Button>
                                </CardFooter>
                            </Card>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold">Histórico de Entradas</h3>
                                {entries.map(entry => {
                                    const entryUserAvatar = PlaceHolderImages.find(p => p.id === entry.user.avatar);
                                    return (
                                    <Card key={entry.id}>
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
                                                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <EntryTypeIcon type={entry.type} />
                                                <span>Entrada de {entry.type}</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground whitespace-pre-wrap mb-4">{entry.content}</p>
                                            
                                            {entry.type === 'image' && (
                                                <div className="relative aspect-video w-full max-w-lg mx-auto">
                                                    <Image src="https://picsum.photos/seed/whiteboard/600/400" alt="whiteboard" layout="fill" className="rounded-lg object-cover" data-ai-hint="whiteboard ideas" />
                                                </div>
                                            )}

                                            {entry.type === 'video' && (
                                                <div className="relative aspect-video w-full max-w-lg mx-auto bg-slate-900 rounded-lg flex items-center justify-center">
                                                    <div className="text-center text-white">
                                                        <Video className="h-12 w-12 mx-auto" />
                                                        <p>Simulação de Vídeo</p>
                                                    </div>
                                                </div>
                                            )}

                                            {entry.attachments && entry.attachments.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    <p className="text-sm font-semibold">Anexos:</p>
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
                                                                <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
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
                        <TabsContent value="goals" className="space-y-6">
                             {goals.map((goal) => (
                                <Card key={goal.id}>
                                    <CardHeader>
                                        <CardTitle>{goal.title}</CardTitle>
                                        <CardDescription>{goal.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <Label htmlFor={`progress-${goal.id}`} className="mb-2 flex justify-between">
                                                <span>Progresso</span>
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
                                            <Label>Evidências</Label>
                                            <Textarea placeholder="Adicione notas ou links para as evidências aqui..." />
                                            <Button variant="outline" size="sm">
                                                <Upload className="mr-2 h-4 w-4" /> Anexar Arquivo
                                            </Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Salvar Progresso da Meta</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            <Card className="border-dashed">
                                <CardHeader className="text-center">
                                    <PlusCircle className="mx-auto h-8 w-8 text-muted-foreground"/>
                                    <CardTitle className="mt-2">Adicionar Nova Meta</CardTitle>
                                    <CardDescription>Esta funcionalidade será habilitada pelo seu gestor.</CardDescription>
                                </CardHeader>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot />
                                Resumo com IA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Use a IA para extrair insights e analisar o sentimento das suas entradas no diário.
                            </p>
                            <Button onClick={handleSummarize} className="w-full" disabled={isSummarizing}>
                                {isSummarizing ? "Gerando..." : "Gerar Resumo"}
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
                                        <h4 className="font-semibold">Sentimento Geral: <span className="text-primary">{summary.sentiment}</span></h4>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Resumo</h4>
                                        <p className="text-sm text-muted-foreground">{summary.summary}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Insights Chave</h4>
                                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                                            {summary.insights.map((insight, index) => <li key={index}>{insight}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

    