import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Video, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

const courses = [
    {
        title: "Venda Consultiva Avançada",
        description: "Aprenda a construir relacionamentos duradouros e a se tornar um conselheiro de confiança para seus clientes.",
        category: "Vendas",
        imageHint: "sales team meeting",
        modules: 5,
        hours: 10,
        id: "vendas-01",
        imageUrl: "https://picsum.photos/seed/sales-team/600/400"
    },
    {
        title: "Design Thinking na Prática",
        description: "Aplique os princípios do Design Thinking para resolver problemas complexos e inovar em seus projetos.",
        category: "Inovação",
        imageHint: "design thinking workshop",
        modules: 4,
        hours: 8,
        id: "inovacao-01",
        imageUrl: "https://picsum.photos/seed/design-workshop/600/400"
    },
    {
        title: "Liderança Situacional",
        description: "Desenvolva sua capacidade de adaptar seu estilo de liderança a cada situação e a cada membro da equipe.",
        category: "Liderança",
        imageHint: "leadership coaching",
        modules: 6,
        hours: 12,
        id: "lideranca-01",
        imageUrl: "https://picsum.photos/seed/leadership-coach/600/400"
    }
];

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
                {courses.map((course) => (
                     <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all">
                        <div className="relative h-48 w-full">
                            <Image
                                src={course.imageUrl}
                                alt={course.title}
                                fill
                                className="object-cover"
                                data-ai-hint={course.imageHint}
                            />
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold py-1 px-2 rounded">
                                {course.category}
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-end">
                            <div className="flex justify-between text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{course.modules} Módulos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    <span>{course.hours} Horas</span>
                                </div>
                            </div>
                           <Button className="w-full" asChild>
                                <Link href="#">
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
