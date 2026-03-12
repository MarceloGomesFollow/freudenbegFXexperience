
"use client";
import React from 'react';
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminKpis, transfers, transferFlowData } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, BarChart, Clock, TrendingUp, Users as UsersIcon, ArrowLeftRight } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Progress } from '@/components/ui/progress';
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";

const WorldTalentMap = dynamic(
  () => import("@/components/world-talent-map").then((mod) => mod.WorldTalentMap),
  {
    ssr: false,
    loading: () => <div className="aspect-video w-full animate-pulse rounded-lg bg-muted" />,
  }
);

export default function AdminDashboardPage() {
    const { t } = useLanguage();

    const chartConfig = {
        count: {
            label: t('admin.transferLabel'),
            color: "hsl(var(--chart-2))",
        },
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const variant = {
            'Em Andamento': 'default',
            'Concluído': 'secondary',
            'Agendado': 'outline',
        }[status] || 'default';

        const colorClass = {
            'Em Andamento': 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
            'Concluído': 'bg-green-500/20 text-green-700 dark:text-green-400',
            'Agendado': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
        }[status] || '';

        // @ts-ignore
        return <Badge variant={variant} className={colorClass}>{translateDataValue(status, t)}</Badge>;
    }
    
    const calculateProgress = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();
        
        if (now >= end) return 100;
        if (now <= start) return 0;
        
        const totalDuration = end.getTime() - start.getTime();
        const elapsedDuration = now.getTime() - start.getTime();
        
        return Math.round((elapsedDuration / totalDuration) * 100);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('admin.title')}</h2>
                    <p className="text-muted-foreground mt-1">
                        {t('admin.subtitle')}
                    </p>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.totalExchanges')}</CardTitle>
                        <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminKpis.totalTransfers}</div>
                        <p className="text-xs text-muted-foreground">{t('admin.totalExchangesDesc')}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.activeExchanges')}</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminKpis.ongoingTransfers}</div>
                        <p className="text-xs text-muted-foreground">{t('admin.activeExchangesDesc')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.averageStay')}</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminKpis.averageStayDays} {t('common.days')}</div>
                        <p className="text-xs text-muted-foreground">{t('admin.averageStayDesc')}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.mostActiveOrigin')}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-base font-bold">{adminKpis.mostActiveOrigin}</div>
                        <p className="text-xs text-muted-foreground">{t('admin.mostActiveOriginDesc')}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.mostActiveDestination')}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-base font-bold">{adminKpis.mostActiveDestination}</div>
                        <p className="text-xs text-muted-foreground">{t('admin.mostActiveDestinationDesc')}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>{t('admin.transferFlow')}</CardTitle>
                        <CardDescription>{t('admin.transferFlowDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsBarChart data={transferFlowData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <XAxis dataKey="from" tickFormatter={(value, index) => `${value} -> ${transferFlowData[index].to}`} angle={-25} textAnchor="end" height={60} interval={0} />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Bar dataKey="count" fill="var(--color-count)" name={t('admin.transferCount')} radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{t('admin.globalTalentMap')}</CardTitle>
                        <CardDescription>
                            {t('admin.globalTalentMapDesc')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <WorldTalentMap />
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>{t('admin.transferHistory')}</CardTitle>
                    <CardDescription>
                       {t('admin.transferHistoryDesc')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('admin.tableEmployee')}</TableHead>
                                    <TableHead className="hidden sm:table-cell">{t('admin.tableOrigin')}</TableHead>
                                    <TableHead className="hidden sm:table-cell">{t('admin.tableDestination')}</TableHead>
                                    <TableHead className="hidden md:table-cell">{t('admin.tablePeriod')}</TableHead>
                                    <TableHead className="w-[150px] hidden lg:table-cell">{t('admin.tableProgress')}</TableHead>
                                    <TableHead>{t('admin.tableStatus')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {transfers.map((transfer) => {
                                const userAvatar = PlaceHolderImages.find(p => p.id === transfer.userAvatar);
                                let progress;
                                if (transfer.userName === 'Ana Silva') {
                                    progress = 90;
                                } else {
                                    progress = calculateProgress(transfer.startDate, transfer.endDate);
                                }
                                const formattedStartDate = new Date(transfer.startDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                const formattedEndDate = new Date(transfer.endDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                                return (
                                <TableRow key={transfer.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={transfer.userName} data-ai-hint="person portrait" />}
                                                <AvatarFallback>{transfer.userName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium whitespace-nowrap">{transfer.userName}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="font-medium">{transfer.fromCompany}</div>
                                        <div className="text-xs text-muted-foreground">{transfer.fromDepartment}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="font-medium">{transfer.toCompany}</div>
                                        <div className="text-xs text-muted-foreground">{transfer.toDepartment}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{formattedStartDate} - {formattedEndDate}</TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex items-center gap-2">
                                            <Progress value={progress} className="h-2" />
                                            <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={transfer.status} />
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
    );
}
