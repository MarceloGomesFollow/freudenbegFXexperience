
"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Maximize, Building, ZoomIn, ZoomOut } from "lucide-react";
import { users } from "@/lib/data";
import Image from "next/image";

const units = [
    { name: 'Freudenberg-NOK', location: 'Diadema – SP', position: { top: '70.2%', left: '45.1%' } },
    { name: 'Freudenberg Filtration Technologies Brasil', location: 'São José dos Campos – SP', position: { top: '69.5%', left: '45.4%' } },
    { name: 'Freudenberg Performance Materials Brasil', location: 'São José dos Campos – SP', position: { top: '69.6%', left: '45.5%' } },
    { name: 'EagleBurgmann Brasil', location: 'Campinas – SP', position: { top: '69.2%', left: '44.8%' } },
    { name: 'Trelleborg Vibracoustic Brasil', location: 'São Paulo (SP)', position: { top: '69.8%', left: '45.0%' } },
    { name: 'Chem-Trend Brasil', location: 'Valinhos – SP', position: { top: '69.3%', left: '44.9%' } },
    { name: 'SurTec Brasil', location: 'Valinhos – SP', position: { top: '69.4%', left: '45.0%' } },
    { name: 'Klüber Lubrication Brasil', location: 'Alphaville (Barueri) – SP', position: { top: '69.7%', left: '44.9%' } },
    { name: 'FRCC SA (escritório regional Freudenberg)', location: 'Alphaville (Barueri) – SP', position: { top: '69.9%', left: '45.0%' } },
];


const MapContent = ({ isFullScreen = false }: { isFullScreen?: boolean }) => {
    const [zoom, setZoom] = React.useState(isFullScreen ? 1.5 : 1);
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
             <motion.div
                className="absolute inset-0"
                animate={{ scale: zoom }}
                transition={{ duration: 0.5 }}
            >
                <Image
                    src="https://picsum.photos/seed/world-map-satellite/2000/1500"
                    alt="World Map"
                    fill
                    className="object-cover"
                    data-ai-hint="satellite world map"
                />
            </motion.div>
             <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
                <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.min(z + 0.5, 5))} className="bg-background/80">
                    <ZoomIn className="h-4 w-4" />
                </Button>
                 <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.max(z - 0.5, 1))} className="bg-background/80">
                    <ZoomOut className="h-4 w-4" />
                </Button>
            </div>
            <div className="absolute inset-0">
                 <motion.div
                    className="relative w-full h-full"
                    animate={{ scale: zoom }}
                    transition={{ duration: 0.5 }}
                >
                    {units.map((unit, i) => (
                        <TooltipProvider key={unit.name}>
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <motion.div
                                    className="absolute z-10"
                                    style={{ top: unit.position.top, left: unit.position.left }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 / zoom }}
                                    transition={{ delay: 0.1 * i, type: "spring" }}
                                >
                                    <div className="p-1.5 bg-primary/80 text-primary-foreground rounded-full shadow-lg">
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
                        const position = unitData ? unitData.position : { top: '50%', left: '50%'};
                        const offset = getSlightOffset(i);
                        
                        return (
                            <TooltipProvider key={p.email}>
                                <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        className="absolute z-20"
                                        style={{ 
                                            top: `calc(${position.top} + ${offset.y}%)`, 
                                            left: `calc(${position.left} + ${offset.x}%)` 
                                        }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 / zoom }}
                                        transition={{ delay: 0.2 * i, type: "spring" }}
                                    >
                                        <Avatar className="h-8 w-8 border-2 border-primary ring-2 ring-primary/50 shadow-lg">
                                            <AvatarImage
                                                src={PlaceHolderImages.find(img => img.id === p.avatar)?.imageUrl}
                                                alt={p.name}
                                            />
                                            <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <Card className="w-64 border-0 shadow-none">
                                        <CardHeader className="flex-row items-center gap-4 p-4">
                                            <Avatar>
                                                <AvatarImage src={PlaceHolderImages.find(img => img.id === p.avatar)?.imageUrl} alt={p.name} />
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
                </motion.div>
            </div>
        </div>
    )
}


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
                            Navegue pelo mapa para ver onde nossos participantes e unidades estão.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1">
                        <MapContent isFullScreen={true} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
