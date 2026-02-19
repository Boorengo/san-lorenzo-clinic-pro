import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "success" | "warning" | "info" | "destructive";
}

const variantStyles: Record<string, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-accent text-accent-foreground",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
  destructive: "bg-destructive/10 text-destructive",
};

export default function SummaryCard({
  title,
  value,
  icon: Icon,
  description,
  variant = "default",
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1.5 font-display text-2xl font-bold text-card-foreground">{value}</p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn("rounded-lg p-2.5", variantStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
