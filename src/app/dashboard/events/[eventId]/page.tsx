
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle, Eye } from "lucide-react";
import Image from 'next/image';

const events = [
    {
        id: "freud-talks-2023",
        title: "FreudTalks Experience 2023",
        description: "Reviva os melhores momentos da nossa conferência interna, onde talentos compartilharam projetos que estão transformando o futuro da empresa.",
        category: "Edição Anterior",
        imageUrl: "https://picsum.photos/seed/ted-talk-stage/1200/400",
        imageHint: "conference stage audience"
    },
    {
        id: "innovation-showcase",
        title: "Showcase de Inovação Q2",
        description: "Apresentações dos protótipos e MVPs desenvolvidos nos Innovation Labs. Veja as ideias em ação e o impacto gerado.",
        category: "Próximo Evento",
        date: "25 de Agosto, 2024",
        imageUrl: "https://picsum.photos/seed/project-showcase/1200/400",
        imageHint: "project presentation team"
    },
];

export function generateStaticParams() {
    return events.map((e) => ({ eventId: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;
    const event = events.find(e => e.id === eventId);

    if (!event) {
        return notFound();
    }

    return (
        <div className="space-y-8">
            <Button variant="outline" asChild>
                <Link href="/dashboard/events">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar para Eventos
                </Link>
            </Button>

            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    data-ai-hint={event.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <h1 className="text-4xl font-bold text-primary-foreground">{event.title}</h1>
                    <p className="text-lg text-primary-foreground/90 mt-2 max-w-3xl">{event.description}</p>
                </div>
            </div>

            {event.category === 'Edição Anterior' && (
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlayCircle className="h-6 w-6 text-primary" />
                                Assistir Gravação
                            </CardTitle>
                            <CardDescription>
                                Assista à gravação completa do evento e reviva os melhores momentos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                <p className="text-muted-foreground">Simulação de Player de Vídeo</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <PlayCircle className="mr-2 h-4 w-4"/> Assistir Agora
                            </Button>
                        </CardFooter>
                    </Card>
                     <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-6 w-6 text-primary" />
                                Experiência VR
                            </CardTitle>
                            <CardDescription>
                                Mergulhe no evento com nossa experiência de realidade virtual simulada.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                <p className="text-muted-foreground">Simulação de Ambiente VR</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <Eye className="mr-2 h-4 w-4"/> Entrar em Modo VR
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {event.category === 'Próximo Evento' && (
                <Card className="max-w-2xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle>Inscrições Abertas</CardTitle>
                        <CardDescription>Garanta sua vaga neste evento imperdível.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-lg font-bold mb-4">{event.date}</p>
                        <Button size="lg">Inscrever-se Agora</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
