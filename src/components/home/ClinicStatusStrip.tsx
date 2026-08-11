import { motion } from "framer-motion";
import { Clock, Users, CalendarCheck, ShieldCheck } from "lucide-react";

const weekday = new Date().getDay();
const hour = new Date().getHours();
const isOpen = weekday >= 1 && weekday <= 5 && hour >= 8 && hour < 17;

const tiles = [
  {
    icon: Users,
    label: "Nasa pila ngayon",
    value: "12 pasyente",
    hint: "Tinatayang hintay: ~25 min",
  },
  {
    icon: CalendarCheck,
    label: "Susunod na slot",
    value: "10:40 AM",
    hint: "Walk-in konsultasyon",
  },
  {
    icon: ShieldCheck,
    label: "Bakuna ngayong linggo",
    value: "Miyerkules",
    hint: "Pentavalent · MMR · OPV",
  },
];

export default function ClinicStatusStrip() {
  return (
    <section aria-label="Clinic status today" className="border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 rounded-2xl border bg-gradient-to-br from-primary/5 to-secondary/5 p-5"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                isOpen ? "healthcare-gradient" : "bg-muted"
              }`}
            >
              <Clock className={`h-5 w-5 ${isOpen ? "text-primary-foreground" : "text-muted-foreground"}`} aria-hidden="true" />
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${isOpen ? "animate-pulse bg-primary" : "bg-destructive"}`} aria-hidden="true" />
                {isOpen ? "Bukas ngayon" : "Sarado ngayon"}
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground">
                {isOpen ? "Hanggang 5:00 PM" : "Bubukas Lunes, 8:00 AM"}
              </p>
            </div>
          </motion.div>

          {tiles.map(({ icon: Icon, label, value, hint }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * (i + 1) }}
              className="flex items-center gap-4 rounded-2xl border bg-background p-5 card-hover"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-sm font-bold text-foreground">{value}</p>
                <p className="text-[11px] text-muted-foreground">{hint}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
