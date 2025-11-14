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
import { useNavigate } from "react-router";

export default function PanelSidebar() {
  const navigate = useNavigate();

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
      <SidebarHeader className="pb-0">
        <div className="text-lg font-bold p-3 text-center border rounded-md">Admin Panel</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/students">
                    <Users />
                    <span>Students</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/logs">
                    <ClipboardClock />
                    <span>Logs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/user-logs">
                    <KeyRound />
                    <span>Admin Logs</span>
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
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
