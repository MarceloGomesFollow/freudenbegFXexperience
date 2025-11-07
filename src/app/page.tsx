
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Bot, BarChart, NotebookText, MessageSquareQuote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const { t } = useLanguage();

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: t('features.streamlinedWorkflows.title'),
      description: t('features.streamlinedWorkflows.description'),
    },
    {
      icon: <NotebookText className="h-8 w-8 text-accent" />,
      title: t('features.interactiveDigitalDiary.title'),
      description: t('features.interactiveDigitalDiary.description'),
    },
    {
      icon: <Bot className="h-8 w-8 text-accent" />,
      title: t('features.aiAssistedReporting.title'),
      description: t('features.aiAssistedReporting.description'),
    },
    {
      icon: <MessageSquareQuote className="h-8 w-8 text-accent" />,
      title: t('features.structuredFeedback.title'),
      description: t('features.structuredFeedback.description'),
    },
    {
      icon: <BarChart className="h-8 w-8 text-accent" />,
      title: t('features.executiveDashboards.title'),
      description: t('features.executiveDashboards.description'),
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-accent" />,
      title: t('features.lgpdCompliant.title'),
      description: t('features.lgpdCompliant.description'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-background/60 backdrop-blur-md border-b">
        <Link href="/" className="flex items-center justify-center gap-4">
          <Logo />
           <div className="text-xl font-bold tracking-wider uppercase shimmer-text">
            FX Experience
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <LanguageToggle />
            <Button variant="outline" className="bg-white/10 text-primary border-white/20 backdrop-blur-sm hover:bg-white/20 hover:text-primary" asChild>
                <Link href="/login">
                    {t('login')}
                </Link>
            </Button>
            <Button asChild>
                <Link href="/enrollment">{t('enrollNow')}</Link>
            </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-blue-900/80 animated-gradient" />
          <div className="container px-4 md:px-6 relative text-center text-primary-foreground">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-transparent bg-clip-text shimmer-text-hero">
                {t('hero.title')}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild variant="secondary">
                  <Link href="/enrollment">{t('getStarted')}</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  {t('learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <motion.section 
            id="demo" 
            className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Demo</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                            Veja a Plataforma em Ação
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Assista a uma rápida demonstração de como a DPX Digital pode revolucionar seus programas de desenvolvimento.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-4xl mt-12">
                    <div className="aspect-video overflow-hidden rounded-xl shadow-2xl">
                         <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/Jl0c2A7cP4Q"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </motion.section>

        <motion.section 
          id="features" 
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">{t('keyFeatures')}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                  {t('features.title')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('features.subtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card text-card-foreground">
        <div className="text-xs text-muted-foreground text-center sm:text-left">
            <p>Produzido por Follow<span className="font-bold shimmer-text-blue">Labs</span></p>
            <p>Propriedade de Follow Advisor Ltda. CNPJ 32.814.520/0001-24</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            {t('footer.terms')}
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            {t('footer.privacy')}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
