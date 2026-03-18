import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Eye, Edit, Users, Baby, UserCheck, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type PatientCategory = "All" | "Prenatal" | "Infant" | "Child" | "Senior" | "General";

type Patient = {
  id: string;
  name: string;
  age: number;
  sex: "M" | "F";
  address: string;
  contact: string;
  lastVisit: string;
  category: PatientCategory;
};

const mockPatients: Patient[] = [
  { id: "1", name: "Maria Santos", age: 34, sex: "F", address: "Blk 5 Lot 12", contact: "09171234567", lastVisit: "2026-02-10", category: "Prenatal" },
  { id: "2", name: "Juan Dela Cruz", age: 45, sex: "M", address: "Blk 3 Lot 8", contact: "09181234567", lastVisit: "2026-02-14", category: "General" },
  { id: "3", name: "Ana Reyes", age: 28, sex: "F", address: "Blk 7 Lot 1", contact: "09191234567", lastVisit: "2026-01-22", category: "Prenatal" },
  { id: "4", name: "Pedro Garcia", age: 62, sex: "M", address: "Blk 1 Lot 5", contact: "09201234567", lastVisit: "2026-02-18", category: "Senior" },
  { id: "5", name: "Rosa Mendoza", age: 19, sex: "F", address: "Blk 9 Lot 3", contact: "09211234567", lastVisit: "2026-02-01", category: "General" },
  { id: "6", name: "Baby Lim", age: 0, sex: "M", address: "Blk 2 Lot 7", contact: "09221234567", lastVisit: "2026-03-05", category: "Infant" },
  { id: "7", name: "Carlo Reyes", age: 6, sex: "M", address: "Blk 7 Lot 1", contact: "09191234567", lastVisit: "2026-02-28", category: "Child" },
  { id: "8", name: "Lola Carmen", age: 78, sex: "F", address: "Blk 4 Lot 2", contact: "09231234567", lastVisit: "2026-03-10", category: "Senior" },
  { id: "9", name: "Sofia Torres", age: 3, sex: "F", address: "Blk 6 Lot 9", contact: "09241234567", lastVisit: "2026-03-01", category: "Child" },
  { id: "10", name: "Baby Santos", age: 0, sex: "F", address: "Blk 5 Lot 12", contact: "09171234567", lastVisit: "2026-03-12", category: "Infant" },
];

const categoryConfig: Record<PatientCategory, { icon: typeof Users; color: string }> = {
  All: { icon: Users, color: "bg-primary/10 text-primary" },
  Prenatal: { icon: Heart, color: "bg-pink-500/10 text-pink-600" },
  Infant: { icon: Baby, color: "bg-sky-500/10 text-sky-600" },
  Child: { icon: Users, color: "bg-amber-500/10 text-amber-600" },
  Senior: { icon: UserCheck, color: "bg-violet-500/10 text-violet-600" },
  General: { icon: Users, color: "bg-emerald-500/10 text-emerald-600" },
};

const allCategories: PatientCategory[] = ["All", "Prenatal", "Infant", "Child", "Senior", "General"];

export default function Patients() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<PatientCategory>("All");

  const filtered = mockPatients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const counts = allCategories.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? mockPatients.length : mockPatients.filter(p => p.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Patients</h1>
          <p className="text-sm text-muted-foreground">{mockPatients.length} registered patients</p>
        </div>
        <Button className="healthcare-gradient text-primary-foreground border-0">
          <Plus className="mr-1.5 h-4 w-4" /> Add Patient
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {allCategories.map(cat => {
          const cfg = categoryConfig[cat];
          const Icon = cfg.icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl border p-3 text-center transition-all hover:shadow-sm ${activeCategory === cat ? "border-primary ring-1 ring-primary bg-primary/5" : "bg-card"}`}
            >
              <div className={`mx-auto mb-1.5 w-8 h-8 rounded-lg flex items-center justify-center ${cfg.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-lg font-bold text-card-foreground">{counts[cat]}</p>
              <p className="text-[10px] text-muted-foreground">{cat}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Age</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Sex</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">Address</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden lg:table-cell">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">Last Visit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cfg = categoryConfig[p.category];
                return (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-card-foreground">{p.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`text-xs font-normal ${cfg.color}`}>
                        {p.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.age}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.sex}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.address}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{p.contact}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.lastVisit}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/dashboard/patients/${p.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                        </Link>
                        <Link to={`/dashboard/patients/${p.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit className="h-4 w-4" /></Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No patients found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
