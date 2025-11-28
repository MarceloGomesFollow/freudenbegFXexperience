
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function HyperXiapage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6"/> Demonstração da Plataforma</CardTitle>
                    <CardDescription>
                        Assista a uma rápida demonstração de como a DPX Digital pode revolucionar seus programas de desenvolvimento e veja o poder da IA em ação.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/Jl0c2A7cP4Q"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
