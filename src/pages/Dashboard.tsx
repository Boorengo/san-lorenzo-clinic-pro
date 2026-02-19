import SummaryCard from "@/components/SummaryCard";
import { Users, FileText, Syringe, AlertTriangle, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jan", patients: 42 },
  { month: "Feb", patients: 38 },
  { month: "Mar", patients: 55 },
  { month: "Apr", patients: 47 },
  { month: "May", patients: 61 },
  { month: "Jun", patients: 53 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of Barangay Health Center operations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Patients" value={248} icon={Users} description="+12 this month" variant="success" />
        <SummaryCard title="Active Forms" value={15} icon={FileText} description="3 pending review" variant="info" />
        <SummaryCard title="Immunizations" value={89} icon={Syringe} description="This month" variant="default" />
        <SummaryCard title="Low Stock Alerts" value={4} icon={AlertTriangle} description="Items need restocking" variant="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Chart */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold text-card-foreground mb-4">Patient Visits</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(210 10% 46%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(210 10% 46%)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(210 15% 90%)",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
                <Bar dataKey="patients" fill="hsl(152 55% 42%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expiring Medicines */}
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold text-card-foreground mb-4">Expiring Medicines</h3>
          <div className="space-y-3">
            {[
              { name: "Amoxicillin 500mg", expiry: "2026-03-15", qty: 24 },
              { name: "Paracetamol 250mg", expiry: "2026-04-01", qty: 50 },
              { name: "BCG Vaccine", expiry: "2026-03-20", qty: 8 },
              { name: "OPV Vaccine", expiry: "2026-05-10", qty: 15 },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Expires: {item.expiry}</p>
                </div>
                <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
                  {item.qty} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
