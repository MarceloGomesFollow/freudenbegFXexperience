
"use client";

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { coursesDb } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, ChevronLeft, Film, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Quiz } from '@/components/quiz';

export default function CoursePage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const course = coursesDb.find(c => c.id === courseId);

    if (!course) {
        notFound();
    }

    return (
        <div className="space-y-8">
             <Button variant="outline" asChild>
                <Link href="/dashboard/learning">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar para o Learning Hub
                </Link>
            </Button>

            <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                    src={course.imageUrl}
                    alt={course.courseTitle}
                    fill
                    className="object-cover"
                    data-ai-hint={course.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <h1 className="text-4xl font-bold text-primary-foreground">{course.courseTitle}</h1>
                    <p className="text-lg text-primary-foreground/90 mt-2">{course.description}</p>
                </div>
            </div>

            <Card>
                <CardContent className='p-0'>
                    <Tabs defaultValue="modules">
                        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                            <TabsTrigger value="modules" className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                                <BookOpen className="mr-2 h-4 w-4" /> Módulos
                            </TabsTrigger>
                             <TabsTrigger value="quiz" className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                                <HelpCircle className="mr-2 h-4 w-4" /> Quiz
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="modules" className="p-6">
                            <Accordion type="single" collapsible defaultValue="item-0">
                                {course.modules.map((module, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger className="text-lg font-semibold">
                                            {module.title}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-sans">
                                                {module.content}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </TabsContent>
                        <TabsContent value="quiz" className="p-6">
                            <Quiz questions={course.quiz} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Film /> Ideias de Vídeos</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                        {course.videoIdeas.map((idea, index) => (
                            <li key={index}>{idea}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

             <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle>Conclusão do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-primary/90">{course.conclusion}</p>
                </CardContent>
            </Card>
        </div>
    );
}
