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
import Link from "next/link";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function DashboardPage() {

    const activeParticipants = users.filter(u => u.status === 'Ativo' && u.role === 'Participante');

    const chartConfig = {
        adherence: {
            label: "Adesão",
            color: "hsl(var(--chart-2))",
        },
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Painel Executivo</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Participantes Ativos</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.activeParticipants}</div>
                        <p className="text-xs text-muted-foreground">+2% em relação ao mês passado</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">% Atividades Concluídas</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.completionRate}%</div>
                        <p className="text-xs text-muted-foreground">+5% em relação à semana passada</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Adesão ao Diário 4.0</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.diaryAdherence}%</div>
                        <p className="text-xs text-muted-foreground">Média de 4 posts/semana</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">% Feedbacks Entregues</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpis.feedbackDelivered}%</div>
                        <p className="text-xs text-muted-foreground">SLA de 95% atingido</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Adesão ao Diário por Unidade</CardTitle>
                        <CardDescription>Percentual de adesão nos últimos 30 dias.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <RechartsBarChart accessibilityLayer data={diaryAdherenceData}>
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
                        <CardTitle>Participantes Ativos</CardTitle>
                        <CardDescription>
                            Lista de participantes com status ativo no programa.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Participante</TableHead>
                                    <TableHead>Unidade</TableHead>
                                    <TableHead>Status</TableHead>
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
                                            <div className="font-medium">{user.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.unit}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'} className={user.status === 'Ativo' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400' : ''}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Tarefas Recentes</CardTitle>
                        <CardDescription>
                            Atividades e prazos importantes do programa.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="#">
                            Ver Todas
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
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-sm text-muted-foreground">{task.status}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">{task.dueDate}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
