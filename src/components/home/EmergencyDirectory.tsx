import { motion } from "framer-motion";
import { Ambulance, Phone, Hospital, Siren, UserRound } from "lucide-react";

const hotlines = [
  { icon: Siren, label: "Barangay Emergency", value: "0917-555-0101", note: "24/7 barangay tanod & response" },
  { icon: Ambulance, label: "Ambulansya ng Barangay", value: "0918-555-0202", note: "Libreng hatid sa ospital" },
  { icon: Hospital, label: "Referral Hospital", value: "(046) 416-0226", note: "Dasmariñas City Medical Center" },
  { icon: Phone, label: "DOH Hotline", value: "1555", note: "Health advice at reklamo" },
];

const bhws = [
  { purok: "Blocks 1–5", name: "Aling Nena Bautista", contact: "0917-555-0311" },
  { purok: "Blocks 6–10", name: "Aling Rosa Delgado", contact: "0917-555-0312" },
  { purok: "Blocks 11–15", name: "Mang Ariel Santos", contact: "0917-555-0313" },
  { purok: "Blocks 16–21", name: "Aling Lita Reyes", contact: "0917-555-0314" },
];

export default function EmergencyDirectory() {
  return (
    <section id="hotlines" className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Tulong at Kontak</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Emergency Hotlines at BHW Directory
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Sa oras ng emergency, tumawag agad. Para sa registration at Konsulta enrollment, lapitan ang
            BHW na nakatalaga sa inyong block.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Hotlines */}
          <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
            <h3 className="mb-4 font-display text-sm font-bold text-foreground">Mga Emergency Hotline</h3>
            <ul className="space-y-3">
              {hotlines.map(({ icon: Icon, label, value, note }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
                    <a
                      href={`tel:${value.replace(/[^0-9]/g, "")}`}
                      className="font-display text-sm font-bold text-foreground hover:text-primary hover:underline"
                    >
                      {value}
                    </a>
                    <p className="text-[11px] text-muted-foreground">{note}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* BHW directory */}
          <div className="rounded-3xl border bg-card p-6">
            <h3 className="font-display text-sm font-bold text-foreground">Barangay Health Workers kada Block</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Sila ang makakatulong sa inyong PhilHealth Konsulta enrollment at assisted registration.
            </p>
            <ul className="mt-4 space-y-3">
              {bhws.map(({ purok, name, contact }, i) => (
                <motion.li
                  key={purok}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 rounded-2xl border bg-background p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <UserRound className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{purok}</p>
                    <p className="text-sm font-bold text-foreground">{name}</p>
                  </div>
                  <a
                    href={`tel:${contact.replace(/[^0-9]/g, "")}`}
                    className="shrink-0 text-xs font-semibold text-primary hover:underline"
                  >
                    {contact}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
