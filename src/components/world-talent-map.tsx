
"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Globe } from "lucide-react";

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

const WorldMap = () => (
  <Globe className="w-full h-full text-muted-foreground/20" strokeWidth={0.5} />
);

export function WorldTalentMap() {
  return (
    <div className="relative w-full h-[350px] bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <WorldMap />
      </div>

      {participants.map((participant, index) => {
        const userAvatar = PlaceHolderImages.find(
          (p) => p.id === participant.avatarId
        );
        return (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <motion.div
                className="absolute w-4 h-4"
                style={{
                  top: participant.position.top,
                  left: participant.position.left,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="absolute w-full h-full bg-primary rounded-full" />
                <motion.div
                  className="absolute w-full h-full bg-primary/50 rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="p-0 border-0 bg-transparent shadow-none">
              <Card className="w-64">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                  <Avatar>
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} />}
                    <AvatarFallback>
                      {participant.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{participant.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{participant.location}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold">Tempo na Unidade</p>
                    <p className="text-sm text-muted-foreground">{participant.timeAtUnit}</p>
                  </div>
                  <div>
                     <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-semibold">Progresso</p>
                        <p className="text-xs font-bold text-primary">{participant.progress}%</p>
                     </div>
                    <Progress value={participant.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TooltipContent>
          </Tooltip>
        );
      })}
       <p className="absolute bottom-4 text-xs text-muted-foreground">Passe o mouse sobre um ponto para ver os detalhes</p>
    </div>
  );
}
