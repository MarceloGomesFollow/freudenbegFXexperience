
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WorldTalentMap } from "@/components/world-talent-map";
import { kpis, exchangeOpportunities, challenges, activityFeed, type ActivityFeedItem } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Beaker, Briefcase, Lightbulb, Users, Rss, BookOpen, NotebookText, Star } from "lucide-react";
import Link from "next/link";

const ActivityIcon = ({ type }: { type: ActivityFeedItem['type'] }) => {
    switch (type) {
        case 'idea': return <Lightbulb className="h-5 w-5 text-accent" />;
        case 'course': return <BookOpen className="h-5 w-5 text-accent" />;
        case 'diary': return <NotebookText className="h-5 w-5 text-accent" />;
        case 'challenge': return <Star className="h-5 w-5 text-accent" />;
        case 'user': return <Users className="h-5 w-5 text-accent" />;
        default: return <Rss className="h-5 w-5 text-accent" />;
    }
}


export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Bem-vindo à Experiência FX!</h2>
        <p className="text-slate-200 max-w-3xl [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
          Sua plataforma central para desenvolvimento, inovação e conexão. Explore o que está acontecendo no programa e como você pode participar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.activeParticipants}</div>
            <p className="text-xs text-muted-foreground">Colaboradores em desenvolvimento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades Abertas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exchangeOpportunities.length}</div>
            <p className="text-xs text-muted-foreground">Vagas para intercâmbio.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desafios de Inovação</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{challenges.filter(c => c.status === 'Aberto').length}</div>
            <p className="text-xs text-muted-foreground">Problemas reais buscando soluções.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ideias Submetidas</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Novas ideias no último mês.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Rss className="h-6 w-6"/> Feed de Atividades</CardTitle>
                    <CardDescription>O que está acontecendo na plataforma.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activityFeed.map((item) => {
                        const userAvatar = PlaceHolderImages.find(p => p.id === item.user.avatar);
                        return (
                            <div key={item.id} className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50">
                                <ActivityIcon type={item.type} />
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-semibold">{item.user.name}</span> {item.action} <Link href={item.link} className="font-semibold text-primary hover:underline">{item.target}</Link>.
                                    </p>
                                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                </div>
                                <Avatar className="h-9 w-9">
                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={item.user.name} />}
                                    <AvatarFallback>{item.user.name.slice(0,2)}</AvatarFallback>
                                </Avatar>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
             <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary">Qual o seu próximo passo?</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                    <Button size="lg" asChild>
                        <Link href="/dashboard/innovation-labs/submit-idea">
                            <Lightbulb className="mr-2"/> Submeter uma Ideia
                        </Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                         <Link href="/dashboard/exchange-center">
                            Explorar Intercâmbios <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Onde estão nossos talentos?</CardTitle>
                    <CardDescription>
                    Visualize os participantes ativos em intercâmbio pelo mundo em tempo real.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <WorldTalentMap />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
