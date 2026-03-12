"use client";

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle, Eye } from "lucide-react";
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
    {
        id: "freud-talks-2023",
        title: "FreudTalks Experience 2023",
        descriptionKey: "events.detail.freudTalksDesc",
        category: "previousEdition",
        imageUrl: "https://picsum.photos/seed/ted-talk-stage/1200/400",
        imageHint: "conference stage audience"
    },
    {
        id: "innovation-showcase",
        title: "Showcase de Inovação Q2",
        descriptionKey: "events.detail.innovationShowcaseDesc",
        category: "nextEvent",
        date: "25 de Agosto, 2024",
        imageUrl: "https://picsum.photos/seed/project-showcase/1200/400",
        imageHint: "project presentation team"
    },
];

export default function EventDetailClient({ eventId }: { eventId: string }) {
    const { t } = useLanguage();
    const event = events.find(e => e.id === eventId);

    if (!event) {
        return notFound();
    }

    const description = t(event.descriptionKey);
    const isPreviousEdition = event.category === 'previousEdition';
    const isNextEvent = event.category === 'nextEvent';

    return (
        <div className="space-y-8">
            <Button variant="outline" asChild>
                <Link href="/dashboard/events">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {t("events.detail.backToEvents")}
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
                    <p className="text-lg text-primary-foreground/90 mt-2 max-w-3xl">{description}</p>
                </div>
            </div>

            {isPreviousEdition && (
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlayCircle className="h-6 w-6 text-primary" />
                                {t("events.detail.watchRecording")}
                            </CardTitle>
                            <CardDescription>
                                {t("events.detail.watchRecordingDesc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                <p className="text-muted-foreground">{t("events.detail.videoPlayerSim")}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <PlayCircle className="mr-2 h-4 w-4"/> {t("events.detail.watchNow")}
                            </Button>
                        </CardFooter>
                    </Card>
                     <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-6 w-6 text-primary" />
                                {t("events.detail.vrExperience")}
                            </CardTitle>
                            <CardDescription>
                                {t("events.detail.vrExperienceDesc")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                <p className="text-muted-foreground">{t("events.detail.vrEnvironmentSim")}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <Eye className="mr-2 h-4 w-4"/> {t("events.detail.enterVRMode")}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {isNextEvent && (
                <Card className="max-w-2xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle>{t("events.detail.registrationOpen")}</CardTitle>
                        <CardDescription>{t("events.detail.registrationOpenDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-lg font-bold mb-4">{event.date}</p>
                        <Button size="lg">{t("events.detail.signUpNow")}</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
