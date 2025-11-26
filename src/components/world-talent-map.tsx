
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
import { Maximize, Building } from "lucide-react";


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
    { name: 'Freudenberg Filtration', location: 'São José dos Campos – SP', position: { top: '66%', left: '36.5%' } },
    { name: 'Freudenberg Performance Materials', location: 'São José dos Campos – SP', position: { top: '67%', left: '37.5%' } },
    { name: 'EagleBurgmann Brasil', location: 'Campinas – SP', position: { top: '64%', left: '34.5%' } },
    { name: 'Trelleborg Vibracoustic', location: 'São Paulo (SP)', position: { top: '65.5%', left: '34%' } },
    { name: 'Chem-Trend Brasil', location: 'Valinhos – SP', position: { top: '63%', left: '35%' } },
    { name: 'SurTec Brasil', location: 'Valinhos – SP', position: { top: '62%', left: '36%' } },
    { name: 'Klüber Lubrication', location: 'São Paulo (SP)', position: { top: '64.5%', left: '36.5%' } },
    { name: 'FRCC SA (Escritório Regional)', location: 'Alphaville (Barueri) – SP', position: { top: '63.5%', left: '33.5%' } },
];

const MapContent = () => (
    <div className="relative w-full h-full">
        <iframe
            className="w-full h-full border-0 rounded-lg"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d120011.02636325997!2d-46.6333824!3d-23.5506509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sFreudenberg%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1689255012345">
        </iframe>
    </div>
)


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
