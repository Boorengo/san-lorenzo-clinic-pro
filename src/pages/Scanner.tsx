import { useState } from "react";
import { Upload, Camera, FileText, ScanLine, Loader2, Check, X, Sparkles, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

type Stage = "idle" | "preview" | "scanning" | "result";

const extracted = {
  patientName: "Juana Dela Cruz",
  age: "34",
  address: "Blk 7 Lot 12, San Lorenzo Ruiz 1",
  contact: "0917-555-0142",
  date: "2026-07-20",
  diagnosis: "Acute upper respiratory infection",
  medications: "Paracetamol 500mg TID x 5 days\nAmoxicillin 500mg BID x 7 days",
};

export default function Scanner() {
  const [stage, setStage] = useState<Stage>("idle");
  const [confidence] = useState(94);

  const runScan = () => {
    setStage("scanning");
    setTimeout(() => setStage("result"), 2000);
  };

  const reset = () => setStage("idle");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Paper to Digital Scanner</h1>
          <p className="text-sm text-muted-foreground">Capture physical records and convert to editable digital forms</p>
        </div>
        {stage === "result" && (
          <Button variant="outline" size="sm" onClick={reset} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> New Scan
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Capture panel */}
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="font-display text-sm font-semibold flex items-center gap-2">
            <ScanLine className="h-4 w-4 text-primary" /> Capture Source
          </h3>

          {stage === "idle" && (
            <div className="space-y-3">
              <button className="w-full rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors p-8 text-center group" onClick={() => setStage("preview")}>
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary" />
                <p className="text-sm font-medium">Drop a file or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG, or PDF (max 20MB)</p>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-1.5" onClick={() => setStage("preview")}>
                  <Camera className="h-4 w-4" /> Use Camera
                </Button>
                <Button variant="outline" className="gap-1.5" onClick={() => setStage("preview")}>
                  <FileText className="h-4 w-4" /> From Templates
                </Button>
              </div>
            </div>
          )}

          {(stage === "preview" || stage === "scanning" || stage === "result") && (
            <div className="space-y-3">
              <div className="relative aspect-[3/4] rounded-lg border overflow-hidden bg-muted/30 flex items-center justify-center">
                {/* Fake document preview */}
                <div className="w-[80%] h-[92%] bg-card shadow-md rounded p-4 space-y-2">
                  <div className="h-3 w-2/3 bg-muted-foreground/20 rounded" />
                  <div className="h-2 w-full bg-muted-foreground/10 rounded" />
                  <div className="h-2 w-5/6 bg-muted-foreground/10 rounded" />
                  <div className="h-2 w-3/4 bg-muted-foreground/10 rounded" />
                  <div className="pt-3 space-y-1.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-2 bg-muted-foreground/10 rounded" style={{ width: `${60 + Math.random() * 35}%` }} />
                    ))}
                  </div>
                </div>

                {/* Scan line overlay */}
                <AnimatePresence>
                  {stage === "scanning" && (
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-b from-primary/0 via-primary to-primary/0 shadow-[0_0_20px_hsl(var(--primary))]"
                    />
                  )}
                </AnimatePresence>

                {stage === "result" && (
                  <div className="absolute top-3 right-3 bg-success text-white text-xs rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
                    <Check className="h-3 w-3" /> {confidence}% confidence
                  </div>
                )}
              </div>

              {stage === "preview" && (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={reset}>
                    <X className="h-4 w-4 mr-1.5" /> Cancel
                  </Button>
                  <Button className="flex-1 healthcare-gradient text-primary-foreground border-0 gap-1.5" onClick={runScan}>
                    <Sparkles className="h-4 w-4" /> Extract Text
                  </Button>
                </div>
              )}

              {stage === "scanning" && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> AI is reading your document...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Extracted panel */}
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="font-display text-sm font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" /> Extracted Data
          </h3>

          {stage !== "result" && (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <div className="h-14 w-14 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                <Sparkles className="h-6 w-6 opacity-40" />
              </div>
              <p className="text-sm">Extracted fields will appear here</p>
              <p className="text-xs mt-1">Upload a document to get started</p>
            </div>
          )}

          {stage === "result" && (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Patient Name</Label>
                  <Input defaultValue={extracted.patientName} className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Age</Label>
                  <Input defaultValue={extracted.age} className="h-9" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs">Address</Label>
                  <Input defaultValue={extracted.address} className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Contact</Label>
                  <Input defaultValue={extracted.contact} className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Visit Date</Label>
                  <Input defaultValue={extracted.date} className="h-9" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs">Diagnosis</Label>
                  <Input defaultValue={extracted.diagnosis} className="h-9" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs">Medications</Label>
                  <textarea
                    defaultValue={extracted.medications}
                    rows={3}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 gap-1.5">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button className="flex-1 healthcare-gradient text-primary-foreground border-0 gap-1.5">
                  <Check className="h-4 w-4" /> Save to Records
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent scans */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-display text-sm font-semibold mb-4">Recent Scans</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Consultation Form", date: "Jul 22", status: "Saved" },
            { name: "Immunization Card", date: "Jul 21", status: "Saved" },
            { name: "Lab Result", date: "Jul 20", status: "Review" },
            { name: "Prenatal Chart", date: "Jul 19", status: "Saved" },
          ].map((s) => (
            <div key={s.name} className="rounded-lg border p-3 hover:border-primary/50 transition-colors">
              <div className="aspect-[3/4] bg-muted/30 rounded mb-2 flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <p className="text-xs font-medium truncate">{s.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">{s.date}</span>
                <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${s.status === "Saved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
