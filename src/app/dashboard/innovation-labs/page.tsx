
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Target, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { challenges } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRole } from "@/components/role-switcher";

export default function InnovationLabsPage() {
    const { selectedRole } = useRole();
    const canCreateChallenge = ['admin', 'manager'].includes(selectedRole.id);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Innovation Labs</h2>
          <p className="mt-2 max-w-2xl text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            Um espaço para lançar desafios, capturar ideias, experimentar rápido e medir impacto. Conecte-se com mentores e áreas para gerar melhorias, savings e novos padrões.
          </p>
        </div>
        <div className="flex gap-2">
             <Button asChild>
                <Link href="/dashboard/innovation-labs/submit-idea">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Submeter Ideia
                </Link>
            </Button>
            {canCreateChallenge && (
                 <Button asChild variant="secondary">
                    <Link href="#">
                        <Target className="mr-2 h-4 w-4" />
                        Abrir Desafio
                    </Link>
                </Button>
            )}
        </div>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => {
                const ideasCount = challenge.ideaCount || 0;
                const progress = (ideasCount / 5) * 100; // Simulating a target of 5 ideas

                return (
                <Card key={challenge.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative h-48 w-full">
                        <Image
                            src={challenge.imageUrl}
                            alt={challenge.title}
                            fill
                            className="object-cover"
                            data-ai-hint={challenge.imageHint}
                        />
                         <Badge 
                            variant={challenge.status === 'Aberto' ? 'default' : 'secondary'} 
                            className="absolute top-2 right-2"
                        >
                            {challenge.status}
                        </Badge>
                    </div>
                    <CardHeader>
                        <CardTitle>{challenge.title}</CardTitle>
                        <CardDescription className="line-clamp-2 h-[40px]">{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Progresso de Ideias ({ideasCount}/5)</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Prazo: {challenge.deadline}</span>
                        </div>
                    </CardContent>
                     <CardFooter>
                       <Button className="w-full" asChild>
                            <Link href={`/dashboard/innovation-labs/${challenge.id}`}>
                                Ver Desafio <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                       </Button>
                    </CardFooter>
                </Card>
            )})}
            <Card className="border-dashed flex items-center justify-center">
                 <CardHeader className="text-center">
                    <Target className="mx-auto h-10 w-10 text-muted-foreground mb-4"/>
                    <CardTitle className="text-muted-foreground">Novos Desafios em Breve</CardTitle>
                    <CardDescription>
                        Fique atento para novas oportunidades de inovação.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    </div>
  );
}
