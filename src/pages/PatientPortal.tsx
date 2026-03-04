import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, User, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Block definitions based on the territorial map
const blocks: BlockDef[] = [
  // Row 1 (top)
  { id: "E-14", label: "E-14", lots: 5, x: 0, y: 0, w: 2, h: 1, color: "bg-red-400" },
  { id: "E-15", label: "E-15", lots: 15, x: 2, y: 0, w: 3, h: 1, color: "bg-orange-300" },
  { id: "E-11", label: "E-11", lots: 12, x: 5, y: 0, w: 2, h: 1, color: "bg-green-400" },
  { id: "F-11", label: "F-11", lots: 10, x: 7, y: 0, w: 2, h: 1, color: "bg-yellow-200" },
  { id: "F-13", label: "F-13", lots: 17, x: 9, y: 0, w: 2, h: 1, color: "bg-teal-700" },
  { id: "F-15", label: "F-15", lots: 10, x: 11, y: 0, w: 2, h: 1, color: "bg-red-500" },
  { id: "F-17", label: "F-17", lots: 8, x: 13, y: 0, w: 2, h: 1, color: "bg-yellow-500" },

  // Row 2
  { id: "E-12", label: "E-12", lots: 7, x: 0, y: 1, w: 2, h: 1, color: "bg-teal-700" },
  { id: "E-6", label: "E-6", lots: 6, x: 2, y: 1, w: 1, h: 1, color: "bg-yellow-400" },
  { id: "E-7", label: "E-7", lots: 15, x: 3, y: 1, w: 2, h: 1, color: "bg-green-500" },
  { id: "E-9", label: "E-9", lots: 9, x: 5, y: 1, w: 2, h: 1, color: "bg-sky-300" },
  { id: "F-6", label: "F-6", lots: 20, x: 7, y: 1, w: 2, h: 1, color: "bg-red-500" },
  { id: "F-10", label: "F-10", lots: 10, x: 9, y: 1, w: 2, h: 1, color: "bg-yellow-300" },
  { id: "F-9", label: "F-9", lots: 9, x: 11, y: 1, w: 2, h: 1, color: "bg-green-400" },
  { id: "F-16", label: "F-16", lots: 6, x: 13, y: 1, w: 2, h: 1, color: "bg-sky-200" },

  // Row 3
  { id: "E-3", label: "E-3", lots: 6, x: 0, y: 2, w: 2, h: 1, color: "bg-pink-300" },
  { id: "E-5", label: "E-5", lots: 10, x: 2, y: 2, w: 2, h: 1, color: "bg-lime-400" },
  { id: "E-2", label: "E-2", lots: 13, x: 0, y: 3, w: 3, h: 1, color: "bg-orange-200" },
  { id: "F-5", label: "F-5", lots: 17, x: 5, y: 3, w: 3, h: 1, color: "bg-yellow-400" },
  { id: "F-4", label: "F-4", lots: 10, x: 8, y: 3, w: 2, h: 1, color: "bg-sky-400" },
  { id: "F-3", label: "F-3", lots: 10, x: 10, y: 3, w: 2, h: 1, color: "bg-pink-300" },
];

interface BlockDef {
  id: string;
  label: string;
  lots: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

export default function PatientPortal() {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState<BlockDef | null>(null);
  const [selectedLot, setSelectedLot] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleBlockClick = (block: BlockDef) => {
    setSelectedBlock(block);
    setSelectedLot("");
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(`Information saved for Block ${selectedBlock?.label}, Lot ${selectedLot}`);
    setModalOpen(false);
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
            <p className="text-xs text-muted-foreground">Click on your block below to register or update your information.</p>
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

          {/* Grid Map */}
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-15 gap-1.5 sm:gap-2">
            {blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => handleBlockClick(block)}
                className={`
                  relative group rounded-lg border-2 border-border/50
                  p-2 sm:p-3 transition-all duration-200
                  hover:scale-105 hover:shadow-lg hover:border-primary hover:z-10
                  active:scale-95 cursor-pointer
                  col-span-1
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
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Block {selectedBlock?.label}
            </DialogTitle>
            <DialogDescription>
              Enter your lot number and personal information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Block & Lot */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Block</Label>
                <Input value={selectedBlock?.label || ""} readOnly className="bg-muted" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Lot Number</Label>
                <Select value={selectedLot} onValueChange={setSelectedLot} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lot" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedBlock &&
                      Array.from({ length: selectedBlock.lots }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          Lot {i + 1}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">First Name</Label>
                  <Input required placeholder="Juan" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Last Name</Label>
                  <Input required placeholder="Dela Cruz" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Date of Birth</Label>
                  <Input type="date" required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Sex</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Contact Number</Label>
                <Input type="tel" required placeholder="09171234567" />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="healthcare-gradient text-primary-foreground border-0">
                <User className="h-4 w-4 mr-1" />
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
