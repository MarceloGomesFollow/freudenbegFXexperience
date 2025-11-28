
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  LayoutDashboard,
  NotebookText,
  BarChart3,
  Settings,
  GraduationCap,
  Beaker,
  Contact,
  Presentation,
  Sparkles,
  Bot,
  ShieldCheck,
  Calendar,
  Users,
  Briefcase,
  ChevronRight,
  Shield,
  BookUser,
  CheckSquare,
  LineChart,
  Lightbulb,
  FileText,
  Trophy,
  Youtube,
  ExternalLink,
  Home,
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
import { useRole } from "./role-switcher";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FreudyIAIcon } from "./freudy-ia-icon";


const links = [
  {
    href: "/dashboard/home",
    label: "Home",
    icon: Home,
  },
  {
    href: "/dashboard/general-guide",
    label: "Guia Geral",
    icon: BookUser,
  },
  {
    href: "/dashboard/exchange-center",
    label: "Central de Intercâmbio",
    icon: Briefcase,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ['manager', 'admin']
  },
  {
    href: "/dashboard/admin",
    label: "Admin Dashboard",
    icon: Shield,
    roles: ['admin']
  },
   {
    href: "/dashboard/approvals",
    label: "Aprovações",
    icon: CheckSquare,
    roles: ['manager', 'admin']
  },
  {
    href: "/dashboard/diary",
    label: "Diário 4.0",
    icon: NotebookText,
  },
  {
    href: "/dashboard/calendar",
    label: "Agenda",
    icon: Calendar,
  },
    {
    href: "/dashboard/mentorship",
    label: "Mentoria",
    icon: Users,
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
        },
        {
            href: "/dashboard/learning/analytics",
            label: "Analytics",
            roles: ['admin', 'manager']
        },
    ]
  },
  {
    label: "Innovation Labs",
    icon: Beaker,
    subLinks: [
        { href: "/dashboard/innovation-labs", label: "Desafios" },
        { href: "/dashboard/innovation-labs/submit-idea", label: "Submeter Ideia" },
        { href: "/dashboard/innovation-labs/catalog", label: "Boas Práticas" },
        { href: "/dashboard/innovation-labs/analytics", label: "Dashboard Labs", roles: ['admin', 'manager'] },
    ]
  },
  {
    label: "Recursos Especiais",
    icon: Sparkles,
     subLinks: [
        {
            href: "/dashboard/special-resources",
            label: "Visão Geral",
        },
        {
            href: "/dashboard/ai-mentor",
            label: "IA Freudy",
            icon: Bot,
        },
        {
            href: "/dashboard/business-fit",
            label: "IA Business Fit",
            icon: ShieldCheck,
        }
    ]
  },
  {
    href: "/dashboard/events",
    label: "Eventos",
    icon: Presentation,
  },
  {
    href: "/dashboard/alumni",
    label: "Rede Alumni",
    icon: Contact,
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

function FreudyIaLink() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarMenuButton>
                    <FreudyIAIcon />
                    <span>Freudy<span className="shimmer-text-blue-sidebar">IA</span></span>
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] p-0 border-0">
                <iframe
                    className="w-full h-full rounded-lg"
                    src="https://lab.anam.ai/frame/4lQeno3aYnB9HuXExy6jG"
                    title="Anam AI"
                    frameBorder="0"
                    allow="camera;microphone"
                    allowFullScreen
                ></iframe>
            </DialogContent>
        </Dialog>
    );
}

export function SidebarNav() {
  const pathname = usePathname();
  const { selectedRole } = useRole();

  const isSubLinkActive = (subLinks: any[] | undefined) => {
    return subLinks?.some(subLink => pathname.startsWith(subLink.href));
  }

  const userHasRole = (allowedRoles: string[] | undefined) => {
    if (!allowedRoles) return true; // if no roles are defined, show to all
    return allowedRoles.includes(selectedRole.id);
  }

  return (
    <SidebarMenu>
      {links.map((link) => {
        if (!userHasRole(link.roles)) return null;
        
        const menuItemContent = link.subLinks ? (
          <Collapsible key={link.label} className="w-full" defaultOpen={isSubLinkActive(link.subLinks)}>
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
                {link.subLinks.map((subLink) => {
                  if (!userHasRole(subLink.roles)) return null;
                  const SubLinkIcon = subLink.icon;
                  return (
                  <SidebarMenuSubItem key={subLink.href}>
                    <SidebarMenuSubButton asChild isActive={pathname === subLink.href}>
                        <Link href={subLink.href} className="flex items-center gap-2">
                          {SubLinkIcon && <SubLinkIcon />}
                          {subLink.label}
                        </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )})}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ) : (
            <SidebarMenuButton asChild isActive={pathname === link.href}>
                <Link href={link.href!}>
                <link.icon />
                <span>{link.label}</span>
                </Link>
            </SidebarMenuButton>
        );

        return (
            <SidebarMenuItem key={link.label}>
                {menuItemContent}
            </SidebarMenuItem>
        )
      })}
      <SidebarMenuItem>
        <FreudyIaLink />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
