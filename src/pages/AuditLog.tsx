import { Shield, LogIn, FileEdit, Trash2, UserPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  { icon: LogIn, actor: "Dr. Reyes", action: "signed in", target: "Staff Dashboard", time: "2 min ago", type: "auth" },
  { icon: FileEdit, actor: "Nurse Santos", action: "updated consultation", target: "C-2399 (Maria Lopez)", time: "18 min ago", type: "edit" },
  { icon: UserPlus, actor: "Admin Garcia", action: "created user", target: "Nurse Robles", time: "1 hour ago", type: "create" },
  { icon: Trash2, actor: "Dr. Reyes", action: "deleted record", target: "Duplicate patient entry #P-1042", time: "3 hours ago", type: "delete" },
  { icon: FileEdit, actor: "Nurse Santos", action: "edited inventory", target: "Amoxicillin 500mg (+50)", time: "5 hours ago", type: "edit" },
  { icon: LogIn, actor: "Dr. Cruz", action: "signed in", target: "Staff Dashboard", time: "Yesterday, 4:12 PM", type: "auth" },
  { icon: Shield, actor: "System", action: "2FA enabled", target: "Admin Garcia", time: "Yesterday, 9:02 AM", type: "auth" },
];

const bg = (t: string) =>
  t === "auth" ? "bg-info/10 text-info" :
  t === "edit" ? "bg-warning/10 text-warning" :
  t === "create" ? "bg-success/10 text-success" :
  "bg-destructive/10 text-destructive";

export default function AuditLog() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Audit Log</h1>
          <p className="text-sm text-muted-foreground">Track every action across the system</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-4 w-4" /> Export logs
        </Button>
      </div>

      <div className="rounded-xl border bg-card divide-y">
        {events.map((e, i) => (
          <div key={i} className="flex items-center gap-3 p-4 hover:bg-muted/20">
            <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${bg(e.type)}`}>
              <e.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{e.actor}</span>{" "}
                <span className="text-muted-foreground">{e.action}</span>{" "}
                <span className="font-medium">{e.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
