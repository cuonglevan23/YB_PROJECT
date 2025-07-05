import { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import SupportSystem from "../components/container/SupportSystemContainer";
import { SidebarProvider } from "../contexts/SidebarContext";
import { useRoleBasedLayout } from "../hooks";

const LayoutContent = memo(function LayoutContent() {
  const location = useLocation();
  const { showSidebar } = useRoleBasedLayout();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar - Always show when showSidebar is true, but width changes based on collapsed state */}
      {showSidebar && <Sidebar />}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-auto" key={location.pathname}>
          <Outlet />
        </main>
      </div>

      {/* Support System */}
      <SupportSystem position="bottom-right" />
    </div>
  );
});

const Layout = memo(function Layout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
});

export default Layout;
