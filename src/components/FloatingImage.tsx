"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "./ui/card";
import { GripVertical } from "lucide-react";

export function FloatingImage() {
  const imageUrl = "https://images.unsplash.com/photo-1764354946985-631d48464ef3?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-28 right-6 z-[101] cursor-grab active:cursor-grabbing"
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: [0, -10, 0],
        opacity: 1,
      }}
      transition={{
        opacity: { duration: 0.5 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <Card className="w-48 overflow-hidden rounded-xl border-border/20 bg-background/50 p-1 shadow-2xl backdrop-blur-lg">
        <div className="flex justify-center items-center p-1 text-muted-foreground">
          <GripVertical className="h-4 w-4" />
        </div>
        <div className="relative aspect-square w-full">
          <Image
            src={imageUrl}
            alt="Floating decorative image"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </Card>
    </motion.div>
  );
}
