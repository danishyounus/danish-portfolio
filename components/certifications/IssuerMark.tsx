import { cn } from "@/lib/utils";

/**
 * Typographic issuer marks.
 * These are deliberately wordmarks, not scraped brand logos.
 */
export function IssuerMark({ mark, className }: { mark: string; className?: string }) {
  const base = cn(
    "inline-flex items-center gap-1 font-display text-[11px] font-semibold tracking-[-0.01em] text-white/55",
    className
  );

  switch (mark) {
    case "scrum.org":
      return (
        <span className={base}>
          <span className="grid h-4 w-4 place-items-center rounded-full border border-white/25">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </span>
          scrum<span className="text-white/30">.org</span>
        </span>
      );
    case "walkme":
      return (
        <span className={cn(base, "gap-0.5")}>
          walk
          <span className="rounded-[4px] bg-[#00A0E3]/90 px-1 py-0.5 text-[9px] font-semibold text-white">
            me
          </span>
        </span>
      );
    case "tata":
      return <span className={cn(base, "tracking-[0.32em] text-white/45")}>TATA</span>;
    case "british-airways":
      return (
        <span className={cn(base, "gap-1.5 text-[9px] tracking-[0.2em] text-white/45")}>
          <span className="h-px w-4 bg-gradient-to-r from-[#E31E24] to-[#2E5EAA]" />
          BRITISH AIRWAYS
        </span>
      );
    case "hp-life":
      return (
        <span className={cn(base, "text-white/50")}>
          <span className="grid h-4 w-4 place-items-center rounded-full border border-white/25 text-[7px]">
            hp
          </span>
          LIFE
        </span>
      );
    case "cranes":
      return <span className={cn(base, "text-[9px] tracking-[0.18em] text-white/45")}>CRANES VARSITY</span>;
    default:
      return <span className={base}>{mark}</span>;
  }
}
