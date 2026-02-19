import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  expiry: string;
  status: "Available" | "Low Stock" | "Expired";
};

const mockInventory: InventoryItem[] = [
  { id: "1", name: "Amoxicillin 500mg", category: "Medicine", quantity: 120, expiry: "2027-06-15", status: "Available" },
  { id: "2", name: "Paracetamol 250mg", category: "Medicine", quantity: 8, expiry: "2026-04-01", status: "Low Stock" },
  { id: "3", name: "BCG Vaccine", category: "Vaccine", quantity: 5, expiry: "2026-03-20", status: "Low Stock" },
  { id: "4", name: "OPV Vaccine", category: "Vaccine", quantity: 45, expiry: "2027-01-10", status: "Available" },
  { id: "5", name: "Mefenamic Acid 500mg", category: "Medicine", quantity: 0, expiry: "2025-12-01", status: "Expired" },
  { id: "6", name: "Hepatitis B Vaccine", category: "Vaccine", quantity: 30, expiry: "2027-08-22", status: "Available" },
];

const statusStyles: Record<string, string> = {
  Available: "bg-accent text-accent-foreground",
  "Low Stock": "bg-warning/10 text-warning",
  Expired: "bg-destructive/10 text-destructive",
};

export default function Inventory() {
  const [search, setSearch] = useState("");

  const filtered = mockInventory.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground">Manage medicines and vaccines</p>
        </div>
        <Button className="healthcare-gradient text-primary-foreground border-0">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">Expiry Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-card-foreground">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                  <td className="px-4 py-3 text-card-foreground font-medium">{item.quantity}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{item.expiry}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" size="sm" disabled={item.status === "Expired"}>
                      Mark Used
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
