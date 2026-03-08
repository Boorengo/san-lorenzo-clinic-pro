import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Heart, Syringe, FileText, LogOut, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";

const userInfo = {
  firstName: "Juan",
  lastName: "Dela Cruz",
  email: "juan@email.com",
  dob: "1990-06-15",
  sex: "Male",
  contact: "09171234567",
  address: "Blk 5 Lot 12, San Lorenzo Ruiz 1",
  philhealth: "12-345678901-2",
  block: "E-7",
  lot: "5",
};

const immunizationRecords = [
  { vaccine: "COVID-19 (Sinovac)", date: "2024-03-15", dose: "Booster", provider: "BHC SLR1", status: "Completed" },
  { vaccine: "Flu Vaccine", date: "2025-11-20", dose: "Annual", provider: "BHC SLR1", status: "Completed" },
  { vaccine: "Tetanus Toxoid", date: "2023-08-10", dose: "2nd", provider: "BHC SLR1", status: "Completed" },
];

const healthRecords = [
  { date: "2026-02-10", type: "Consultation", doctor: "Dr. Reyes", notes: "Mild cough. Prescribed Ambroxol." },
  { date: "2026-01-15", type: "Checkup", doctor: "Dr. Santos", notes: "Routine checkup. BP 120/80. Normal findings." },
  { date: "2025-12-05", type: "Laboratory", doctor: "Dr. Reyes", notes: "CBC and Urinalysis - all normal." },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <img src={logo} alt="BHC Logo" className="h-9 w-9 rounded-full object-cover shadow-sm" />
          <div className="flex-1">
            <h1 className="font-display text-sm font-bold text-foreground">My Health Profile</h1>
            <p className="text-[10px] text-muted-foreground">BHC San Lorenzo Ruiz 1</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs gap-1.5" onClick={() => navigate("/")}>
            <Home className="h-3.5 w-3.5" /> Home
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={() => navigate("/patient-portal")}>
            <Heart className="h-3.5 w-3.5" /> Patient Portal
          </Button>
          <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground" onClick={() => navigate("/login")}>
            <LogOut className="h-3.5 w-3.5" /> Logout
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl healthcare-gradient p-6 sm:p-8 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur text-primary-foreground">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary-foreground">
                Kumusta, {userInfo.firstName}!
              </h2>
              <p className="text-sm text-primary-foreground/80 mt-0.5">
                Block {userInfo.block}, Lot {userInfo.lot} • {userInfo.contact}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Immunizations", value: immunizationRecords.length, icon: Syringe },
            { label: "Health Records", value: healthRecords.length, icon: FileText },
            { label: "Family Members", value: 3, icon: User },
          ].map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card p-4 text-center"
            >
              <Icon className="h-5 w-5 mx-auto text-primary mb-1.5" />
              <p className="font-display text-xl font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="profile" className="text-xs gap-1.5"><User className="h-3.5 w-3.5" />Personal Info</TabsTrigger>
            <TabsTrigger value="health" className="text-xs gap-1.5"><Heart className="h-3.5 w-3.5" />Health Records</TabsTrigger>
            <TabsTrigger value="immunization" className="text-xs gap-1.5"><Syringe className="h-3.5 w-3.5" />Immunization</TabsTrigger>
          </TabsList>

          {/* Personal Info */}
          <TabsContent value="profile">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "First Name", value: userInfo.firstName },
                  { label: "Last Name", value: userInfo.lastName },
                  { label: "Email", value: userInfo.email, type: "email" },
                  { label: "Date of Birth", value: userInfo.dob, type: "date" },
                  { label: "Sex", value: userInfo.sex },
                  { label: "Contact Number", value: userInfo.contact },
                  { label: "Address", value: userInfo.address },
                  { label: "PhilHealth No.", value: userInfo.philhealth },
                  { label: "Block / Lot", value: `Block ${userInfo.block}, Lot ${userInfo.lot}` },
                ].map((field) => (
                  <div key={field.label} className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">{field.label}</Label>
                    <Input defaultValue={field.value} type={field.type || "text"} readOnly className="bg-muted/50" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Health Records */}
          <TabsContent value="health">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Health Records</h3>
              <div className="space-y-3">
                {healthRecords.map((record, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                          {record.type}
                        </span>
                        <span className="text-xs font-medium text-foreground">{record.doctor}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{record.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Immunization */}
          <TabsContent value="immunization">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Immunization Records</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 text-xs font-medium text-muted-foreground">Vaccine</th>
                      <th className="pb-2 text-xs font-medium text-muted-foreground">Date</th>
                      <th className="pb-2 text-xs font-medium text-muted-foreground">Dose</th>
                      <th className="pb-2 text-xs font-medium text-muted-foreground">Provider</th>
                      <th className="pb-2 text-xs font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {immunizationRecords.map((rec, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3 font-medium text-foreground">{rec.vaccine}</td>
                        <td className="py-3 text-muted-foreground">{rec.date}</td>
                        <td className="py-3 text-muted-foreground">{rec.dose}</td>
                        <td className="py-3 text-muted-foreground">{rec.provider}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
