"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReportsPage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">{t('reports.title')}</h2>
            <p className="text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                {t('reports.subtitle')}
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/dashboard/reports/a3">
                    <Card className="hover:border-primary hover:shadow-lg transition-all">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <FileText className="h-8 w-8 text-primary" />
                                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="pt-4">{t('reports.a3Generator')}</CardTitle>
                            <CardDescription>
                                {t('reports.a3Desc')}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Card className="border-dashed">
                     <CardHeader className="text-center">
                        <CardTitle className="text-muted-foreground">{t('reports.comingSoon')}</CardTitle>
                        <CardDescription>
                            {t('reports.comingSoonDesc')}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
