
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function HyperXiapage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6"/> HyperXIA - Experimentos</CardTitle>
                    <CardDescription>
                        Interaja com a IA generativa da plataforma neste ambiente de testes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border">
                        <iframe
                            className="w-full h-full"
                            src="https://lab.anam.ai/frame/4lQeno3aYnB9HuXExy6jG"
                            title="Anam AI"
                            frameBorder="0"
                            allow="camera;microphone"
                            allowFullScreen
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
