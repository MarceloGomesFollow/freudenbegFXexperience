
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
import { useLanguage } from "@/contexts/LanguageContext";


function FreudyIaLink() {
    const { t } = useLanguage();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarMenuButton>
                    <FreudyIAIcon />
                    <span>{t('sidebar.freudyIA')}<span className="shimmer-text-blue-sidebar"></span></span>
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] p-0 flex flex-col glass-strong !rounded-2xl overflow-hidden">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-white">{t('sidebar.freudyIADialog_title')}</DialogTitle>
                </DialogHeader>
                <iframe
                    className="w-full h-full rounded-b-lg"
                    src="https://lab.anam.ai/frame/veWud_aUeTYXnNDZyWt54"
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
  const { t } = useLanguage();

  type NavIcon = React.ElementType;
  type NavSubLink = {
    href: string;
    label: string;
    roles?: string[];
    icon?: NavIcon;
  };
  type NavLink = {
    href?: string;
    label: string;
    icon: NavIcon;
    roles?: string[];
    subLinks?: NavSubLink[];
  };

  const links: NavLink[] = [
    {
      href: "/dashboard/home",
      label: t('sidebar.home'),
      icon: Home,
    },
    {
      href: "/dashboard/general-guide",
      label: t('sidebar.generalGuide'),
      icon: BookUser,
    },
    {
      href: "/dashboard/exchange-center",
      label: t('sidebar.exchangeCenter'),
      icon: Briefcase,
    },
    {
      href: "/dashboard",
      label: t('sidebar.dashboard'),
      icon: LayoutDashboard,
      roles: ['manager', 'admin']
    },
    {
      href: "/dashboard/admin",
      label: t('sidebar.adminDashboard'),
      icon: Shield,
      roles: ['admin']
    },
     {
      href: "/dashboard/approvals",
      label: t('sidebar.approvals'),
      icon: CheckSquare,
      roles: ['manager', 'admin']
    },
    {
      href: "/dashboard/diary",
      label: t('sidebar.diary'),
      icon: NotebookText,
    },
    {
      href: "/dashboard/calendar",
      label: t('sidebar.calendar'),
      icon: Calendar,
    },
      {
      href: "/dashboard/mentorship",
      label: t('sidebar.mentorship'),
      icon: Users,
    },
    {
      label: t('sidebar.learningHub'),
      icon: GraduationCap,
      subLinks: [
          {
              href: "/dashboard/learning",
              label: t('sidebar.learningHub_explore'),
          },
          {
              href: "/dashboard/content",
              label: t('sidebar.learningHub_create'),
          },
          {
              href: "/dashboard/learning/analytics",
              label: t('sidebar.learningHub_analytics'),
              roles: ['admin', 'manager']
          },
      ]
    },
    {
      label: t('sidebar.innovationLabs'),
      icon: Beaker,
      subLinks: [
          { href: "/dashboard/innovation-labs", label: t('sidebar.innovationLabs_challenges') },
          { href: "/dashboard/innovation-labs/submit-idea", label: t('sidebar.innovationLabs_submit') },
          { href: "/dashboard/innovation-labs/catalog", label: t('sidebar.innovationLabs_practices') },
          { href: "/dashboard/innovation-labs/analytics", label: t('sidebar.innovationLabs_dashboard'), roles: ['admin', 'manager'] },
      ]
    },
    {
      label: t('sidebar.specialResources'),
      icon: Sparkles,
       subLinks: [
          {
              href: "/dashboard/special-resources",
              label: t('sidebar.specialResources_overview'),
          },
          {
              href: "/dashboard/ai-mentor",
              label: t('sidebar.specialResources_freudy'),
              icon: Bot,
          },
          {
              href: "/dashboard/business-fit",
              label: t('sidebar.specialResources_businessFit'),
              icon: ShieldCheck,
          }
      ]
    },
    {
      href: "/dashboard/events",
      label: t('sidebar.events'),
      icon: Presentation,
    },
    {
      href: "/dashboard/alumni",
      label: t('sidebar.alumni'),
      icon: Contact,
    },
    {
      label: t('sidebar.reports'),
      icon: BarChart3,
      subLinks: [
          {
              href: "/dashboard/reports",
              label: t('sidebar.reports_overview'),
          },
          {
              href: "/dashboard/reports/a3",
              label: t('sidebar.reports_a3'),
          }
      ]
    },
    {
      href: "/dashboard/settings",
      label: t('sidebar.settings'),
      icon: Settings,
    },
  ];

  const isSubLinkActive = (subLinks: NavSubLink[] | undefined) => {
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
                    <SidebarMenuButton tooltip={link.label} className="w-full justify-between pr-3 group-data-[collapsible=icon]:pr-2">
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
        ) : link.href ? (
            <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                <Link href={link.href!}>
                <link.icon />
                <span>{link.label}</span>
                </Link>
            </SidebarMenuButton>
        ) : null;

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
