
"use client";

import { Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Image from "next/image";

interface LogoContextType {
  logo: string | null;
  setLogo: (logo: string) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider = ({ children }: { children: ReactNode }) => {
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <LogoContext.Provider value={{ logo, setLogo }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};

export function Logo({ className }: { className?: string }) {
  const { logo } = useLogo();

  return (
    <div className={cn("flex items-center gap-2 font-bold text-xl tracking-tight", className)}>
      <span className="shimmer-text">FX-Experience</span>
    </div>
  );
}
