
"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

const resources = [
    {
        id: "ia-freudy",
        title: "IA Freudy",
        description: "Converse com uma IA especialista para obter insights, tirar dúvidas e acelerar seu desenvolvimento.",
        icon: <Bot className="h-8 w-8 text-primary" />,
        href: "/dashboard/ai-mentor"
    },
    {
        id: "business-fit",
        title: "Auxiliar de Aderência (IA Business Fit)",
        description: "Avalie o alinhamento estratégico de suas ideias e projetos com os objetivos da empresa usando IA.",
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        href: "/dashboard/business-fit"
    },
    {
        id: "collaborative-curation",
        title: "Curadoria Colaborativa",
        description: "Sistema de comentários inteligentes, permitindo que mentores e gestores avaliem experiências relatadas e adicionem sugestões em tempo real.",
        icon: <Users className="h-8 w-8 text-primary" />,
        href: "/dashboard/diary"
    }
];

export default function SpecialResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Recursos Especiais</h2>
        <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
          Ferramentas e plataformas para potencializar sua jornada de inovação.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
                <Link href={resource.href} key={resource.id}>
                    <Card className="hover:border-primary hover:shadow-lg transition-all h-full flex flex-col">
                        <CardHeader className="flex-grow">
                            <div className="flex items-center justify-between">
                                {resource.icon}
                                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="pt-4">{resource.title}</CardTitle>
                            <CardDescription>
                                {resource.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}
