import { ArrowUpRight, Plus, Search, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const referrals = [
  { id: "R-108", patient: "Jose Ramos", to: "Quezon City General Hospital", reason: "Uncontrolled diabetes", date: "2026-07-23", status: "Pending" },
  { id: "R-107", patient: "Elena Bautista", to: "Philippine Heart Center", reason: "Cardiology consult", date: "2026-07-21", status: "Accepted" },
  { id: "R-106", patient: "Miguel Torres", to: "East Ave Medical Center", reason: "Chest X-ray", date: "2026-07-19", status: "Completed" },
  { id: "R-105", patient: "Rosa Aquino", to: "Fabella Hospital", reason: "High-risk prenatal", date: "2026-07-18", status: "Completed" },
];

const badge = (s: string) =>
  s === "Pending" ? "bg-warning/10 text-warning" :
  s === "Accepted" ? "bg-info/10 text-info" :
  "bg-success/10 text-success";

export default function Referrals() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Referrals</h1>
          <p className="text-sm text-muted-foreground">Patient referrals to partner hospitals and specialists</p>
        </div>
        <Button className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
          <Plus className="h-4 w-4" /> New Referral
        </Button>
      </div>

      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search referrals..." className="pl-9" />
      </div>

      <div className="grid gap-3">
        {referrals.map((r) => (
          <div key={r.id} className="rounded-xl border bg-card p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Hospital className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm">{r.patient}</p>
                    <span className="text-[10px] font-mono text-muted-foreground">{r.id}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" /> {r.to}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{r.reason}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${badge(r.status)}`}>{r.status}</span>
                <p className="text-[10px] text-muted-foreground mt-1.5">{r.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
