
"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Maximize, Building } from "lucide-react";
import { users } from "@/lib/data";

const units = [
    { name: 'Freudenberg-NOK', location: 'Diadema – SP', position: { y: 79.5, x: 35.3 } },
    { name: 'Freudenberg Filtration Technologies Brasil', location: 'São José dos Campos – SP', position: { y: 75.8, x: 42.6 } },
    { name: 'Freudenberg Performance Materials Brasil', location: 'São José dos Campos – SP', position: { y: 75.9, x: 42.7 } },
    { name: 'EagleBurgmann Brasil', location: 'Campinas – SP', position: { y: 74.4, x: 33.0 } },
    { name: 'Trelleborg Vibracoustic Brasil', location: 'São Paulo (SP)', position: { y: 78.2, x: 36.7 } },
    { name: 'Chem-Trend Brasil', location: 'Valinhos – SP', position: { y: 74.6, x: 33.1 } },
    { name: 'SurTec Brasil', location: 'Valinhos – SP', position: { y: 74.7, x: 33.2 } },
    { name: 'Klüber Lubrication Brasil', location: 'São Paulo (SP)', position: { y: 78.1, x: 36.8 } },
    { name: 'FRCC SA (escritório regional Freudenberg)', location: 'Alphaville (Barueri) – SP', position: { y: 78.0, x: 35.5 } },
];


const MapContent = ({ isFullScreen = false }: { isFullScreen?: boolean }) => {
    const activeParticipants = users.filter(u => u.status === 'Ativo');

    const getSlightOffset = (index: number) => {
        const angle = index * 137.5; 
        const radius = 0.5 + (index * 0.1); 
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-gray-800 rounded-lg">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d234200.3539824391!2d-46.85183864197992!3d-23.47952410292723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbr!4v1689264423838!5m2!1sen!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
            ></iframe>

            {units.map((unit, i) => (
                <TooltipProvider key={unit.name}>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            className="absolute z-10"
                            style={{ top: `${unit.position.y}%`, left: `${unit.position.x}%` }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * i, type: "spring" }}
                        >
                            <div className="p-1.5 bg-primary/80 text-primary-foreground rounded-full shadow-lg backdrop-blur-sm">
                                <Building className="h-4 w-4" />
                            </div>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-semibold">{unit.name}</p>
                        <p className="text-sm text-muted-foreground">{unit.location}</p>
                    </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}

            {activeParticipants.map((p, i) => {
                const unitData = units.find(u => u.name === p.unit);
                if (!unitData) return null;

                const position = unitData.position;
                const offset = getSlightOffset(i);
                const userAvatar = PlaceHolderImages.find(img => img.id === p.avatar);
                
                return (
                    <TooltipProvider key={p.email}>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <motion.div
                                className="absolute z-20"
                                style={{ 
                                    top: `calc(${position.y}% + ${offset.y}px)`, 
                                    left: `calc(${position.x}% + ${offset.x}px)` 
                                }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 * i, type: "spring" }}
                            >
                                <Avatar className="h-8 w-8 border-2 border-primary ring-2 ring-primary/50 shadow-lg">
                                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={p.name} />}
                                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <Card className="w-64 border-0 shadow-none">
                                <CardHeader className="flex-row items-center gap-4 p-4">
                                    <Avatar>
                                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={p.name} />}
                                        <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base">{p.name}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="text-sm space-y-2">
                                        <p><strong>Unidade:</strong> {p.unit}</p>
                                        <p><strong>Cargo:</strong> {p.role}</p>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Progresso</span>
                                                <span>{p.progress}%</span>
                                            </div>
                                            <Progress value={p.progress} className="h-2" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
        </div>
    );
};

export function WorldTalentMap() {
    return (
        <div className="relative w-full aspect-video">
            <MapContent />
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/50 hover:bg-background/80">
                        <Maximize className="h-4 w-4"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-0">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle>Mapa Global de Talentos</DialogTitle>
                        <DialogDescription>
                            Navegue pelo mapa para ver onde nossos participantes e unidades estão. Use os controles do mapa para zoom e navegação.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 p-2">
                        <MapContent isFullScreen={true} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
