
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-muted/30 backdrop-blur-lg border-b border-muted/20">
        <Link href="/" className="flex items-center justify-center gap-2">
          
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
             <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-muted-foreground">{t('language')}:</span>
                <LanguageToggle />
            </div>
            <Button variant="outline" className="bg-white/10 text-foreground border-white/20 backdrop-blur-sm hover:bg-white/20 font-bold px-6" asChild>
                <Link href="/login">
                    {t('login')}
                </Link>
            </Button>
            <Button asChild className="px-6">
                <Link href="/enrollment">{t('enrollNow')}</Link>
            </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-28 lg:py-32 flex items-center justify-center">
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
          
            <div className="container px-4 md:px-6 relative text-center text-primary-foreground">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-white [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]">
                {t('hero.title')}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild >
                  <Link href="/enrollment">{t('getStarted')}</Link>
                </Button>
                <Button size="lg" variant="secondary">
                  {t('learnMore')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <motion.section 
            id="demo" 
            className="w-full py-12 md:py-20 bg-gray-900 text-gray-50"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm">{t('demo')}</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl drop-shadow-md">
                            {t('platformInAction')}
                        </h2>
                        <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {t('demoDescription')}
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
            <div className="mx-auto max-w-5xl pt-12">
                <Carousel
                    opts={{
                    align: "start",
                    loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                    {features.map((feature, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.05, rotateX: 10 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="h-full"
                                >
                                    <Card className="h-full shadow-md hover:shadow-xl transition-shadow flex flex-col">
                                        <CardHeader className="flex flex-row items-center gap-4">
                                            {feature.icon}
                                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-muted-foreground">{feature.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
          </div>
        </motion.section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card text-card-foreground">
        <div className="text-xs text-muted-foreground text-center sm:text-left">
            <p><b>{t('producedBy')} Follow<span className="shimmer-text-blue">Labs</span></b> - www.followadvisor.com</p>
            <p>{t('propertyOf')}</p>
            <p className="mt-2 font-semibold">PROTOTIPO DEMO PARA FREUDENBERG BRASIL, SEM CUSTO , SALVO ERROS OU FUNÇÕES LIMITADAS POR CARACTERISTICAS DE DEMONSTRAÇÃO</p>
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
