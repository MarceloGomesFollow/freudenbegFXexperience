"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Beaker, Lightbulb, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const labs = [
    {
        id: "digital-prototyping",
        title: "Laboratório de Prototipagem Digital",
        description: "Utilize ferramentas de UI/UX e low-code para transformar suas ideias em protótipos navegáveis.",
        type: "Digital",
        imageUrl: "https://picsum.photos/seed/prototype/600/400",
        imageHint: "digital prototype wireframe"
    },
    {
        id: "process-improvement",
        title: "Oficina de Melhoria Contínua",
        description: "Espaço para mapear processos, identificar gargalos e desenhar soluções otimizadas com mentoria especializada.",
        type: "Físico",
        location: "Sala de Inovação B3",
        imageUrl: "https://picsum.photos/seed/whiteboard-session/600/400",
        imageHint: "process improvement whiteboard"
    },
    {
        id: "data-squad",
        title: "Squad de Análise de Dados",
        description: "Um time multifuncional disponível para ajudar a validar hipóteses com dados e criar dashboards de impacto.",
        type: "Digital",
        imageUrl: "https://picsum.photos/seed/data-dashboard/600/400",
        imageHint: "data analytics dashboard"
    }
];

export default function InnovationLabsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Innovation Labs</h2>
          <p className="text-muted-foreground mt-2">
            Transforme ideias em realidade. Acesse nossos laboratórios para prototipar e inovar.
          </p>
        </div>
        <Button asChild>
            <Link href="#">
                <Lightbulb className="mr-2 h-4 w-4" />
                Sugerir Novo Lab
            </Link>
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
                <Card key={lab.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative h-48 w-full">
                        <Image
                            src={lab.imageUrl}
                            alt={lab.title}
                            fill
                            className="object-cover"
                            data-ai-hint={lab.imageHint}
                        />
                        <div className={`absolute top-2 right-2 text-xs font-bold py-1 px-2 rounded ${lab.type === 'Digital' ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'}`}>
                            {lab.type}
                        </div>
                    </div>
                    <CardHeader>
                        <CardTitle>{lab.title}</CardTitle>
                        <CardDescription className="line-clamp-3 h-[60px]">{lab.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                        {lab.location && (
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{lab.location}</span>
                            </div>
                        )}
                       <Button className="w-full" asChild>
                            <Link href="#">
                                Acessar Lab <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                       </Button>
                    </CardContent>
                </Card>
            ))}
            <Card className="border-dashed flex items-center justify-center">
                 <CardHeader className="text-center">
                    <Beaker className="mx-auto h-10 w-10 text-muted-foreground mb-4"/>
                    <CardTitle className="text-muted-foreground">Novos Labs em Breve</CardTitle>
                    <CardDescription>
                        Estamos preparando mais ambientes para acelerar suas inovações.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    </div>
  );
}
