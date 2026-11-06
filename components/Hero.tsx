"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowDownToLine, ArrowUpRight, BarChart3, Sparkles } from "lucide-react";
import { useRef } from "react";
import { personal } from "@/content/personal";
import { useMotionPref } from "@/components/MotionProvider";
import { useMediaQuery, useOnScreen, useWebGL } from "@/lib/hooks";
import { Magnetic } from "@/components/ui/Magnetic";
import { SceneBoundary } from "@/components/scene/SceneBoundary";

const HeroScene = dynamic(() => import("@/components/scene/HeroScene"), { ssr: false });

const marquee = [
  "Data Analytics",
  "Digital Adoption",
  "AI & Automation",
  "Experience Design",
  "Business Transformation",
];

export function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const reduce = useReducedMotion();
  const { motionOn, ready } = useMotionPref();
  const webgl = useWebGL();
  const small = useMediaQuery("(max-width: 767px)");
  const sectionRef = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(sectionRef, "200px");
  const showScene = ready && webgl && !small && motionOn;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(35);
  const glare = useMotionTemplate`radial-gradient(320px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 62%)`;

  function handlePortraitMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !motionOn || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
    glareX.set(((event.clientX - rect.left) / rect.width) * 100);
    glareY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  function resetPortrait() {
    mx.set(0);
    my.set(0);
    glareX.set(50);
    glareY.set(35);
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden pt-28 md:pt-32"
    >
      <div className="absolute inset-0 -z-10">
        <SceneBoundary fallback={<HeroBackdrop />}>
          {showScene ? (
            <HeroScene active={onScreen} motionOn={motionOn} compact={false} />
          ) : (
            <HeroBackdrop />
          )}
        </SceneBoundary>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#050507] to-transparent" />

      <div className="shell relative">
        <div className="grid min-h-[calc(100svh-8rem)] items-center gap-14 pb-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-6 lg:pb-20">
          {/* ---------------------------------------------------------- copy */}
          <div className="relative z-10">
            <div className="hero-in flex flex-wrap items-center gap-3">
              <span className="mono text-[0.62rem] text-white/45">Portfolio — 2026</span>
              <span className="h-px w-10 bg-white/15" aria-hidden="true" />
              <span className="mono text-[0.62rem] text-white/35">{personal.location}</span>
            </div>

            <h1
              className="hero-in display mt-6 text-[clamp(4.1rem,13.4vw,11rem)] font-semibold text-white"
              style={{ animationDelay: "80ms" }}
              aria-label={personal.heroName}
            >
              <span className="text-gradient">{personal.heroName}</span>
              <span className="text-electric">.</span>
            </h1>

            <div
              className="hero-in mt-6 max-w-2xl"
              style={{ animationDelay: "170ms" }}
            >
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.95rem] md:text-base">
                <span className="font-medium text-white/90">{personal.role}</span>
                <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
                <span className="text-white/40">{personal.focus}</span>
              </p>

              <p className="mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed text-white/60 md:text-[1.15rem] pretty">
                {personal.headline}
              </p>
            </div>

            <div
              className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "280ms" }}
            >
              <Magnetic>
                <a href="#about" className="btn btn-primary w-full sm:w-auto">
                  Explore my journey
                  <ArrowDown className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/resume" className="btn btn-ghost w-full sm:w-auto">
                  <ArrowDownToLine className="h-4 w-4 opacity-70" />
                  Download résumé
                </Link>
              </Magnetic>
            </div>

            <dl
              className="hero-in mt-11 grid max-w-xl grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.08]"
              style={{ animationDelay: "380ms" }}
            >
              {personal.facts.map((fact) => (
                <div key={fact.label} className="px-4 py-4 first:pl-0">
                  <dt className="mono text-[0.55rem] text-white/30">{fact.label}</dt>
                  <dd className="mt-1.5 text-[0.72rem] leading-snug text-white/70">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ------------------------------------------------------- portrait */}
          <div
            className="hero-in relative mx-auto w-full max-w-[430px] lg:ml-auto lg:mr-2"
            style={{ animationDelay: "220ms" }}
            onPointerMove={handlePortraitMove}
            onPointerLeave={resetPortrait}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-12 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(91,140,255,0.22),rgba(167,139,250,0.10)_45%,transparent_70%)]"
            />

            {/* orbit ring */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric shadow-[0_0_18px_rgba(91,140,255,0.9)]" />
              <span className="absolute bottom-[18%] right-[4%] h-1 w-1 rounded-full bg-violet/80" />
            </div>

            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[26px] border border-white/[0.14] bg-[#0a0a11] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.12)]">
                {hasPortrait ? (
                  <img
                    src={personal.photography.hero}
                    srcSet={`${personal.photography.heroSmall} 480w, ${personal.photography.hero} 900w`}
                    sizes="(max-width: 1023px) 82vw, 430px"
                    alt={personal.photography.heroAlt}
                    className="absolute inset-0 h-full w-full object-cover object-[50%_55%] saturate-[0.92]"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(91,140,255,0.18),transparent_60%),linear-gradient(180deg,#0b0b13,#07070c)]">
                    <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:44px_44px]" />
                    <span className="font-serif text-[7rem] italic leading-none text-white/25">
                      M
                    </span>
                    <p className="mt-3 text-[11px] tracking-[0.24em] text-white/35">
                      MOHAMMED DANISH Y.
                    </p>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/35 via-transparent to-transparent" />

                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 mix-blend-soft-light"
                  style={{ background: glare }}
                />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                    Deloitte · Analyst
                  </span>
                  <span className="rounded-full border border-white/12 bg-black/35 px-2.5 py-1 backdrop-blur-md mono text-[0.58rem] text-white/55">01 / 07</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                    {personal.location}
                  </p>
                  <p className="mt-1 font-display text-lg font-medium tracking-[-0.02em] text-white">
                    {personal.fullName}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-[20px] border border-white/[0.07]"
                />
              </div>

              {/* floating glass chips */}
              <div className="absolute -left-4 top-[18%] hidden sm:block">
                <div className="glass flex items-center gap-2 rounded-xl px-3 py-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet" />
                  <span className="text-[10.5px] font-medium text-white/80">Digital Adoption</span>
                </div>
              </div>

              <div className="absolute -right-3 bottom-[24%] hidden sm:block">
                <div className="glass flex items-center gap-2 rounded-xl px-3 py-2.5">
                  <BarChart3 className="h-3.5 w-3.5 text-electric" />
                  <span className="text-[10.5px] font-medium text-white/80">Power BI</span>
                </div>
              </div>

              <div className="absolute -right-1 top-[8%] hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/50">
                  Bengaluru
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ------------------------------------------------------- bottom strip */}
        <div className="flex flex-col gap-5 border-t border-white/[0.07] py-5 md:flex-row md:items-center md:justify-between">
          <a
            href="#about"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/35 transition-colors hover:text-white/70"
          >
            <span className="relative flex h-9 w-5 items-start justify-center overflow-hidden rounded-full border border-white/15">
              <span className="scroll-dot mt-1.5 h-1.5 w-1 rounded-full bg-white/60" />
            </span>
            Scroll to explore
          </a>

          <div className="mask-fade-x max-w-full overflow-hidden md:max-w-[62%]">
            <div className="marquee-track gap-8" aria-hidden="true">
              {[...marquee, ...marquee].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-8 whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-white/25"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                </span>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white/70 md:inline-flex"
          >
            Get in touch
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

/** Static atmosphere used when WebGL is unavailable or the scene fails. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute right-[-10%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.16),transparent_65%)]" />
      <div className="absolute bottom-[5%] left-[-5%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.035),transparent_60%)]" />
    </div>
  );
}
