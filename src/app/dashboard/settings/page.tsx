import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Página em Construção</CardTitle>
                    <CardDescription>
                        Esta seção está sendo desenvolvida e estará disponível em breve.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Aqui você poderá gerenciar seu perfil, notificações e outras preferências da plataforma.</p>
                </CardContent>
            </Card>
        </div>
    )
}
