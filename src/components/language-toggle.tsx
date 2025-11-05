"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle() {
  const [language, setLanguage] = React.useState("pt");
  
  // In a real app, you would use a proper i18n library like next-intl
  // and manage the locale state globally.
  const handleLanguageChange = (lang: string) => {
    if (lang !== language) {
        setLanguage(lang);
        console.log(`Language changed to: ${lang}.`);
        // Here you would typically change the route or refresh the page with the new locale.
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
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
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
