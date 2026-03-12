
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MessageSquare, Search, Lightbulb, ArrowLeftRight, BookOpen, Presentation } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";

export default function AlumniPage() {
    const { t } = useLanguage();
    const alumni = users.filter(user => user.status === 'Ativo');

    const alumniMetrics = [
        { email: 'ana.silva@example.com', ideas: 5, exchanges: 1, courses: 8, talks: 2 },
        { email: 'bruno.costa@example.com', ideas: 2, exchanges: 2, courses: 5, talks: 1 },
        { email: 'carla.dias@example.com', ideas: 3, exchanges: 1, courses: 10, talks: 0 },
        { email: 'daniel.alves@example.com', ideas: 1, exchanges: 0, courses: 3, talks: 0 },
        { email: 'eduarda.lima@example.com', ideas: 4, exchanges: 2, courses: 7, talks: 1 },
        { email: 'fabio.pereira@example.com', ideas: 10, exchanges: 3, courses: 15, talks: 5 },
        { email: 'gabriela.ramos@example.com', ideas: 8, exchanges: 0, courses: 12, talks: 3 },
        { email: 'heitor.oliveira@example.com', ideas: 2, exchanges: 1, courses: 4, talks: 0 },
    ];


    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">{t('alumni.title')}</h2>
                <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                    {t('alumni.subtitle')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>{t('alumni.searchMembers')}</CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder={t('alumni.searchPlaceholder')} className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {alumni.map(user => {
                        const userAvatar = PlaceHolderImages.find(p => p.id === user.avatar);
                        const metrics = alumniMetrics.find(m => m.email === user.email);
                        return (
                            <Card key={user.email} className="flex flex-col text-center items-center p-6 hover:shadow-lg transition-shadow">
                                <Avatar className="h-20 w-20 mb-4">
                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} data-ai-hint="person portrait" />}
                                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{translateDataValue(user.role, t)} • {user.unit}</p>
                                
                                {metrics && (
                                    <div className="text-xs text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <Lightbulb className="h-4 w-4 text-accent" />
                                            <span>{metrics.ideas} {t('alumni.ideas')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ArrowLeftRight className="h-4 w-4 text-accent" />
                                            <span>{metrics.exchanges} {t('alumni.exchanges')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-accent" />
                                            <span>{metrics.courses} {t('alumni.courses')}</span>
                                        </div>
                                         <div className="flex items-center gap-2">
                                            <Presentation className="h-4 w-4 text-accent" />
                                            <span>{metrics.talks} {t('alumni.talks')}</span>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="mt-4">
                                    <Badge variant="secondary">{t('alumni.classOf')}</Badge>
                                </div>
                                <Button className="mt-6 w-full" asChild>
                                    <Link href="#">
                                        <MessageSquare className="mr-2 h-4 w-4" /> {t('alumni.sendMessage')}
                                    </Link>
                                </Button>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
