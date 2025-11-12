import React from "react";
import { Link, Outlet } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { LogOut, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar";
import PanelSidebar from "~/components/sidebar";

export default function PanelLayout() {
  return (
    <SidebarProvider>
      <PanelSidebar />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
// Panel layout is the default export and renders nested child routes via <Outlet />
