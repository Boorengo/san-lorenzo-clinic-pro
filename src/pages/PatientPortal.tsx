import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, User, Home, MapPin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlockDef {
  id: string;
  label: string;
  lots: number;
  color: string;
}

const blocks: BlockDef[] = [
  { id: "E-2", label: "E-2", lots: 13, color: "bg-orange-200" },
  { id: "E-3", label: "E-3", lots: 6, color: "bg-pink-300" },
  { id: "E-5", label: "E-5", lots: 10, color: "bg-lime-400" },
  { id: "E-6", label: "E-6", lots: 6, color: "bg-yellow-400" },
  { id: "E-7", label: "E-7", lots: 15, color: "bg-green-500" },
  { id: "E-9", label: "E-9", lots: 9, color: "bg-sky-300" },
  { id: "E-11", label: "E-11", lots: 12, color: "bg-green-400" },
  { id: "E-12", label: "E-12", lots: 7, color: "bg-teal-700" },
  { id: "E-14", label: "E-14", lots: 5, color: "bg-red-400" },
  { id: "E-15", label: "E-15", lots: 15, color: "bg-orange-300" },
  { id: "F-3", label: "F-3", lots: 10, color: "bg-pink-300" },
  { id: "F-4", label: "F-4", lots: 10, color: "bg-sky-400" },
  { id: "F-5", label: "F-5", lots: 17, color: "bg-yellow-400" },
  { id: "F-6", label: "F-6", lots: 20, color: "bg-red-500" },
  { id: "F-9", label: "F-9", lots: 9, color: "bg-green-400" },
  { id: "F-10", label: "F-10", lots: 10, color: "bg-yellow-300" },
  { id: "F-11", label: "F-11", lots: 10, color: "bg-yellow-200" },
  { id: "F-13", label: "F-13", lots: 17, color: "bg-teal-700" },
  { id: "F-15", label: "F-15", lots: 10, color: "bg-red-500" },
  { id: "F-16", label: "F-16", lots: 6, color: "bg-sky-200" },
  { id: "F-17", label: "F-17", lots: 8, color: "bg-yellow-500" },
];

interface HouseholdMember {
  name: string;
  relation: string;
  age: string;
  sex: string;
  dob: string;
  contact: string;
  philhealth: string;
  healthStatus: string[];
  occupation: string;
  fpMethod: string;
  vaccineStatus: string;
  ficDate: string;
  defaulter: boolean;
  vitADeworming: boolean;
  pregnant: boolean;
  bp: string;
  weight: string;
  height: string;
  bmi: string;
  diagnosis: string;
  remarks: string;
}

const healthStatusOptions = [
  "Normal", "TB Patient", "Malaria", "Filariasis", "Altapresyon",
  "Diabetes", "Sakit sa Puso", "PWD", "Buntis",
];

const emptyMember = (): HouseholdMember => ({
  name: "", relation: "", age: "", sex: "", dob: "", contact: "",
  philhealth: "", healthStatus: [], occupation: "", fpMethod: "",
  vaccineStatus: "", ficDate: "", defaulter: false, vitADeworming: false,
  pregnant: false, bp: "", weight: "", height: "", bmi: "", diagnosis: "", remarks: "",
});

export default function PatientPortal() {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState<BlockDef | null>(null);
  const [selectedLot, setSelectedLot] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [members, setMembers] = useState<HouseholdMember[]>([emptyMember()]);

  const handleBlockClick = (block: BlockDef) => {
    setSelectedBlock(block);
    setSelectedLot("");
    setModalOpen(true);
  };

  const resetForm = () => {
    setMembers([emptyMember()]);
  };

  const updateMember = (index: number, field: keyof HouseholdMember, value: any) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "weight" || field === "height") {
      const w = parseFloat(field === "weight" ? value : updated[index].weight);
      const h = parseFloat(field === "height" ? value : updated[index].height) / 100;
      if (w > 0 && h > 0) {
        updated[index].bmi = (w / (h * h)).toFixed(1);
      }
    }
    setMembers(updated);
  };

  const toggleHealthStatus = (index: number, status: string) => {
    const current = members[index].healthStatus || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    updateMember(index, "healthStatus", updated);
  };

  const addMember = () => setMembers([...members, emptyMember()]);

  const removeMember = (index: number) => {
    if (members.length > 1) setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(`Family health profile saved for Block ${selectedBlock?.label}, Lot ${selectedLot}`);
    setModalOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
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

      {/* Instructions */}
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-semibold text-card-foreground">Select Your Home on the Map</p>
            <p className="text-xs text-muted-foreground">Click on your block below to register your family health profile.</p>
          </div>
        </div>
      </div>

      {/* Interactive Map Grid */}
      <div className="mx-auto max-w-6xl p-4">
        <div className="rounded-xl border bg-card p-4 sm:p-6">
          <h2 className="font-display text-center text-lg font-bold text-card-foreground mb-1">
            SAN LORENZO RUIZ I
          </h2>
          <p className="text-center text-xs text-muted-foreground mb-4">TERRITORIAL MAP</p>

          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-11 gap-1.5 sm:gap-2">
            {blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => handleBlockClick(block)}
                className={`
                  relative group rounded-lg border-2 border-border/50
                  p-2 sm:p-3 transition-all duration-200
                  hover:scale-105 hover:shadow-lg hover:border-primary hover:z-10
                  active:scale-95 cursor-pointer col-span-1
                  ${block.color} bg-opacity-80 hover:bg-opacity-100
                `}
                title={`Block ${block.label} — ${block.lots} lots`}
              >
                <div className="flex flex-col items-center justify-center min-h-[3.5rem] sm:min-h-[4.5rem]">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/70 mb-1 group-hover:text-foreground" />
                  <span className="text-[10px] sm:text-xs font-bold text-foreground/90 leading-tight">
                    {block.label}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-foreground/60 leading-tight">
                    {block.lots} lots
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-[10px] text-muted-foreground mt-4">
            Francisco Barzaga Street
          </p>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 flex flex-col overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Family Health Profile — Block {selectedBlock?.label}
            </DialogTitle>
            <DialogDescription>
              Register all household members. This maps directly to the Family Health Profiling Form.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <ScrollArea className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(90vh - 12rem)" }}>
              <div className="px-6 pb-4 space-y-4">
                {/* Block/Lot selector */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Block</Label>
                    <Input value={selectedBlock?.label || ""} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Lot Number</Label>
                    <Select value={selectedLot} onValueChange={setSelectedLot} required>
                      <SelectTrigger><SelectValue placeholder="Select lot" /></SelectTrigger>
                      <SelectContent>
                        {selectedBlock && Array.from({ length: selectedBlock.lots }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>Lot {i + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Members */}
                {members.map((member, idx) => (
                  <div key={idx} className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-card-foreground">
                        {idx === 0 ? "👤 Your Information" : `👥 Family Member ${idx}`}
                      </span>
                      {idx > 0 && (
                        <Button type="button" variant="ghost" size="sm" className="text-xs text-destructive h-6 gap-1" onClick={() => removeMember(idx)}>
                          <Trash2 className="h-3 w-3" /> Remove
                        </Button>
                      )}
                    </div>

                    {/* Personal fields */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Full Name</Label>
                        <Input required placeholder="Full name" value={member.name} onChange={e => updateMember(idx, "name", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Relation</Label>
                        <Select value={member.relation} onValueChange={v => updateMember(idx, "relation", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {["Head", "Spouse", "Child", "Parent", "Sibling", "Other"].map(r => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Date of Birth</Label>
                        <Input type="date" value={member.dob} onChange={e => updateMember(idx, "dob", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Age</Label>
                        <Input type="number" placeholder="Age" value={member.age} onChange={e => updateMember(idx, "age", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Sex</Label>
                        <Select value={member.sex} onValueChange={v => updateMember(idx, "sex", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Contact Number</Label>
                        <Input type="tel" placeholder="09171234567" value={member.contact} onChange={e => updateMember(idx, "contact", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Unique PhilHealth Number</Label>
                        <Input placeholder="PhilHealth #" value={member.philhealth} onChange={e => updateMember(idx, "philhealth", e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Occupation / School Year</Label>
                        <Input placeholder="e.g. Driver, Grade 5" value={member.occupation} onChange={e => updateMember(idx, "occupation", e.target.value)} />
                      </div>
                    </div>

                    {/* Health Status */}
                    <div className="border-t pt-3 mt-2">
                      <p className="text-[11px] font-medium text-muted-foreground mb-2">Health Status</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {healthStatusOptions.map(status => (
                          <div key={status} className="flex items-center gap-1.5">
                            <Checkbox
                              checked={(member.healthStatus || []).includes(status)}
                              onCheckedChange={() => toggleHealthStatus(idx, status)}
                            />
                            <Label className="text-xs">{status}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Health vitals */}
                    <div className="border-t pt-3 mt-2">
                      <p className="text-[11px] font-medium text-muted-foreground mb-2">Health Information</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Blood Pressure</Label>
                          <Input placeholder="120/80" value={member.bp} onChange={e => updateMember(idx, "bp", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Weight (kg)</Label>
                          <Input type="number" placeholder="65" value={member.weight} onChange={e => updateMember(idx, "weight", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Height (cm)</Label>
                          <Input type="number" placeholder="165" value={member.height} onChange={e => updateMember(idx, "height", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">BMI</Label>
                          <Input value={member.bmi} readOnly className="bg-muted" placeholder="Auto" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">FP Method</Label>
                          <Select value={member.fpMethod} onValueChange={v => updateMember(idx, "fpMethod", v)}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              {["None", "Pills", "IUD", "Condom", "Injectable", "Implant", "LAM", "BTL", "Vasectomy", "SDM", "Other"].map(m => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Vaccine Status</Label>
                          <Select value={member.vaccineStatus} onValueChange={v => updateMember(idx, "vaccineStatus", v)}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              {["Fully Immunized", "Partially Immunized", "Not Immunized", "Unknown"].map(v => (
                                <SelectItem key={v} value={v}>{v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">FIC Date</Label>
                          <Input type="date" value={member.ficDate} onChange={e => updateMember(idx, "ficDate", e.target.value)} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                        <div className="flex items-center gap-2">
                          <Checkbox checked={member.pregnant} onCheckedChange={v => updateMember(idx, "pregnant", v === true)} />
                          <Label className="text-xs">Pregnant</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={member.defaulter} onCheckedChange={v => updateMember(idx, "defaulter", v === true)} />
                          <Label className="text-xs">Defaulter</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={member.vitADeworming} onCheckedChange={v => updateMember(idx, "vitADeworming", v === true)} />
                          <Label className="text-xs">Received Vit. A and Deworming</Label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Diagnosis / Condition</Label>
                          <Input placeholder="e.g. Hypertension, None" value={member.diagnosis} onChange={e => updateMember(idx, "diagnosis", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Remarks</Label>
                          <Input placeholder="Additional notes" value={member.remarks} onChange={e => updateMember(idx, "remarks", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" size="sm" onClick={addMember} className="w-full gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Add Family Member
                </Button>
              </div>
            </ScrollArea>

            <DialogFooter className="px-6 py-4 border-t">
              <Button type="button" variant="outline" onClick={() => { setModalOpen(false); resetForm(); }}>
                Cancel
              </Button>
              <Button type="submit" className="healthcare-gradient text-primary-foreground border-0">
                <User className="h-4 w-4 mr-1" />
                Submit Profile
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
