import { useNavigate } from "react-router-dom";
import { Heart, Users, Shield, Stethoscope, ChevronDown, ChevronUp, ArrowRight, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const faqs = [
  { q: "Ano ang mga serbisyo ng health center?", a: "Nagbibigay kami ng prenatal care, immunization, family planning, konsultasyon, TB-DOTS, at iba pang primary health care services." },
  { q: "Kailangan ko ba ng PhilHealth para magpaconsulta?", a: "Hindi po kailangan ng PhilHealth para magpaconsulta. Pero mas mabilis ang proseso kung may PhilHealth ID kayo." },
  { q: "Paano mag-register bilang patient?", a: "Pumunta lamang sa Patient Portal at piliin ang inyong block sa mapa para i-register ang inyong pamilya." },
  { q: "Ano ang oras ng health center?", a: "Bukas kami tuwing Lunes hanggang Biyernes, 8:00 AM – 5:00 PM. Sarado tuwing Sabado, Linggo, at holidays." },
  { q: "May bayad ba ang mga serbisyo?", a: "Karamihan sa mga serbisyo ay libre. May mga kaunting bayad lamang sa ilang laboratory tests." },
];

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg healthcare-gradient">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-bold text-foreground">BHC San Lorenzo Ruiz 1</span>
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            <a href="#about" className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#faqs" className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">FAQs</a>
            <Button size="sm" variant="outline" className="text-xs ml-2" onClick={() => navigate("/login")}>Staff Login</Button>
            <Button size="sm" className="text-xs healthcare-gradient text-primary-foreground border-0 ml-1" onClick={() => navigate("/patient-portal")}>Patient Portal</Button>
          </nav>
          <div className="flex sm:hidden gap-1.5">
            <Button size="sm" variant="outline" className="text-xs" onClick={() => navigate("/login")}>Login</Button>
            <Button size="sm" className="text-xs healthcare-gradient text-primary-foreground border-0" onClick={() => navigate("/patient-portal")}>Portal</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground mb-6">
            <Heart className="h-3 w-3 text-primary" /> Barangay Health Center
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground leading-tight max-w-2xl mx-auto">
            Kalusugan ng Komunidad, <span className="text-primary">Prayoridad Namin</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Naglilingkod sa mga residente ng San Lorenzo Ruiz 1 — libreng konsultasyon, immunization, family planning, at iba pa.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="healthcare-gradient text-primary-foreground border-0 gap-2" onClick={() => navigate("/patient-portal")}>
              Patient Portal <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
              Register Account
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">About the Health Center</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">Ang Barangay Health Center ng San Lorenzo Ruiz 1 ay nagsisilbi sa mga residenteng nangangailangan ng primary health care.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, title: "Primary Care", desc: "Konsultasyon, prenatal checkup, at iba pang serbisyong medikal para sa lahat ng edad." },
              { icon: Shield, title: "Immunization", desc: "Libreng bakuna para sa mga bata at matatanda ayon sa DOH national immunization program." },
              { icon: Users, title: "Family Planning", desc: "Gabay at serbisyo sa family planning para sa mga mag-asawa at indibidwal." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border bg-background p-6 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { icon: MapPin, label: "Address", value: "San Lorenzo Ruiz 1, Dasmariñas, Cavite" },
              { icon: Phone, label: "Contact", value: "(046) 123-4567" },
              { icon: Clock, label: "Hours", value: "Mon–Fri, 8:00 AM – 5:00 PM" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <Icon className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
                  <p className="text-xs font-semibold text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="border-t">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground">
          <p>© 2026 BHC San Lorenzo Ruiz 1. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate("/data-privacy")} className="hover:text-foreground transition-colors">Data Privacy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-foreground transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
