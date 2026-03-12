
"use client";

import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Lightbulb, Target, Calendar, Filter, ThumbsUp, Scaling } from "lucide-react";
import { challenges, ideas, type Idea } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRole } from '@/components/role-switcher';


const IdeaCard = ({ idea }: { idea: Idea & { iceScore?: number } }) => {
    const router = useRouter();
    const userAvatar = PlaceHolderImages.find(p => p.id === idea.author.avatar);

    const iceScore = idea.iceScore || 0;

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


    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/dashboard/innovation-labs/idea/${idea.id}`)}>
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base font-semibold">{idea.title}</CardTitle>
                    <StatusBadge status={idea.status} />
                </div>
                 <CardDescription className="flex items-center gap-2 pt-2">
                    <Avatar className="h-6 w-6">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={idea.author.name} />}
                        <AvatarFallback>{idea.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{idea.author.name}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <p className="text-sm text-muted-foreground line-clamp-2 h-[40px]">{idea.proposal}</p>
                 <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" /> {idea.votes} votos
                    </div>
                     <div className="flex items-center gap-1 font-semibold">
                        <Scaling className="h-3 w-3 text-primary" /> ICE: {iceScore}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ChallengeDetailPage() {
    const params = useParams();
    const challengeId = params.challengeId as string;
    const challenge = challenges.find(c => c.id === challengeId);
    const { selectedRole } = useRole();
    const canEvaluate = ['admin', 'manager'].includes(selectedRole.id);

    if (!challenge) {
        return notFound();
    }

    const challengeIdeas = ideas.filter(i => i.challengeId === challenge.id);

    return (
        <div className="space-y-8">
            <Button variant="outline" asChild>
                <Link href="/dashboard/innovation-labs">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar para Desafios
                </Link>
            </Button>

            <Card className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="bg-muted p-6">
                        <Badge variant={challenge.status === 'Aberto' ? 'default' : 'secondary'}>{challenge.status}</Badge>
                        <CardTitle className="mt-2 text-3xl">{challenge.title}</CardTitle>
                        <CardDescription className="mt-2 max-w-2xl">{challenge.description}</CardDescription>
                    </div>
                     <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <Target className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Métricas-Alvo</h4>
                                <p className="text-muted-foreground">{challenge.targetMetrics}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Prazo Final</h4>
                                <p className="text-muted-foreground">{challenge.deadline}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Ideias Submetidas</h4>
                                <p className="text-muted-foreground">{challengeIdeas.length}</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-2xl font-bold tracking-tight">Ideias do Desafio</h3>
                     <div className="flex gap-2">
                        {canEvaluate && (
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" /> Avaliar em Lote
                            </Button>
                        )}
                        <Button asChild>
                           <Link href="/dashboard/innovation-labs/submit-idea">
                                <Lightbulb className="mr-2 h-4 w-4"/> Submeter sua Ideia
                           </Link>
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all">
                     <TabsList>
                        <TabsTrigger value="all">Todas</TabsTrigger>
                        <TabsTrigger value="new">Novas</TabsTrigger>
                        <TabsTrigger value="approved">Aprovadas</TabsTrigger>
                        <TabsTrigger value="sprint">Em Sprint</TabsTrigger>
                    </TabsList>
                     <TabsContent value="all" className="mt-4">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {challengeIdeas.length > 0 ? (
                                challengeIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
                            ) : (
                                <p className="text-muted-foreground col-span-full text-center py-8">Nenhuma ideia submetida ainda. Seja o primeiro!</p>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="new" className="mt-4">
                        <p className="text-muted-foreground text-center py-8">Filtro de ideias novas em breve.</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
