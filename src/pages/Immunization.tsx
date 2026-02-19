import { useState } from "react";
import { Syringe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const vaccines = ["BCG", "OPV", "Hepatitis B", "Pentavalent", "PCV", "IPV", "MMR", "Flu Vaccine"];

const mockHistory = [
  { patient: "Maria Santos", vaccine: "BCG", date: "2026-02-10", dose: "1st" },
  { patient: "Juan Dela Cruz", vaccine: "OPV", date: "2026-02-14", dose: "2nd" },
  { patient: "Ella Santos", vaccine: "Pentavalent", date: "2026-02-15", dose: "1st" },
  { patient: "Ana Reyes", vaccine: "Hepatitis B", date: "2026-02-18", dose: "3rd" },
];

export default function Immunization() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Immunization</h1>
        <p className="text-sm text-muted-foreground">Record and track vaccine administration</p>
      </div>

      {/* Record form */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-display text-sm font-semibold mb-4">Record Administration</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Patient</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Maria Santos</SelectItem>
                <SelectItem value="2">Juan Dela Cruz</SelectItem>
                <SelectItem value="3">Ana Reyes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Vaccine</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select vaccine" /></SelectTrigger>
              <SelectContent>
                {vaccines.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Date</Label>
            <Input type="date" defaultValue="2026-02-19" />
          </div>
          <div className="flex items-end">
            <Button className="w-full healthcare-gradient text-primary-foreground border-0 gap-1.5">
              <Syringe className="h-4 w-4" />
              Record
            </Button>
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold">Recent Immunizations</h3>
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-8 text-sm" />
          </div>
        </div>
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Vaccine</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Dose</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.filter(h => h.patient.toLowerCase().includes(search.toLowerCase())).map((h, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-card-foreground">{h.patient}</td>
                  <td className="px-4 py-3 text-muted-foreground">{h.vaccine}</td>
                  <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{h.dose}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
