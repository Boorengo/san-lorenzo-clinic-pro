import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ColumnDef } from "@/components/DynamicTable";
import { toast } from "sonner";

interface FormEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  columns: ColumnDef[];
  onSave: (data: Record<string, any>) => void;
}

export default function FormEntryModal({
  open,
  onOpenChange,
  title,
  description,
  columns,
  onSave,
}: FormEntryModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    columns.forEach((col) => {
      initial[col.key] = col.type === "checkbox" ? false : "";
    });
    return initial;
  });

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    // Reset form
    const reset: Record<string, any> = {};
    columns.forEach((col) => {
      reset[col.key] = col.type === "checkbox" ? false : "";
    });
    setFormData(reset);
    onOpenChange(false);
    toast.success("Record saved successfully!");
  };

  const renderField = (col: ColumnDef) => {
    const value = formData[col.key];

    switch (col.type) {
      case "select":
        return (
          <Select value={value || ""} onValueChange={(v) => updateField(col.key, v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {col.options?.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2 h-10">
            <Checkbox
              checked={!!value}
              onCheckedChange={(v) => updateField(col.key, v)}
              id={`field-${col.key}`}
            />
            <Label htmlFor={`field-${col.key}`} className="text-sm cursor-pointer">
              Yes
            </Label>
          </div>
        );
      default:
        return (
          <Input
            type={col.type}
            value={value || ""}
            onChange={(e) => updateField(col.key, e.target.value)}
            placeholder={`Enter ${col.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {columns.map((col) => (
            <div
              key={col.key}
              className={
                col.type === "text" && !col.width
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <Label className="text-sm font-medium text-foreground mb-1.5 block">
                {col.label}
              </Label>
              {renderField(col)}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="healthcare-gradient text-primary-foreground border-0 gap-1.5">
            <Save className="h-4 w-4" /> Save Record
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
