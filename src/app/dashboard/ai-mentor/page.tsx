
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
import { aiMentorForSharedPractices, type AiMentorForSharedPracticesOutput } from '@/ai/flows/ai-mentor-for-shared-practices';
import { Bot, Loader2, Share2 } from 'lucide-react';

const formSchema = z.object({
    learningData: z.string().min(50, 'Os dados de aprendizado devem ter pelo menos 50 caracteres.'),
});

export default function AiMentorPage() {
    const { toast } = useToast();
    const [result, setResult] = useState<AiMentorForSharedPracticesOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            learningData: "Equipe de Vendas (Unidade A) está focando em técnicas de 'Venda Consultiva' e relata sucesso na abordagem de clientes enterprise. Equipe de Produto (Unidade B) está aplicando 'Design Thinking' para entender as dores dos usuários. Equipe de Sucesso do Cliente (Unidade C) desenvolveu um novo script de onboarding focado em 'Comunicação Empática'.",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const response = await aiMentorForSharedPractices(values);
            setResult(response);
            toast({
                title: 'Análise Concluída!',
                description: 'A IA Freudy encontrou possíveis conexões para colaboração.',
            });
        } catch (error) {
            console.error('Error with AI Mentor:', error);
            toast({
                variant: 'destructive',
                title: 'Erro na Análise',
                description: 'Não foi possível se comunicar com a IA. Tente novamente mais tarde.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">IA Freudy - Mentor Digital</h2>
             <p className="text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                Analise dados de aprendizado de diferentes equipes e descubra oportunidades de colaboração e compartilhamento de boas práticas.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Analisador de Conexões</CardTitle>
                        <CardDescription>
                            Insira um resumo dos aprendizados de diferentes áreas para que a IA possa identificar sinergias.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="learningData"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dados de Aprendizado (Compilado)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descreva os principais aprendizados, técnicas ou práticas que diferentes equipes estão aplicando..."
                                                    className="min-h-[200px]"
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
                                    {isLoading ? 'Analisando...' : 'Encontrar Conexões com IA'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Sugestões de Boas Práticas</CardTitle>
                        <CardDescription>
                            A IA Freudy sugere como as equipes podem colaborar e aprender umas com as outras.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                        {isLoading && (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        )}
                        {result && (
                             <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-lg flex items-center gap-2 mb-2"><Share2 className="h-5 w-5 text-primary"/> Conexões Sugeridas</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.suggestions}</p>
                                </div>
                            </div>
                        )}
                        {!isLoading && !result && (
                            <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">As sugestões da IA aparecerão aqui.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
