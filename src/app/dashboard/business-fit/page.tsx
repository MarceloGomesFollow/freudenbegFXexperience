
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
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
    projectIdea: z.string().min(50, 'A ideia do projeto deve ter pelo menos 50 caracteres.'),
    companyObjectives: z.string().min(50, 'Os objetivos da empresa devem ter pelo menos 50 caracteres.'),
});

export default function BusinessFitPage() {
    const { toast } = useToast();
    const { t } = useLanguage();
    const [evaluationResult, setEvaluationResult] = useState<EvaluateStrategicAlignmentOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectIdea: "",
            companyObjectives: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setEvaluationResult(null);
        try {
            const result = await evaluateStrategicAlignment(values);
            setEvaluationResult(result);
            toast({
                title: t('toast.evaluationComplete'),
                description: t('toast.evaluationCompleteDesc'),
            });
        } catch (error) {
            console.error('Error evaluating strategic alignment:', error);
            toast({
                variant: 'destructive',
                title: t('toast.evaluationError'),
                description: t('toast.evaluationErrorDesc'),
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">{t('businessFit.title')}</h2>
             <p className="text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                {t('businessFit.subtitle')}
            </p>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('businessFit.analyzerTitle')}</CardTitle>
                        <CardDescription>
                            {t('businessFit.analyzerDesc')}
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
                                            <FormLabel>{t('businessFit.projectIdea')}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t('businessFit.projectIdeaPlaceholder')}
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
                                            <FormLabel>{t('businessFit.companyObjectives')}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t('businessFit.companyObjectivesPlaceholder')}
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
                                    {isLoading ? t('businessFit.evaluating') : t('businessFit.evaluateButton')}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{t('businessFit.resultTitle')}</CardTitle>
                        <CardDescription>
                            {t('businessFit.resultDesc')}
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
                                        <h4 className="font-semibold text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary"/> {t('businessFit.alignmentScore')}</h4>
                                        <span className="text-2xl font-bold text-primary">{evaluationResult.alignmentScore}%</span>
                                    </div>
                                    <Progress value={evaluationResult.alignmentScore} className="h-3" />
                                    <p className="text-xs text-muted-foreground mt-1 text-right">
                                        {evaluationResult.alignmentScore > 80 ? t('businessFit.excellentAlignment') : evaluationResult.alignmentScore > 60 ? t('businessFit.goodAlignment') : t('businessFit.moderateAlignment')}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold">{t('businessFit.scoreRationale')}</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{evaluationResult.alignmentRationale}</p>
                                </div>
                                 <div className="space-y-2">
                                    <h4 className="font-semibold">{t('businessFit.prioritizationRec')}</h4>
                                    <p className="text-sm text-muted-foreground font-medium p-3 bg-muted/50 rounded-md">{evaluationResult.prioritizationRecommendation}</p>
                                </div>
                            </div>
                        )}
                        {!isLoading && !evaluationResult && (
                            <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                                <p className="text-sm text-muted-foreground">{t('businessFit.resultPlaceholder')}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
