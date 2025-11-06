

"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { generateCourseContent, type GenerateCourseContentOutput } from '@/ai/flows/generate-course-content';
import { Bot, Loader2, Upload, BookOpen, HelpCircle, Award, Sparkles, Save, X, Network, Library } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { addCourseToDb, type Course, coursesDb, addLearningPathToDb, type LearningPath } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

const generationFormSchema = z.object({
    topic: z.string().min(5, 'O tópico deve ter pelo menos 5 caracteres.'),
    knowledgeSource: z.string().optional(),
    details: z.string().optional(),
    textFile: z.instanceof(File).optional(),
    coverImage: z.instanceof(File).optional(),
    numberOfModules: z.coerce.number().min(1, "Deve haver pelo menos 1 módulo.").max(10, "O máximo é 10 módulos.").optional(),
});

const learningPathFormSchema = z.object({
    title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres.'),
    description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
    category: z.string().min(2, 'A categoria é obrigatória.'),
    coverImage: z.instanceof(File).optional(),
    courses: z.array(z.string()).refine(value => value.some(item => item), {
        message: "Você deve selecionar pelo menos um curso.",
    }),
});

const quizQuestionSchema = z.object({
  question: z.string().min(1, "A pergunta é obrigatória."),
  options: z.array(z.string().min(1, "A opção não pode estar em branco.")).min(2, "Deve haver pelo menos 2 opções."),
  correctAnswer: z.string().min(1, "A resposta correta é obrigatória."),
  explanation: z.string().min(1, "A explicação é obrigatória."),
});

const courseModuleSchema = z.object({
  title: z.string().min(1, "O título do módulo é obrigatório."),
  content: z.string().min(1, "O conteúdo do módulo é obrigatório."),
  videoLink: z.string().optional(),
  pdfLink: z.string().optional(),
});

const editableContentSchema = z.object({
    courseTitle: z.string().min(1, "O título do curso é obrigatório."),
    modules: z.array(courseModuleSchema),
    quiz: z.array(quizQuestionSchema),
    videoIdeas: z.array(z.string()),
    conclusion: z.string().min(1, "A conclusão é obrigatória."),
});

type EditableContentSchema = z.infer<typeof editableContentSchema>;

function QuizQuestionEditor({ control, index, removeQuiz }: { control: Control<EditableContentSchema>, index: number, removeQuiz: (index: number) => void }) {
    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: `quiz.${index}.options`
    });

    return (
        <Card className="relative">
            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => removeQuiz(index)}><X className="h-4 w-4" /></Button>
            <CardHeader>
                <FormField
                    control={control}
                    name={`quiz.${index}.question`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pergunta {index + 1}</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardHeader>
            <CardContent className="space-y-2">
                <FormLabel>Opções</FormLabel>
                {optionFields.map((optionItem, optionIndex) => (
                    <FormField
                        key={optionItem.id}
                        control={control}
                        name={`quiz.${index}.options.${optionIndex}`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <FormField
                    control={control}
                    name={`quiz.${index}.correctAnswer`}
                    render={({ field }) => (
                        <FormItem className="pt-2">
                             <FormLabel>Resposta Correta</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`quiz.${index}.explanation`}
                    render={({ field }) => (
                        <FormItem className="pt-2">
                            <FormLabel>Explicação</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
}

export default function ContentPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [generatedContent, setGeneratedContent] = useState<GenerateCourseContentOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [textFileName, setTextFileName] = useState("");
    const [coverImageName, setCoverImageName] = useState("");
    const { language } = useLanguage();

    const generationForm = useForm<z.infer<typeof generationFormSchema>>({
        resolver: zodResolver(generationFormSchema),
        defaultValues: {
            topic: "Técnicas de Venda Consultiva",
            knowledgeSource: "Workshop interno com equipe de vendas sênior.",
            details: "Focar em rapport, escuta ativa e fechamento de vendas B2B para o setor de tecnologia.",
            numberOfModules: 5,
        },
    });

    const learningPathForm = useForm<z.infer<typeof learningPathFormSchema>>({
        resolver: zodResolver(learningPathFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "Geral",
            courses: [],
        }
    });

    const editableForm = useForm<EditableContentSchema>({
        resolver: zodResolver(editableContentSchema),
    });

    const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
        control: editableForm.control,
        name: "modules"
    });
     const { fields: quizFields, append: appendQuiz, remove: removeQuiz } = useFieldArray({
        control: editableForm.control,
        name: "quiz"
    });


    useEffect(() => {
        if (generatedContent) {
            editableForm.reset({
                courseTitle: generatedContent.courseTitle,
                modules: generatedContent.modules,
                quiz: generatedContent.quiz.map(q => ({...q, options: q.options || []})),
                videoIdeas: generatedContent.videoIdeas,
                conclusion: generatedContent.conclusion,
            });
        }
    }, [generatedContent, editableForm]);

    const handleTextFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            generationForm.setValue('textFile', file);
            setTextFileName(file.name);
        }
    };
    
    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>, form: "course" | "path") => {
        const file = event.target.files?.[0];
        if (file) {
            if (form === "course") {
                generationForm.setValue('coverImage', file);
                setCoverImageName(file.name);
            } else {
                learningPathForm.setValue('coverImage', file);
            }
        }
    };

    async function onGenerate(values: z.infer<typeof generationFormSchema>) {
        setIsLoading(true);
        setGeneratedContent(null);

        const processAndGenerate = async (documentContent?: string) => {
             try {
                const result = await generateCourseContent({
                    topic: values.topic,
                    knowledgeSource: values.knowledgeSource,
                    details: values.details,
                    documentContent: documentContent,
                    numberOfModules: values.numberOfModules,
                    language
                });
                setGeneratedContent(result);
                toast({
                    title: 'Conteúdo Gerado!',
                    description: 'O rascunho do curso foi criado. Revise, edite e salve.',
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

        if (values.textFile) {
            const reader = new FileReader();
            reader.readAsText(values.textFile, "UTF-8");
        
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

    function onSaveCourse(values: z.infer<typeof editableContentSchema>) {
        const coverImageFile = generationForm.getValues("coverImage");
        const newCourse: Course = {
            ...values,
            id: values.courseTitle.toLowerCase().replace(/\s+/g, '-'),
            description: `Um curso sobre ${values.courseTitle}`, // Simple description
            category: generationForm.getValues("knowledgeSource") || "Geral",
            imageHint: "course cover",
            imageUrl: coverImageFile ? URL.createObjectURL(coverImageFile) : `https://picsum.photos/seed/${Math.random()}/600/400`,
        };
        addCourseToDb(newCourse);
        toast({
            title: "Curso Salvo com Sucesso!",
            description: `${newCourse.courseTitle} está pronto para ser publicado.`
        });
        router.push('/dashboard/learning');
    }

    function onSaveLearningPath(values: z.infer<typeof learningPathFormSchema>) {
        const coverImageFile = values.coverImage;
        const newPath: LearningPath = {
            ...values,
            id: values.title.toLowerCase().replace(/\s+/g, '-'),
            imageHint: "path cover",
            imageUrl: coverImageFile ? URL.createObjectURL(coverImageFile) : `https://picsum.photos/seed/${Math.random()}/600/400`,
        };
        addLearningPathToDb(newPath);
         toast({
            title: "Trilha Salva com Sucesso!",
            description: `${newPath.title} está pronta para ser publicada.`
        });
        router.push('/dashboard/learning');
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Criação de Conteúdo com IA</h2>
             <p className="text-muted-foreground">
                Use a IA Freudy para gerar cursos ou crie trilhas de aprendizado para organizar o conhecimento.
            </p>

            <Tabs defaultValue="course">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="course"><BookOpen className="mr-2 h-4 w-4"/>Criar Curso</TabsTrigger>
                    <TabsTrigger value="path"><Network className="mr-2 h-4 w-4"/>Criar Trilha</TabsTrigger>
                </TabsList>
                
                <TabsContent value="course" className="mt-6">
                    <div className="grid gap-8 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerador de Curso</CardTitle>
                                <CardDescription>
                                    Preencha os campos e deixe a IA Freudy construir um rascunho para você.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...generationForm}>
                                    <form onSubmit={generationForm.handleSubmit(onGenerate)} className="space-y-6">
                                        <FormField
                                            control={generationForm.control}
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
                                            control={generationForm.control}
                                            name="knowledgeSource"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Origem do Conhecimento (Opcional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Empresa, visita, departamento X" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={generationForm.control}
                                            name="details"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Detalhes do Conteúdo (Opcional)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Descreva pontos chave, público-alvo ou objetivos do curso..."
                                                            className="min-h-[100px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                            control={generationForm.control}
                                            name="textFile"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Anexar Documento (.txt)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                    <Button type="button" variant="outline" asChild className="w-full">
                                                        <label htmlFor="text-file-upload" className="cursor-pointer flex items-center">
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        Escolher
                                                        </label>
                                                    </Button>
                                                    <Input id="text-file-upload" type="file" className="sr-only" onChange={handleTextFileChange} accept=".txt" />
                                                    </div>
                                                </FormControl>
                                                {textFileName && <p className="text-xs text-muted-foreground pt-1 truncate">Arquivo: {textFileName}</p>}
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                            <FormField
                                            control={generationForm.control}
                                            name="coverImage"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Imagem de Capa (Opcional)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                    <Button type="button" variant="outline" asChild className="w-full">
                                                        <label htmlFor="cover-image-upload" className="cursor-pointer flex items-center">
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        Escolher
                                                        </label>
                                                    </Button>
                                                    <Input id="cover-image-upload" type="file" className="sr-only" onChange={(e) => handleCoverImageChange(e, "course")} accept="image/*" />
                                                    </div>
                                                </FormControl>
                                                {coverImageName && <p className="text-xs text-muted-foreground pt-1 truncate">Arquivo: {coverImageName}</p>}
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        </div>

                                        <FormField
                                            control={generationForm.control}
                                            name="numberOfModules"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Número de Módulos (Opcional)</FormLabel>
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
                                            {isLoading ? 'Gerando Rascunho...' : 'Gerar Rascunho com IA'}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle>Editor do Curso</CardTitle>
                                <CardDescription>
                                Revise, edite e salve o material criado pela IA antes de publicar.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-auto">
                                {isLoading && (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                    </div>
                                )}
                                {generatedContent && (
                                    <Form {...editableForm}>
                                        <form onSubmit={editableForm.handleSubmit(onSaveCourse)} className="h-full flex flex-col">
                                            <Tabs defaultValue="modules" className="h-full flex flex-col flex-1">
                                                <TabsList className="grid w-full grid-cols-3">
                                                    <TabsTrigger value="modules"><BookOpen className="mr-2 h-4 w-4"/>Módulos</TabsTrigger>
                                                    <TabsTrigger value="quiz"><HelpCircle className="mr-2 h-4 w-4"/>Quiz</TabsTrigger>
                                                    <TabsTrigger value="general"><Award className="mr-2 h-4 w-4"/>Geral</TabsTrigger>
                                                </TabsList>
                                                <div className='mt-4'>
                                                    <FormField
                                                        control={editableForm.control}
                                                        name="courseTitle"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className='sr-only'>Título do Curso</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} className="text-xl font-bold tracking-tight border-0 shadow-none focus-visible:ring-0 pl-0" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <TabsContent value="modules" className="flex-1 overflow-auto mt-4">
                                                    <Accordion type="single" collapsible defaultValue="item-0">
                                                        {moduleFields.map((module, index) => (
                                                            <AccordionItem value={`item-${index}`} key={module.id}>
                                                                <AccordionTrigger>
                                                                <FormField
                                                                        control={editableForm.control}
                                                                        name={`modules.${index}.title`}
                                                                        render={({ field }) => (
                                                                            <FormItem className='flex-1 pr-4'>
                                                                                <FormControl>
                                                                                    <Input {...field} className="font-semibold border-0 shadow-none focus-visible:ring-1 p-1 h-auto" onClick={(e) => e.stopPropagation()} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </AccordionTrigger>
                                                                <AccordionContent>
                                                                    <FormField
                                                                        control={editableForm.control}
                                                                        name={`modules.${index}.content`}
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormControl>
                                                                                    <Textarea {...field} className="min-h-[150px]" />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </Accordion>
                                                </TabsContent>
                                                <TabsContent value="quiz" className="flex-1 overflow-auto mt-4 space-y-4">
                                                    {quizFields.map((quizItem, index) => (
                                                        <QuizQuestionEditor
                                                            key={quizItem.id}
                                                            control={editableForm.control}
                                                            index={index}
                                                            removeQuiz={removeQuiz}
                                                        />
                                                    ))}
                                                </TabsContent>
                                                <TabsContent value="general" className="flex-1 overflow-auto mt-4 space-y-4">
                                                    <FormField
                                                        control={editableForm.control}
                                                        name="conclusion"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Mensagem de Conclusão</FormLabel>
                                                                <FormControl>
                                                                    <Textarea {...field} className="min-h-[120px]" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TabsContent>
                                            </Tabs>
                                            <div className="mt-6">
                                                <Button type="submit" className="w-full">
                                                    <Save className="mr-2 h-4 w-4"/>
                                                    Salvar e Publicar Curso
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                )}
                                {!isLoading && !generatedContent && (
                                    <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                                        <p className="text-sm text-muted-foreground">O editor do curso aparecerá aqui.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="path" className="mt-6">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>Criar Nova Trilha de Aprendizado</CardTitle>
                            <CardDescription>Agrupe cursos existentes em uma jornada de aprendizado sequencial.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...learningPathForm}>
                                <form onSubmit={learningPathForm.handleSubmit(onSaveLearningPath)} className="space-y-6">
                                    <FormField
                                        control={learningPathForm.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Título da Trilha</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: Fundamentos de Gestão de Projetos" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={learningPathForm.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descrição</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Descreva o objetivo desta trilha de aprendizado..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={learningPathForm.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Categoria</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Gestão" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={learningPathForm.control}
                                            name="coverImage"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Imagem de Capa (Opcional)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                    <Button type="button" variant="outline" asChild className="w-full">
                                                        <label htmlFor="path-cover-image-upload" className="cursor-pointer flex items-center">
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        Escolher
                                                        </label>
                                                    </Button>
                                                    <Input id="path-cover-image-upload" type="file" className="sr-only" onChange={(e) => handleCoverImageChange(e, "path")} accept="image/*" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                    </div>

                                    <FormField
                                        control={learningPathForm.control}
                                        name="courses"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-4">
                                                    <FormLabel className="text-base">Selecionar Cursos</FormLabel>
                                                    <FormDescription>
                                                        Escolha os cursos que farão parte desta trilha.
                                                    </FormDescription>
                                                </div>
                                                <div className="space-y-2 max-h-60 overflow-y-auto border p-4 rounded-md">
                                                {coursesDb.map((item) => (
                                                    <FormField
                                                    key={item.id}
                                                    control={learningPathForm.control}
                                                    name="courses"
                                                    render={({ field }) => {
                                                        return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                        (value) => value !== item.id
                                                                        )
                                                                    )
                                                                }}
                                                            />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {item.courseTitle}
                                                            </FormLabel>
                                                        </FormItem>
                                                        )
                                                    }}
                                                    />
                                                ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full">
                                        <Save className="mr-2 h-4 w-4" />
                                        Salvar Trilha de Aprendizado
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
