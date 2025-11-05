"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateCourseContent } from '@/ai/flows/generate-course-content';
import { Bot, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
    topic: z.string().min(5, 'O tópico deve ter pelo menos 5 caracteres.'),
    participantKnowledge: z.string().min(20, 'O conhecimento dos participantes deve ter pelo menos 20 caracteres.'),
    bestPractices: z.string().min(20, 'As melhores práticas devem ter pelo menos 20 caracteres.'),
});

export default function ContentPage() {
    const { toast } = useToast();
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: "Técnicas de Venda Consultiva",
            participantKnowledge: "Os participantes são vendedores experientes, mas novos no modelo de venda consultiva. Conhecem bem os produtos, mas precisam melhorar a escuta ativa e a identificação de necessidades do cliente.",
            bestPractices: "Abordagem focada em resolver o problema do cliente, não em empurrar produtos. Construção de relacionamento a longo prazo. Uso de perguntas abertas para entender o cenário do cliente.",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setGeneratedContent(null);
        try {
            const result = await generateCourseContent(values);
            setGeneratedContent(result);
            toast({
                title: 'Conteúdo Gerado!',
                description: 'O conteúdo do curso foi gerado com sucesso pela IA.',
            });
        } catch (error) {
            console.error('Error generating course content:', error);
            toast({
                variant: 'destructive',
                title: 'Erro ao Gerar Conteúdo',
                description: 'Não foi possível se comunicar com a IA. Tente novamente mais tarde.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Criação de Conteúdo com IA</h2>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Gerador de Conteúdo de Curso</CardTitle>
                        <CardDescription>
                            Use o conhecimento coletado dos participantes e as melhores práticas para criar materiais de treinamento relevantes com a ajuda da IA.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tópico do Curso</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Liderança Situacional" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="participantKnowledge"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Conhecimento dos Participantes (Resumo)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descreva o que os participantes já sabem e o que precisam aprender..."
                                                    className="min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bestPractices"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Melhores Práticas Identificadas</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Liste as melhores práticas que devem ser incluídas no conteúdo..."
                                                    className="min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Bot className="mr-2 h-4 w-4" />
                                    )}
                                    {isLoading ? 'Gerando Conteúdo...' : 'Gerar Conteúdo com IA'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Conteúdo Gerado</CardTitle>
                        <CardDescription>
                            Revise o material criado pela IA. Você pode usar isso como base para seus treinamentos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {isLoading && (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        )}
                        {generatedContent && (
                             <Tabs defaultValue="courseContent" className="h-full flex flex-col">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="courseContent">Roteiro</TabsTrigger>
                                    <TabsTrigger value="microLessons">Micro-Lessons</TabsTrigger>
                                    <TabsTrigger value="videoIdeas">Ideias de Vídeo</TabsTrigger>
                                </TabsList>
                                <TabsContent value="courseContent" className="flex-1 overflow-auto mt-4">
                                     <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-sans">
                                        {generatedContent.courseContent}
                                    </div>
                                </TabsContent>
                                <TabsContent value="microLessons" className="flex-1 overflow-auto mt-4">
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        {generatedContent.microLessons.map((lesson: string, index: number) => (
                                            <li key={index} className="text-muted-foreground">{lesson}</li>
                                        ))}
                                    </ul>
                                </TabsContent>
                                <TabsContent value="videoIdeas" className="flex-1 overflow-auto mt-4">
                                     <ul className="list-disc pl-5 space-y-2 text-sm">
                                        {generatedContent.videoIdeas.map((idea: string, index: number) => (
                                            <li key={index} className="text-muted-foreground">{idea}</li>
                                        ))}
                                    </ul>
                                </TabsContent>
                            </Tabs>
                        )}
                        {!isLoading && !generatedContent && (
                            <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">O conteúdo gerado aparecerá aqui.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
