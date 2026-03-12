
"use client";

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
  const logoSrc = logo ?? "https://images.unsplash.com/photo-1764354946985-631d48464ef3?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src={logoSrc}
        alt="FX-Experience Logo"
        width={140}
        height={32}
        className="object-contain"
        priority
      />
    </div>
  );
}
