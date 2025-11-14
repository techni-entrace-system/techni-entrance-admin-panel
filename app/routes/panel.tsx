import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar";
import PanelSidebar from "~/components/sidebar";
import { useIsAdmin } from "~/api/admin";

export default function PanelLayout() {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin]);

  return (
    <SidebarProvider>
      <PanelSidebar />
      <main className="flex flex-col flex-1 items-center">
        <div className="flex flex-col container flex-1 h-0">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
// Panel layout is the default export and renders nested child routes via <Outlet />
