import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Users, LogOut, KeyRound, ClipboardClock } from "lucide-react";
import { useLocation, useNavigate, useNavigation } from "react-router";

export default function PanelSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname.startsWith(href) ? "bg-secondary/70 hover:bg-secondary" : undefined;
  };

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="pb-2 flex-row px-4 pt-4 gap-3 items-center">
        <img src="/techni.svg" alt="Logo" className="h-9" />
        <div className="flex-1 font-bold flex flex-col">
          <div className="text-lg leading-tight">
            <span className="text-primary">Techni</span> Entrance
          </div>
          <div className="text-xs text-muted-foreground">Panel admin'a</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/students" className={isActive("/students")}>
                    <Users />
                    <span>Uczniowie</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/logs" className={isActive("/logs")}>
                    <ClipboardClock />
                    <span>Rejestr wyjść</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/user-logs" className={isActive("/user-logs")}>
                    <KeyRound />
                    <span>Logi administratora</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="destructive" size="sm" onClick={logout} className="w-full">
          <LogOut />
          <span>Wyloguj się</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
