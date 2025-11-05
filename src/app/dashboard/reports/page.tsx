import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Central de Relatórios</h2>
            <p className="text-muted-foreground">
                Acesse e gere relatórios sobre o progresso e os resultados do programa.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/dashboard/reports/a3">
                    <Card className="hover:border-primary hover:shadow-lg transition-all">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <FileText className="h-8 w-8 text-primary" />
                                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="pt-4">Gerador de Relatório A3</CardTitle>
                            <CardDescription>
                                Use a IA para gerar um rascunho do seu relatório A3 com base em suas atividades e feedbacks.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Card className="border-dashed">
                     <CardHeader className="text-center">
                        <CardTitle className="text-muted-foreground">Em Breve</CardTitle>
                        <CardDescription>
                            Novos relatórios e visualizações de dados.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
