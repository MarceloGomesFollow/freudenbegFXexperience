
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Bell, FileText, Lock, User as UserIcon } from "lucide-react";

const activityLogs = [
    { id: 1, action: "Login na plataforma", ip: "189.12.34.56", date: "25/07/2024 10:30" },
    { id: 2, action: "Criou entrada no Diário 4.0", ip: "189.12.34.56", date: "25/07/2024 09:15" },
    { id: 3, action: "Submeteu ideia 'Plataforma Gamificada'", ip: "201.55.67.89", date: "24/07/2024 16:45" },
    { id: 4, action: "Alterou a senha", ip: "201.55.67.89", date: "24/07/2024 11:20" },
    { id: 5, action: "Concluiu o curso 'Design Thinking'", ip: "201.55.67.89", date: "23/07/2024 18:00" },
]

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
            
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile"><UserIcon className="mr-2 h-4 w-4"/>Perfil</TabsTrigger>
                    <TabsTrigger value="security"><Lock className="mr-2 h-4 w-4"/>Segurança</TabsTrigger>
                    <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4"/>Notificações</TabsTrigger>
                    <TabsTrigger value="logs"><Activity className="mr-2 h-4 w-4"/>Logs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-6">
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

                <TabsContent value="security" className="mt-6">
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

                <TabsContent value="notifications" className="mt-6">
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

                 <TabsContent value="logs" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Logs de Atividade</CardTitle>
                            <CardDescription>
                                Histórico de atividades recentes na sua conta.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
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
                                            <TableCell className="text-right">{log.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
