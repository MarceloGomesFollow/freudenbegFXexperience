
"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SpecialResourcesPage() {
  const { t } = useLanguage();

  const resources = [
    {
        id: "ia-freudy",
        title: t('specialResources.iaFreudy'),
        description: t('specialResources.iaFreudyDesc'),
        icon: <Bot className="h-8 w-8 text-primary" />,
        href: "/dashboard/ai-mentor"
    },
    {
        id: "business-fit",
        title: t('specialResources.businessFit'),
        description: t('specialResources.businessFitDesc'),
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        href: "/dashboard/business-fit"
    },
    {
        id: "collaborative-curation",
        title: t('specialResources.collaborativeCuration'),
        description: t('specialResources.collaborativeCurationDesc'),
        icon: <Users className="h-8 w-8 text-primary" />,
        href: "/dashboard/diary"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">{t('specialResources.title')}</h2>
        <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
          {t('specialResources.subtitle')}
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
                <Link href={resource.href} key={resource.id}>
                    <Card className="hover:border-primary hover:shadow-lg transition-all h-full flex flex-col">
                        <CardHeader className="flex-grow">
                            <div className="flex items-center justify-between">
                                {resource.icon}
                                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="pt-4">{resource.title}</CardTitle>
                            <CardDescription>
                                {resource.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}
