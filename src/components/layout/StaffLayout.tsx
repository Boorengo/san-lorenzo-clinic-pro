import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Syringe,
  Package,
  FileOutput,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Patients", path: "/dashboard/patients", icon: Users },
  { title: "Forms & Reports", path: "/dashboard/forms", icon: FileText },
  { title: "Immunization", path: "/dashboard/immunization", icon: Syringe },
  { title: "Inventory", path: "/dashboard/inventory", icon: Package },
  { title: "Documents", path: "/dashboard/documents", icon: FileOutput },
  { title: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function StaffLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(path);

  return (
    <div className="flex h-screen w-full bg-background overflow-hiddenrflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg healthcare-gradient">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-sm font-bold leading-tight text-sidebar-foreground">
              BHC San Lorenzo
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Ruiz 1 Health Center</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full healthcare-gradient flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">DR</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 ani overflow-y-automate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
