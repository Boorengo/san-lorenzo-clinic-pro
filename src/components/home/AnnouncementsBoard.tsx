import { motion } from "framer-motion";
import { Megaphone, CalendarDays, MapPin } from "lucide-react";

type Announcement = {
  date: string;
  tag: string;
  tone: string;
  title: string;
  body: string;
  isNew?: boolean;
};

const announcements: Announcement[] = [
  {
    date: "27 Ago 2026",
    tag: "Bakunahan",
    tone: "bg-primary/10 text-primary",
    title: "Libreng Flu Vaccination Drive — Setyembre 5",
    body: "Para sa mga senior, buntis, at may comorbidity. Dalhin ang barangay ID at ECCD card. Sa Main Hall, 8:00 AM – 12:00 NN.",
    isNew: true,
  },
  {
    date: "10 Ago 2026",
    tag: "Bakunahan",
    tone: "bg-primary/10 text-primary",
    title: "Bakuna Bakunahan: Measles-Rubella & OPV Catch-Up",
    body: "Libreng bakuna para sa mga batang 0–59 buwan. Dalhin ang ECCD card at barangay ID.",
  },
  {
    date: "08 Ago 2026",
    tag: "Nutrisyon",
    tone: "bg-secondary/15 text-secondary-foreground",
    title: "Operation Timbang Plus — Weighing Schedule",
    body: "Kada purok, alinsunod sa iskedyul ng inyong BHW. Para sa lahat ng preschool-aged children.",
  },
  {
    date: "05 Ago 2026",
    tag: "Paalala",
    tone: "bg-accent text-accent-foreground",
    title: "Sarado ang Health Center tuwing Huling Biyernes, 1:00 PM",
    body: "Monthly staff meeting at FHSIS reporting. Emergency cases ay ire-refer sa RHU Dasmariñas.",
  },
];

const programs = [
  { day: "Lunes", name: "Prenatal & Postnatal Clinic", where: "Consultation Room 1", time: "8:00 AM – 12:00 NN" },
  { day: "Martes", name: "Family Planning & Counseling", where: "Consultation Room 2", time: "8:00 AM – 12:00 NN" },
  { day: "Miyerkules", name: "Immunization Day (EPI)", where: "Immunization Area", time: "8:00 AM – 3:00 PM" },
  { day: "Huwebes", name: "TB-DOTS Treatment Partner", where: "DOTS Corner", time: "8:00 AM – 11:00 AM" },
  { day: "Biyernes", name: "Senior Citizen & PWD Clinic", where: "Main Hall", time: "8:00 AM – 12:00 NN" },
];

export default function AnnouncementsBoard() {
  return (
    <section id="programs" className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Bulletin Board</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Mga Anunsyo at Programa
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Mga pinakabagong abiso mula sa health center at ang lingguhang iskedyul ng aming mga programa.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Announcements */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-foreground">
              <Megaphone className="h-4 w-4 text-primary" aria-hidden="true" /> Pinakabagong Anunsyo
            </h3>
            <ul className="space-y-4">
              {announcements.map((a, i) => (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border bg-background p-5 card-hover"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${a.tone}`}>
                      {a.tag}
                    </span>
                    <time className="text-[11px] font-medium text-muted-foreground">{a.date}</time>
                  </div>
                  <h4 className="mt-2.5 font-display text-sm font-bold text-foreground">{a.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{a.body}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Weekly programs */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-foreground">
              <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" /> Lingguhang Iskedyul
            </h3>
            <ul className="overflow-hidden rounded-2xl border bg-background">
              {programs.map((p) => (
                <li key={p.day} className="flex gap-4 border-b p-4 last:border-b-0">
                  <span className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-wide text-primary">
                    {p.day}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{p.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" aria-hidden="true" /> {p.where} · {p.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
