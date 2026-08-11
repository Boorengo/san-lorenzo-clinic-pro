import { Pill, Printer, PackageCheck, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";

const scripts = [
  {
    id: "RX-2026-0841",
    patient: "Danilo S. Ramos",
    date: "11 Ago 2026",
    items: ["Amlodipine 10mg — 1 tab OD × 30 days", "Losartan 50mg — 1 tab OD × 30 days"],
    stock: "available",
  },
  {
    id: "RX-2026-0840",
    patient: "Baby Liam T. Ocampo",
    date: "11 Ago 2026",
    items: ["Paracetamol 250mg/5mL — 5 mL q4h PRN fever", "ORS sachet — 1 sachet after each loose stool"],
    stock: "available",
  },
  {
    id: "RX-2026-0838",
    patient: "Mark Anthony D. Reyes",
    date: "10 Ago 2026",
    items: ["Fixed-dose combination (HRZE) — 4 tabs OD (DOTS-observed)"],
    stock: "low",
  },
  {
    id: "RX-2026-0835",
    patient: "Rosalinda M. Cruz",
    date: "09 Ago 2026",
    items: ["Ferrous sulfate + folic acid — 1 tab OD", "Calcium carbonate 500mg — 1 tab BID"],
    stock: "out",
  },
];

const stockBadge: Record<string, { label: string; className: string; icon: typeof PackageCheck }> = {
  available: { label: "May stock sa pharmacy", className: "bg-accent text-accent-foreground", icon: PackageCheck },
  low: { label: "Kulang ang stock", className: "bg-warning/15 text-warning-foreground", icon: PackageX },
  out: { label: "Ubos — bilhin sa labas", className: "bg-destructive/10 text-destructive", icon: PackageX },
};

export default function Prescriptions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Prescriptions</h1>
        <p className="text-sm text-muted-foreground">
          Mga reseta na inisyu ngayong linggo, naka-cross check sa pharmacy inventory ng health center.
        </p>
      </div>

      <ul className="grid gap-4 lg:grid-cols-2">
        {scripts.map((s) => {
          const badge = stockBadge[s.stock];
          return (
            <li key={s.id} className="rounded-xl border bg-card p-5 card-hover">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-bold text-card-foreground">{s.patient}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {s.id} · {s.date}
                  </p>
                </div>
                <span className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Pill className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <ul className="mt-4 space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="rounded-lg border bg-background px-3 py-2 text-xs text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${badge.className}`}>
                  <badge.icon className="h-3 w-3" aria-hidden="true" /> {badge.label}
                </span>
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                  <Printer className="h-3.5 w-3.5" /> Print
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
