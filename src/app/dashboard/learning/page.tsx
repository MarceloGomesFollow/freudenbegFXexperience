
"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Video, Zap, Network } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getLearningItems, type LearningItem } from "@/lib/data";

export default function LearningPage() {
    const learningItems = getLearningItems();

    const renderItem = (item: LearningItem) => {
        const isCourse = item.type === 'course';
        const title = isCourse ? item.courseTitle : item.title;
        const id = item.id;
        const description = item.description;
        const imageUrl = item.imageUrl;
        const imageHint = item.imageHint;
        const category = item.category;

        return (
             <Card key={id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all">
                <div className="relative h-48 w-full">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        data-ai-hint={imageHint}
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold py-1 px-2 rounded">
                        {category}
                    </div>
                </div>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="line-clamp-2">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                        {isCourse ? (
                             <>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{item.modules.length} Módulos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    <span>{item.videoIdeas.length} Vídeos</span>
                                </div>
                            </>
                        ) : (
                             <div className="flex items-center gap-2">
                                <Network className="h-4 w-4" />
                                <span>{item.courses.length} Cursos</span>
                            </div>
                        )}
                    </div>
                   <Button className="w-full" asChild>
                        <Link href={`/dashboard/learning/${id}`}>
                            {isCourse ? 'Começar a aprender' : 'Ver Trilha'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                   </Button>
                </CardContent>
            </Card>
        )
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Learning Hub</h2>
                    <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                        Explore, aprenda e crie. Seu portal para o desenvolvimento contínuo.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/content">
                        <Zap className="mr-2 h-4 w-4" />
                        Criar com IA
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {learningItems.map(item => renderItem(item))}
                 <Card className="border-dashed flex items-center justify-center">
                     <CardHeader className="text-center">
                        <CardTitle className="text-muted-foreground">Em Breve</CardTitle>
                        <CardDescription>
                            Novos cursos e conteúdos gerados pela comunidade.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
