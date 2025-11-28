
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const events = [
    {
        id: "freud-talks-2023",
        title: "FreudTalks Experience 2023",
        description: "Reviva os melhores momentos da nossa conferência interna, onde talentos compartilharam projetos que estão transformando o futuro da empresa.",
        category: "Edição Anterior",
        imageUrl: "https://picsum.photos/seed/ted-talk-stage/600/400",
        imageHint: "conference stage audience"
    },
    {
        id: "innovation-showcase",
        title: "Showcase de Inovação Q2",
        description: "Apresentações dos protótipos e MVPs desenvolvidos nos Innovation Labs. Veja as ideias em ação e o impacto gerado.",
        category: "Próximo Evento",
        date: "25 de Agosto, 2024",
        imageUrl: "https://picsum.photos/seed/project-showcase/600/400",
        imageHint: "project presentation team"
    },
];

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Eventos de Reconhecimento</h2>
          <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            Palestras inspiradoras no estilo TED com nossos talentos internos.
          </p>
        </div>
        <Button asChild>
            <Link href="#">
                <PlusCircle className="mr-2 h-4 w-4" />
                Sugerir Palestra
            </Link>
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative h-48 w-full">
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                            data-ai-hint={event.imageHint}
                        />
                         <Badge 
                            variant={event.category === 'Próximo Evento' ? 'default' : 'secondary'} 
                            className="absolute top-2 right-2"
                        >
                            {event.category}
                        </Badge>
                    </div>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="line-clamp-3 h-[60px]">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                        {event.date && (
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{event.date}</span>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                       <Button className="w-full" asChild>
                            <Link href={`/dashboard/events/${event.id}`}>
                                {event.category === 'Próximo Evento' ? (
                                    'Inscreva-se'
                                ) : (
                                    <>
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        Assistir Agora
                                    </>
                                )}
                            </Link>
                       </Button>
                    </CardFooter>
                </Card>
            ))}
            <Card className="border-dashed flex items-center justify-center">
                 <CardHeader className="text-center">
                    <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-4"/>
                    <CardTitle className="text-muted-foreground">Fique Atento</CardTitle>
                    <CardDescription>
                        Novos eventos e palestras serão anunciados em breve.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    </div>
  );
}
