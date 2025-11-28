
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WorldTalentMap } from "@/components/world-talent-map";
import { kpis, exchangeOpportunities, challenges } from "@/lib/data";
import { ArrowRight, Beaker, Briefcase, Lightbulb, Users, Newspaper, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const newsItems = [
    {
        id: 1,
        category: "Inovação",
        title: "Nova ideia de gamificação aprovada para sprint!",
        description: "A ideia 'Plataforma de Onboarding Gamificada' de Ana Silva foi aprovada e entrará em fase de experimentação.",
        time: "2h atrás",
        href: "/dashboard/innovation-labs/idea/idea-01"
    },
    {
        id: 2,
        category: "Intercâmbio",
        title: "Oportunidade em Compras na Empresa B",
        description: "Nova vaga para Comprador Técnico disponível. Ideal para quem busca experiência em negociação estratégica.",
        time: "1 dia atrás",
        href: "/dashboard/exchange-center"
    },
    {
        id: 3,
        category: "Learning Hub",
        title: "Novo curso de Liderança Situacional adicionado",
        description: "Desenvolva sua capacidade de adaptar seu estilo de liderança a cada membro da equipe.",
        time: "3 dias atrás",
        href: "/dashboard/learning/lideranca-01"
    }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Bem-vindo à Experiência FX!</h2>
        <p className="text-muted-foreground max-w-3xl">
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

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
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
        <div className="lg:col-span-2 space-y-8">
            <Card>
            <CardHeader>
                <CardTitle>Mapa Global de Talentos</CardTitle>
                <CardDescription>
                Acompanhe a jornada dos nossos participantes.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 hidden lg:block">
                <WorldTalentMap />
            </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Newspaper className="h-5 w-5"/> Últimas Notícias</CardTitle>
                    <CardDescription>
                        Fique por dentro do que está acontecendo no programa.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {newsItems.map((item) => (
                        <div key={item.id} className="group flex items-start gap-4">
                             <div className="w-16 text-right">
                                <Badge variant={item.category === "Inovação" ? "default" : "secondary"}>{item.category}</Badge>
                            </div>
                            <div className="flex-1 space-y-1">
                                <Link href={item.href} className="font-semibold hover:underline">{item.title}</Link>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                                <Link href={item.href}>
                                    <ExternalLink className="h-4 w-4"/>
                                </Link>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
