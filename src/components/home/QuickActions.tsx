import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IdCard, Syringe, PhoneCall, FileHeart, ArrowUpRight } from "lucide-react";

const actions = [
  {
    icon: IdCard,
    title: "Konsulta Enrollment",
    desc: "Magpalista sa PhilHealth Konsulta primary care package.",
    target: "#programs",
  },
  {
    icon: Syringe,
    title: "Iskedyul ng Bakuna",
    desc: "Tingnan ang immunization schedule kada purok.",
    target: "#programs",
  },
  {
    icon: FileHeart,
    title: "Aking Health Record",
    desc: "Buksan ang family health profile sa Patient Portal.",
    target: "/patient-portal",
  },
  {
    icon: PhoneCall,
    title: "Emergency Hotlines",
    desc: "Mga numerong dapat tawagan sa oras ng emergency.",
    target: "#hotlines",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  const go = (target: string) => {
    if (target.startsWith("/")) navigate(target);
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-label="Quick actions" className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary">Mabilisang Serbisyo</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map(({ icon: Icon, title, desc, target }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <button
                type="button"
                onClick={() => go(target)}
                className="group h-full w-full rounded-2xl border bg-card p-5 text-left card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold text-foreground">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
