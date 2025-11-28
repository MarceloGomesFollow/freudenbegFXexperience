
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Briefcase, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { exchangeOpportunities } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ExchangeCenterPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Central de Intercâmbio</h2>
                    <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                        Explore oportunidades em outras áreas e empresas para ampliar sua experiência.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/exchange-center/apply">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Inscrição
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>Oportunidades Abertas</CardTitle>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar por área ou habilidade..." className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {exchangeOpportunities.map((opportunity) => (
                        <Card key={opportunity.id} className="flex flex-col hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle>{opportunity.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-4 pt-1">
                                            <span className="flex items-center gap-1.5 text-xs"><Building className="h-3 w-3" /> {opportunity.company}</span>
                                        </CardDescription>
                                         <CardDescription className="flex items-center gap-4">
                                            <span className="flex items-center gap-1.5 text-xs"><Briefcase className="h-3 w-3" /> {opportunity.department}</span>
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary">{opportunity.duration}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{opportunity.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.skills.map(skill => (
                                        <Badge key={skill} variant="outline">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={`/dashboard/exchange-center/apply?opportunity=${opportunity.id}`}>
                                        Aplicar Agora <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
