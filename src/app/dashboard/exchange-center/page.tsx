
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Briefcase, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { exchangeOpportunities } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ExchangeCenterPage() {
    return (
        <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        <span className="gold-text">Central</span>{" "}
                        <span className="text-foreground">de Intercâmbio</span>
                    </h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl">
                        Explore oportunidades em outras áreas e empresas para ampliar sua experiência.
                    </p>
                </div>
                <Button variant="gold" asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/exchange-center/apply">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Inscrição
                    </Link>
                </Button>
            </motion.div>

            <motion.div variants={item}>
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
                    <CardContent>
                        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" animate="show">
                            {exchangeOpportunities.map((opportunity) => (
                                <motion.div key={opportunity.id} variants={item}>
                                    <Card className="flex flex-col card-hover h-full">
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
                                                    <Badge key={skill} variant="glass">{skill}</Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="gold" className="w-full" asChild>
                                                <Link href={`/dashboard/exchange-center/apply?opportunity=${opportunity.id}`}>
                                                    Aplicar Agora <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
