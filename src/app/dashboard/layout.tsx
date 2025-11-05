import type { Metadata } from "next";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export const metadata: Metadata = {
  title: 'Dashboard | DPX Digital',
  description: 'Plataforma de Experiência Profissional Digital',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar className="border-r">
                <SidebarHeader>
                    <Logo />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarNav />
                </SidebarContent>
                <SidebarFooter>
                    {/* Placeholder for footer content */}
                </SidebarFooter>
            </Sidebar>
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="md:hidden" />
                    </div>
                    <div className="flex items-center gap-4">
                        <LanguageToggle />
                        <ThemeToggle />
                        <UserNav />
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40">
                    {children}
                </main>
            </div>
        </div>
    </SidebarProvider>
  );
}
