
"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Video, Zap, Network } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getLearningItems, type LearningItem } from "@/lib/data";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item_anim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

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
             <motion.div key={id} variants={item_anim}>
                 <Card className="flex flex-col overflow-hidden card-hover h-full">
                    <div className="relative h-36 sm:h-48 w-full">
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
             </motion.div>
        )
    };

    return (
        <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
            <motion.div variants={item_anim} className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        <span className="gold-text">Learning</span>{" "}
                        <span className="text-foreground">Hub</span>
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Explore, aprenda e crie. Seu portal para o desenvolvimento contínuo.
                    </p>
                </div>
                <Button variant="gold" asChild>
                    <Link href="/dashboard/content">
                        <Zap className="mr-2 h-4 w-4" />
                        Criar com IA
                    </Link>
                </Button>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" animate="show">
                {learningItems.map(item => renderItem(item))}
                 <motion.div variants={item_anim}>
                     <Card className="border-dashed flex items-center justify-center h-full">
                         <CardHeader className="text-center">
                            <CardTitle className="text-muted-foreground">Em Breve</CardTitle>
                            <CardDescription>
                                Novos cursos e conteúdos gerados pela comunidade.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                 </motion.div>
            </motion.div>
        </motion.div>
    )
}
