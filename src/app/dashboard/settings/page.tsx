

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
import Image from "next/image";

const activityLogs = [
    { id: 1, action: "Login na plataforma", ip: "189.12.34.56", date: "25/07/2024 10:30" },
    { id: 2, action: "Criou entrada no Diário 4.0", ip: "189.12.34.56", date: "25/07/2024 09:15" },
    { id: 3, action: "Submeteu ideia 'Plataforma Gamificada'", ip: "201.55.67.89", date: "24/07/2024 16:45" },
    { id: 4, action: "Alterou a senha", ip: "201.55.67.89", date: "24/07/2024 11:20" },
    { id: 5, action: "Concluiu o curso 'Design Thinking'", ip: "201.55.67.89", date: "23/07/2024 18:00" },
]

export default function SettingsPage() {
    const { selectedRole } = useRole();
    const isAdmin = selectedRole.id === 'admin';
    const [companies, setCompanies] = useState(data.companies);
    const [newCompanyName, setNewCompanyName] = useState('');
    const [newCompanyLocation, setNewCompanyLocation] = useState('');
    const { logo, setLogo } = useLogo();
    const [logoPreview, setLogoPreview] = useState<string | null>(logo);

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
        { value: "profile", label: "Perfil", icon: UserIcon, admin: false },
        { value: "companies", label: "Empresas", icon: Building, admin: true },
        { value: "branding", label: "Branding", icon: ImageIcon, admin: true },
        { value: "security", label: "Segurança", icon: Lock, admin: false },
        { value: "notifications", label: "Notificações", icon: Bell, admin: false },
        { value: "logs", label: "Logs", icon: Activity, admin: false },
        { value: "export", label: "Exportar Dados", icon: Download, admin: false },
    ].filter(tab => isAdmin || !tab.admin);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Configurações</h2>
            
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
                                <CardTitle>Perfil Público</CardTitle>
                                <CardDescription>
                                    Estas informações serão visíveis para outros usuários na plataforma.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input id="name" defaultValue="Ana Silva" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="ana.silva@example.com" readOnly />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Função</Label>
                                    <Input id="role" defaultValue="Analista de Sistemas Pleno" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit">Unidade</Label>
                                    <Input id="unit" defaultValue="Tecnologia (Empresa A)" readOnly />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Salvar Alterações</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {isAdmin && (
                        <TabsContent value="companies" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gerenciamento de Empresas</CardTitle>
                                    <CardDescription>
                                        Adicione e gerencie as unidades de negócio da organização.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className='text-lg'>Adicionar Nova Empresa</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
                                            <div className="space-y-2 flex-1 w-full">
                                                <Label htmlFor="new-company-name">Nome da Empresa</Label>
                                                <Input id="new-company-name" value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)} placeholder="Ex: Freudenberg-NOK" />
                                            </div>
                                            <div className="space-y-2 flex-1 w-full">
                                                <Label htmlFor="new-company-location">Localização</Label>
                                                <Input id="new-company-location" value={newCompanyLocation} onChange={(e) => setNewCompanyLocation(e.target.value)} placeholder="Ex: Diadema – SP" />
                                            </div>
                                            <Button onClick={handleAddCompany} className="w-full sm:w-auto">
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Adicionar
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Nome da Empresa</TableHead>
                                                    <TableHead>Localização</TableHead>
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
                                    <CardTitle>Branding da Plataforma</CardTitle>
                                    <CardDescription>
                                        Personalize a aparência da plataforma com seu próprio logo.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Logo Atual</Label>
                                        <div className="p-4 border rounded-md bg-muted flex items-center justify-center">
                                            {logoPreview ? (
                                                <Image src={logoPreview} alt="Logo Preview" width={160} height={32} className="object-contain" />
                                            ) : (
                                                <div className="h-8 w-40 bg-muted-foreground/20 rounded-md" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="logo-upload">Trocar Logo</Label>
                                        <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoChange} />
                                        <p className="text-sm text-muted-foreground">
                                            Use uma imagem com fundo transparente (PNG ou SVG) para melhores resultados.
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSaveLogo}>Salvar Logo</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    )}


                    <TabsContent value="security" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Segurança da Conta</CardTitle>
                                <CardDescription>
                                    Gerencie sua senha e métodos de autenticação.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium">Alterar Senha</h3>
                                    <Separator className="my-4" />
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Senha Atual</Label>
                                            <Input id="current-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">Nova Senha</Label>
                                            <Input id="new-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                                            <Input id="confirm-password" type="password" />
                                        </div>
                                        <Button>Atualizar Senha</Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Autenticação de Dois Fatores (2FA)</h3>
                                    <Separator className="my-4" />
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div>
                                            <h4 className="font-medium">Status</h4>
                                            <p className="text-sm text-muted-foreground">Habilitar 2FA aumenta a segurança da sua conta.</p>
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
                                <CardTitle>Preferências de Notificação</CardTitle>
                                <CardDescription>
                                    Escolha como e quando você deseja ser notificado.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-4">Notificações por Email</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-mentions" className="flex flex-col space-y-1">
                                                <span>Menções e Respostas</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    Quando alguém @menciona você ou responde a um comentário seu.
                                                </span>
                                            </Label>
                                            <Switch id="email-mentions" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-tasks" className="flex flex-col space-y-1">
                                                <span>Tarefas e Prazos</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    Lembretes sobre prazos de tarefas e relatórios.
                                                </span>
                                            </Label>
                                            <Switch id="email-tasks" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-newsletter" className="flex flex-col space-y-1">
                                                <span>Newsletter Semanal</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    Resumo de atividades, novos cursos e eventos.
                                                </span>
                                            </Label>
                                            <Switch id="email-newsletter" />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-medium mb-4">Notificações Push (App)</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="push-all" className="flex flex-col space-y-1">
                                                <span>Todas as notificações</span>
                                                <span className="font-normal leading-snug text-muted-foreground">
                                                    Habilitar ou desabilitar todas as notificações push.
                                                </span>
                                            </Label>
                                            <Switch id="push-all" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Salvar Preferências</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="logs" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Logs de Atividade</CardTitle>
                                <CardDescription>
                                    Histórico de atividades recentes na sua conta.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ação</TableHead>
                                                <TableHead>Endereço IP</TableHead>
                                                <TableHead className="text-right">Data</TableHead>
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
                                <CardTitle>Exportar Todos os Registros</CardTitle>
                                <CardDescription>
                                    Faça o download de todos os dados da plataforma em um único arquivo para alimentar sistemas externos ou IAs.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Ao clicar no botão abaixo, um arquivo chamado <strong>registros.json</strong> será gerado e baixado. Este arquivo conterá todos os dados de usuários, diários, cursos, ideias, e outras informações da plataforma em formato JSON.
                                </p>
                                <Button onClick={handleExport}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Gerar e Baixar Arquivo de Log (.json)
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
