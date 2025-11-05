"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MessageSquare, Search } from "lucide-react";
import Link from "next/link";

export default function AlumniPage() {
    const alumni = users.filter(user => user.status === 'Ativo');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Rede Alumni</h2>
                <p className="text-muted-foreground mt-2">
                    Conecte-se com ex-participantes, compartilhe experiências e continue aprendendo.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>Buscar Membros</CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar por nome ou unidade..." className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {alumni.map(user => {
                        const userAvatar = PlaceHolderImages.find(p => p.id === user.avatar);
                        return (
                            <Card key={user.email} className="flex flex-col text-center items-center p-6 hover:shadow-lg transition-shadow">
                                <Avatar className="h-20 w-20 mb-4">
                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} data-ai-hint="person portrait" />}
                                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.role} • {user.unit}</p>
                                <div className="mt-4">
                                    <Badge variant="secondary">Turma de 2023</Badge>
                                </div>
                                <Button className="mt-6 w-full" asChild>
                                    <Link href="#">
                                        <MessageSquare className="mr-2 h-4 w-4" /> Enviar Mensagem
                                    </Link>
                                </Button>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
