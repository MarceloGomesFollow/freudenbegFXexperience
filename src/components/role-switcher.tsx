
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

type Role = {
    id: string;
    name: string;
    icon: React.ElementType;
};

const roles: Role[] = [
    { id: 'mentee', name: 'Usuário Mentorado', icon: User },
    { id: 'manager', name: 'Gestor', icon: Users },
    { id: 'mentor', name: 'Mentor', icon: Shield },
    { id: 'admin', name: 'Administrador', icon: Crown },
];

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
    const [selectedRole, setSelectedRole] = React.useState(roles[0]);
    
    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function RoleSwitcher() {
  const { selectedRole, setSelectedRole } = useRole();
  const { toast } = useToast();

  const handleRoleChange = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role && role.id !== selectedRole.id) {
        setSelectedRole(role);
        toast({
            title: `Visão alterada para: ${role.name}`,
            description: "A interface agora reflete a visão deste perfil.",
        })
    }
  };

  const SelectedIcon = selectedRole.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
            <div className="flex items-center gap-2">
                <SelectedIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{selectedRole.name}</span>
            </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
          <span className="sr-only">Trocar de visão</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>
            Simular Visão Como
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
