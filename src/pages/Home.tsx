import { useNavigate } from "react-router-dom";
import { Users, Shield, Stethoscope, ChevronDown, ArrowRight, Phone, MapPin, Clock, LogIn, UserPlus, Activity, Baby, Pill, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

const faqs = [
  { q: "Ano ang mga serbisyo ng health center?", a: "Nagbibigay kami ng prenatal care, immunization, family planning, konsultasyon, TB-DOTS, at iba pang primary health care services." },
  { q: "Kailangan ko ba ng PhilHealth para magpaconsulta?", a: "Hindi po kailangan ng PhilHealth para magpaconsulta. Pero mas mabilis ang proseso kung may PhilHealth ID kayo." },
  { q: "Paano mag-register bilang patient?", a: "Pumunta lamang sa Patient Portal at piliin ang inyong block sa mapa para i-register ang inyong pamilya." },
  { q: "Ano ang oras ng health center?", a: "Bukas kami tuwing Lunes hanggang Biyernes, 8:00 AM – 5:00 PM. Sarado tuwing Sabado, Linggo, at holidays." },
  { q: "May bayad ba ang mga serbisyo?", a: "Karamihan sa mga serbisyo ay libre. May mga kaunting bayad lamang sa ilang laboratory tests." },
];

const services = [
  { icon: Stethoscope, title: "Primary Care", desc: "Konsultasyon, prenatal checkup, at iba pang serbisyong medikal para sa lahat ng edad.", color: "bg-primary/10 text-primary" },
  { icon: Shield, title: "Immunization", desc: "Libreng bakuna para sa mga bata at matatanda ayon sa DOH national immunization program.", color: "bg-secondary/10 text-secondary" },
  { icon: Users, title: "Family Planning", desc: "Gabay at serbisyo sa family planning para sa mga mag-asawa at indibidwal.", color: "bg-accent text-accent-foreground" },
  { icon: Baby, title: "Prenatal & Postnatal", desc: "Regular na checkup at monitoring para sa mga buntis at bagong panganak na ina.", color: "bg-primary/10 text-primary" },
  { icon: Activity, title: "TB-DOTS Program", desc: "Libre at epektibong paggamot ng tuberculosis sa pamamagitan ng DOTS strategy.", color: "bg-secondary/10 text-secondary" },
  { icon: Pill, title: "Pharmacy Services", desc: "Libreng gamot para sa mga karaniwang sakit at maintenance medications.", color: "bg-accent text-accent-foreground" },
];

const stats = [
  { value: "5,000+", label: "Patients Served" },
  { value: "21", label: "Blocks Covered" },
  { value: "15+", label: "Health Programs" },
  { value: "24/7", label: "Emergency Response" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group">
            <img src={logo} alt="BHC San Lorenzo Ruiz 1 Logo" className="h-10 w-10 rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow" />
            <div className="hidden sm:block">
              <span className="font-display text-sm font-bold text-foreground block leading-tight">BHC San Lorenzo Ruiz 1</span>
              <span className="text-[10px] text-muted-foreground leading-tight">Health Center</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#about" className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">About</a>
            <a href="#services" className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">Services</a>
            <a href="#faqs" className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">FAQs</a>
            <div className="w-px h-6 bg-border mx-2" />
            <Button size="sm" variant="ghost" className="text-xs gap-1.5" onClick={() => navigate("/login")}>
              <LogIn className="h-3.5 w-3.5" /> Staff Login
            </Button>
            <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => navigate("/register")}>
              <UserPlus className="h-3.5 w-3.5" /> Register
            </Button>
            <Button size="sm" className="text-xs healthcare-gradient text-primary-foreground border-0 gap-1.5 shadow-md hover:shadow-lg transition-shadow" onClick={() => navigate("/patient-portal")}>
              Patient Portal
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2 bg-card">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">About</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">Services</a>
                <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">FAQs</a>
                <div className="border-t pt-3 mt-2 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="text-xs gap-1.5 w-full" onClick={() => navigate("/login")}><LogIn className="h-3.5 w-3.5" /> Login</Button>
                  <Button variant="outline" className="text-xs gap-1.5 w-full" onClick={() => navigate("/register")}><UserPlus className="h-3.5 w-3.5" /> Register</Button>
                </div>
                <Button className="w-full text-xs healthcare-gradient text-primary-foreground border-0 gap-1.5" onClick={() => navigate("/patient-portal")}>
                  Patient Portal
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        {/* Background blobs */}
        <div className="hero-blob w-96 h-96 bg-primary/20 -top-20 -left-20" style={{ position: "absolute" }} />
        <div className="hero-blob w-80 h-80 bg-secondary/20 -bottom-10 -right-10" style={{ position: "absolute" }} />
        <div className="absolute inset-0 healthcare-gradient-soft" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-36">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 backdrop-blur px-4 py-1.5 text-[11px] font-semibold text-muted-foreground mb-6 float-shadow">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                Serving San Lorenzo Ruiz 1 Community
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight"
            >
              Kalusugan ng Komunidad,{" "}
              <span className="text-gradient">Prayoridad Namin</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Libreng konsultasyon, immunization, family planning, at iba pang serbisyong pangkalusugan para sa inyong pamilya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button size="lg" className="healthcare-gradient text-primary-foreground border-0 gap-2 shadow-lg hover:shadow-xl transition-shadow text-sm px-6" onClick={() => navigate("/patient-portal")}>
                Open Patient Portal <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-sm px-6 bg-card/50 backdrop-blur" onClick={() => navigate("/register")}>
                <UserPlus className="h-4 w-4" /> Create Account
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-gradient">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">About Us</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Ang Inyong Barangay Health Center</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Nagsisilbi sa mga residente ng San Lorenzo Ruiz 1, Dasmariñas, Cavite — nagbibigay ng quality primary health care para sa bawat pamilya.
            </p>
          </motion.div>

          {/* Contact info cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {[
              { icon: MapPin, label: "Location", value: "San Lorenzo Ruiz 1, Dasmariñas, Cavite", gradient: "from-primary/5 to-primary/10" },
              { icon: Phone, label: "Contact Number", value: "(046) 123-4567", gradient: "from-secondary/5 to-secondary/10" },
              { icon: Clock, label: "Operating Hours", value: "Mon–Fri, 8:00 AM – 5:00 PM", gradient: "from-primary/5 to-secondary/5" },
            ].map(({ icon: Icon, label, value, gradient }, i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`flex items-center gap-4 rounded-2xl border p-5 bg-gradient-to-br ${gradient} card-hover`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl healthcare-gradient shadow-md shrink-0">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our Services</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Mga Serbisyo Namin</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">Lahat ng serbisyong pangkalusugan na kailangan ng inyong pamilya, nasa iisang lugar lang.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border bg-background p-6 card-hover"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="border-t bg-background">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Help & Support</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border bg-card overflow-hidden card-hover"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-muted shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="relative overflow-hidden rounded-3xl healthcare-gradient p-10 sm:p-16 text-center"
          >
            <div className="hero-blob w-64 h-64 bg-white/10 -top-16 -right-16" style={{ position: "absolute" }} />
            <div className="hero-blob w-48 h-48 bg-white/10 -bottom-12 -left-12" style={{ position: "absolute" }} />
            <div className="relative">
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-primary-foreground">
                Handa ka na bang i-register ang iyong pamilya?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-primary-foreground/80 max-w-md mx-auto">
                I-click lang ang Patient Portal para simulan ang inyong family health profile.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 gap-2 shadow-lg text-sm px-6 border-0" onClick={() => navigate("/patient-portal")}>
                  Open Patient Portal
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-white/10 gap-2 text-sm px-6" onClick={() => navigate("/register")}>
                  <UserPlus className="h-4 w-4" /> Register Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="BHC San Lorenzo Ruiz 1 Logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-display text-xs font-bold text-foreground">BHC San Lorenzo Ruiz 1</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <button onClick={() => navigate("/patient-portal")} className="hover:text-foreground transition-colors">Patient Portal</button>
              <button onClick={() => navigate("/login")} className="hover:text-foreground transition-colors">Staff Login</button>
              <button onClick={() => navigate("/data-privacy")} className="hover:text-foreground transition-colors">Data Privacy</button>
              <button onClick={() => navigate("/terms")} className="hover:text-foreground transition-colors">Terms of Service</button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-[11px] text-muted-foreground">© 2026 Barangay Health Center San Lorenzo Ruiz 1, Dasmariñas, Cavite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
