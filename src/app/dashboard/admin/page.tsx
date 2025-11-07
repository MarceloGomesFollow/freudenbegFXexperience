
"use client";
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminKpis, transfers, transferFlowData } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, BarChart, Clock, TrendingUp, Users as UsersIcon, ArrowLeftRight } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { WorldTalentMap } from '@/components/world-talent-map';
import { Progress } from '@/components/ui/progress';

export default function AdminDashboardPage() {

    const chartConfig = {
        count: {
            label: "Transferências",
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
        return <Badge variant={variant} className={colorClass}>{status}</Badge>;
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
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Painel do Administrador</h2>
                 <p className="text-muted-foreground">
                    Visão geral do fluxo de intercâmbios e participantes.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Intercâmbios</CardTitle>
                        <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminKpis.totalTransfers}</div>
                        <p className="text-xs text-muted-foreground">+15% este trimestre</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Intercâmbios Ativos</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminKpis.ongoingTransfers}</div>
                        <p className="text-xs text-muted-foreground">Participantes em vivência</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estadia Média</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminKpis.averageStayDays} dias</div>
                        <p className="text-xs text-muted-foreground">Média do programa</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Origem Mais Ativa</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-base font-bold">{adminKpis.mostActiveOrigin}</div>
                        <p className="text-xs text-muted-foreground">Unidade com mais envios</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Destino Mais Procurado</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-base font-bold">{adminKpis.mostActiveDestination}</div>
                        <p className="text-xs text-muted-foreground">Unidade mais receptora</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Fluxo de Transferências Entre Empresas</CardTitle>
                        <CardDescription>Visualização do volume de intercâmbios entre as empresas A e B.</CardDescription>
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
                                    <Bar dataKey="count" fill="var(--color-count)" name="Nº de Transferências" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Mapa Global de Talentos</CardTitle>
                        <CardDescription>
                            Visualize os participantes ativos pelo mundo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <WorldTalentMap />
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Histórico de Intercâmbios</CardTitle>
                    <CardDescription>
                       Lista detalhada de todas as movimentações de participantes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Colaborador</TableHead>
                                <TableHead>Origem</TableHead>
                                <TableHead>Destino</TableHead>
                                <TableHead>Período</TableHead>
                                <TableHead className="w-[150px]">Progresso</TableHead>
                                <TableHead>Status</TableHead>
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
                                        <div className="font-medium">{transfer.userName}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{transfer.fromCompany}</div>
                                    <div className="text-xs text-muted-foreground">{transfer.fromDepartment}</div>
                                </TableCell>
                                <TableCell>
                                     <div className="font-medium">{transfer.toCompany}</div>
                                    <div className="text-xs text-muted-foreground">{transfer.toDepartment}</div>
                                </TableCell>
                                <TableCell>{formattedStartDate} - {formattedEndDate}</TableCell>
                                 <TableCell>
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
                </CardContent>
            </Card>
        </div>
    );
}
