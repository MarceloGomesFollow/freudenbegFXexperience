
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HyperXiapage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6"/> {t('hyperxia.title')}</CardTitle>
                    <CardDescription>
                        {t('hyperxia.movedMessage')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">{t('hyperxia.playerMoved')}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
