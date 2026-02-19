import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Users, Syringe, Stethoscope, FileText, FileOutput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DynamicTable, { ColumnDef } from "@/components/DynamicTable";

const immunizationCols: ColumnDef[] = [
  { key: "vaccine", label: "Vaccine", type: "text" },
  { key: "date", label: "Date Given", type: "date" },
  { key: "dose", label: "Dose", type: "select", options: ["1st", "2nd", "3rd", "Booster"] },
  { key: "provider", label: "Provider", type: "text" },
  { key: "remarks", label: "Remarks", type: "text" },
];

const immunizationData = [
  { vaccine: "BCG", date: "2024-01-15", dose: "1st", provider: "Dr. Santos", remarks: "No reaction" },
  { vaccine: "OPV", date: "2024-02-20", dose: "1st", provider: "Dr. Santos", remarks: "" },
];

export default function PatientProfile() {
  const { id } = useParams();
  const [immData, setImmData] = useState<Record<string, any>[]>(immunizationData);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/patients">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold">Patient Profile</h1>
          <p className="text-sm text-muted-foreground">Patient ID: {id}</p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="personal" className="text-xs gap-1.5"><User className="h-3.5 w-3.5" />Personal Info</TabsTrigger>
          <TabsTrigger value="family" className="text-xs gap-1.5"><Users className="h-3.5 w-3.5" />Family Profile</TabsTrigger>
          <TabsTrigger value="immunization" className="text-xs gap-1.5"><Syringe className="h-3.5 w-3.5" />Immunization</TabsTrigger>
          <TabsTrigger value="notes" className="text-xs gap-1.5"><Stethoscope className="h-3.5 w-3.5" />Doctor Notes</TabsTrigger>
          <TabsTrigger value="forms" className="text-xs gap-1.5"><FileText className="h-3.5 w-3.5" />Forms</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs gap-1.5"><FileOutput className="h-3.5 w-3.5" />Documents</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "First Name", value: "Maria" },
                { label: "Last Name", value: "Santos" },
                { label: "Date of Birth", value: "1992-05-14", type: "date" },
                { label: "Sex", value: "Female" },
                { label: "Contact Number", value: "09171234567" },
                { label: "Address", value: "Blk 5 Lot 12, San Lorenzo Ruiz 1" },
              ].map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">{field.label}</Label>
                  <Input defaultValue={field.value} type={field.type || "text"} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="healthcare-gradient text-primary-foreground border-0">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Family Profile */}
        <TabsContent value="family">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Family Profiling</h3>
            <DynamicTable
              columns={[
                { key: "name", label: "Member Name", type: "text" },
                { key: "relation", label: "Relation", type: "select", options: ["Spouse", "Child", "Parent", "Sibling", "Other"] },
                { key: "age", label: "Age", type: "number", width: "80px" },
                { key: "sex", label: "Sex", type: "select", options: ["Male", "Female"] },
                { key: "occupation", label: "Occupation", type: "text" },
              ]}
              data={[
                { name: "Juan Santos", relation: "Spouse", age: "36", sex: "Male", occupation: "Driver" },
                { name: "Ella Santos", relation: "Child", age: "8", sex: "Female", occupation: "Student" },
              ]}
            />
          </div>
        </TabsContent>

        {/* Immunization */}
        <TabsContent value="immunization">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Immunization Records</h3>
            <DynamicTable columns={immunizationCols} data={immData} onChange={setImmData} />
            <div className="mt-4 flex justify-end">
              <Button className="healthcare-gradient text-primary-foreground border-0">Save Records</Button>
            </div>
          </div>
        </TabsContent>

        {/* Doctor Notes */}
        <TabsContent value="notes">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Doctor Notes</h3>
            <div className="space-y-3">
              {[
                { date: "2026-02-10", note: "Patient presented with mild cough. Prescribed Ambroxol.", doctor: "Dr. Reyes" },
                { date: "2026-01-15", note: "Routine checkup. BP 120/80. Normal findings.", doctor: "Dr. Santos" },
              ].map((n, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-primary">{n.doctor}</span>
                    <span className="text-xs text-muted-foreground">{n.date}</span>
                  </div>
                  <p className="text-sm text-card-foreground">{n.note}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Forms */}
        <TabsContent value="forms">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Submitted Forms</h3>
            <p className="text-sm text-muted-foreground">No forms submitted yet.</p>
          </div>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Generated Documents</h3>
            <div className="space-y-2">
              {[
                { type: "Health Certificate", date: "2026-02-10" },
                { type: "Referral Form", date: "2026-01-20" },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{d.type}</p>
                    <p className="text-xs text-muted-foreground">Issued: {d.date}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
