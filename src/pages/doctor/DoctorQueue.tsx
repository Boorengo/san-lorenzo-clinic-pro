import { useState } from "react";
import { Search, Stethoscope, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const patients = [
  { time: "08:20", name: "Rosalinda M. Cruz", age: 34, sex: "F", block: "Blk 7 Lot 12", reason: "Prenatal follow-up (28 wks)", vitals: "BP 140/90 · 62 kg", triage: "priority" },
  { time: "08:35", name: "Danilo S. Ramos", age: 61, sex: "M", block: "Blk 2 Lot 4", reason: "Hypertension maintenance", vitals: "BP 150/95 · 78 kg", triage: "routine" },
  { time: "08:50", name: "Baby Liam T. Ocampo", age: 1, sex: "M", block: "Blk 14 Lot 9", reason: "Fever, 2 days · dengue watch", vitals: "T 39.1°C · 9.4 kg", triage: "urgent" },
  { time: "09:10", name: "Corazon B. Villanueva", age: 72, sex: "F", block: "Blk 19 Lot 2", reason: "Senior citizen check-up", vitals: "BP 130/80 · 54 kg", triage: "priority" },
  { time: "09:25", name: "Mark Anthony D. Reyes", age: 27, sex: "M", block: "Blk 5 Lot 18", reason: "TB-DOTS month 3 review", vitals: "T 36.8°C · 58 kg", triage: "routine" },
  { time: "09:40", name: "Jessa Marie L. Bantay", age: 19, sex: "F", block: "Blk 11 Lot 7", reason: "Family planning counseling", vitals: "BP 110/70 · 49 kg", triage: "routine" },
];

const triageStyle: Record<string, string> = {
  urgent: "bg-destructive/10 text-destructive border-destructive/30",
  priority: "bg-warning/15 text-warning-foreground border-warning/40",
  routine: "bg-accent text-accent-foreground border-transparent",
};

const filters = ["Lahat", "Urgent", "Priority", "Routine"];

export default function DoctorQueue() {
  const [filter, setFilter] = useState("Lahat");
  const [query, setQuery] = useState("");

  const visible = patients.filter((p) => {
    const byFilter = filter === "Lahat" || p.triage === filter.toLowerCase();
    const byQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return byFilter && byQuery;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Patient Queue</h1>
        <p className="text-sm text-muted-foreground">
          Nakaayos ayon sa triage at oras ng pagdating. Tinatayang hintay: 25 minuto.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hanapin ang pangalan ng pasyente"
            aria-label="Search patient queue"
            className="h-10 pl-9"
          />
        </div>
        <div className="flex gap-1 rounded-lg border bg-muted/50 p-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <ul className="divide-y">
          {visible.map((p) => (
            <li key={p.name} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <span className="flex w-14 shrink-0 items-center gap-1 font-display text-xs font-bold text-muted-foreground">
                <Clock className="h-3 w-3" aria-hidden="true" /> {p.time}
              </span>
              <div className="min-w-48 flex-1">
                <p className="text-sm font-semibold text-card-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.age}y · {p.sex} · {p.block}
                </p>
              </div>
              <div className="min-w-40 flex-1">
                <p className="text-xs font-medium text-card-foreground">{p.reason}</p>
                <p className="text-xs text-muted-foreground">{p.vitals}</p>
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${triageStyle[p.triage]}`}>
                {p.triage}
              </span>
              <Button size="sm" className="h-9 gap-1.5 healthcare-gradient border-0 text-xs text-primary-foreground">
                <Stethoscope className="h-3.5 w-3.5" /> Simulan
              </Button>
            </li>
          ))}
          {visible.length === 0 && (
            <li className="px-5 py-10 text-center text-sm text-muted-foreground">Walang pasyenteng tumutugma.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
