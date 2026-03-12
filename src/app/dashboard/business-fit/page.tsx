
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { evaluateStrategicAlignment, type EvaluateStrategicAlignmentOutput } from '@/ai/flows/evaluate-strategic-alignment';
import { Bot, Loader2, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
    projectIdea: z.string().min(50, 'A ideia do projeto deve ter pelo menos 50 caracteres.'),
    companyObjectives: z.string().min(50, 'Os objetivos da empresa devem ter pelo menos 50 caracteres.'),
});

export default function BusinessFitPage() {
    const { toast } = useToast();
    const [evaluationResult, setEvaluationResult] = useState<EvaluateStrategicAlignmentOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectIdea: "Desenvolver um aplicativo móvel para gamificar o treinamento de novos funcionários, com quizzes, rankings e recompensas virtuais para aumentar o engajamento e a retenção de conhecimento.",
            companyObjectives: "1. Reduzir o tempo de ramp-up de novos contratados em 20%.\n2. Aumentar a taxa de engajamento dos funcionários em 15% no primeiro trimestre.\n3. Digitalizar e modernizar os processos de RH.",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setEvaluationResult(null);
        try {
            const result = await evaluateStrategicAlignment(values);
            setEvaluationResult(result);
            toast({
                title: 'Avaliação Concluída!',
                description: 'A IA analisou o alinhamento estratégico da sua ideia.',
            });
        } catch (error) {
            console.error('Error evaluating strategic alignment:', error);
            toast({
                variant: 'destructive',
                title: 'Erro na Avaliação',
                description: 'Não foi possível se comunicar com a IA. Tente novamente mais tarde.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Auxiliar de Aderência (IA Business Fit)</h2>
             <p className="text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                Avalie o alinhamento estratégico de suas ideias e projetos com os objetivos da empresa usando IA.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Analisador de Alinhamento Estratégico</CardTitle>
                        <CardDescription>
                            Descreva sua ideia e os objetivos da empresa para que a IA possa fazer a análise.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="projectIdea"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ideia do Projeto</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descreva sua ideia de projeto, incluindo o problema que resolve e a solução proposta..."
                                                    className="min-h-[150px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="companyObjectives"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Objetivos Estratégicos da Empresa</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Liste os objetivos estratégicos atuais da companhia..."
                                                    className="min-h-[150px]"
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
                                    {isLoading ? 'Avaliando...' : 'Avaliar Alinhamento com IA'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Resultado da Avaliação</CardTitle>
                        <CardDescription>
                            A análise da IA sobre o alinhamento estratégico da sua ideia.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                        {isLoading && (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        )}
                        {evaluationResult && (
                             <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary"/> Pontuação de Alinhamento</h4>
                                        <span className="text-2xl font-bold text-primary">{evaluationResult.alignmentScore}%</span>
                                    </div>
                                    <Progress value={evaluationResult.alignmentScore} className="h-3" />
                                    <p className="text-xs text-muted-foreground mt-1 text-right">
                                        {evaluationResult.alignmentScore > 80 ? 'Excelente Alinhamento' : evaluationResult.alignmentScore > 60 ? 'Bom Alinhamento' : 'Alinhamento Moderado'}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold">Justificativa da Pontuação</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{evaluationResult.alignmentRationale}</p>
                                </div>
                                 <div className="space-y-2">
                                    <h4 className="font-semibold">Recomendação de Priorização</h4>
                                    <p className="text-sm text-muted-foreground font-medium p-3 bg-muted/50 rounded-md">{evaluationResult.prioritizationRecommendation}</p>
                                </div>
                            </div>
                        )}
                        {!isLoading && !evaluationResult && (
                            <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">O resultado da avaliação aparecerá aqui.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
