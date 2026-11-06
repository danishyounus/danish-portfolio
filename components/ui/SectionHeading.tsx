import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  kicker,
  title,
  lede,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="mono text-[0.65rem] text-white/35">{index}</span>
        <span className="h-px w-8 bg-white/20" aria-hidden="true" />
        <span className="mono text-[0.65rem] text-white/55">{kicker}</span>
      </div>

      <h2 className="display max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-semibold text-white balance">
        {title}
      </h2>

      {lede ? (
        <p
          className={cn(
            "max-w-xl text-[0.975rem] leading-relaxed text-white/55 pretty",
            align === "center" && "mx-auto"
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
