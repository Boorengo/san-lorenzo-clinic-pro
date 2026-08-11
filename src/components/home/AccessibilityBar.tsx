import { useEffect, useState } from "react";
import { Type, Contrast, Accessibility } from "lucide-react";

/**
 * DOH-style accessibility utility bar. Presentation-only preference toggles
 * (text scale + high contrast) persisted to localStorage.
 */
export default function AccessibilityBar() {
  const [scale, setScale] = useState(0);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    const s = Number(localStorage.getItem("a11y-scale") ?? 0);
    const c = localStorage.getItem("a11y-contrast") === "true";
    setScale(s);
    setContrast(c);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-scale-1", "text-scale-2");
    if (scale === 1) root.classList.add("text-scale-1");
    if (scale === 2) root.classList.add("text-scale-2");
    localStorage.setItem("a11y-scale", String(scale));
  }, [scale]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", contrast);
    localStorage.setItem("a11y-contrast", String(contrast));
  }, [contrast]);

  return (
    <div className="border-b bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5">
        <div className="hidden items-center gap-1.5 text-[11px] font-medium text-sidebar-foreground/70 sm:flex">
          <Accessibility className="h-3.5 w-3.5" aria-hidden="true" />
          Republika ng Pilipinas · Barangay San Lorenzo Ruiz 1
        </div>
        <a
          href="#main-content"
          className="rounded px-2 py-1 text-[11px] font-medium text-sidebar-foreground/70 underline-offset-2 hover:text-sidebar-foreground hover:underline focus-visible:ring-2 focus-visible:ring-sidebar-primary sm:hidden"
        >
          Skip to Main Content
        </a>
        <div className="flex items-center gap-1">
          <a
            href="#main-content"
            className="hidden rounded px-2 py-1 text-[11px] font-medium text-sidebar-foreground/70 underline-offset-2 hover:text-sidebar-foreground hover:underline sm:inline-block"
          >
            Skip to Main Content
          </a>
          <button
            type="button"
            onClick={() => setScale((s) => (s + 1) % 3)}
            aria-label={`Adjust text size (currently ${["normal", "large", "largest"][scale]})`}
            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Type className="h-3.5 w-3.5" aria-hidden="true" />
            <span aria-hidden="true">A{scale > 0 ? "+".repeat(scale) : ""}</span>
          </button>
          <button
            type="button"
            onClick={() => setContrast((c) => !c)}
            aria-pressed={contrast}
            aria-label="Toggle high contrast mode"
            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Contrast className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Contrast</span>
          </button>
        </div>
      </div>
    </div>
  );
}
