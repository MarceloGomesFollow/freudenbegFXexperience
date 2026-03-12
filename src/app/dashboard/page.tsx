"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { kpis, diaryAdherenceData, users, recentTasks } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Activity, ArrowUpRight, BarChart, CheckCircle, Clock, Users as UsersIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";
import { td } from "@/lib/data-translations";
import Link from "next/link";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function DashboardPage() {
    const { language, t } = useLanguage();

    const activeParticipants = users.filter(u => u.status === 'Ativo' && u.role === 'Participante');

    const chartConfig = {
        adherence: {
            label: t('executiveDashboard.adherenceLabel'),
            color: "hsl(var(--chart-2))",
        },
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('executiveDashboard.title')}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('executiveDashboard.activeParticipants')}</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.activeParticipants}</div>
                        <p className="text-xs text-muted-foreground">{t('executiveDashboard.activeParticipantsChange')}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('executiveDashboard.completedActivities')}</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.completionRate}%</div>
                        <p className="text-xs text-muted-foreground">{t('executiveDashboard.completedActivitiesChange')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('executiveDashboard.diaryAdherence')}</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.diaryAdherence}%</div>
                        <p className="text-xs text-muted-foreground">{t('executiveDashboard.diaryAdherenceDesc')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('executiveDashboard.feedbackDelivered')}</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.feedbackDelivered}%</div>
                        <p className="text-xs text-muted-foreground">{t('executiveDashboard.feedbackDeliveredDesc')}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>{t('executiveDashboard.diaryAdherenceByUnit')}</CardTitle>
                        <CardDescription>{t('executiveDashboard.diaryAdherenceLast30')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <RechartsBarChart accessibilityLayer data={diaryAdherenceData.map(d => ({ ...d, unit: td(language, 'analytics', 'diaryAdherenceUnits', d.unit, d.unit) }))}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="unit"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <YAxis />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                />
                                <Bar dataKey="adherence" fill="var(--color-adherence)" radius={4} />
                            </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{t('executiveDashboard.activeParticipantsList')}</CardTitle>
                        <CardDescription>
                            {t('executiveDashboard.activeParticipantsListDesc')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('executiveDashboard.tableParticipant')}</TableHead>
                                        <TableHead className="hidden sm:table-cell">{t('executiveDashboard.tableUnit')}</TableHead>
                                        <TableHead>{t('executiveDashboard.tableStatus')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {activeParticipants.map((user) => {
                                    const userAvatar = PlaceHolderImages.find(p => p.id === user.avatar);
                                    return (
                                    <TableRow key={user.email}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} data-ai-hint="person portrait" />}
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="font-medium whitespace-nowrap">{user.name}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{user.unit}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'} className={user.status === 'Ativo' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400' : ''}>
                                                {translateDataValue(user.status, t)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>{t('executiveDashboard.recentTasks')}</CardTitle>
                        <CardDescription>
                            {t('executiveDashboard.recentTasksDesc')}
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="#">
                            {t('executiveDashboard.viewAll')}
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                     <div className="space-y-4">
                        {recentTasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                    {task.status === 'Concluído' ? <CheckCircle className="h-5 w-5 text-green-500"/> : <Clock className="h-5 w-5 text-yellow-500"/>}
                                    <div>
                                        <p className="font-medium">{td(language, 'recentTasks', task.id, 'title', task.title)}</p>
                                        <p className="text-sm text-muted-foreground">{translateDataValue(task.status, t)}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">{td(language, 'recentTasks', task.id, 'dueDate', task.dueDate)}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
