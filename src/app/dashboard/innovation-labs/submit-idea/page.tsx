
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Lightbulb, Loader2, Sparkles } from "lucide-react";
import { challenges } from "@/lib/data";
import { assistInnovationIdea } from "@/ai/flows/assist-innovation-idea";

const formSchema = z.object({
  challengeId: z.string().optional(),
  title: z.string().min(10, "O título deve ter pelo menos 10 caracteres."),
  problem: z.string().min(20, "A descrição do problema deve ter pelo menos 20 caracteres."),
  proposal: z.string().min(20, "A descrição da proposta deve ter pelo menos 20 caracteres."),
  impact: z.string().min(10, "Descreva o impacto esperado."),
  effort: z.string().min(5, "Descreva o esforço estimado."),
  attachments: z.any().optional(),
});

export default function SubmitIdeaPage() {
  const { toast } = useToast();
  const [isAiLoading, setIsAiLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      challengeId: "challenge-01",
      title: "",
      problem: "",
      proposal: "",
      impact: "",
      effort: "",
    },
  });

  const watchProblem = form.watch("problem");
  const watchChallengeId = form.watch("challengeId");

  const handleAiAssist = async () => {
    if (!watchProblem?.trim()) {
      toast({
        variant: "destructive",
        title: "Campo Obrigatório",
        description: "Por favor, descreva o problema antes de usar a assistência da IA.",
      });
      return;
    }

    setIsAiLoading(true);
    try {
      const selectedChallenge = challenges.find((challenge) => challenge.id === watchChallengeId);
      const result = await assistInnovationIdea({
        problem: watchProblem.trim(),
        challengeTitle: selectedChallenge?.title,
      });

      form.setValue("title", result.title, { shouldValidate: true, shouldDirty: true });
      form.setValue("proposal", result.proposal, { shouldValidate: true, shouldDirty: true });
      form.setValue("impact", result.impact, { shouldValidate: true, shouldDirty: true });
      form.setValue("effort", result.effort, { shouldValidate: true, shouldDirty: true });

      toast({
        title: "IA Assistente!",
        description: "Título, proposta, impacto e esforço foram sugeridos pela IA.",
      });
    } catch (error) {
      console.error("Error generating idea suggestions:", error);
      toast({
        variant: "destructive",
        title: "Erro na Assistência IA",
        description: "Não foi possível gerar sugestões agora. Tente novamente em instantes.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Ideia Submetida!",
      description: "Sua ideia foi enviada para o desafio e está aguardando avaliação.",
    });
  }

  return (
    <div className="space-y-8">
      <Button variant="outline" asChild>
        <Link href="/dashboard/innovation-labs">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para os Desafios
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Submeter Nova Ideia</CardTitle>
          <CardDescription>
            Descreva sua ideia para resolver um dos desafios abertos ou proponha uma inovação espontânea.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                    <h3 className="text-lg font-medium border-b pb-2">Contexto</h3>
                    <FormField
                        control={form.control}
                        name="challengeId"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Desafio Vinculado (Opcional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Selecione um desafio..." />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {challenges.map(challenge => (
                                    <SelectItem key={challenge.id} value={challenge.id}>{challenge.title}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormDescription>Associe sua ideia a um desafio existente ou deixe em branco para uma submissão espontânea.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-medium">Detalhes da Ideia</h3>
                        <Button type="button" variant="outline" size="sm" onClick={handleAiAssist} disabled={isAiLoading}>
                            {isAiLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            {isAiLoading ? "Gerando..." : "Assistente IA"}
                        </Button>
                    </div>

                     <FormField
                        control={form.control}
                        name="problem"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>O Problema ou a Dor</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Descreva claramente qual problema, gargalo ou oportunidade você identificou."
                                {...field}
                                rows={3}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título da Ideia</FormLabel>
                            <FormControl>
                            <Input placeholder="Dê um nome claro e conciso para sua ideia" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="proposal"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proposta de Solução / Hipótese</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Como você propõe resolver o problema? Qual a sua hipótese de melhoria?"
                                {...field}
                                rows={5}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                         <FormField
                            control={form.control}
                            name="impact"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Impacto Esperado</FormLabel>
                                <FormControl>
                                <Input placeholder="Qualitativo ou quantitativo (tempo, custo, qualidade)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="effort"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Esforço Estimado</FormLabel>
                                <FormControl>
                                <Input placeholder="Ex: 2 pessoas, 3 semanas" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="attachments"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Anexos (Opcional)</FormLabel>
                            <FormControl>
                                <Input type="file" disabled />
                            </FormControl>
                            <FormDescription>
                                Você pode anexar fotos, fluxogramas ou PDFs para ilustrar sua ideia. (Simulação)
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="pt-6 flex justify-end">
                    <Button type="submit" size="lg">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Enviar Ideia para Análise
                    </Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
