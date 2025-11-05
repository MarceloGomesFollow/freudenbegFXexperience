"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  NotebookText,
  BarChart3,
  Settings,
  BookText,
  GraduationCap,
  Beaker,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/diary",
    label: "Diário 4.0",
    icon: NotebookText,
  },
  {
    label: "Learning Hub",
    icon: GraduationCap,
    subLinks: [
        {
            href: "/dashboard/learning",
            label: "Explorar",
        },
        {
            href: "/dashboard/content",
            label: "Criar Conteúdo",
        }
    ]
  },
  {
    href: "/dashboard/innovation-labs",
    label: "Innovation Labs",
    icon: Beaker,
  },
  {
    label: "Relatórios",
    icon: BarChart3,
    subLinks: [
        {
            href: "/dashboard/reports",
            label: "Visão Geral",
        },
        {
            href: "/dashboard/reports/a3",
            label: "Gerador A3",
        }
    ]
  },
  {
    href: "/dashboard/settings",
    label: "Configurações",
    icon: Settings,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) =>
        link.subLinks ? (
          <Collapsible key={link.label} className="w-full" defaultOpen={pathname.includes('/dashboard/learning') || pathname.includes('/dashboard/content') || pathname.includes('/dashboard/reports')}>
            <CollapsibleTrigger asChild>
                <div className="group/menu-item relative">
                    <SidebarMenuButton className="w-full justify-between pr-3 group-data-[collapsible=icon]:pr-2">
                        <div className="flex items-center gap-2">
                            <link.icon />
                            <span>{link.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {link.subLinks.map((subLink) => (
                  <SidebarMenuSubItem key={subLink.href}>
                    <SidebarMenuSubButton asChild isActive={pathname === subLink.href}>
                        <Link href={subLink.href}>{subLink.label}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild isActive={pathname.startsWith(link.href!)}>
                <Link href={link.href!}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      )}
    </SidebarMenu>
  );
}
