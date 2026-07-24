import { FlaskConical, Plus, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const labs = [
  { id: "L-511", patient: "Juana Dela Cruz", test: "CBC", result: "Normal", date: "2026-07-24", flag: "normal" },
  { id: "L-510", patient: "Pedro Santos", test: "Lipid Panel", result: "LDL elevated", date: "2026-07-23", flag: "high" },
  { id: "L-509", patient: "Maria Lopez", test: "Urinalysis", result: "Normal", date: "2026-07-23", flag: "normal" },
  { id: "L-508", patient: "Jose Ramos", test: "HbA1c", result: "8.4% (high)", date: "2026-07-22", flag: "high" },
  { id: "L-507", patient: "Ana Villanueva", test: "Chest X-ray", result: "Clear", date: "2026-07-21", flag: "normal" },
];

export default function LabResults() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Laboratory Results</h1>
          <p className="text-sm text-muted-foreground">Diagnostic reports and test results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
            <Plus className="h-4 w-4" /> Add Result
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search by patient or test..." className="pl-9" />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium">ID</th>
                <th className="text-left px-4 py-2.5 font-medium">Patient</th>
                <th className="text-left px-4 py-2.5 font-medium">Test</th>
                <th className="text-left px-4 py-2.5 font-medium">Result</th>
                <th className="text-left px-4 py-2.5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {labs.map((l) => (
                <tr key={l.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs">{l.id}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-primary" />
                    {l.patient}
                  </td>
                  <td className="px-4 py-3">{l.test}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${l.flag === "high" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
                      {l.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
