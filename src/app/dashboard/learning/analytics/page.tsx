
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { learningAnalyticsKpis, userLearningProgress, courseEngagement, type CourseEngagement } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight, BookOpen, CheckCircle, GraduationCap, Percent, ThumbsUp, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


export default function LearningAnalyticsPage() {
    const chartData = courseEngagement.sort((a, b) => b.likes - a.likes);
    const chartConfig: ChartConfig = {
        likes: {
          label: "Likes",
          color: "hsl(var(--chart-1))",
        },
        comments: {
          label: "Comentários",
          color: "hsl(var(--chart-2))",
        },
    };

    return (
        <div className="space-y-8">
             <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Learning Analytics</h2>
                 <p className="text-muted-foreground">
                    Insights sobre o engajamento e progresso no Learning Hub.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Inscrições</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.totalEnrollments}</div>
                        <p className="text-xs text-muted-foreground">+20 desde o último mês</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.completionRate}%</div>
                        <p className="text-xs text-muted-foreground">+5% em relação ao trimestre passado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pontuação Média</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.averageScore}%</div>
                        <p className="text-xs text-muted-foreground">Média de todos os quizzes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Horas de Aprendizado</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.hoursLearned}</div>
                        <p className="text-xs text-muted-foreground">Total de horas consumidas</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                     <CardHeader>
                        <CardTitle>Engajamento dos Cursos</CardTitle>
                        <CardDescription>
                            Visualização de likes e comentários por curso.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="courseTitle"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                                    />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="likes" fill="var(--color-likes)" radius={4} name="Likes" />
                                    <Bar dataKey="comments" fill="var(--color-comments)" radius={4} name="Comentários" />
                                </BarChart>
                            </ResponsiveContainer>
                       </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Progresso dos Usuários</CardTitle>
                        <CardDescription>
                            Acompanhe o desenvolvimento dos participantes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Usuário</TableHead>
                                    <TableHead>Concluídos</TableHead>
                                    <TableHead>Em Progresso</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {userLearningProgress.map((user) => {
                                const userAvatar = PlaceHolderImages.find(p => p.id === user.userAvatar);
                                return (
                                <TableRow key={user.userId}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.userName} data-ai-hint="person portrait" />}
                                                <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium">{user.userName}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.completedCourses}</TableCell>
                                    <TableCell>{user.inProgressCourses}</TableCell>
                                </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Conteúdo em Alta</CardTitle>
                    <CardDescription>
                        Cursos e trilhas mais populares no momento.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courseEngagement.sort((a,b) => b.likes - a.likes).slice(0, 3).map((course, index) => (
                        <Card key={course.courseId}>
                            <CardHeader>
                                <CardTitle className="text-lg">{course.courseTitle}</CardTitle>
                            </CardHeader>
                             <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{course.likes} Likes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{course.comments} Comentários</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
