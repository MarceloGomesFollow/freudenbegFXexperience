
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { generateCourseContent, type GenerateCourseContentOutput } from '@/ai/flows/generate-course-content';
import { Bot, Loader2, Upload, FileText, Youtube, BookOpen, HelpCircle, Award, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Quiz } from '@/components/quiz';

const formSchema = z.object({
    topic: z.string().min(5, 'O tópico deve ter pelo menos 5 caracteres.'),
    file: z.instanceof(File).optional(),
    numberOfModules: z.coerce.number().min(1, "Deve haver pelo menos 1 módulo.").max(10, "O máximo é 10 módulos.").optional(),
});

export default function ContentPage() {
    const { toast } = useToast();
    const [generatedContent, setGeneratedContent] = useState<GenerateCourseContentOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const { language } = useLanguage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: "Técnicas de Venda Consultiva",
            numberOfModules: 5,
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue('file', file);
            setFileName(file.name);
        }
    };
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setGeneratedContent(null);

        const processAndGenerate = async (documentContent?: string) => {
             try {
                const result = await generateCourseContent({
                    topic: values.topic,
                    documentContent: documentContent,
                    numberOfModules: values.numberOfModules,
                    language
                });
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

        if (values.file) {
            const reader = new FileReader();
            reader.readAsText(values.file, "UTF-8");
        
            reader.onload = (evt) => {
                const documentContent = evt.target?.result as string;
                processAndGenerate(documentContent);
            };
        
            reader.onerror = () => {
                toast({
                    variant: 'destructive',
                    title: 'Erro ao Ler Arquivo',
                    description: 'Não foi possível ler o conteúdo do arquivo selecionado.',
                });
                setIsLoading(false);
            };
        } else {
            processAndGenerate();
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Criação de Conteúdo com IA</h2>
            <p className="text-muted-foreground">
                Forneça um tópico (e opcionalmente um documento) e deixe a IA Freudy transformá-lo em um curso interativo.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Gerador de Curso</CardTitle>
                        <CardDescription>
                            Preencha o tópico e anexe um arquivo de texto (.txt) se desejar.
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
                                            <FormLabel>Tópico Principal do Curso</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Liderança Situacional" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                  control={form.control}
                                  name="file"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Anexar Documento (Opcional)</FormLabel>
                                      <FormControl>
                                        <div className="relative">
                                          <Button type="button" variant="outline" asChild>
                                            <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                                              <Upload className="mr-2 h-4 w-4" />
                                              Escolher Arquivo
                                            </label>
                                          </Button>
                                          <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".txt" />
                                        </div>
                                      </FormControl>
                                      {fileName && <p className="text-sm text-muted-foreground pt-2">Arquivo selecionado: {fileName}</p>}
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                    control={form.control}
                                    name="numberOfModules"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de Módulos</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Ex: 5" {...field} onChange={e => field.onChange(e.target.valueAsNumber)}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Sparkles className="mr-2 h-4 w-4" />
                                    )}
                                    {isLoading ? 'Gerando Curso...' : 'Gerar Curso com IA'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Curso Gerado por IA</CardTitle>
                        <CardDescription>
                            Revise o material criado pela IA. Use isto como base para seus treinamentos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        {isLoading && (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        )}
                        {generatedContent && (
                             <Tabs defaultValue="modules" className="h-full flex flex-col">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="modules"><BookOpen className="mr-2 h-4 w-4"/>Módulos</TabsTrigger>
                                    <TabsTrigger value="quiz"><HelpCircle className="mr-2 h-4 w-4"/>Quiz</TabsTrigger>
                                    <TabsTrigger value="videoIdeas"><Youtube className="mr-2 h-4 w-4"/>Vídeos</TabsTrigger>
                                </TabsList>
                                <div className='mt-4'>
                                    <h3 className="text-xl font-bold tracking-tight">{generatedContent.courseTitle}</h3>
                                </div>
                                <TabsContent value="modules" className="flex-1 overflow-auto mt-4">
                                     <Accordion type="single" collapsible defaultValue="item-0">
                                        {generatedContent.modules.map((module, index) => (
                                            <AccordionItem value={`item-${index}`} key={index}>
                                                <AccordionTrigger>{module.title}</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-sans mb-4">
                                                        {module.content}
                                                    </div>
                                                    <div className="flex gap-4">
                                                        {module.videoLink && <Button variant="outline" size="sm" asChild><a href={module.videoLink} target="_blank" rel="noopener noreferrer"><Youtube className="mr-2 h-4 w-4" />Ver Vídeo</a></Button>}
                                                        {module.pdfLink && <Button variant="outline" size="sm" asChild><a href={module.pdfLink} target="_blank" rel="noopener noreferrer"><FileText className="mr-2 h-4 w-4" />Ver PDF</a></Button>}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </TabsContent>
                                <TabsContent value="quiz" className="flex-1 overflow-auto mt-4">
                                    <Quiz questions={generatedContent.quiz} />
                                </TabsContent>
                                <TabsContent value="videoIdeas" className="flex-1 overflow-auto mt-4">
                                     <ul className="list-disc pl-5 space-y-2 text-sm">
                                        {generatedContent.videoIdeas.map((idea: string, index: number) => (
                                            <li key={index} className="text-muted-foreground">{idea}</li>
                                        ))}
                                    </ul>
                                </TabsContent>
                                 <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                                    <h4 className="font-semibold flex items-center gap-2"><Award className="h-5 w-5 text-primary"/>Conclusão</h4>
                                    <p className="text-sm text-muted-foreground mt-2">{generatedContent.conclusion}</p>
                                </div>
                            </Tabs>
                        )}
                        {!isLoading && !generatedContent && (
                            <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">O curso gerado aparecerá aqui.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    