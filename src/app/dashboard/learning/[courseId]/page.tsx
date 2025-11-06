
"use client";

import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { coursesDb, learningPathsDb, type Course } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, ChevronLeft, Film, HelpCircle, ChevronsRight, Youtube } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Quiz } from '@/components/quiz';

function CourseContent({ course }: { course: Course }) {

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        let videoId;
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
            videoId = url.split('watch?v=')[1].split('&')[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    return (
        <>
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
                                {course.modules.map((module, index) => {
                                    const embedUrl = module.videoLink ? getYouTubeEmbedUrl(module.videoLink) : null;
                                    return (
                                        <AccordionItem value={`item-${index}`} key={index}>
                                            <AccordionTrigger className="text-lg font-semibold">
                                                {module.title}
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-4">
                                                <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-sans">
                                                    {module.content}
                                                </div>
                                                {embedUrl && (
                                                    <div className="aspect-video">
                                                        <iframe 
                                                            width="100%" 
                                                            height="100%" 
                                                            src={embedUrl} 
                                                            title="YouTube video player" 
                                                            frameBorder="0" 
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                            allowFullScreen
                                                            className="rounded-md"
                                                        ></iframe>
                                                    </div>
                                                )}
                                                {module.videoLink && !embedUrl && (
                                                    <a href={module.videoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                        <Youtube className="h-4 w-4"/> Assistir vídeo
                                                    </a>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
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
        </>
    )
}

function LearningPathContent({ path }: { path: any }) {
    const router = useRouter();
    const pathCourses = coursesDb.filter(c => path.courses.includes(c.id));
    return (
        <>
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                    src={path.imageUrl}
                    alt={path.title}
                    fill
                    className="object-cover"
                    data-ai-hint={path.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <h1 className="text-4xl font-bold text-primary-foreground">{path.title}</h1>
                    <p className="text-lg text-primary-foreground/90 mt-2">{path.description}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cursos na Trilha</CardTitle>
                    <CardDescription>Cursos que compõem esta trilha de aprendizado.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pathCourses.map(course => (
                        <Card 
                            key={course.id} 
                            className="flex items-center justify-between p-4 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => router.push(`/dashboard/learning/${course.id}`)}
                        >
                            <div className="flex items-center gap-4">
                                <BookOpen className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">{course.courseTitle}</h3>
                                    <p className="text-sm text-muted-foreground">{course.modules.length} módulos</p>
                                </div>
                            </div>
                            <ChevronsRight className="h-5 w-5 text-muted-foreground" />
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}


export default function LearningItemPage() {
    const params = useParams();
    const itemId = params.courseId as string;
    
    const course = coursesDb.find(c => c.id === itemId);
    const path = learningPathsDb.find(p => p.id === itemId);

    if (!course && !path) {
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

            {course && <CourseContent course={course} />}
            {path && <LearningPathContent path={path} />}
        </div>
    );
}

