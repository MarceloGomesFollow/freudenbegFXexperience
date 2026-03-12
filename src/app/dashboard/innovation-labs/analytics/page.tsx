
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { labsAnalytics, ideas, sprints, challenges } from "@/lib/data";
import { DollarSign, Goal, Lightbulb, TrendingUp, Users, Clock, Percent, CheckCircle } from "lucide-react";
import { BarChart, Bar, FunnelChart, Funnel, LabelList, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";
import { translateDataValue } from "@/lib/i18n-mappings";
import { td } from "@/lib/data-translations";

export default function LabsAnalyticsPage() {
    const { language, t } = useLanguage();

    // Gold-to-dark gradient palette for funnel stages
    const funnelColors = [
        "#C5941A", // gold-dark — top (widest)
        "#E8C547", // gold-light
        "#D4A829", // gold mid
        "#6B7280", // gray-500
        "#374151", // gray-700 — bottom (narrowest)
    ];

    const funnelData = labsAnalytics.funnelData.map((item, i) => ({
        ...item,
        stage: td(language, 'analytics', 'funnelStages', item.stage, item.stage),
        fill: funnelColors[i] || funnelColors[funnelColors.length - 1],
    }));

    const heatmapData = labsAnalytics.themesHeatmap;
    const heatmapConfig: ChartConfig = {
        value: { label: t("innovationLabs.analytics.ideas") },
        Tecnologia: { color: "hsl(var(--chart-1))" },
        RH: { color: "hsl(var(--chart-2))" },
        Compras: { color: "hsl(var(--chart-3))" },
        Financeiro: { color: "hsl(var(--chart-4))" },
        Marketing: { color: "hsl(var(--chart-5))" },
    };


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("innovationLabs.analytics.title")}</h2>
                <p className="text-muted-foreground">
                    {t("innovationLabs.analytics.subtitle")}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("innovationLabs.analytics.ideasPerChallenge")}</CardTitle>
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{labsAnalytics.kpis.ideasPerChallenge}</div>
                        <p className="text-xs text-muted-foreground">{t("innovationLabs.analytics.avgIdeasSubmitted")}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("innovationLabs.analytics.approvalRate")}</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{labsAnalytics.kpis.approvalRate}%</div>
                        <p className="text-xs text-muted-foreground">{t("innovationLabs.analytics.ideasToSprint")}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("innovationLabs.analytics.validationRate")}</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{labsAnalytics.kpis.validationRate}%</div>
                        <p className="text-xs text-muted-foreground">{t("innovationLabs.analytics.successfulSprints")}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("innovationLabs.analytics.estimatedSaving")}</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {labsAnalytics.kpis.estimatedSavings.toLocaleString('pt-BR')}</div>
                        <p className="text-xs text-muted-foreground">{t("innovationLabs.analytics.savingsPotential")}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("innovationLabs.analytics.innovationFunnel")}</CardTitle>
                        <CardDescription>{t("innovationLabs.analytics.funnelDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <FunnelChart>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px',
                                        color: 'hsl(var(--foreground))',
                                    }}
                                />
                                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={funnelColors[index]} stroke="none" />
                                    ))}
                                    <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="stage" style={{ fontWeight: 600, fontSize: 13 }} />
                                </Funnel>
                            </FunnelChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t("innovationLabs.analytics.themeRanking")}</CardTitle>
                        <CardDescription>{t("innovationLabs.analytics.themeRankingDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            {['Processos', 'Custo', 'ESG', 'Produto'].map(theme => {
                                const themeValues = ['Tec', 'RH', 'Comp', 'Fin', 'Mkt'].map(unit => {
                                    const item = heatmapData.find(d => d.theme === theme && d.unit.startsWith(unit));
                                    return { unit, item, value: item ? item.value : 0 };
                                });
                                const maxValue = Math.max(...themeValues.map(v => v.value), 1);
                                return (
                                    <div key={theme}>
                                        <h4 className="text-sm font-semibold mb-2 gold-text">{td(language, 'analytics', 'heatmapThemes', theme, theme)}</h4>
                                        <div className="grid grid-cols-5 gap-2 text-xs text-center">
                                            {themeValues.map(({ unit, item, value }) => {
                                                const intensity = value > 0 ? value / maxValue : 0;
                                                // Gold for high values, muted border for zero
                                                const bg = value > 0
                                                    ? `linear-gradient(135deg, hsl(43 78% 44% / ${0.15 + intensity * 0.55}), hsl(46 78% 59% / ${0.1 + intensity * 0.4}))`
                                                    : 'hsl(var(--muted) / 0.3)';
                                                const borderColor = value > 0
                                                    ? `hsl(43 78% 44% / ${0.3 + intensity * 0.5})`
                                                    : 'hsl(var(--border) / 0.3)';
                                                const textColor = value > 0 && intensity > 0.5 ? '#fff' : value > 0 ? 'hsl(46, 78%, 59%)' : 'hsl(var(--muted-foreground))';
                                                return (
                                                    <div
                                                        key={unit}
                                                        className="p-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                                                        style={{
                                                            background: bg,
                                                            border: `1px solid ${borderColor}`,
                                                            boxShadow: value > 0 && intensity > 0.5 ? `0 0 12px hsl(43 78% 44% / ${intensity * 0.3})` : 'none',
                                                        }}
                                                    >
                                                        <div className="text-lg font-bold" style={{ color: textColor }}>{value}</div>
                                                        <div className="text-[10px] mt-0.5 opacity-80" style={{ color: textColor }}>
                                                            {item ? td(language, 'analytics', 'heatmapUnits', item.unit, unit) : unit}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Ideas Table */}
            <Card>
                <CardHeader>
                    <CardTitle>{t("innovationLabs.analytics.ideasTable")}</CardTitle>
                    <CardDescription>{t("innovationLabs.analytics.ideasTableDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t("innovationLabs.analytics.colIdea")}</TableHead>
                                    <TableHead>{t("innovationLabs.analytics.colChallenge")}</TableHead>
                                    <TableHead>{t("innovationLabs.analytics.colAuthor")}</TableHead>
                                    <TableHead>{t("innovationLabs.analytics.colUnit")}</TableHead>
                                    <TableHead className="text-center">{t("innovationLabs.analytics.colICE")}</TableHead>
                                    <TableHead className="text-center">{t("innovationLabs.analytics.colVotes")}</TableHead>
                                    <TableHead>{t("innovationLabs.analytics.colStatus")}</TableHead>
                                    <TableHead>{t("innovationLabs.analytics.colDate")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ideas.map((idea) => {
                                    const challenge = challenges.find(c => c.id === idea.challengeId);
                                    const statusVariant = idea.status === 'Em Sprint' || idea.status === 'Validada' || idea.status === 'Escalada' ? 'gold'
                                        : idea.status === 'Aprovada' ? 'default'
                                        : idea.status === 'Rejeitada' ? 'destructive'
                                        : 'secondary';
                                    return (
                                        <TableRow key={idea.id}>
                                            <TableCell className="font-medium max-w-[200px]">
                                                {td(language, 'ideas', idea.id, 'title', idea.title)}
                                            </TableCell>
                                            <TableCell className="max-w-[180px] text-muted-foreground">
                                                {challenge ? td(language, 'challenges', challenge.id, 'title', challenge.title) : '-'}
                                            </TableCell>
                                            <TableCell>{idea.author.name}</TableCell>
                                            <TableCell>{idea.author.unit}</TableCell>
                                            <TableCell className="text-center">
                                                <span className="font-bold text-gold">{idea.iceScore}</span>
                                            </TableCell>
                                            <TableCell className="text-center">{idea.votes}</TableCell>
                                            <TableCell>
                                                {/* @ts-ignore */}
                                                <Badge variant={statusVariant}>
                                                    {translateDataValue(idea.status, t)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{idea.submittedDate}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Sprints Table */}
            {Object.keys(sprints).length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t("innovationLabs.analytics.sprintsTable")}</CardTitle>
                        <CardDescription>{t("innovationLabs.analytics.sprintsTableDesc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t("innovationLabs.analytics.colIdea")}</TableHead>
                                        <TableHead>{t("innovationLabs.analytics.colHypothesis")}</TableHead>
                                        <TableHead>{t("innovationLabs.analytics.colSprintStatus")}</TableHead>
                                        <TableHead>{t("innovationLabs.analytics.colStart")}</TableHead>
                                        <TableHead>{t("innovationLabs.analytics.colEnd")}</TableHead>
                                        <TableHead>{t("innovationLabs.analytics.colResult")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(sprints).map(([ideaId, sprint]) => {
                                        const idea = ideas.find(i => i.id === ideaId);
                                        const sprintStatusVariant = sprint.status === 'Execução' ? 'gold'
                                            : sprint.status === 'Análise' ? 'default'
                                            : sprint.status === 'Encerrado' ? 'secondary'
                                            : 'outline';
                                        const resultVariant = sprint.result === 'Validado' ? 'gold'
                                            : sprint.result === 'Parcial' ? 'default'
                                            : sprint.result === 'Não Validado' ? 'destructive'
                                            : 'secondary';
                                        return (
                                            <TableRow key={ideaId}>
                                                <TableCell className="font-medium max-w-[180px]">
                                                    {idea ? td(language, 'ideas', idea.id, 'title', idea.title) : ideaId}
                                                </TableCell>
                                                <TableCell className="max-w-[280px] text-sm text-muted-foreground">
                                                    {td(language, 'sprints', ideaId, 'hypothesis', sprint.hypothesis)}
                                                </TableCell>
                                                <TableCell>
                                                    {/* @ts-ignore */}
                                                    <Badge variant={sprintStatusVariant}>
                                                        {translateDataValue(sprint.status, t)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{sprint.startDate}</TableCell>
                                                <TableCell>{sprint.endDate}</TableCell>
                                                <TableCell>
                                                    {sprint.result ? (
                                                        // @ts-ignore
                                                        <Badge variant={resultVariant}>
                                                            {translateDataValue(sprint.result, t)}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm">—</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
