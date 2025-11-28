
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function HyperXiapage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6"/> Experimente o HyperXIA</CardTitle>
                    <CardDescription>
                        Interaja diretamente com o HyperXIA, nossa IA generativa, para explorar suas capacidades e obter insights em tempo real. Use a janela abaixo para fazer perguntas, testar cenários e ver o poder da IA em ação.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border">
                        <iframe
                            className="w-full h-full"
                            src="https://lab.anam.ai/frame/4lQeno3aYnB9HuXExy6jG"
                            title="HyperXIA Player"
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
