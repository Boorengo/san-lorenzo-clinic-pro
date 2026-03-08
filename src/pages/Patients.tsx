import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Eye, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockPatients = [
  { id: "1", name: "Maria Santos", age: 34, sex: "F", address: "Blk 5 Lot 12", contact: "09171234567", lastVisit: "2026-02-10" },
  { id: "2", name: "Juan Dela Cruz", age: 45, sex: "M", address: "Blk 3 Lot 8", contact: "09181234567", lastVisit: "2026-02-14" },
  { id: "3", name: "Ana Reyes", age: 28, sex: "F", address: "Blk 7 Lot 1", contact: "09191234567", lastVisit: "2026-01-22" },
  { id: "4", name: "Pedro Garcia", age: 62, sex: "M", address: "Blk 1 Lot 5", contact: "09201234567", lastVisit: "2026-02-18" },
  { id: "5", name: "Rosa Mendoza", age: 19, sex: "F", address: "Blk 9 Lot 3", contact: "09211234567", lastVisit: "2026-02-01" },
];

export default function Patients() {
  const [search, setSearch] = useState("");

  const filtered = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Patients</h1>
          <p className="text-sm text-muted-foreground">{mockPatients.length} registered patients</p>
        </div>
        <Button className="healthcare-gradient text-primary-foreground border-0">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Age</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Sex</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">Address</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden lg:table-cell">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">Last Visit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-card-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.age}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.sex}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.address}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{p.contact}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.lastVisit}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/dashboard/patients/${p.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/dashboard/patients/${p.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
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
