import { BarChart3, TrendingUp, Users, Activity, Calendar, PieChart as PieIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import SummaryCard from "@/components/SummaryCard";

const visitTrend = [
  { m: "Jan", visits: 142, immun: 42 },
  { m: "Feb", visits: 158, immun: 38 },
  { m: "Mar", visits: 195, immun: 55 },
  { m: "Apr", visits: 172, immun: 47 },
  { m: "May", visits: 231, immun: 61 },
  { m: "Jun", visits: 208, immun: 53 },
  { m: "Jul", visits: 245, immun: 67 },
];

const diagnoses = [
  { name: "URI", value: 34, color: "hsl(152 55% 42%)" },
  { name: "Hypertension", value: 22, color: "hsl(210 80% 55%)" },
  { name: "Diabetes", value: 14, color: "hsl(38 92% 55%)" },
  { name: "Skin", value: 12, color: "hsl(0 72% 60%)" },
  { name: "Other", value: 18, color: "hsl(210 10% 60%)" },
];

const ageGroups = [
  { g: "0-5", n: 84 },
  { g: "6-17", n: 132 },
  { g: "18-35", n: 214 },
  { g: "36-59", n: 187 },
  { g: "60+", n: 96 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Insights across patient visits, programs, and inventory</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Monthly Visits" value={245} icon={Activity} description="+18% vs last month" variant="success" />
        <SummaryCard title="New Patients" value={38} icon={Users} description="This month" variant="info" />
        <SummaryCard title="Immunization Rate" value="92%" icon={TrendingUp} description="Target: 95%" variant="warning" />
        <SummaryCard title="Avg. Wait Time" value="14m" icon={Calendar} description="-2m vs last month" variant="default" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" /> Visits vs Immunizations
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="m" className="text-xs" tick={{ fill: "hsl(210 10% 46%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(210 10% 46%)" }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(210 15% 90%)", borderRadius: "0.5rem", fontSize: "0.75rem" }} />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                <Line type="monotone" dataKey="visits" stroke="hsl(152 55% 42%)" strokeWidth={2} />
                <Line type="monotone" dataKey="immun" stroke="hsl(210 80% 55%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-primary" /> Top Diagnoses
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diagnoses} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={2}>
                  {diagnoses.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(210 15% 90%)", borderRadius: "0.5rem", fontSize: "0.75rem" }} />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 lg:col-span-2">
          <h3 className="font-display text-sm font-semibold mb-4">Patients by Age Group</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroups}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="g" className="text-xs" tick={{ fill: "hsl(210 10% 46%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(210 10% 46%)" }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(210 15% 90%)", borderRadius: "0.5rem", fontSize: "0.75rem" }} />
                <Bar dataKey="n" fill="hsl(152 55% 42%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
