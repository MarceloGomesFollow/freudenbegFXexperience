
import type { Metadata } from "next";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { RoleProvider, RoleSwitcher } from "@/components/role-switcher";
import { Chatbot } from "@/components/chatbot";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LifeBuoy, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { users } from "@/lib/data";

export const metadata: Metadata = {
  title: 'Dashboard | DPX Digital',
  description: 'Plataforma de Experiência Profissional Digital',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const rhAdmin = users.find(u => u.role === 'RH');
    const rhAdminAvatar = PlaceHolderImages.find(p => p.id === rhAdmin?.avatar);

  return (
    <RoleProvider>
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
                          <RoleSwitcher />
                      </div>
                      <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    Apoio RH
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Contato de Suporte RH</DialogTitle>
                                    <DialogDescription>
                                        Precisa de ajuda ou tem alguma dúvida sobre o programa? Entre em contato com o administrador.
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
                                            <p className="text-sm text-muted-foreground">Admin do Programa</p>
                                            <div className="flex items-center pt-2">
                                                <Mail className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                <a href={`mailto:${rhAdmin.email}`} className="text-xs text-muted-foreground hover:underline">
                                                    {rhAdmin.email}
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                    )}
                                </div>
                                <div className="pt-4">
                                    <Button className="w-full" disabled>
                                        <Mail className="mr-2 h-4 w-4" /> Enviar Mensagem (em breve)
                                    </Button>
                                </div>
                            </DialogContent>
                          </Dialog>
                          <LanguageToggle />
                          <ThemeToggle />
                          <UserNav />
                      </div>
                  </header>
                  <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40">
                      {children}
                  </main>
                  <Chatbot />
              </div>
          </div>
      </SidebarProvider>
    </RoleProvider>
  );
}
