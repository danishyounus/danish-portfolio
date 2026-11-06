import { useId } from "react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  className?: string;
  large?: boolean;
};

/**
 * Typographic / geometric project cover.
 * Deliberately not a fake dashboard: these are designed covers until real captures exist.
 */
export function ProjectCover({ project, className, large = false }: Props) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const { motif, accent, accentSoft } = project.cover;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 140% at 18% 0%, ${accent}2e 0%, transparent 58%), radial-gradient(100% 120% at 90% 100%, ${accentSoft}33 0%, transparent 60%), linear-gradient(160deg, #0b0b14 0%, #07070b 100%)`,
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accentSoft} stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {motif === "signal" && (
          <g>
            <circle cx="300" cy="70" r="90" fill={`url(#${id}-glow)`} opacity="0.55" />
            {Array.from({ length: 30 }).map((_, i) => {
              const height = 16 + ((i * 47) % 96);
              return (
                <rect
                  key={i}
                  x={22 + i * 12}
                  y={206 - height}
                  width={4}
                  height={height}
                  rx={2}
                  fill={i % 3 === 0 ? accent : "#ffffff"}
                  opacity={i % 3 === 0 ? 0.55 : 0.09}
                />
              );
            })}
            <circle cx="300" cy="78" r="46" fill="none" stroke={accent} strokeOpacity="0.35" />
            <circle cx="300" cy="78" r="62" fill="none" stroke={accent} strokeOpacity="0.14" />
          </g>
        )}

        {motif === "grid" && (
          <g>
            <path
              d="M18 208 L78 132 L142 168 L206 84 L268 118 L330 58 L384 92"
              fill="none"
              stroke={`url(#${id}-stroke)`}
              strokeWidth="1.4"
            />
            <path
              d="M18 168 L92 168 L92 96 L188 96 L188 150 L286 150 L286 74 L384 74"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
            {[
              [18, 208],
              [78, 132],
              [142, 168],
              [206, 84],
              [268, 118],
              [330, 58],
              [384, 92],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 3 : 2} fill={accent} opacity="0.9" />
            ))}
            <circle cx="206" cy="84" r="16" fill={accent} opacity="0.12" />
          </g>
        )}

        {motif === "layers" && (
          <g>
            <g transform="translate(148 124) rotate(-10)">
              <rect x="-70" y="-46" width="140" height="92" rx="8" fill="none" stroke={accent} strokeOpacity="0.2" />
            </g>
            <g transform="translate(156 118) rotate(-4)">
              <rect x="-70" y="-46" width="140" height="92" rx="8" fill="none" stroke={accent} strokeOpacity="0.35" />
            </g>
            <g transform="translate(164 112)">
              <rect x="-70" y="-46" width="140" height="92" rx="8" fill="#0d0d16" stroke={accent} strokeOpacity="0.6" />
              <rect x="-52" y="-28" width="64" height="4" rx="2" fill={accent} opacity="0.55" />
              <rect x="-52" y="-16" width="100" height="3" rx="1.5" fill="#ffffff" opacity="0.12" />
              <rect x="-52" y="-6" width="84" height="3" rx="1.5" fill="#ffffff" opacity="0.09" />
              <rect x="-52" y="10" width="44" height="14" rx="4" fill={accent} opacity="0.18" />
            </g>
          </g>
        )}

        {motif === "pulse" && (
          <g>
            <circle cx="200" cy="125" r="86" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
            <path
              d="M18 138 H120 L138 100 L158 176 L180 118 L196 138 H382"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinejoin="round"
              opacity="0.8"
            />
            <path
              d="M18 138 H120 L138 100 L158 176 L180 118 L196 138 H382"
              fill="none"
              stroke={accent}
              strokeWidth="8"
              opacity="0.08"
            />
            <circle cx="196" cy="138" r="4" fill={accent} />
            <circle cx="196" cy="138" r="12" fill={accent} opacity="0.15" />
          </g>
        )}

        {motif === "orbit" && (
          <g>
            <ellipse cx="210" cy="126" rx="120" ry="52" fill="none" stroke={accent} strokeOpacity="0.3" transform="rotate(-18 210 126)" />
            <ellipse cx="210" cy="126" rx="88" ry="36" fill="none" stroke="#ffffff" strokeOpacity="0.08" transform="rotate(24 210 126)" />
            {Array.from({ length: 18 }).map((_, i) => {
              const x = 60 + ((i * 67) % 290);
              const y = 50 + ((i * 43) % 150);
              return <circle key={i} cx={x} cy={y} r={1.6} fill={accent} opacity={0.25 + (i % 4) * 0.12} />;
            })}
            <circle cx="210" cy="126" r="7" fill={accent} opacity="0.9" />
          </g>
        )}

        {motif === "bars" && (
          <g>
            {[42, 78, 56, 108, 84, 132, 96, 64].map((height, i) => (
              <g key={i}>
                <rect
                  x={64 + i * 36}
                  y={200 - height}
                  width={20}
                  height={height}
                  rx={4}
                  fill={i === 5 ? accent : "#ffffff"}
                  opacity={i === 5 ? 0.55 : 0.07}
                />
                <rect x={64 + i * 36} y={200 - height} width={20} height={3} rx={1.5} fill={accent} opacity={i === 5 ? 0.9 : 0.25} />
              </g>
            ))}
          </g>
        )}

        {motif === "calendar" && (
          <g>
            {Array.from({ length: 28 }).map((_, i) => {
              const col = i % 7;
              const row = Math.floor(i / 7);
              const active = i === 9 || i === 10 || i === 16 || i === 17 || i === 23;
              return (
                <rect
                  key={i}
                  x={68 + col * 38}
                  y={54 + row * 40}
                  width={30}
                  height={30}
                  rx={5}
                  fill={active ? accent : "#ffffff"}
                  opacity={active ? 0.28 : 0.035}
                  stroke={active ? accent : "#ffffff"}
                  strokeOpacity={active ? 0.5 : 0.07}
                />
              );
            })}
          </g>
        )}
      </svg>

      {large ? (
        <div className="absolute bottom-4 right-5 font-display text-[clamp(5rem,12vw,11rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.055]">
          {project.index}
        </div>
      ) : (
        <div className="absolute bottom-3 right-4 font-display text-[4.5rem] font-semibold leading-none tracking-[-0.06em] text-white/[0.06]">
          {project.index}
        </div>
      )}

      <div className="noise-card absolute inset-0 opacity-[0.18] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/20 to-transparent" />
    </div>
  );
}
