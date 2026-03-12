
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { labsAnalytics } from "@/lib/data";
import { DollarSign, Goal, Lightbulb, TrendingUp, Users, Clock, Percent, CheckCircle } from "lucide-react";
import { BarChart, Bar, FunnelChart, Funnel, LabelList, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LabsAnalyticsPage() {
    
    const funnelData = labsAnalytics.funnelData;
    const funnelColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];
    
    const heatmapData = labsAnalytics.themesHeatmap;
    const heatmapConfig: ChartConfig = {
        value: { label: "Ideias" },
        Tecnologia: { color: "hsl(var(--chart-1))" },
        RH: { color: "hsl(var(--chart-2))" },
        Compras: { color: "hsl(var(--chart-3))" },
        Financeiro: { color: "hsl(var(--chart-4))" },
        Marketing: { color: "hsl(var(--chart-5))" },
    };


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard - Innovation Labs</h2>
                <p className="text-muted-foreground">
                    KPIs e métricas sobre o funil de inovação da empresa.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ideias por Desafio</CardTitle>
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{labsAnalytics.kpis.ideasPerChallenge}</div>
                        <p className="text-xs text-muted-foreground">Média de ideias submetidas</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{labsAnalytics.kpis.approvalRate}%</div>
                        <p className="text-xs text-muted-foreground">De ideias que vão para sprint</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Taxa de Validação</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{labsAnalytics.kpis.validationRate}%</div>
                        <p className="text-xs text-muted-foreground">De sprints bem-sucedidos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saving Estimado (Anual)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {labsAnalytics.kpis.estimatedSavings.toLocaleString('pt-BR')}</div>
                        <p className="text-xs text-muted-foreground">Potencial de economia das ideias</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Funil de Inovação</CardTitle>
                        <CardDescription>Da ideação à escala: o fluxo de transformação.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <FunnelChart>
                                <Tooltip />
                                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                                    <LabelList position="right" fill="#fff" stroke="none" dataKey="stage" />
                                </Funnel>
                            </FunnelChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Ranking de Temas e Unidades</CardTitle>
                        <CardDescription>Unidades que mais geram ideias por tema.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* This is a simplified view. A real heatmap would be more complex. */}
                        <div className="space-y-4">
                            {['Processos', 'Custo', 'ESG', 'Produto'].map(theme => (
                                <div key={theme}>
                                    <h4 className="text-sm font-medium mb-2">{theme}</h4>
                                    <div className="grid grid-cols-5 gap-2 text-xs text-center">
                                        {['Tec', 'RH', 'Comp', 'Fin', 'Mkt'].map(unit => {
                                            const item = heatmapData.find(d => d.theme === theme && d.unit.startsWith(unit));
                                            const value = item ? item.value : 0;
                                            const opacity = value > 0 ? Math.min(0.2 + (value/30), 1) : 0.1;
                                            return (
                                                <div key={unit} className="p-2 rounded-md" style={{ backgroundColor: `hsl(var(--primary), ${opacity})`}}>
                                                    <div className="font-bold text-primary-foreground">{value}</div>
                                                    <div className="text-primary-foreground/80">{unit}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
