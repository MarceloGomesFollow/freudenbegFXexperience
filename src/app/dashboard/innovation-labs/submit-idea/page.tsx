
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
import { useLanguage } from "@/contexts/LanguageContext";

export default function SubmitIdeaPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isAiLoading, setIsAiLoading] = useState(false);

  const formSchema = z.object({
    challengeId: z.string().optional(),
    title: z.string().min(10, t("innovationLabs.submitIdea.titleMin")),
    problem: z.string().min(20, t("innovationLabs.submitIdea.problemMin")),
    proposal: z.string().min(20, t("innovationLabs.submitIdea.proposalMin")),
    impact: z.string().min(10, t("innovationLabs.submitIdea.impactMin")),
    effort: z.string().min(5, t("innovationLabs.submitIdea.effortMin")),
    attachments: z.any().optional(),
  });

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
        title: t("toast.fieldRequired"),
        description: t("toast.fieldRequiredDesc"),
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
        title: t("toast.aiAssistant"),
        description: t("toast.aiAssistantDesc"),
      });
    } catch (error) {
      console.error("Error generating idea suggestions:", error);
      toast({
        variant: "destructive",
        title: t("toast.aiAssistantError"),
        description: t("toast.aiAssistantErrorDesc"),
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t("innovationLabs.submitIdea.toastTitle"),
      description: t("innovationLabs.submitIdea.toastDesc"),
    });
  }

  return (
    <div className="space-y-8">
      <Button variant="outline" asChild>
        <Link href="/dashboard/innovation-labs">
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("innovationLabs.submitIdea.backToChallenges")}
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{t("innovationLabs.submitIdea.formTitle")}</CardTitle>
          <CardDescription>
            {t("innovationLabs.submitIdea.formDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                    <h3 className="text-lg font-medium border-b pb-2">{t("innovationLabs.submitIdea.context")}</h3>
                    <FormField
                        control={form.control}
                        name="challengeId"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("innovationLabs.submitIdea.linkedChallenge")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder={t("innovationLabs.submitIdea.selectChallenge")} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {challenges.map(challenge => (
                                    <SelectItem key={challenge.id} value={challenge.id}>{challenge.title}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormDescription>{t("innovationLabs.submitIdea.linkedChallengeDesc")}</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-medium">{t("innovationLabs.submitIdea.ideaDetails")}</h3>
                        <Button type="button" variant="outline" size="sm" onClick={handleAiAssist} disabled={isAiLoading}>
                            {isAiLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            {isAiLoading ? t("innovationLabs.submitIdea.generating") : t("innovationLabs.submitIdea.aiAssistant")}
                        </Button>
                    </div>

                     <FormField
                        control={form.control}
                        name="problem"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("innovationLabs.submitIdea.problemLabel")}</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder={t("innovationLabs.submitIdea.problemPlaceholder")}
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
                            <FormLabel>{t("innovationLabs.submitIdea.ideaTitleLabel")}</FormLabel>
                            <FormControl>
                            <Input placeholder={t("innovationLabs.submitIdea.ideaTitlePlaceholder")} {...field} />
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
                            <FormLabel>{t("innovationLabs.submitIdea.proposalLabel")}</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder={t("innovationLabs.submitIdea.proposalPlaceholder")}
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
                                <FormLabel>{t("innovationLabs.submitIdea.impactLabel")}</FormLabel>
                                <FormControl>
                                <Input placeholder={t("innovationLabs.submitIdea.impactPlaceholder")} {...field} />
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
                                <FormLabel>{t("innovationLabs.submitIdea.effortLabel")}</FormLabel>
                                <FormControl>
                                <Input placeholder={t("innovationLabs.submitIdea.effortPlaceholder")} {...field} />
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
                            <FormLabel>{t("innovationLabs.submitIdea.attachments")}</FormLabel>
                            <FormControl>
                                <Input type="file" disabled />
                            </FormControl>
                            <FormDescription>
                                {t("innovationLabs.submitIdea.attachmentsDesc")}
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="pt-6 flex justify-end">
                    <Button type="submit" size="lg">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        {t("innovationLabs.submitIdea.submitButton")}
                    </Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
