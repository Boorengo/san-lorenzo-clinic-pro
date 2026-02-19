import { useState } from "react";
import { FileText, Printer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const docTypes = [
  { id: "health-cert", label: "Health Certificate" },
  { id: "referral", label: "Referral Form" },
];

const recentDocs = [
  { id: "1", type: "Health Certificate", patient: "Maria Santos", date: "2026-02-10" },
  { id: "2", type: "Referral Form", patient: "Juan Dela Cruz", date: "2026-02-14" },
  { id: "3", type: "Health Certificate", patient: "Ana Reyes", date: "2026-02-18" },
];

export default function Documents() {
  const [docType, setDocType] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Documents</h1>
        <p className="text-sm text-muted-foreground">Generate official health documents</p>
      </div>

      {/* Generate */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-display text-sm font-semibold mb-4">Generate New Document</h3>
        <div className="grid gap-4 sm:grid-cols-3">
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
            <Label className="text-xs">Document Type</Label>
            <Select value={docType} onValueChange={setDocType}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {docTypes.map(d => <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full healthcare-gradient text-primary-foreground border-0 gap-1.5">
              <Plus className="h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>
      </div>

      {/* Recent */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3">Recent Documents</h3>
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentDocs.map(d => (
                <tr key={d.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="font-medium text-card-foreground">{d.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{d.patient}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.date}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Printer className="h-3.5 w-3.5" />
                      Print
                    </Button>
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
