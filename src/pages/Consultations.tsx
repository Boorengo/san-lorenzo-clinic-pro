import { Stethoscope, Search, Plus, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const rows = [
  { id: "C-2401", patient: "Juana Dela Cruz", dx: "Acute URI", doctor: "Dr. Reyes", date: "2026-07-24", status: "Completed" },
  { id: "C-2400", patient: "Pedro Santos", dx: "Hypertension follow-up", doctor: "Dr. Reyes", date: "2026-07-24", status: "Completed" },
  { id: "C-2399", patient: "Maria Lopez", dx: "Prenatal (2nd tri)", doctor: "Nurse Santos", date: "2026-07-23", status: "Completed" },
  { id: "C-2398", patient: "Jose Ramos", dx: "Type 2 Diabetes", doctor: "Dr. Reyes", date: "2026-07-23", status: "Referred" },
  { id: "C-2397", patient: "Ana Villanueva", dx: "Skin allergy", doctor: "Dr. Cruz", date: "2026-07-22", status: "Completed" },
];

export default function Consultations() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Consultations</h1>
          <p className="text-sm text-muted-foreground">Visit records and doctor notes</p>
        </div>
        <Button className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
          <Plus className="h-4 w-4" /> New Consultation
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search patient, diagnosis, or ID..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-1.5">
          <Calendar className="h-4 w-4" /> Date range
        </Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium">ID</th>
                <th className="text-left px-4 py-2.5 font-medium">Patient</th>
                <th className="text-left px-4 py-2.5 font-medium">Diagnosis</th>
                <th className="text-left px-4 py-2.5 font-medium">Attending</th>
                <th className="text-left px-4 py-2.5 font-medium">Date</th>
                <th className="text-left px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {r.patient}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.dx}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.doctor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${
                      r.status === "Completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
