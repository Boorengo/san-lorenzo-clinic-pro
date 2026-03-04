import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import DynamicTable, { ColumnDef } from "@/components/DynamicTable";

const formTemplates: Record<string, { title: string; columns: ColumnDef[]; defaultData: Record<string, any>[] }> = {
  "family-health": {
    title: "Family Health Profiling Form",
    columns: [
      { key: "name", label: "Family Member", type: "text" },
      { key: "age", label: "Age", type: "number", width: "80px" },
      { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
      { key: "pregnant", label: "Pregnant", type: "checkbox" },
      { key: "bp", label: "Blood Pressure", type: "text" },
      { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
      { key: "height", label: "Height (cm)", type: "number", width: "100px" },
      { key: "bmi", label: "BMI", type: "number", width: "80px" },
      { key: "diagnosis", label: "Diagnosis", type: "text" },
      { key: "remarks", label: "Remarks", type: "text" },
    ],
    defaultData: [{ name: "", age: "", sex: "", pregnant: false, bp: "", weight: "", height: "", bmi: "", diagnosis: "", remarks: "" }],
  },
  "fhsis-monthly": {
    title: "FHSIS Monthly Report",
    columns: [
      { key: "indicator", label: "Health Indicator", type: "text" },
      { key: "male", label: "Male", type: "number", width: "80px" },
      { key: "female", label: "Female", type: "number", width: "80px" },
      { key: "total", label: "Total", type: "number", width: "80px" },
      { key: "target", label: "Target", type: "number", width: "80px" },
      { key: "remarks", label: "Remarks", type: "text" },
    ],
    defaultData: [
      { indicator: "Prenatal Visits", male: "", female: "", total: "", target: "", remarks: "" },
      { indicator: "Immunizations Given", male: "", female: "", total: "", target: "", remarks: "" },
      { indicator: "TB Cases Treated", male: "", female: "", total: "", target: "", remarks: "" },
    ],
  },
  "target-list": {
    title: "Target Client List (Doctor Logbook)",
    columns: [
      { key: "date", label: "Date", type: "date" },
      { key: "name", label: "Patient Name", type: "text" },
      { key: "age", label: "Age", type: "number", width: "70px" },
      { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
      { key: "address", label: "Address (Block/Lot)", type: "text" },
      { key: "chiefComplaint", label: "Chief Complaint", type: "text" },
      { key: "diagnosis", label: "Diagnosis", type: "text" },
      { key: "treatment", label: "Treatment / Rx", type: "text" },
      { key: "labResults", label: "Lab Results", type: "text" },
      { key: "referral", label: "Referral", type: "select", options: ["None", "Hospital", "Specialist", "Other"] },
      { key: "followUp", label: "Follow-up Date", type: "date" },
      { key: "attendingDoctor", label: "Attending Doctor", type: "text" },
      { key: "remarks", label: "Remarks", type: "text" },
    ],
    defaultData: [],
  },
  "nutrition-report": {
    title: "Nutrition Report",
    columns: [
      { key: "name", label: "Child Name", type: "text" },
      { key: "age", label: "Age (months)", type: "number", width: "100px" },
      { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
      { key: "height", label: "Height (cm)", type: "number", width: "100px" },
      { key: "status", label: "Nutritional Status", type: "select", options: ["Normal", "Underweight", "Overweight", "Severely Underweight"] },
      { key: "feeding", label: "Feeding Program", type: "checkbox" },
    ],
    defaultData: [],
  },
};

export default function FormFill() {
  const { templateId } = useParams();
  const template = formTemplates[templateId || ""] || formTemplates["family-health"];
  const [data, setData] = useState(template.defaultData);
  const [month, setMonth] = useState("February");
  const [year, setYear] = useState("2026");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/forms">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold">{template.title}</h1>
          <p className="text-sm text-muted-foreground">Fill out the form below</p>
        </div>
      </div>

      {/* Month/Year selectors */}
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Month</Label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Year</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["2024","2025","2026","2027"].map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DynamicTable columns={template.columns} data={data} onChange={setData} />

      <div className="flex flex-wrap gap-3 justify-end">
        <Button variant="outline" className="gap-1.5">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
}
