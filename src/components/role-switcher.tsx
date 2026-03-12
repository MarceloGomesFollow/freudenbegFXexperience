
"use client";

import * as React from "react";
import { Users, User, Shield, Crown, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

type Role = {
    id: string;
    name: string;
    icon: React.ElementType;
};

type RoleContextType = {
    selectedRole: Role;
    setSelectedRole: React.Dispatch<React.SetStateAction<Role>>;
};

const RoleContext = React.createContext<RoleContextType | undefined>(undefined);

export function useRole() {
    const context = React.useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const { t } = useLanguage();

    const roles: Role[] = [
        { id: 'mentee', name: t('sidebar.role_mentee'), icon: User },
        { id: 'manager', name: t('sidebar.role_manager'), icon: Users },
        { id: 'mentor', name: t('sidebar.role_mentor'), icon: Shield },
        { id: 'admin', name: t('sidebar.role_admin'), icon: Crown },
    ];
    
    const [selectedRole, setSelectedRole] = React.useState(roles[0]);

    // Update role names when language changes
    React.useEffect(() => {
        const updatedRoles: Role[] = [
            { id: 'mentee', name: t('sidebar.role_mentee'), icon: User },
            { id: 'manager', name: t('sidebar.role_manager'), icon: Users },
            { id: 'mentor', name: t('sidebar.role_mentor'), icon: Shield },
            { id: 'admin', name: t('sidebar.role_admin'), icon: Crown },
        ];
        setSelectedRole(prevRole => updatedRoles.find(r => r.id === prevRole.id) || updatedRoles[0]);
    }, [t]);
    
    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function RoleSwitcher() {
  const { selectedRole, setSelectedRole } = useRole();
  const { toast } = useToast();
  const { t } = useLanguage();

  const roles: Role[] = [
    { id: 'mentee', name: t('sidebar.role_mentee'), icon: User },
    { id: 'manager', name: t('sidebar.role_manager'), icon: Users },
    { id: 'mentor', name: t('sidebar.role_mentor'), icon: Shield },
    { id: 'admin', name: t('sidebar.role_admin'), icon: Crown },
];

  const handleRoleChange = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role && role.id !== selectedRole.id) {
        setSelectedRole(role);
        toast({
            title: t('sidebar.role_changed_title').replace('{roleName}', role.name),
            description: t('sidebar.role_changed_description'),
        })
    }
  };

  const SelectedIcon = selectedRole.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-48 justify-between text-foreground border-foreground/20 bg-foreground/5 hover:bg-foreground/10 hover:text-foreground">
            <div className="flex items-center gap-2">
                <SelectedIcon className="h-4 w-4 text-foreground/80" />
                <span className="font-medium">{selectedRole.name}</span>
            </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
          <span className="sr-only">Trocar de visão</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>
            {t('sidebar.role_switcher_label')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map(role => {
            const Icon = role.icon;
            return (
                <DropdownMenuItem key={role.id} onSelect={() => handleRoleChange(role.id)}>
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{role.name}</span>
                </DropdownMenuItem>
            )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
