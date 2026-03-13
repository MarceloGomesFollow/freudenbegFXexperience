
"use client";

import * as React from "react";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  
  const handleLanguageChange = (lang: string) => {
    if (lang !== language) {
        setLanguage(lang);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-8 sm:w-8 text-foreground/80 hover:bg-foreground/10 hover:text-foreground">
          <Globe className="h-5 w-5 sm:h-[1.2rem] sm:w-[1.2rem]" />
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
            <DropdownMenuRadioItem value="pt">
                Português
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en">
                English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="de">
                Deutsch
            </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
