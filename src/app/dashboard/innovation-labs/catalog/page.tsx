
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, Tag, Building, ThumbsUp } from "lucide-react";
import { ideas } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function CatalogPage() {
    const { toast } = useToast();
    const validatedIdeas = ideas.filter(idea => idea.status === 'Validada' || idea.status === 'Escalada');

    const handleReplicate = (ideaTitle: string) => {
        toast({
            title: "Ticket Aberto!",
            description: `Um ticket para replicar a prática "${ideaTitle}" foi aberto para sua unidade.`,
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Catálogo de Boas Práticas</h2>
                <p className="mt-2 max-w-2xl text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                   Repositório de ideias validadas e prontas para serem replicadas em outras áreas e unidades.
                </p>
            </div>

            <Card>
                <CardHeader>
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>Práticas Disponíveis</CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar por unidade, KPI, processo..." className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {validatedIdeas.length > 0 ? validatedIdeas.map((idea) => (
                        <Card key={idea.id} className="flex flex-col hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{idea.title}</CardTitle>
                                <CardDescription className="flex items-center pt-2">
                                    <Building className="h-4 w-4 mr-2"/> {idea.author.unit}
                                </CardDescription>
                            </CardHeader>
                             <CardContent className="flex-grow space-y-4">
                                <p className="text-sm text-muted-foreground line-clamp-3 h-[60px]">{idea.proposal}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                     <Tag className="h-4 w-4 text-muted-foreground" />
                                    {idea.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                                 <div className="flex items-center text-sm text-muted-foreground">
                                    <ThumbsUp className="h-4 w-4 mr-2"/>
                                    KPI Impactado: Redução de Custo
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col sm:flex-row gap-2">
                                <Button variant="outline" className="w-full">
                                    <FileText className="mr-2 h-4 w-4"/> Ver Playbook
                                </Button>
                                <Button className="w-full" onClick={() => handleReplicate(idea.title)}>
                                    Quero Replicar
                                </Button>
                            </CardFooter>
                        </Card>
                    )) : (
                        <p className="text-muted-foreground col-span-full text-center py-8">Nenhuma boa prática encontrada.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
