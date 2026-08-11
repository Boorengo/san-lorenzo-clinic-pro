import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

/** Site-wide health advisory strip (dengue alerts, drives, closures). */
export default function AdvisoryBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div role="region" aria-label="Health advisory" className="border-b border-warning/40 bg-warning/15">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" aria-hidden="true" />
        <p className="flex-1 text-xs leading-relaxed text-foreground">
          <span className="font-bold uppercase tracking-wide">Health Advisory:</span>{" "}
          Dengue surveillance ongoing sa Blocks 4, 7, at 12. Mag-4 o&apos;clock habit araw-araw at
          i-report ang mga lalagyan ng tubig sa inyong BHW.{" "}
          <span className="font-semibold">Libreng misting: Sabado, 7:00 AM.</span>
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss health advisory"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-warning/20 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
