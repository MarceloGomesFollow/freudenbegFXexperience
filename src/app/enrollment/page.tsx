"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um email válido."),
  unit: z.string({ required_error: "Por favor, selecione uma unidade." }),
  role: z.string().min(2, "O cargo atual é obrigatório."),
  justification: z
    .string()
    .min(10, "A justificativa deve ter pelo menos 10 caracteres.")
    .max(500, "A justificativa não pode exceder 500 caracteres."),
  terms_lgpd: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar o termo de proteção de dados.",
  }),
  terms_nda: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar o termo de confidencialidade.",
  }),
});

export default function EnrollmentPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const enrollmentArt = PlaceHolderImages.find(p => p.id === 'enrollment-art');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      justification: "",
      terms_lgpd: false,
      terms_nda: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t("enrollment.toastTitle"),
      description: t("enrollment.toastDesc"),
    });
    form.reset();
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b shrink-0 bg-muted/30 backdrop-blur-lg border-muted/20">
            <Link href="/" className="flex items-center justify-center">
            <Logo />
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Button variant="ghost" asChild>
                    <Link href="/login">{t("enrollment.backToLogin")}</Link>
                </Button>
            </nav>
        </header>
        <main className="flex-1 w-full">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="hidden lg:block">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary mb-4">
                            {t("enrollment.title")}
                        </h1>
                        <p className="text-muted-foreground text-lg mb-6">
                            {t("enrollment.subtitle")}
                        </p>
                        {enrollmentArt && (
                            <Image
                                src={enrollmentArt.imageUrl}
                                alt={enrollmentArt.description}
                                data-ai-hint={enrollmentArt.imageHint}
                                width={1200}
                                height={800}
                                className="rounded-lg shadow-lg object-cover"
                            />
                        )}
                    </div>
                    <Card className="w-full max-w-lg mx-auto">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{t("enrollment.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{t("enrollment.fullName")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("enrollment.namePlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{t("enrollment.email")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("enrollment.emailPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("enrollment.unit")}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                            <SelectValue placeholder={t("enrollment.selectCompany")} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="tecnologia">{t("enrollment.selectTechnology")}</SelectItem>
                                            <SelectItem value="marketing">{t("enrollment.selectMarketing")}</SelectItem>
                                            <SelectItem value="rh">{t("enrollment.selectHR")}</SelectItem>
                                            <SelectItem value="vendas">{t("enrollment.selectSales")}</SelectItem>
                                            <SelectItem value="financeiro">{t("enrollment.selectFinance")}</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("enrollment.role")}</FormLabel>
                                        <FormControl>
                                        <Input placeholder={t("enrollment.rolePlaceholder")} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </div>
                                <FormField
                                control={form.control}
                                name="justification"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>{t("enrollment.motivation")}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder={t("enrollment.motivationPlaceholder")}
                                        className="resize-none"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                    control={form.control}
                                    name="terms_lgpd"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>{t("enrollment.lgpdLabel")}</FormLabel>
                                            <FormDescription>
                                            {t("enrollment.lgpdDesc")} <Link href="#" className="underline">{t("enrollment.readTerm")}</Link>.
                                            </FormDescription>
                                            <FormMessage />
                                        </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="terms_nda"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>{t("enrollment.ndaLabel")}</FormLabel>
                                            <FormDescription>
                                            {t("enrollment.ndaDesc")} <Link href="#" className="underline">{t("enrollment.readTerm")}</Link>.
                                            </FormDescription>
                                            <FormMessage />
                                        </div>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" size="lg">{t("enrollment.submitApplication")}</Button>
                            </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card text-card-foreground">
             <div className="text-xs text-muted-foreground text-center sm:text-left">
                <p><b>{t("producedBy")} Follow<span className="shimmer-text-blue">Labs</span></b> - www.followadvisor.com</p>
                <p>{t("propertyOf")}</p>
                <p className="mt-2 font-semibold">{t("enrollment.demoDisclaimer")}</p>
            </div>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
                    {t("footer.terms")}
                </Link>
                <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
                    {t("footer.privacy")}
                </Link>
            </nav>
        </footer>
    </div>
  );
}
