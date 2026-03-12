"use client";

import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { kpis, exchangeOpportunities, challenges, activityFeed, type ActivityFeedItem } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Beaker, Briefcase, Lightbulb, Users, Rss, BookOpen, NotebookText, Star, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";
import { td } from "@/lib/data-translations";
import { motion } from "framer-motion";

const WorldTalentMap = dynamic(
  () => import("@/components/world-talent-map").then((mod) => mod.WorldTalentMap),
  {
    ssr: false,
    loading: () => <div className="aspect-video w-full rounded-2xl skeleton-gold" />,
  }
);

const ActivityIcon = ({ type }: { type: ActivityFeedItem['type'] }) => {
  const iconClass = "h-5 w-5";
  switch (type) {
    case 'idea': return <Lightbulb className={`${iconClass} text-gold`} />;
    case 'course': return <BookOpen className={`${iconClass} text-accent`} />;
    case 'diary': return <NotebookText className={`${iconClass} text-accent`} />;
    case 'challenge': return <Star className={`${iconClass} text-gold`} />;
    case 'user': return <Users className={`${iconClass} text-accent`} />;
    default: return <Rss className={`${iconClass} text-muted-foreground`} />;
  }
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

interface KpiCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  accentGold?: boolean;
}

function KpiCard({ title, value, description, icon: Icon, accentGold }: KpiCardProps) {
  return (
    <motion.div variants={item}>
      <Card className={accentGold ? "gold-border" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={`rounded-xl p-2.5 ${accentGold ? 'gold-gradient' : 'bg-muted/60 dark:bg-muted/30'}`}>
            <Icon className={`h-4 w-4 ${accentGold ? 'text-white' : 'text-muted-foreground'}`} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HomePage() {
  const { language, t } = useLanguage();

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          <span className="gold-text">FX</span>{" "}
          <span className="text-foreground">Experience</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base">
          {t('home.subtitle')}
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <KpiCard
          title={t('home.activeParticipants')}
          value={kpis.activeParticipants}
          description={t('home.activeParticipantsDesc')}
          icon={Users}
          accentGold
        />
        <KpiCard
          title={t('home.openOpportunities')}
          value={exchangeOpportunities.length}
          description={t('home.openOpportunitiesDesc')}
          icon={Briefcase}
        />
        <KpiCard
          title={t('home.innovationChallenges')}
          value={challenges.filter(c => c.status === 'Aberto').length}
          description={t('home.innovationChallengesDesc')}
          icon={Beaker}
        />
        <KpiCard
          title={t('home.submittedIdeas')}
          value={3}
          description={t('home.submittedIdeasDesc')}
          icon={Lightbulb}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Activity Feed */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg p-1.5 gold-gradient">
                  <Rss className="h-4 w-4 text-white"/>
                </div>
                {t('home.activityFeed')}
              </CardTitle>
              <CardDescription>{t('home.activityFeedDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {activityFeed.map((item, index) => {
                const userAvatar = PlaceHolderImages.find(p => p.id === item.user.avatar);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors duration-200"
                  >
                    <ActivityIcon type={item.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold">{item.user.name}</span>{" "}
                        {translateDataValue(item.action, t)}{" "}
                        <Link href={item.link} className="font-semibold text-gold hover:text-gold-light transition-colors hover:underline">
                          {td(language, 'activityFeed', item.id, 'target', item.target)}
                        </Link>.
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
                    </div>
                    <Avatar className="h-8 w-8 ring-2 ring-white/20 dark:ring-white/10">
                      {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={item.user.name} />}
                      <AvatarFallback className="text-xs">{item.user.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* CTA Card */}
          <motion.div variants={item}>
            <Card className="gold-border overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  {t('home.nextStep')}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button variant="gold" size="lg" asChild className="w-full rounded-xl">
                  <Link href="/dashboard/innovation-labs/submit-idea">
                    <Lightbulb className="mr-2 h-4 w-4"/> {t('home.submitIdea')}
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild className="w-full rounded-xl">
                  <Link href="/dashboard/exchange-center">
                    <Globe className="mr-2 h-4 w-4"/> {t('home.exploreExchanges')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* World Map */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  {t('home.ourTalents')}
                </CardTitle>
                <CardDescription>
                  {t('home.ourTalentsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden rounded-b-2xl">
                <WorldTalentMap />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
