
"use client";

import dynamic from "next/dynamic";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { RoleProvider, RoleSwitcher } from "@/components/role-switcher";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LifeBuoy, Mail, Phone, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DateTime } from "@/components/date-time";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Chatbot = dynamic(
  () => import("@/components/chatbot").then((mod) => mod.Chatbot),
  { ssr: false }
);

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { t } = useLanguage();
    const rhAdmin = {
      name: "Gabriela Ramos",
      email: "gabriela.ramos@example.com",
      avatar: "user-avatar-7",
    };
    const rhAdminAvatar = PlaceHolderImages.find(p => p.id === rhAdmin.avatar);

  return (
    <RoleProvider>
      <SidebarProvider className="w-full">
          <div className="flex min-h-dvh w-full min-w-0 bg-background">
              <Sidebar className="border-r">
                  <SidebarHeader>
                      <Logo />
                  </SidebarHeader>
                  <SidebarContent className="relative z-10">
                      <SidebarNav />
                  </SidebarContent>
                  <SidebarFooter className="relative z-10">
                  </SidebarFooter>
              </Sidebar>
              <div className="flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-auto">
                  <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-muted/30 px-4 backdrop-blur-lg sm:px-6 border-muted/20">
                      <div className="flex items-center gap-4">
                          <SidebarTrigger />
                          <div className="hidden sm:block">
                            <RoleSwitcher />
                          </div>
                      </div>
                      <div className="flex items-center gap-2">
                          <DateTime />
                          <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="hidden sm:inline-flex text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white">
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    {t('rhSupport.button')}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{t('rhSupport.title')}</DialogTitle>
                                    <DialogDescription>
                                        {t('rhSupport.description')}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center space-x-4 pt-4">
                                    {rhAdmin && (
                                    <>
                                        <Avatar className="h-16 w-16">
                                            {rhAdminAvatar && <AvatarImage src={rhAdminAvatar.imageUrl} alt={rhAdmin.name} />}
                                            <AvatarFallback>{rhAdmin.name.slice(0,2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <h4 className="text-lg font-semibold">{rhAdmin.name}</h4>
                                            <p className="text-sm text-muted-foreground">{t('rhSupport.admin_role')}</p>
                                            <div className="flex items-center pt-2">
                                                <Mail className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                <a href={`mailto:${rhAdmin.email}`} className="text-xs text-muted-foreground hover:underline">
                                                    {rhAdmin.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center pt-1">
                                                <Phone className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                <a href="tel:+5511999998888" className="text-xs text-muted-foreground hover-underline">
                                                    +55 (11) 99999-8888
                                                </a>
                                            </div>
                                             <div className="flex items-center pt-1">
                                                <MessageSquare className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                <a href="#" className="text-xs text-muted-foreground hover:underline">
                                                    {t('rhSupport.whatsapp')}
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                    )}
                                </div>
                                <div className="pt-4">
                                    <Button className="w-full" disabled>
                                        <Mail className="mr-2 h-4 w-4" /> {t('rhSupport.sendMessage')}
                                    </Button>
                                </div>
                            </DialogContent>
                          </Dialog>
                          <div className="hidden sm:flex items-center gap-1">
                            <span className="text-sm font-medium text-white/80">{t('language')}:</span>
                            <LanguageToggle />
                          </div>
                          <ThemeToggle />
                          <UserNav />
                      </div>
                  </header>
                  <main className={cn("flex-1 min-w-0 p-4 sm:p-6 lg:p-8 bg-muted/40 dashboard-bg")}>
                      {children}
                  </main>
                  <Chatbot />
              </div>
          </div>
      </SidebarProvider>
    </RoleProvider>
  );
}
