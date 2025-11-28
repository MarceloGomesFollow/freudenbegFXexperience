
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FloatingImage() {
  const imageUrl = "https://images.unsplash.com/photo-1764354946985-631d48464ef3?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-28 right-6 z-[101] cursor-grab active:cursor-grabbing w-64 rounded-xl shadow-2xl overflow-hidden"
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
        <div className="relative aspect-[2/1] w-full">
          <Image
            src={imageUrl}
            alt="Floating decorative image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
        </div>
    </motion.div>
  );
}
