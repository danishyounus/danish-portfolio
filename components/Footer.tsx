"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { personal } from "@/content/personal";
import { site } from "@/content/site";
import { useMotionPref } from "@/components/MotionProvider";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  github: Github,
};

export function Footer() {
  const { motionOn, toggleMotion } = useMotionPref();
  const socials = personal.socials.filter((social) => social.visible && social.url);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07]">
      <div className="shell pt-16">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr]">
          <div>
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="font-display text-[1.35rem] font-medium tracking-[-0.03em] text-white">
                Danish
              </span>
              <span className="text-electric">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-[11.5px] leading-relaxed text-white/35">
              {personal.title}
            </p>
            <p className="mt-4 text-[10.5px] text-white/25">{personal.location}</p>
          </div>

          <div>
            <p className="mono text-[0.5rem] text-white/25">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.slice(1, 5).map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="text-[11px] text-white/45 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono text-[0.5rem] text-white/25">More</p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.slice(5).map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="text-[11px] text-white/45 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/resume" className="text-[11px] text-white/45 transition hover:text-white">
                  Résumé
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mono text-[0.5rem] text-white/25">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => {
                const Icon = iconMap[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] text-white/45 transition hover:text-white"
                    >
                      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                      {social.label}
                    </a>
                  </li>
                );
              })}
              {socials.length === 0 ? (
                <li>
                  <a href="/#contact" className="text-[11px] text-white/45 transition hover:text-white">
                    Contact form
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/[0.07] py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] text-white/25">
            © {year} {personal.fullName} · All rights reserved
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              data-motion-toggle
              onClick={toggleMotion}
              aria-pressed={motionOn}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/30 transition hover:text-white/60"
            >
              <span
                className={cn(
                  "relative flex h-4 w-7 items-center rounded-full border px-0.5 transition-colors",
                  motionOn ? "border-electric/40 bg-electric/25" : "border-white/15 bg-white/5"
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full bg-white transition-transform",
                    motionOn ? "translate-x-3" : "translate-x-0"
                  )}
                />
              </span>
              Motion {motionOn ? "on" : "off"}
            </button>

            <span className="hidden text-[10px] text-white/20 md:inline">
              Built with Next.js · Three.js
            </span>

            <a
              href="#home"
              className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/30 transition hover:text-white/60"
            >
              Back to top
              <span className="grid h-6 w-6 place-items-center rounded-full border border-white/10 transition group-hover:border-white/30">
                <ArrowUp className="h-3 w-3" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="display -mb-[0.18em] translate-y-[12%] text-center text-[clamp(5rem,20vw,18rem)] font-semibold leading-none tracking-[-0.07em] text-white/[0.025]">
          DANISH
        </p>
      </div>
    </footer>
  );
}
