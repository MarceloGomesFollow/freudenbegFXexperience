
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

const units = [
    { name: 'Freudenberg-NOK', location: 'Diadema – SP', position: { top: '70.8%', left: '35.4%' }, userUnitIdentifier: 'Diadema' },
    { name: 'Freudenberg Filtration Technologies Brasil', location: 'São José dos Campos – SP', position: { top: '69.1%', left: '36.8%' }, userUnitIdentifier: 'Filtration' },
    { name: 'Freudenberg Performance Materials Brasil', location: 'São José dos Campos – SP', position: { top: '69.4%', left: '37.1%' }, userUnitIdentifier: 'Performance' },
    { name: 'EagleBurgmann Brasil', location: 'Campinas – SP', position: { top: '68.8%', left: '34.5%' }, userUnitIdentifier: 'EagleBurgmann' },
    { name: 'Trelleborg Vibracoustic Brasil', location: 'São Paulo (SP)', position: { top: '70.1%', left: '35.1%' }, userUnitIdentifier: 'Trelleborg' },
    { name: 'Chem-Trend Brasil', location: 'Valinhos – SP', position: { top: '69.1%', left: '34.8%' }, userUnitIdentifier: 'Chem-Trend' },
    { name: 'SurTec Brasil', location: 'Valinhos – SP', position: { top: '69.4%', left: '35.1%' }, userUnitIdentifier: 'SurTec' },
    { name: 'Klüber Lubrication Brasil', location: 'Alphaville (Barueri) – SP', position: { top: '70.2%', left: '34.8%' }, userUnitIdentifier: 'Klüber' },
    { name: 'FRCC SA (escritório regional Freudenberg)', location: 'Alphaville (Barueri) – SP', position: { top: '70.5%', left: '34.5%' }, userUnitIdentifier: 'FRCC' },
    { name: 'Tecnologia (Empresa A)', location: 'São Paulo', position: { top: '70.1%', left: '35.1%' }, userUnitIdentifier: 'Tecnologia (Empresa A)' },
    { name: 'Marketing (Empresa A)', location: 'São Paulo', position: { top: '70.4%', left: '35.4%' }, userUnitIdentifier: 'Marketing (Empresa A)' },
    { name: 'RH (Empresa A)', location: 'São Paulo', position: { top: '70.7%', left: '35.1%' }, userUnitIdentifier: 'RH (Empresa A)' },
    { name: 'Vendas (Empresa B)', location: 'Campinas', position: { top: '68.8%', left: '34.5%' }, userUnitIdentifier: 'Vendas (Empresa B)' },
    { name: 'Tecnologia (Empresa B)', location: 'São José dos Campos', position: { top: '69.1%', left: '36.8%' }, userUnitIdentifier: 'Tecnologia (Empresa B)' },
    { name: 'Compras (Empresa B)', location: 'Diadema', position: { top: '70.8%', left: '35.4%' }, userUnitIdentifier: 'Compras (Empresa B)' },
];


const MapContent = () => {
    const [zoom, setZoom] = React.useState(1);
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d130571168.6015098!2d-52.93489825!3d2.1123498499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1721759438061!5m2!1spt-BR!2sbr&maptype=satellite&zoom=${zoom}`

    const activeParticipants = users.filter(u => u.status === 'Ativo');

    // Add a slight random offset to avoid exact overlaps
    const getSlightOffset = (index: number) => {
        const angle = index * 137.5; // Golden angle for distribution
        const radius = 0.5 + (index * 0.1); // Increase radius for each user
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    };

    return (
        <div className="relative w-full h-full">
            <iframe
                key={zoom} // Re-render iframe when zoom changes
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
                allowFullScreen
                src={mapUrl}>
            </iframe>
             <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.min(z + 1, 18))} className="bg-background/80">
                    <ZoomIn className="h-4 w-4" />
                </Button>
                 <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.max(z - 1, 1))} className="bg-background/80">
                    <ZoomOut className="h-4 w-4" />
                </Button>
            </div>
            {units.map((unit, i) => (
                <TooltipProvider key={unit.name}>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            className="absolute z-10"
                            style={{ top: unit.position.top, left: unit.position.left }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
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
                const unitData = units.find(u => u.userUnitIdentifier === p.unit);
                const position = unitData ? unitData.position : { top: '50%', left: '50%'}; // Default position if not found
                const offset = getSlightOffset(i);
                
                return (
                    <TooltipProvider key={p.email}>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <motion.div
                            className="absolute z-10"
                            style={{ 
                                top: `calc(${position.top} + ${offset.y}%)`, 
                                left: `calc(${position.left} + ${offset.x}%)` 
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
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
                                    <AvatarImage
                                        src={PlaceHolderImages.find(img => img.id === p.avatar)?.imageUrl}
                                        alt={p.name}
                                    />
                                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                    <CardTitle className="text-base">{p.name}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="text-sm space-y-2">
                                    <p>
                                        <strong>Unidade:</strong> {p.unit}
                                    </p>
                                    <p>
                                        <strong>Cargo:</strong> {p.role}
                                    </p>
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
                <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-6">
                    <DialogHeader>
                        <DialogTitle>Mapa Global de Talentos</DialogTitle>
                        <DialogDescription>
                            Navegue pelo mapa para ver onde nossos participantes e unidades estão.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 -m-6 mt-2">
                        <MapContent />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
