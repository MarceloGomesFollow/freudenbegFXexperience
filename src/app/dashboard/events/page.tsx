
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EventsPage() {
  const { t } = useLanguage();

  const events = [
    {
        id: "freud-talks-2023",
        title: "FreudTalks Experience 2023",
        description: "Reviva os melhores momentos da nossa conferência interna, onde talentos compartilharam projetos que estão transformando o futuro da empresa.",
        categoryKey: "previous" as const,
        imageUrl: "https://picsum.photos/seed/ted-talk-stage/600/400",
        imageHint: "conference stage audience"
    },
    {
        id: "innovation-showcase",
        title: "Showcase de Inovação Q2",
        description: "Apresentações dos protótipos e MVPs desenvolvidos nos Innovation Labs. Veja as ideias em ação e o impacto gerado.",
        categoryKey: "next" as const,
        date: "25 de Agosto, 2024",
        imageUrl: "https://picsum.photos/seed/project-showcase/600/400",
        imageHint: "project presentation team"
    },
    {
        id: "leadership-workshop-2024",
        title: "Workshop de Liderança Global",
        description: "Workshop intensivo sobre liderança intercultural e gestão de equipes distribuídas, com facilitadores de 5 países do grupo Freudenberg.",
        categoryKey: "previous" as const,
        date: "12 de Março, 2024",
        imageUrl: "https://picsum.photos/seed/leadership-workshop/600/400",
        imageHint: "workshop leadership training"
    },
    {
        id: "freud-talks-2024",
        title: "FreudTalks Experience 2024",
        description: "A maior edição do FreudTalks até agora: 20 palestrantes, 8 países e temas como sustentabilidade, IA aplicada e cultura de inovação.",
        categoryKey: "next" as const,
        date: "15 de Outubro, 2024",
        imageUrl: "https://picsum.photos/seed/conference-2024/600/400",
        imageHint: "large conference keynote speaker"
    },
    {
        id: "networking-day-apac",
        title: "Networking Day — APAC Region",
        description: "Evento de networking virtual conectando talentos da região Ásia-Pacífico com mentores e líderes seniores do programa FX Experience.",
        categoryKey: "next" as const,
        date: "5 de Novembro, 2024",
        imageUrl: "https://picsum.photos/seed/networking-virtual/600/400",
        imageHint: "virtual networking video call"
    },
    {
        id: "sustainability-hackathon",
        title: "Hackathon de Sustentabilidade",
        description: "48 horas de inovação focada em soluções sustentáveis para os processos industriais do grupo. Equipes multidisciplinares competiram por financiamento de protótipos.",
        categoryKey: "previous" as const,
        date: "20 de Janeiro, 2024",
        imageUrl: "https://picsum.photos/seed/hackathon-green/600/400",
        imageHint: "hackathon sustainability teamwork"
    },
    {
        id: "onboarding-bootcamp-q4",
        title: "FX Onboarding Bootcamp Q4",
        description: "Bootcamp de integração para os novos participantes do programa FX Experience. Inclui imersão cultural, design thinking e planejamento de carreira.",
        categoryKey: "next" as const,
        date: "2 de Dezembro, 2024",
        imageUrl: "https://picsum.photos/seed/bootcamp-onboarding/600/400",
        imageHint: "bootcamp training onboarding group"
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">{t('events.title')}</h2>
          <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            {t('events.subtitle')}
          </p>
        </div>
        <Button asChild>
            <Link href="#">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('events.suggestTalk')}
            </Link>
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
                const categoryLabel = event.categoryKey === 'next' ? t('events.nextEvent') : t('events.previousEdition');
                const isNextEvent = event.categoryKey === 'next';

                return (
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
                            variant={isNextEvent ? 'default' : 'secondary'}
                            className="absolute top-2 right-2"
                        >
                            {categoryLabel}
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
                                {isNextEvent ? (
                                    t('events.signUp')
                                ) : (
                                    <>
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        {t('events.watchNow')}
                                    </>
                                )}
                            </Link>
                       </Button>
                    </CardFooter>
                </Card>
            )})}
            <Card className="border-dashed flex items-center justify-center">
                 <CardHeader className="text-center">
                    <Calendar className="mx-auto h-10 w-10 text-muted-foreground mb-4"/>
                    <CardTitle className="text-muted-foreground">{t('events.stayTuned')}</CardTitle>
                    <CardDescription>
                        {t('events.stayTunedDesc')}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    </div>
  );
}
