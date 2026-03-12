


"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Bell, FileText, Lock, User as UserIcon, Download, Building, PlusCircle, Image as ImageIcon } from "lucide-react";
import * as data from "@/lib/data";
import { useRole } from '@/components/role-switcher';
import { useLogo } from '@/components/logo';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from "next/image";

export default function SettingsPage() {
    const { selectedRole } = useRole();
    const isAdmin = selectedRole.id === 'admin';
    const [companies, setCompanies] = useState(data.companies);
    const [newCompanyName, setNewCompanyName] = useState('');
    const [newCompanyLocation, setNewCompanyLocation] = useState('');
    const { logo, setLogo } = useLogo();
    const [logoPreview, setLogoPreview] = useState<string | null>(logo);
    const { t } = useLanguage();

    const activityLogs = [
        { id: 1, action: t('settings.logActions.login'), ip: "189.12.34.56", date: "25/07/2024 10:30" },
        { id: 2, action: t('settings.logActions.diaryEntry'), ip: "189.12.34.56", date: "25/07/2024 09:15" },
        { id: 3, action: t('settings.logActions.submittedIdea'), ip: "201.55.67.89", date: "24/07/2024 16:45" },
        { id: 4, action: t('settings.logActions.changedPassword'), ip: "201.55.67.89", date: "24/07/2024 11:20" },
        { id: 5, action: t('settings.logActions.completedCourse'), ip: "201.55.67.89", date: "23/07/2024 18:00" },
    ];

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newLogoUrl = reader.result as string;
                setLogoPreview(newLogoUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveLogo = () => {
        if (logoPreview) {
            setLogo(logoPreview);
        }
    };

    const handleExport = () => {
        const allData = {
            users: data.users,
            companies: companies,
            diaryEntries: data.diaryEntries,
            tasks: data.tasks,
            mentorships: data.mentorships,
            exchangeOpportunities: data.exchangeOpportunities,
            transfers: data.transfers,
            candidateApprovals: data.candidateApprovals,
            courses: data.coursesDb,
            learningPaths: data.learningPathsDb,
            challenges: data.challenges,
            ideas: data.ideas,
            sprints: data.sprints,
            kpis: data.kpis,
            recentTasks: data.recentTasks
        };

        const textData = JSON.stringify(allData, null, 2);

        const blob = new Blob([textData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "registros.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleAddCompany = () => {
        if (newCompanyName.trim() && newCompanyLocation.trim()) {
            const newCompany = {
                id: newCompanyName.toLowerCase().replace(/\s+/g, '-'),
                name: newCompanyName,
                location: newCompanyLocation,
            };
            setCompanies([...companies, newCompany]);
            setNewCompanyName('');
            setNewCompanyLocation('');
        }
    };

    const tabsList = [
        { value: "profile", label: t('settings.tabs.profile'), icon: UserIcon, admin: false },
        { value: "companies", label: t('settings.tabs.companies'), icon: Building, admin: true },
        { value: "branding", label: t('settings.tabs.branding'), icon: ImageIcon, admin: true },
        { value: "security", label: t('settings.tabs.security'), icon: Lock, admin: false },
        { value: "notifications", label: t('settings.tabs.notifications'), icon: Bell, admin: false },
        { value: "logs", label: t('settings.tabs.logs'), icon: Activity, admin: false },
        { value: "export", label: t('settings.tabs.export'), icon: Download, admin: false },
    ].filter(tab => isAdmin || !tab.admin);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('settings.title')}</h2>

            <Tabs defaultValue="profile" className="w-full flex flex-col md:flex-row gap-6 md:gap-8" orientation="vertical">
                <TabsList className="w-full md:w-48 shrink-0 h-auto flex-row md:flex-col items-start justify-start p-1 bg-muted rounded-lg overflow-x-auto">
                    {tabsList.map(({ value, label, icon: Icon }) => (
                        <TabsTrigger key={value} value={value} className="w-full justify-start gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Icon className="h-4 w-4"/>
                            <span>{label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="flex-1">
                    <TabsContent value="profile" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('settings.publicProfile')}</CardTitle>
                                <CardDescription>
                                    {t('settings.publicProfileDesc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('settings.fullName')}</Label>
                                    <Input id="name" defaultValue="Ana Silva" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('settings.email')}</Label>
                                    <Input id="email" type="email" defaultValue="ana.silva@example.com" readOnly />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">{t('settings.role')}</Label>
                                    <Input id="role" defaultValue="Analista de Sistemas Pleno" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit">{t('settings.unit')}</Label>
                                    <Input id="unit" defaultValue="Tecnologia (Empresa A)" readOnly />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>{t('common.saveChanges')}</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {isAdmin && (
                        <TabsContent value="companies" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('settings.companyManagement')}</CardTitle>
                                    <CardDescription>
                                        {t('settings.companyManagementDesc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className='text-lg'>{t('settings.addCompany')}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
                                            <div className="space-y-2 flex-1 w-full">
                                                <Label htmlFor="new-company-name">{t('settings.companyName')}</Label>
                                                <Input id="new-company-name" value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)} placeholder={t('settings.companyNamePlaceholder')} />
                                            </div>
                                            <div className="space-y-2 flex-1 w-full">
                                                <Label htmlFor="new-company-location">{t('settings.companyLocation')}</Label>
                                                <Input id="new-company-location" value={newCompanyLocation} onChange={(e) => setNewCompanyLocation(e.target.value)} placeholder={t('settings.companyLocationPlaceholder')} />
                                            </div>
                                            <Button onClick={handleAddCompany} className="w-full sm:w-auto">
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                {t('common.add')}
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>{t('settings.companyName')}</TableHead>
                                                    <TableHead>{t('settings.companyLocation')}</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {companies.map((company) => (
                                                    <TableRow key={company.id}>
                                                        <TableCell className="font-medium">{company.name}</TableCell>
                                                        <TableCell>{company.location}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}

                    {isAdmin && (
                        <TabsContent value="branding" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('settings.branding')}</CardTitle>
                                    <CardDescription>
                                        {t('settings.brandingDesc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>{t('settings.currentLogo')}</Label>
                                        <div className="p-4 border rounded-md bg-muted flex items-center justify-center">
                                            {logoPreview ? (
                                                <Image src={logoPreview} alt="Logo Preview" width={160} height={32} className="object-contain" />
                                            ) : (
                                                <div className="h-8 w-40 bg-muted-foreground/20 rounded-md" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="logo-upload">{t('settings.changeLogo')}</Label>
                                        <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoChange} />
                                        <p className="text-sm text-muted-foreground">
                                            {t('settings.logoHint')}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSaveLogo}>{t('settings.saveLogo')}</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    )}


                    <TabsContent value="security" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('settings.accountSecurity')}</CardTitle>
                                <CardDescription>
                                    {t('settings.accountSecurityDesc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium">{t('settings.changePassword')}</h3>
                                    <Separator className="my-4" />
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">{t('settings.currentPassword')}</Label>
                                            <Input id="current-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">{t('settings.newPassword')}</Label>
                                            <Input id="new-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">{t('settings.confirmPassword')}</Label>
                                            <Input id="confirm-password" type="password" />
                                        </div>
                                        <Button>{t('settings.updatePassword')}</Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">{t('settings.twoFactor')}</h3>
                                    <Separator className="my-4" />
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div>
                                            <h4 className="font-medium">{t('settings.twoFactorStatus')}</h4>
                                            <p className="text-sm text-muted-foreground">{t('settings.twoFactorDesc')}</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('settings.notificationPreferences')}</CardTitle>
                                <CardDescription>
                                    {t('settings.notificationPreferencesDesc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-4">{t('settings.emailNotifications')}</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-mentions" className="flex flex-col space-y-1">
                                                <span>{t('settings.mentions')}</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    {t('settings.mentionsDesc')}
                                                </span>
                                            </Label>
                                            <Switch id="email-mentions" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-tasks" className="flex flex-col space-y-1">
                                                <span>{t('settings.tasksDeadlines')}</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    {t('settings.tasksDeadlinesDesc')}
                                                </span>
                                            </Label>
                                            <Switch id="email-tasks" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-newsletter" className="flex flex-col space-y-1">
                                                <span>{t('settings.newsletter')}</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    {t('settings.newsletterDesc')}
                                                </span>
                                            </Label>
                                            <Switch id="email-newsletter" />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-medium mb-4">{t('settings.pushNotifications')}</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="push-all" className="flex flex-col space-y-1">
                                                <span>{t('settings.allNotifications')}</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    {t('settings.allNotificationsDesc')}
                                                </span>
                                            </Label>
                                            <Switch id="push-all" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>{t('settings.savePreferences')}</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="logs" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('settings.activityLogs')}</CardTitle>
                                <CardDescription>
                                    {t('settings.activityLogsDesc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>{t('settings.actionColumn')}</TableHead>
                                                <TableHead>{t('settings.ipColumn')}</TableHead>
                                                <TableHead className="text-right">{t('settings.dateColumn')}</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {activityLogs.map((log) => (
                                                <TableRow key={log.id}>
                                                    <TableCell className="font-medium">{log.action}</TableCell>
                                                    <TableCell>{log.ip}</TableCell>
                                                    <TableCell className="text-right whitespace-nowrap">{log.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="export" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('settings.exportAll')}</CardTitle>
                                <CardDescription>
                                    {t('settings.exportAllDesc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {t('settings.exportExplanation')}
                                </p>
                                <Button onClick={handleExport}>
                                    <Download className="mr-2 h-4 w-4" />
                                    {t('settings.exportButton')}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
