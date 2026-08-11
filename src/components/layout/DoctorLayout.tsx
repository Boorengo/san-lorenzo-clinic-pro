import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Stethoscope,
  ClipboardList,
  Users,
  FlaskConical,
  Pill,
  CalendarClock,
  ArrowUpRight,
  FileText,
  Syringe,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

const navGroups = [
  {
    label: "Point of Care",
    items: [
      { title: "Clinical Overview", path: "/doctor", icon: Stethoscope },
      { title: "Patient Queue", path: "/doctor/queue", icon: ClipboardList },
      { title: "Consultations", path: "/doctor/consultations", icon: FileText },
    ],
  },
  {
    label: "Patient Records",
    items: [
      { title: "Patient Charts", path: "/doctor/patients", icon: Users },
      { title: "Lab Results", path: "/doctor/lab-results", icon: FlaskConical },
      { title: "Immunization", path: "/doctor/immunization", icon: Syringe },
    ],
  },
  {
    label: "Orders & Continuity",
    items: [
      { title: "Prescriptions", path: "/doctor/prescriptions", icon: Pill },
      { title: "Follow-ups Due", path: "/doctor/follow-ups", icon: CalendarClock },
      { title: "Referrals", path: "/doctor/referrals", icon: ArrowUpRight },
    ],
  },
];

export default function DoctorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/doctor" ? location.pathname === "/doctor" : location.pathname.startsWith(path);

  return (
    <div className="flex h-dvh w-full bg-background overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <img src={logo} alt="BHC San Lorenzo Ruiz 1 Logo" className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0">
            <h1 className="font-display text-sm font-bold leading-tight text-sidebar-foreground">
              Clinician Workspace
            </h1>
            <p className="truncate text-xs text-sidebar-foreground/60">BHC San Lorenzo Ruiz 1</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="Doctor navigation">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
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
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-1 border-t border-sidebar-border p-3">
          <Link
            to="/doctor/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            Physician on duty
          </span>
          <div className="flex-1" />
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold leading-tight text-foreground">Dr. Marisol Aguinaldo</p>
            <p className="text-[10px] leading-tight text-muted-foreground">PRC 0123456 · General Medicine</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full healthcare-gradient">
            <span className="text-xs font-semibold text-primary-foreground">MA</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
