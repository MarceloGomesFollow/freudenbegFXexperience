
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


const participants = [
  {
    name: "Ana Silva",
    location: "São Paulo, Brasil",
    unit: "Tecnologia",
    avatarId: "user-avatar-1",
    timeAtUnit: "3 semanas",
    progress: 75,
    position: { top: "65%", left: "35%" },
  },
  {
    name: "John Smith",
    location: "Chicago, EUA",
    unit: "Vendas",
    avatarId: "user-avatar-2",
    timeAtUnit: "2 semanas",
    progress: 50,
    position: { top: "35%", left: "20%" },
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, Índia",
    unit: "P&D",
    avatarId: "user-avatar-5",
    timeAtUnit: "1 semana",
    progress: 25,
    position: { top: "45%", left: "75%" },
  },
  {
    name: "Lukas Schmidt",
    location: "Berlim, Alemanha",
    unit: "Inovação",
    avatarId: "user-avatar-6",
    timeAtUnit: "4 semanas",
    progress: 90,
    position: { top: "30%", left: "55%" },
  },
];

const units = [
    { name: 'Freudenberg-NOK', location: 'Diadema – SP', position: { top: '68%', left: '35.5%' } },
    { name: 'Freudenberg Filtration Technologies Brasil', location: 'São José dos Campos – SP', position: { top: '66%', left: '36.5%' } },
    { name: 'Freudenberg Performance Materials Brasil', location: 'São José dos Campos – SP', position: { top: '67%', left: '37.5%' } },
    { name: 'EagleBurgmann Brasil', location: 'Campinas – SP', position: { top: '64%', left: '34.5%' } },
    { name: 'Trelleborg Vibracoustic Brasil', location: 'São Paulo (SP)', position: { top: '65.5%', left: '34%' } },
    { name: 'Chem-Trend Brasil', location: 'Valinhos – SP', position: { top: '63%', left: '35%' } },
    { name: 'SurTec Brasil', location: 'Valinhos – SP', position: { top: '62%', left: '36%' } },
    { name: 'Klüber Lubrication Brasil', location: 'São Paulo (SP)', position: { top: '64.5%', left: '36.5%' } },
    { name: 'FRCC SA (escritório regional Freudenberg)', location: 'Alphaville (Barueri) – SP', position: { top: '63.5%', left: '33.5%' } },
];

const MapContent = () => {
    const [zoom, setZoom] = React.useState(8);
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d120011.02636325997!2d-46.6333824!3d-23.5506509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sFreudenberg%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1689255012345&zoom=${zoom}`

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
                 <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.max(z - 1, 3))} className="bg-background/80">
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
             {participants.map((p, i) => (
                <TooltipProvider key={p.name}>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                        className="absolute z-10"
                        style={{ top: p.position.top, left: p.position.left }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 * i, type: "spring" }}
                        >
                        <Avatar className="h-8 w-8 border-2 border-primary ring-2 ring-primary/50 shadow-lg">
                            <AvatarImage
                            src={PlaceHolderImages.find(img => img.id === p.avatarId)?.imageUrl}
                            alt={p.name}
                            />
                            <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent asChild>
                        <Card className="w-64">
                        <CardHeader className="flex-row items-center gap-4 p-4">
                            <Avatar>
                            <AvatarImage
                                src={PlaceHolderImages.find(img => img.id === p.avatarId)?.imageUrl}
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
                                <strong>Local:</strong> {p.location}
                            </p>
                            <p>
                                <strong>Tempo:</strong> {p.timeAtUnit}
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
            ))}
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
