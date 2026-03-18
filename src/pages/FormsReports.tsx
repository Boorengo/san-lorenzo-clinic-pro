import { useState } from "react";
import { Save, Printer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DynamicTable, { ColumnDef } from "@/components/DynamicTable";

// ── TCL sub-types ──
const tclTypes = [
  { id: "prenatal", label: "Prenatal Care" },
  { id: "senior", label: "For Senior Citizens" },
  { id: "nutrition-1-4", label: "Nutrition & Deworming (1-4 yrs)" },
  { id: "deworming-5-9", label: "Deworming (5-9 yrs)" },
  { id: "deworming-10-19", label: "Deworming (10-19 yrs)" },
  { id: "immunization-0-12m", label: "Immunization & Nutrition (0-12 mos)" },
  { id: "pen-assessment", label: "PEN Target Client Assessment" },
  { id: "pen-cvd", label: "PEN CVD Risk Registry (≥30%)" },
];

const tclColumns: Record<string, ColumnDef[]> = {
  prenatal: [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Patient Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "address", label: "Address", type: "text" },
    { key: "lmp", label: "LMP", type: "date" },
    { key: "edc", label: "EDC", type: "date" },
    { key: "aog", label: "AOG (weeks)", type: "number", width: "90px" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "fundic", label: "Fundic Height", type: "text", width: "110px" },
    { key: "fht", label: "FHT", type: "text", width: "80px" },
    { key: "tt", label: "TT Status", type: "select", options: ["TT1", "TT2", "TT3", "TT4", "TT5", "Fully Immunized"] },
    { key: "labResults", label: "Lab Results", type: "text" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  senior: [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "address", label: "Address", type: "text" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "bloodSugar", label: "Blood Sugar", type: "text", width: "110px" },
    { key: "chiefComplaint", label: "Chief Complaint", type: "text" },
    { key: "diagnosis", label: "Diagnosis", type: "text" },
    { key: "treatment", label: "Treatment", type: "text" },
    { key: "referral", label: "Referral", type: "select", options: ["None", "Hospital", "Specialist"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "nutrition-1-4": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Child Name", type: "text" },
    { key: "age", label: "Age (mos)", type: "number", width: "90px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "height", label: "Height (cm)", type: "number", width: "100px" },
    { key: "nutritionStatus", label: "Nutritional Status", type: "select", options: ["Normal", "Underweight", "Severely Underweight", "Overweight"] },
    { key: "dewormed", label: "Dewormed", type: "checkbox" },
    { key: "dewormingDate", label: "Deworming Date", type: "date" },
    { key: "vitaminA", label: "Vitamin A", type: "checkbox" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "deworming-5-9": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "school", label: "School", type: "text" },
    { key: "gradeLevel", label: "Grade Level", type: "text", width: "100px" },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "dewormed", label: "Dewormed", type: "checkbox" },
    { key: "dose", label: "Dose", type: "select", options: ["1st Dose", "2nd Dose"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "deworming-10-19": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "school", label: "School", type: "text" },
    { key: "gradeLevel", label: "Grade/Year Level", type: "text", width: "110px" },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "dewormed", label: "Dewormed", type: "checkbox" },
    { key: "dose", label: "Dose", type: "select", options: ["1st Dose", "2nd Dose"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "immunization-0-12m": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Child Name", type: "text" },
    { key: "dob", label: "Date of Birth", type: "date" },
    { key: "age", label: "Age (mos)", type: "number", width: "90px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
    { key: "height", label: "Height (cm)", type: "number", width: "100px" },
    { key: "bcg", label: "BCG", type: "checkbox" },
    { key: "hepB", label: "Hep B", type: "checkbox" },
    { key: "pentavalent", label: "Pentavalent", type: "select", options: ["1st", "2nd", "3rd", "N/A"] },
    { key: "opv", label: "OPV", type: "select", options: ["1st", "2nd", "3rd", "N/A"] },
    { key: "ipv", label: "IPV", type: "select", options: ["1st", "2nd", "N/A"] },
    { key: "pcv", label: "PCV", type: "select", options: ["1st", "2nd", "3rd", "N/A"] },
    { key: "mmr", label: "MMR", type: "select", options: ["1st", "2nd", "N/A"] },
    { key: "nutritionStatus", label: "Nutritional Status", type: "select", options: ["Normal", "Underweight", "Severely Underweight", "Overweight"] },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "pen-assessment": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Patient Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "address", label: "Address", type: "text" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "bloodSugar", label: "Blood Sugar", type: "text", width: "110px" },
    { key: "bmi", label: "BMI", type: "number", width: "80px" },
    { key: "smoker", label: "Smoker", type: "checkbox" },
    { key: "diabetic", label: "Diabetic", type: "checkbox" },
    { key: "cvdRisk", label: "CVD Risk Score", type: "text", width: "110px" },
    { key: "riskLevel", label: "Risk Level", type: "select", options: ["Low (<10%)", "Moderate (10-20%)", "High (20-30%)", "Very High (≥30%)"] },
    { key: "treatment", label: "Treatment", type: "text" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
  "pen-cvd": [
    { key: "date", label: "Date", type: "date" },
    { key: "name", label: "Patient Name", type: "text" },
    { key: "age", label: "Age", type: "number", width: "70px" },
    { key: "sex", label: "Sex", type: "select", options: ["M", "F"] },
    { key: "address", label: "Address", type: "text" },
    { key: "bp", label: "BP", type: "text", width: "100px" },
    { key: "bloodSugar", label: "Fasting Blood Sugar", type: "text", width: "130px" },
    { key: "totalCholesterol", label: "Total Cholesterol", type: "text", width: "130px" },
    { key: "cvdRisk", label: "CVD Risk %", type: "text", width: "100px" },
    { key: "medication", label: "Medication", type: "text" },
    { key: "aspirin", label: "Aspirin", type: "checkbox" },
    { key: "statin", label: "Statin", type: "checkbox" },
    { key: "antihypertensive", label: "Anti-HPN", type: "checkbox" },
    { key: "followUp", label: "Follow-up Date", type: "date" },
    { key: "remarks", label: "Remarks", type: "text" },
  ],
};

// ── Family Health Columns ──
const familyHealthColumns: ColumnDef[] = [
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
];

// ── Nutrition Columns ──
const nutritionColumns: ColumnDef[] = [
  { key: "name", label: "Child Name", type: "text" },
  { key: "age", label: "Age (months)", type: "number", width: "100px" },
  { key: "weight", label: "Weight (kg)", type: "number", width: "100px" },
  { key: "height", label: "Height (cm)", type: "number", width: "100px" },
  { key: "status", label: "Nutritional Status", type: "select", options: ["Normal", "Underweight", "Overweight", "Severely Underweight"] },
  { key: "feeding", label: "Feeding Program", type: "checkbox" },
];

// ── FHSIS Monthly Columns ──
const fhsisColumns: ColumnDef[] = [
  { key: "indicator", label: "Health Indicator", type: "text" },
  { key: "male", label: "Male", type: "number", width: "80px" },
  { key: "female", label: "Female", type: "number", width: "80px" },
  { key: "total", label: "Total", type: "number", width: "80px" },
  { key: "target", label: "Target", type: "number", width: "80px" },
  { key: "remarks", label: "Remarks", type: "text" },
];

const fhsisDefaultData = [
  { indicator: "Prenatal Visits", male: "", female: "", total: "", target: "", remarks: "" },
  { indicator: "Immunizations Given", male: "", female: "", total: "", target: "", remarks: "" },
  { indicator: "TB Cases Treated", male: "", female: "", total: "", target: "", remarks: "" },
];

// ── Form header with month/year ──
function FormHeader({ title, description }: { title: string; description: string }) {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2026");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-card-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
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
    </div>
  );
}

function FormActions() {
  return (
    <div className="flex flex-wrap gap-3 justify-end pt-2">
      <Button variant="outline" className="gap-1.5">
        <Printer className="h-4 w-4" /> Print
      </Button>
      <Button className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
        <Save className="h-4 w-4" /> Save
      </Button>
    </div>
  );
}

// ── TCL Tab Content ──
function TCLContent() {
  const [activeTcl, setActiveTcl] = useState("prenatal");
  const [tclData, setTclData] = useState<Record<string, Record<string, any>[]>>({});

  const currentData = tclData[activeTcl] || [];
  const currentColumns = tclColumns[activeTcl] || [];
  const currentLabel = tclTypes.find(t => t.id === activeTcl)?.label || "";

  return (
    <div className="space-y-4">
      <FormHeader
        title="Target Client List (Doctor Logbook)"
        description="Select the type of TCL logbook to fill out"
      />

      {/* TCL Type Selector */}
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">TCL Type</Label>
        <Select value={activeTcl} onValueChange={setActiveTcl}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tclTypes.map(t => (
              <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
        <p className="text-sm font-medium text-primary">Currently editing: <span className="font-semibold">{currentLabel}</span></p>
      </div>

      <DynamicTable
        columns={currentColumns}
        data={currentData}
        onChange={(newData) => setTclData(prev => ({ ...prev, [activeTcl]: newData }))}
      />

      <FormActions />
    </div>
  );
}

// ── Main Forms & Reports Page ──
export default function FormsReports() {
  const [familyData, setFamilyData] = useState<Record<string, any>[]>([]);
  const [nutritionData, setNutritionData] = useState<Record<string, any>[]>([]);
  const [fhsisData, setFhsisData] = useState(fhsisDefaultData);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Forms & Reports</h1>
        <p className="text-sm text-muted-foreground">Select a form to fill out or generate reports</p>
      </div>

      <Tabs defaultValue="family-health" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1.5 rounded-lg">
          <TabsTrigger value="family-health" className="text-xs sm:text-sm">Family Health</TabsTrigger>
          <TabsTrigger value="tcl" className="text-xs sm:text-sm">Target Client List</TabsTrigger>
          <TabsTrigger value="nutrition" className="text-xs sm:text-sm">Nutrition Report</TabsTrigger>
          <TabsTrigger value="fhsis" className="text-xs sm:text-sm">FHSIS Monthly</TabsTrigger>
        </TabsList>

        {/* Family Health */}
        <TabsContent value="family-health" className="space-y-4">
          <FormHeader title="Family Health Profiling Form" description="Household-level health data collection" />
          <DynamicTable columns={familyHealthColumns} data={familyData} onChange={setFamilyData} />
          <FormActions />
        </TabsContent>

        {/* TCL */}
        <TabsContent value="tcl">
          <TCLContent />
        </TabsContent>

        {/* Nutrition */}
        <TabsContent value="nutrition" className="space-y-4">
          <FormHeader title="Nutrition Report" description="Monthly nutrition status tracking for children" />
          <DynamicTable columns={nutritionColumns} data={nutritionData} onChange={setNutritionData} />
          <FormActions />
        </TabsContent>

        {/* FHSIS */}
        <TabsContent value="fhsis" className="space-y-4">
          <FormHeader title="FHSIS Monthly Report" description="Field Health Service Information System monthly summary" />
          <DynamicTable columns={fhsisColumns} data={fhsisData} onChange={setFhsisData} />
          <FormActions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
