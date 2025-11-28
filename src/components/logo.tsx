
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
    <div className={cn("flex items-center gap-2", className)}>
      {logo ? (
        <Image src={logo} alt="Custom Logo" width={32} height={32} className="h-7 w-7 object-contain" />
      ) : null}
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-none">FX Experience</span>
        <span className="text-lg leading-none">
            <span className="font-bold">Follow<span className="shimmer-text-blue">Labs</span></span>
        </span>
      </div>
    </div>
  );
}
