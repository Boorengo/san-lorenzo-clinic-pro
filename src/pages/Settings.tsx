import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const templates = [
  { id: "family-health", name: "Family Health Profiling Form", active: true },
  { id: "fhsis-monthly", name: "FHSIS Monthly Report", active: true },
  { id: "target-list", name: "Target Client List", active: true },
  { id: "nutrition-report", name: "Nutrition Report", active: false },
];

export default function Settings() {
  const [tpls, setTpls] = useState(templates);

  const toggleTemplate = (id: string) => {
    setTpls(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage system configuration</p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="templates">Form Templates</TabsTrigger>
          <TabsTrigger value="users">User Roles</TabsTrigger>
          <TabsTrigger value="clinic">Clinic Info</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <h3 className="font-display text-sm font-semibold">Manage Templates</h3>
            {tpls.map(t => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {t.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${t.active ? "text-primary" : "text-muted-foreground"}`}>
                    {t.active ? "Active" : "Inactive"}
                  </span>
                  <Switch checked={t.active} onCheckedChange={() => toggleTemplate(t.id)} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <h3 className="font-display text-sm font-semibold">User Roles</h3>
            {[
              { name: "Dr. Reyes", role: "Doctor" },
              { name: "Nurse Santos", role: "Nurse" },
              { name: "Admin Garcia", role: "Admin" },
            ].map((u, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border px-4 py-3">
                <p className="text-sm font-medium text-card-foreground">{u.name}</p>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{u.role}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clinic">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <h3 className="font-display text-sm font-semibold">Clinic Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Health Center Name</Label>
                <Input defaultValue="Barangay Health Center - San Lorenzo Ruiz 1" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Contact Number</Label>
                <Input defaultValue="(02) 8123-4567" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Address</Label>
                <Input defaultValue="San Lorenzo Ruiz 1, Quezon City" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
