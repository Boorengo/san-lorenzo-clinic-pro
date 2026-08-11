import { Link } from "react-router-dom";
import {
  ClipboardList,
  AlertTriangle,
  CalendarClock,
  FlaskConical,
  ArrowRight,
  Activity,
  Baby,
  Pill,
} from "lucide-react";

const queue = [
  { time: "08:20", name: "Rosalinda M. Cruz", age: 34, block: "Blk 7 Lot 12", reason: "Prenatal follow-up (28 wks)", triage: "priority" },
  { time: "08:35", name: "Danilo S. Ramos", age: 61, block: "Blk 2 Lot 4", reason: "Hypertension maintenance", triage: "routine" },
  { time: "08:50", name: "Baby Liam T. Ocampo", age: 1, block: "Blk 14 Lot 9", reason: "Fever, 2 days · dengue watch", triage: "urgent" },
  { time: "09:10", name: "Corazon B. Villanueva", age: 72, block: "Blk 19 Lot 2", reason: "Senior citizen check-up", triage: "priority" },
  { time: "09:25", name: "Mark Anthony D. Reyes", age: 27, block: "Blk 5 Lot 18", reason: "TB-DOTS month 3 review", triage: "routine" },
];

const triageStyle: Record<string, string> = {
  urgent: "bg-destructive/10 text-destructive border-destructive/30",
  priority: "bg-warning/15 text-warning-foreground border-warning/40",
  routine: "bg-accent text-accent-foreground border-transparent",
};

const kpis = [
  { label: "Nasa pila ngayon", value: 12, sub: "3 priority · 1 urgent", icon: ClipboardList },
  { label: "Konsulta natapos", value: 8, sub: "Ngayong umaga", icon: Activity },
  { label: "Lab results na dapat suriin", value: 5, sub: "2 abnormal flags", icon: FlaskConical },
  { label: "Follow-up na lumipas", value: 4, sub: "Kailangan ng BHW visit", icon: CalendarClock },
];

const clinicalAlerts = [
  { icon: AlertTriangle, tone: "text-destructive", text: "Ocampo, Liam (1) — platelet 118, dengue NS1 reactive. Consider referral." },
  { icon: Baby, tone: "text-primary", text: "Cruz, Rosalinda (34) — BP 140/90 sa 2 magkasunod na prenatal visit." },
  { icon: Pill, tone: "text-warning-foreground", text: "Reyes, Mark Anthony — 2 missed DOTS doses noong nakaraang linggo." },
];

const caseloads = [
  { label: "Prenatal (active)", count: 34, of: 40 },
  { label: "TB-DOTS (on treatment)", count: 11, of: 14 },
  { label: "Hypertension / NCD", count: 87, of: 120 },
  { label: "Under-5 immunization due", count: 22, of: 60 },
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Clinical Overview</h1>
          <p className="text-sm text-muted-foreground">
            Magandang umaga, Dr. Aguinaldo — narito ang inyong caseload ngayong araw.
          </p>
        </div>
        <Link
          to="/doctor/queue"
          className="inline-flex items-center gap-2 rounded-lg healthcare-gradient px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
        >
          Simulan ang konsultasyon <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="rounded-xl border bg-card p-5 card-hover">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="mt-1.5 font-display text-2xl font-bold text-card-foreground">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
              </div>
              <span className="rounded-lg bg-accent p-2.5 text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Queue */}
        <div className="rounded-xl border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-display text-sm font-semibold text-card-foreground">Pila ng Konsultasyon</h2>
            <Link to="/doctor/queue" className="text-xs font-semibold text-primary hover:underline">
              Tingnan lahat
            </Link>
          </div>
          <ul className="divide-y">
            {queue.map((p) => (
              <li key={p.name} className="flex items-center gap-4 px-5 py-3.5">
                <span className="w-12 shrink-0 font-display text-xs font-bold text-muted-foreground">{p.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-card-foreground">
                    {p.name} <span className="font-normal text-muted-foreground">· {p.age}y · {p.block}</span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{p.reason}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${triageStyle[p.triage]}`}>
                  {p.triage}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinical alerts */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <h2 className="mb-3 font-display text-sm font-semibold text-card-foreground">Clinical Alerts</h2>
            <ul className="space-y-3">
              {clinicalAlerts.map(({ icon: Icon, tone, text }) => (
                <li key={text} className="flex gap-3 rounded-lg border p-3">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`} aria-hidden="true" />
                  <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <h2 className="mb-3 font-display text-sm font-semibold text-card-foreground">Program Caseload</h2>
            <ul className="space-y-3.5">
              {caseloads.map((c) => (
                <li key={c.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-card-foreground">{c.label}</span>
                    <span className="text-muted-foreground">{c.count}/{c.of}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full healthcare-gradient"
                      style={{ width: `${Math.round((c.count / c.of) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
