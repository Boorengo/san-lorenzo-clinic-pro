import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export interface ColumnDef {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "checkbox";
  options?: string[];
  width?: string;
}

interface DynamicTableProps {
  columns: ColumnDef[];
  data: Record<string, any>[];
  onChange?: (data: Record<string, any>[]) => void;
  readOnly?: boolean;
  className?: string;
}

export default function DynamicTable({
  columns,
  data,
  onChange,
  readOnly = false,
  className,
}: DynamicTableProps) {
  const updateCell = useCallback(
    (rowIndex: number, key: string, value: any) => {
      if (!onChange) return;
      const newData = data.map((row, i) =>
        i === rowIndex ? { ...row, [key]: value } : row
      );
      onChange(newData);
    },
    [data, onChange]
  );

  const addRow = () => {
    if (!onChange) return;
    const emptyRow: Record<string, any> = {};
    columns.forEach((col) => {
      emptyRow[col.key] = col.type === "checkbox" ? false : "";
    });
    onChange([...data, emptyRow]);
  };

  const removeRow = (index: number) => {
    if (!onChange) return;
    onChange(data.filter((_, i) => i !== index));
  };

  const renderCell = (row: Record<string, any>, col: ColumnDef, rowIndex: number) => {
    const value = row[col.key];

    if (readOnly) {
      if (col.type === "checkbox") return value ? "✓" : "—";
      return value || "—";
    }

    switch (col.type) {
      case "select":
        return (
          <Select value={value || ""} onValueChange={(v) => updateCell(rowIndex, col.key, v)}>
            <SelectTrigger className="h-8 border-0 bg-transparent text-sm focus:ring-1 focus:ring-ring">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {col.options?.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex justify-center">
            <Checkbox
              checked={!!value}
              onCheckedChange={(v) => updateCell(rowIndex, col.key, v)}
            />
          </div>
        );
      default:
        return (
          <Input
            type={col.type}
            value={value || ""}
            onChange={(e) => updateCell(rowIndex, col.key, e.target.value)}
            className="h-8 border-0 bg-transparent text-sm focus-visible:ring-1 focus-visible:ring-ring rounded-none"
          />
        );
    }
  };

  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden", className)}>
      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-20">
            <tr className="border-b bg-muted/50">
              <th className="sticky left-0 z-30 bg-muted/50 px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground w-10">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap bg-muted/50"
                  style={{ minWidth: col.width || "140px" }}
                >
                  {col.label}
                </th>
              ))}
              {!readOnly && (
                <th className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground w-12 bg-muted/50" />
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="sticky left-0 z-10 bg-card px-3 py-1 text-xs text-muted-foreground font-medium">
                  {rowIndex + 1}
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-1 py-0.5">
                    {renderCell(row, col, rowIndex)}
                  </td>
                ))}
                {!readOnly && (
                  <td className="px-2 py-1 text-center">
                    <button
                      onClick={() => removeRow(rowIndex)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + (readOnly ? 1 : 2)} className="px-3 py-8 text-center text-muted-foreground text-sm">
                  No data yet. {!readOnly && "Click 'Add Row' to start."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!readOnly && (
        <div className="border-t px-3 py-2">
          <Button variant="ghost" size="sm" onClick={addRow} className="text-primary hover:text-primary">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Row
          </Button>
        </div>
      )}
    </div>
  );
}
