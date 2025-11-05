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
import { generateA3Report } from '@/ai/flows/generate-a3-report';
import { Bot } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
    diaryEntries: z.string().min(50, 'É necessário pelo menos 50 caracteres de entradas do diário.'),
    feedback: z.string().min(50, 'É necessário pelo menos 50 caracteres de feedback.'),
});

export default function A3ReportPage() {
    const { toast } = useToast();
    const [generatedReport, setGeneratedReport] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            diaryEntries: "Semana 1: Iniciei o projeto de otimização do fluxo de onboarding. Mapeei os processos atuais e identifiquei gargalos. Semana 2: Apresentei as primeiras ideias para a equipe e recebi feedbacks positivos. O maior desafio é a integração entre os sistemas legados.",
            feedback: "Feedback da Unidade Receptora (Marketing): O participante demonstrou excelente capacidade analítica. A proposta de otimização do onboarding é promissora. Sugerimos focar mais na experiência do novo colaborador e menos nos aspectos técnicos na apresentação executiva.",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setGeneratedReport(null);
        try {
            const result = await generateA3Report(values);
            setGeneratedReport(result.report);
            toast({
                title: 'Relatório A3 Gerado!',
                description: 'O rascunho do seu relatório foi gerado com sucesso.',
            });
        } catch (error) {
            console.error('Error generating A3 report:', error);
            toast({
                variant: 'destructive',
                title: 'Erro ao Gerar Relatório',
                description: 'Não foi possível se comunicar com a IA. Tente novamente mais tarde.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Gerador de Relatório A3</h2>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Dados de Entrada</CardTitle>
                        <CardDescription>
                            Forneça o conteúdo do diário e os feedbacks para a IA gerar o relatório.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="diaryEntries"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Entradas do Diário (Resumo)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Cole aqui um resumo das suas entradas do diário..."
                                                    className="min-h-[150px] resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="feedback"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Feedbacks Recebidos (Resumo)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Cole aqui um resumo dos feedbacks recebidos..."
                                                    className="min-h-[150px] resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    <Bot className="mr-2 h-4 w-4" />
                                    {isLoading ? 'Gerando...' : 'Gerar Rascunho com IA'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Rascunho do Relatório A3</CardTitle>
                        <CardDescription>
                            O resultado gerado pela IA aparecerá aqui. Revise e edite conforme necessário.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading && (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        )}
                        {generatedReport && (
                            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-sans">
                                {generatedReport}
                            </div>
                        )}
                        {!isLoading && !generatedReport && (
                            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">O relatório aparecerá aqui.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
