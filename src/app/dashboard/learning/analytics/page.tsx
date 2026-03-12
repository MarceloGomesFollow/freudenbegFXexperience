
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
import { useLanguage } from "@/contexts/LanguageContext";
import { td } from "@/lib/data-translations";


export default function LearningAnalyticsPage() {
    const { language, t } = useLanguage();
    const chartData = courseEngagement.sort((a, b) => b.likes - a.likes).map(item => ({
        ...item,
        courseTitle: td(language, 'courseEngagement', item.courseId, 'courseTitle', item.courseTitle),
    }));
    const chartConfig: ChartConfig = {
        likes: {
          label: "Likes",
          color: "hsl(var(--chart-1))",
        },
        comments: {
          label: t("learning.analytics.comments"),
          color: "hsl(var(--chart-2))",
        },
    };

    return (
        <div className="space-y-8">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Learning Analytics</h2>
                 <p className="text-muted-foreground text-left sm:text-right">
                    {t("learning.analytics.subtitle")}
                </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("learning.analytics.totalEnrollments")}</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.totalEnrollments}</div>
                        <p className="text-xs text-muted-foreground">{t("learning.analytics.sinceLastMonth")}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("learning.analytics.completionRate")}</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.completionRate}%</div>
                        <p className="text-xs text-muted-foreground">{t("learning.analytics.vsLastQuarter")}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("learning.analytics.averageScore")}</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.averageScore}%</div>
                        <p className="text-xs text-muted-foreground">{t("learning.analytics.allQuizAvg")}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("learning.analytics.learningHours")}</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{learningAnalyticsKpis.hoursLearned}</div>
                        <p className="text-xs text-muted-foreground">{t("learning.analytics.totalHoursConsumed")}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                     <CardHeader>
                        <CardTitle>{t("learning.analytics.courseEngagement")}</CardTitle>
                        <CardDescription>
                            {t("learning.analytics.courseEngagementDesc")}
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
                                    <Bar dataKey="comments" fill="var(--color-comments)" radius={4} name={t("learning.analytics.comments")} />
                                </BarChart>
                            </ResponsiveContainer>
                       </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{t("learning.analytics.userProgress")}</CardTitle>
                        <CardDescription>
                            {t("learning.analytics.userProgressDesc")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t("learning.analytics.user")}</TableHead>
                                        <TableHead>{t("learning.analytics.completed")}</TableHead>
                                        <TableHead>{t("learning.analytics.inProgress")}</TableHead>
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
                                                <div className="font-medium whitespace-nowrap">{user.userName}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.completedCourses}</TableCell>
                                        <TableCell>{user.inProgressCourses}</TableCell>
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
                <CardHeader>
                    <CardTitle>{t("learning.analytics.trendingContent")}</CardTitle>
                    <CardDescription>
                        {t("learning.analytics.trendingContentDesc")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courseEngagement.sort((a,b) => b.likes - a.likes).slice(0, 3).map((course, index) => (
                        <Card key={course.courseId}>
                            <CardHeader>
                                <CardTitle className="text-lg">{td(language, 'courseEngagement', course.courseId, 'courseTitle', course.courseTitle)}</CardTitle>
                            </CardHeader>
                             <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{course.likes} Likes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{course.comments} {t("learning.analytics.comments")}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
