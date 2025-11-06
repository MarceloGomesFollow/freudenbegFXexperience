
"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Video, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { coursesDb } from "@/lib/data";

export default function LearningPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Learning Hub</h2>
                    <p className="text-muted-foreground mt-2">
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
                {coursesDb.map((course) => (
                     <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all">
                        <div className="relative h-48 w-full">
                            <Image
                                src={course.imageUrl}
                                alt={course.courseTitle}
                                fill
                                className="object-cover"
                                data-ai-hint={course.imageHint}
                            />
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold py-1 px-2 rounded">
                                {course.category}
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>{course.courseTitle}</CardTitle>
                            <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-end">
                            <div className="flex justify-between text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{course.modules.length} Módulos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    <span>{course.videoIdeas.length} Vídeos</span>
                                </div>
                            </div>
                           <Button className="w-full" asChild>
                                <Link href={`/dashboard/learning/${course.id}`}>
                                    Começar a aprender <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                           </Button>
                        </CardContent>
                    </Card>
                ))}
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
