"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { diaryEntries, users } from "@/lib/data";
import type { DiaryEntry } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bot, Image as ImageIcon, Paperclip, Send, Video } from "lucide-react";
import { summarizeDiaryEntries } from "@/ai/flows/summarize-diary-entries";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function DiaryPage() {
    const [newEntry, setNewEntry] = useState("");
    const [entries, setEntries] = useState<DiaryEntry[]>(diaryEntries);
    const [summary, setSummary] = useState<{ summary: string; insights: string[]; sentiment: string } | null>(null);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const { toast } = useToast();

    const currentUser = users.find(u => u.email === 'ana.silva@example.com');
    const userAvatar = PlaceHolderImages.find(p => p.id === currentUser?.avatar);

    const handleAddEntry = () => {
        if (newEntry.trim() === "" || !currentUser) return;
        const entry: DiaryEntry = {
            id: `entry${entries.length + 1}`,
            user: { name: currentUser.name, avatar: currentUser.avatar },
            date: "Agora",
            type: 'text',
            content: newEntry,
            comments: [],
        };
        setEntries([entry, ...entries]);
        setNewEntry("");
    };

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSummary(null);
        try {
            const allEntriesText = entries.map(e => e.content).join("\n\n");
            const result = await summarizeDiaryEntries({ diaryEntries: allEntriesText });
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


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Diário 4.0</h2>
            
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nova Entrada no Diário</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full gap-2">
                                <Textarea 
                                    placeholder="Registre suas atividades, reflexões e aprendizados..." 
                                    value={newEntry}
                                    onChange={(e) => setNewEntry(e.target.value)}
                                    rows={4}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon"><ImageIcon className="h-4 w-4 text-muted-foreground" /></Button>
                                        <Button variant="ghost" size="icon"><Video className="h-4 w-4 text-muted-foreground" /></Button>
                                        <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4 text-muted-foreground" /></Button>
                                    </div>
                                    <Button onClick={handleAddEntry} disabled={!newEntry.trim()}>
                                        <Send className="mr-2 h-4 w-4" /> Enviar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
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
                                            <p className="font-semibold">{entry.user.name}</p>
                                            <p className="text-sm text-muted-foreground">{entry.date}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {entry.type === 'text' && <p className="text-muted-foreground">{entry.content}</p>}
                                    {entry.type === 'image' && (
                                        <div>
                                            <p className="text-muted-foreground mb-2">{entry.content}</p>
                                            <img src="https://picsum.photos/seed/whiteboard/600/400" alt="whiteboard" className="rounded-lg" data-ai-hint="whiteboard ideas" />
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
                                                            <p className="font-semibold text-sm">{comment.user.name}</p>
                                                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </CardFooter>
                                )}
                            </Card>
                        )})}
                    </div>
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
                            <p className="text-muted-foreground mb-4">
                                Use a IA para extrair insights e analisar o sentimento das suas entradas no diário.
                            </p>
                            <Button onClick={handleSummarize} className="w-full" disabled={isSummarizing}>
                                {isSummarizing ? "Gerando..." : "Gerar Resumo"}
                            </Button>

                            {isSummarizing && (
                                <div className="mt-4 space-y-4">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-16 w-full" />
                                    <Skeleton className="h-4 w-1/3" />
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
