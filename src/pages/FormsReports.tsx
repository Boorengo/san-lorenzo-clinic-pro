import { Link } from "react-router-dom";
import { FileText, ClipboardList, BarChart3 } from "lucide-react";

const templates = [
  {
    id: "family-health",
    title: "Family Health Profiling Form",
    description: "Household-level health data collection form",
    icon: ClipboardList,
    status: "Active",
  },
  {
    id: "fhsis-monthly",
    title: "FHSIS Monthly Report",
    description: "Field Health Service Information System monthly summary",
    icon: BarChart3,
    status: "Active",
  },
  {
    id: "target-list",
    title: "Target Client List",
    description: "DOH target client monitoring list",
    icon: FileText,
    status: "Active",
  },
  {
    id: "nutrition-report",
    title: "Nutrition Report",
    description: "Monthly nutrition status report",
    icon: FileText,
    status: "Draft",
  },
];

export default function FormsReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Forms & Reports</h1>
        <p className="text-sm text-muted-foreground">Select a template to fill or view reports</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <Link
            key={t.id}
            to={`/forms/${t.id}`}
            className="group rounded-xl border bg-card p-5 card-hover block"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-accent p-2.5 text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <t.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-semibold text-card-foreground">{t.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    t.status === "Active"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
