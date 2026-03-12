
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Target, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { challenges } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRole } from "@/components/role-switcher";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";
import { td } from "@/lib/data-translations";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function InnovationLabsPage() {
    const { selectedRole } = useRole();
    const canCreateChallenge = ['admin', 'manager'].includes(selectedRole.id);
    const { language, t } = useLanguage();

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <span className="gold-text">{t('innovationLabs.title1')}</span>{" "}
            <span className="text-foreground">{t('innovationLabs.title2')}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {t('innovationLabs.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
             <Button variant="gold" asChild>
                <Link href="/dashboard/innovation-labs/submit-idea">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {t('innovationLabs.submitIdeaLabel')}
                </Link>
            </Button>
            {canCreateChallenge && (
                 <Button asChild variant="glass">
                    <Link href="#">
                        <Target className="mr-2 h-4 w-4" />
                        {t('innovationLabs.openChallenge')}
                    </Link>
                </Button>
            )}
        </div>
      </motion.div>

       <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" animate="show">
            {challenges.map((challenge) => {
                const ideasCount = challenge.ideaCount || 0;
                const progress = (ideasCount / 5) * 100; // Simulating a target of 5 ideas

                return (
                <motion.div key={challenge.id} variants={item}>
                    <Card className="flex flex-col overflow-hidden card-hover h-full">
                        <div className="relative h-36 sm:h-48 w-full">
                            <Image
                                src={challenge.imageUrl}
                                alt={challenge.title}
                                fill
                                className="object-cover"
                                data-ai-hint={challenge.imageHint}
                            />
                             <Badge
                                variant={challenge.status === 'Aberto' ? 'gold' : 'secondary'}
                                className="absolute top-2 right-2"
                            >
                                {translateDataValue(challenge.status, t)}
                            </Badge>
                        </div>
                        <CardHeader>
                            <CardTitle>{td(language, 'challenges', challenge.id, 'title', challenge.title)}</CardTitle>
                            <CardDescription className="line-clamp-2 h-[40px]">{td(language, 'challenges', challenge.id, 'description', challenge.description)}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>{t('innovationLabs.ideaProgress')} ({ideasCount}/5)</span>
                                    <span>{progress}%</span>
                                </div>
                                <Progress value={progress} />
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{t('innovationLabs.deadline')}: {challenge.deadline}</span>
                            </div>
                        </CardContent>
                         <CardFooter>
                           <Button className="w-full" asChild>
                                <Link href={`/dashboard/innovation-labs/${challenge.id}`}>
                                    {t('innovationLabs.viewChallenge')} <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                           </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            )})}
            <motion.div variants={item}>
                <Card className="border-dashed flex items-center justify-center h-full">
                     <CardHeader className="text-center">
                        <Target className="mx-auto h-10 w-10 text-muted-foreground mb-4"/>
                        <CardTitle className="text-muted-foreground">{t('innovationLabs.newChallengesSoon')}</CardTitle>
                        <CardDescription>
                            {t('innovationLabs.newChallengesDesc')}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </motion.div>
        </motion.div>
    </motion.div>
  );
}
