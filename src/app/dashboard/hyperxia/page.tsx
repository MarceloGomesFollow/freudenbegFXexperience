
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function HyperXiapage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6"/> HyperXIA - Experimentos</CardTitle>
                    <CardDescription>
                        Esta seção foi movida para um acesso mais rápido. Clique no ícone da{' '}
                        <Link href="#" className="text-primary underline">FreudyIA na barra lateral</Link> 
                        {' '}para interagir com a IA.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">O player foi movido para a barra lateral.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
