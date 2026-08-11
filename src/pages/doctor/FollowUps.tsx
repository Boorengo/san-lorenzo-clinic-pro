import { CalendarClock, PhoneCall, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const followUps = [
  { name: "Rosalinda M. Cruz", block: "Blk 7 Lot 12", program: "Prenatal", due: "12 Ago 2026", status: "due", note: "4th prenatal visit · repeat BP check" },
  { name: "Mark Anthony D. Reyes", block: "Blk 5 Lot 18", program: "TB-DOTS", due: "09 Ago 2026", status: "overdue", note: "2 missed doses · needs treatment partner visit" },
  { name: "Corazon B. Villanueva", block: "Blk 19 Lot 2", program: "NCD", due: "15 Ago 2026", status: "upcoming", note: "Maintenance refill + FBS" },
  { name: "Baby Liam T. Ocampo", block: "Blk 14 Lot 9", program: "Under-5", due: "13 Ago 2026", status: "due", note: "Fever recheck · CBC repeat" },
  { name: "Elena P. Marquez", block: "Blk 3 Lot 22", program: "Postpartum", due: "05 Ago 2026", status: "overdue", note: "Walang record ng postpartum visit" },
];

const statusStyle: Record<string, string> = {
  overdue: "bg-destructive/10 text-destructive border-destructive/30",
  due: "bg-warning/15 text-warning-foreground border-warning/40",
  upcoming: "bg-accent text-accent-foreground border-transparent",
};

export default function FollowUps() {
  const counts = {
    overdue: followUps.filter((f) => f.status === "overdue").length,
    due: followUps.filter((f) => f.status === "due").length,
    upcoming: followUps.filter((f) => f.status === "upcoming").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Follow-ups Due</h1>
        <p className="text-sm text-muted-foreground">
          Continuity of care tracker — ipapasa sa BHW ng bawat block ang mga hindi nakabalik na pasyente.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Lumipas na (overdue)", value: counts.overdue, tone: "text-destructive" },
          { label: "Ngayong linggo", value: counts.due, tone: "text-warning-foreground" },
          { label: "Paparating", value: counts.upcoming, tone: "text-primary" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border bg-card p-5">
            <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
            <p className={`mt-1.5 font-display text-2xl font-bold ${c.tone}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <ul className="overflow-hidden rounded-xl border bg-card divide-y">
        {followUps.map((f) => (
          <li key={f.name} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <CalendarClock className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-48 flex-1">
              <p className="text-sm font-semibold text-card-foreground">{f.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" aria-hidden="true" /> {f.block} · {f.program}
              </p>
            </div>
            <p className="min-w-40 flex-1 text-xs text-muted-foreground">{f.note}</p>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Takdang petsa</p>
              <p className="text-xs font-semibold text-card-foreground">{f.due}</p>
            </div>
            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusStyle[f.status]}`}>
              {f.status}
            </span>
            <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
              <PhoneCall className="h-3.5 w-3.5" /> Ipaalam sa BHW
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
