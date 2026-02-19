import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, User, Syringe, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PatientPortal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg healthcare-gradient">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-sm font-bold">Patient Portal</h1>
            <p className="text-xs text-muted-foreground">San Lorenzo Ruiz 1 Health Center</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="gap-1.5 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            Staff Login
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl p-4 pt-6">
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="info" className="gap-1.5 text-xs">
              <User className="h-3.5 w-3.5" />
              My Information
            </TabsTrigger>
            <TabsTrigger value="immunization" className="gap-1.5 text-xs">
              <Syringe className="h-3.5 w-3.5" />
              Immunization
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "First Name", value: "Maria" },
                  { label: "Last Name", value: "Santos" },
                  { label: "Date of Birth", value: "1992-05-14", type: "date" },
                  { label: "Sex", value: "Female" },
                  { label: "Contact Number", value: "09171234567" },
                  { label: "Address", value: "Blk 5 Lot 12, San Lorenzo Ruiz 1" },
                ].map(f => (
                  <div key={f.label} className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">{f.label}</Label>
                    <Input defaultValue={f.value} type={f.type || "text"} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="healthcare-gradient text-primary-foreground border-0">Update Info</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="immunization">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Immunization History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Vaccine</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Dose</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { vaccine: "BCG", date: "2024-01-15", dose: "1st", provider: "Dr. Santos" },
                      { vaccine: "OPV", date: "2024-02-20", dose: "1st", provider: "Dr. Santos" },
                      { vaccine: "Hepatitis B", date: "2024-03-10", dose: "2nd", provider: "Dr. Reyes" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-3 font-medium text-card-foreground">{r.vaccine}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{r.dose}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{r.provider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-display text-lg font-semibold mb-4">My Documents</h3>
              <div className="space-y-2">
                {[
                  { type: "Health Certificate", date: "2026-02-10" },
                  { type: "Referral Form", date: "2026-01-20" },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{d.type}</p>
                        <p className="text-xs text-muted-foreground">Issued: {d.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
