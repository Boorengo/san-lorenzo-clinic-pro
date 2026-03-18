import { useState } from "react";
import { Plus, Search, Package, AlertTriangle, XCircle, CheckCircle, Edit, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

type InventoryItem = {
  id: string;
  name: string;
  category: "Medicine" | "Vaccine" | "Supply" | "Equipment";
  quantity: number;
  maxStock: number;
  unit: string;
  expiry: string;
  status: "Available" | "Low Stock" | "Out of Stock" | "Expired";
  batchNo: string;
  supplier: string;
  lastRestocked: string;
};

const mockInventory: InventoryItem[] = [
  { id: "1", name: "Amoxicillin 500mg", category: "Medicine", quantity: 120, maxStock: 200, unit: "capsules", expiry: "2027-06-15", status: "Available", batchNo: "AMX-2025-001", supplier: "PharmaCo", lastRestocked: "2026-02-01" },
  { id: "2", name: "Paracetamol 250mg", category: "Medicine", quantity: 8, maxStock: 150, unit: "tablets", expiry: "2026-04-01", status: "Low Stock", batchNo: "PCT-2025-042", supplier: "MedSupply Inc", lastRestocked: "2026-01-15" },
  { id: "3", name: "BCG Vaccine", category: "Vaccine", quantity: 5, maxStock: 50, unit: "vials", expiry: "2026-03-20", status: "Low Stock", batchNo: "BCG-2025-010", supplier: "DOH Central", lastRestocked: "2025-12-10" },
  { id: "4", name: "OPV Vaccine", category: "Vaccine", quantity: 45, maxStock: 60, unit: "vials", expiry: "2027-01-10", status: "Available", batchNo: "OPV-2025-008", supplier: "DOH Central", lastRestocked: "2026-02-20" },
  { id: "5", name: "Mefenamic Acid 500mg", category: "Medicine", quantity: 0, maxStock: 100, unit: "capsules", expiry: "2025-12-01", status: "Expired", batchNo: "MFA-2024-019", supplier: "PharmaCo", lastRestocked: "2025-06-01" },
  { id: "6", name: "Hepatitis B Vaccine", category: "Vaccine", quantity: 30, maxStock: 50, unit: "vials", expiry: "2027-08-22", status: "Available", batchNo: "HBV-2025-015", supplier: "DOH Central", lastRestocked: "2026-01-25" },
  { id: "7", name: "Alcohol 70%", category: "Supply", quantity: 25, maxStock: 50, unit: "bottles", expiry: "2028-01-01", status: "Available", batchNo: "ALC-2025-003", supplier: "MedSupply Inc", lastRestocked: "2026-02-10" },
  { id: "8", name: "Disposable Syringes", category: "Supply", quantity: 0, maxStock: 500, unit: "pieces", expiry: "2029-01-01", status: "Out of Stock", batchNo: "SYR-2025-020", supplier: "MedSupply Inc", lastRestocked: "2025-11-20" },
  { id: "9", name: "Digital Thermometer", category: "Equipment", quantity: 3, maxStock: 10, unit: "units", expiry: "N/A", status: "Low Stock", batchNo: "THR-2024-002", supplier: "MedEquip", lastRestocked: "2025-08-15" },
  { id: "10", name: "Losartan 50mg", category: "Medicine", quantity: 200, maxStock: 300, unit: "tablets", expiry: "2027-11-30", status: "Available", batchNo: "LSR-2025-011", supplier: "PharmaCo", lastRestocked: "2026-03-01" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  Available: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" },
  "Low Stock": { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
  "Out of Stock": { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10 text-destructive border-destructive/20" },
  Expired: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10 text-destructive border-destructive/20" },
};

const categories = ["All", "Medicine", "Vaccine", "Supply", "Equipment"] as const;

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState(mockInventory);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filtered = items.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.batchNo.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || i.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const stats = {
    total: items.length,
    available: items.filter(i => i.status === "Available").length,
    lowStock: items.filter(i => i.status === "Low Stock").length,
    expired: items.filter(i => i.status === "Expired" || i.status === "Out of Stock").length,
  };

  const handleMarkUsed = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newQty = Math.max(0, item.quantity - 1);
      let status: InventoryItem["status"] = item.status;
      if (newQty === 0) status = "Out of Stock";
      else if (newQty <= item.maxStock * 0.15) status = "Low Stock";
      return { ...item, quantity: newQty, status };
    }));
    toast({ title: "Item used", description: "Stock quantity updated." });
  };

  const handleRestock = (id: string, amount: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newQty = Math.min(item.maxStock, item.quantity + amount);
      return { ...item, quantity: newQty, status: newQty > item.maxStock * 0.15 ? "Available" : "Low Stock", lastRestocked: new Date().toISOString().split("T")[0] };
    }));
    toast({ title: "Restocked", description: `Added ${amount} units.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Inventory Management</h1>
          <p className="text-sm text-muted-foreground">Track medicines, vaccines, supplies & equipment</p>
        </div>
        <Button className="healthcare-gradient text-primary-foreground border-0">
          <Plus className="mr-1.5 h-4 w-4" /> Add Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Package} label="Total Items" value={stats.total} color="text-primary" bg="bg-primary/10" />
        <StatsCard icon={CheckCircle} label="Available" value={stats.available} color="text-emerald-600" bg="bg-emerald-500/10" />
        <StatsCard icon={AlertTriangle} label="Low Stock" value={stats.lowStock} color="text-amber-600" bg="bg-amber-500/10" />
        <StatsCard icon={XCircle} label="Expired / Out" value={stats.expired} color="text-destructive" bg="bg-destructive/10" />
      </div>

      {/* Category Tabs + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="h-auto flex-wrap gap-1">
            {categories.map(c => (
              <TabsTrigger key={c} value={c} className="text-xs sm:text-sm">{c}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or batch..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Item</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Stock Level</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">Batch No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden lg:table-cell">Expiry</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const sc = statusConfig[item.status];
                const StatusIcon = sc.icon;
                const stockPercent = item.maxStock > 0 ? (item.quantity / item.maxStock) * 100 : 0;
                return (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-card-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">{item.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs font-normal">{item.category}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1 min-w-[120px]">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">{item.quantity}</span>
                          <span className="text-muted-foreground">/ {item.maxStock} {item.unit}</span>
                        </div>
                        <Progress value={stockPercent} className="h-1.5" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell font-mono">{item.batchNo}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{item.expiry}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${sc.bg}`}>
                        <StatusIcon className="h-3 w-3" />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          disabled={item.status === "Expired"}
                          onClick={() => handleMarkUsed(item.id)}
                        >
                          <TrendingDown className="h-3 w-3 mr-1" /> Use
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs h-7" disabled={item.status === "Expired"}>
                              <TrendingUp className="h-3 w-3 mr-1" /> Restock
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Restock {item.name}</DialogTitle>
                            </DialogHeader>
                            <RestockForm item={item} onRestock={(amount) => handleRestock(item.id, amount)} />
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { setSelectedItem(item); setDialogOpen(true); }}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Category" value={selectedItem.category} />
              <Detail label="Batch No." value={selectedItem.batchNo} />
              <Detail label="Quantity" value={`${selectedItem.quantity} / ${selectedItem.maxStock} ${selectedItem.unit}`} />
              <Detail label="Expiry" value={selectedItem.expiry} />
              <Detail label="Supplier" value={selectedItem.supplier} />
              <Detail label="Last Restocked" value={selectedItem.lastRestocked} />
              <Detail label="Status" value={selectedItem.status} />
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value, color, bg }: { icon: typeof Package; label: string; value: number; color: string; bg: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
      <div className={`rounded-lg p-2.5 ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-card-foreground">{value}</p>
    </div>
  );
}

function RestockForm({ item, onRestock }: { item: InventoryItem; onRestock: (n: number) => void }) {
  const [amount, setAmount] = useState("10");
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>Amount to add ({item.unit})</Label>
        <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} min="1" max={item.maxStock - item.quantity} />
        <p className="text-xs text-muted-foreground">Current: {item.quantity} / Max: {item.maxStock}</p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="healthcare-gradient text-primary-foreground border-0" onClick={() => onRestock(Number(amount))}>
            Confirm Restock
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
