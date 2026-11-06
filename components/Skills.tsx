"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { MousePointer2, Sparkles } from "lucide-react";
import { anchors, skillStatement, skillTiers, type SkillTier } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useMotionPref } from "@/components/MotionProvider";
import { useMediaQuery, useWebGL } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { SceneBoundary } from "@/components/scene/SceneBoundary";

const SkillsScene = dynamic(() => import("@/components/scene/SkillsScene"), { ssr: false });

/** Static constellation used when WebGL is unavailable or the scene fails. */
function SkillsFallback() {
  const nodes = [
    { name: "WalkMe", radius: 23, angle: -90, tone: "#8FB0FF" },
    { name: "Power BI", radius: 23, angle: -18, tone: "#8FB0FF" },
    { name: "Python", radius: 23, angle: 54, tone: "#8FB0FF" },
    { name: "SQL", radius: 23, angle: 126, tone: "#8FB0FF" },
    { name: "Digital Adoption", radius: 23, angle: 198, tone: "#8FB0FF" },
    { name: "Machine Learning", radius: 37, angle: 27, tone: "#B49CFF" },
    { name: "Pandas", radius: 37, angle: 98, tone: "#B49CFF" },
    { name: "Scikit-learn", radius: 37, angle: 160, tone: "#B49CFF" },
    { name: "Pandas", radius: 37, angle: 221, tone: "#8A93A6" },
    { name: "XGBoost", radius: 37, angle: 292, tone: "#8A93A6" },
    { name: "K-Means", radius: 37, angle: 340, tone: "#8A93A6" },
  ];

  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
      <div className="relative h-full w-full">
        <div className="absolute inset-[8%] rounded-full border border-white/[0.05]" />
        <div className="absolute inset-[24%] rounded-full border border-dashed border-white/[0.06]" />
        <div className="absolute inset-[40%] rounded-full border border-white/[0.07]" />

        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCE6FF] shadow-[0_0_26px_rgba(120,160,255,0.9)]" />
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.22),transparent_65%)] blur-md" />

        {nodes.map((node, index) => {
          const radians = (node.angle * Math.PI) / 180;
          const left = 50 + node.radius * Math.cos(radians);
          const top = 50 + node.radius * Math.sin(radians);
          return (
            <div
              key={`${node.name}-${index}`}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: node.tone,
                  boxShadow: `0 0 12px ${node.tone}80`,
                  opacity: node.radius > 30 ? 0.55 : 1,
                }}
              />
              <span
                className="whitespace-nowrap text-[10px] text-white/55"
                style={{ opacity: node.radius > 30 ? 0.5 : 1 }}
              >
                {node.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type TierFilter = SkillTier["id"] | "all";

const filters: { id: TierFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "core", label: "Core" },
  { id: "applied", label: "Applied" },
  { id: "working", label: "Working knowledge" },
];

export function Skills() {
  const reduce = useReducedMotion();
  const { motionOn, ready } = useMotionPref();
  const webgl = useWebGL();
  const small = useMediaQuery("(max-width: 1023px)");
  const [tier, setTier] = useState<TierFilter>("all");
  const [selected, setSelected] = useState<string>("Power BI");

  const selectedTier = useMemo(
    () =>
      skillTiers.find((group) => group.skills.some((skill) => skill.name === selected)) ??
      skillTiers[0],
    [selected]
  );

  function chooseSkill(name: string) {
    setSelected(name);
    const group = skillTiers.find((item) => item.skills.some((skill) => skill.name === name));
    if (group) setTier(group.id);
  }

  const showScene = ready && webgl && !small && motionOn;

  return (
    <section id="skills" className="section relative">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="03"
            kicker="Skills"
            title="A toolkit shaped by the work, not by a checklist."
            lede="Three honest tiers: what I use daily, what I've built with, and what I understand well enough to reason about."
          />

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setTier(filter.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[10.5px] transition-colors",
                  tier === filter.id ? "text-white" : "text-white/40 hover:text-white/70"
                )}
              >
                {tier === filter.id ? (
                  <motion.span
                    layoutId="skills-filter"
                    className="absolute inset-0 rounded-full border border-white/12 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* mobile tier filter */}
        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setTier(filter.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[10px] transition",
                tier === filter.id
                  ? "border-white/20 bg-white/[0.08] text-white"
                  : "border-white/10 text-white/40"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ------------------------------------------------------- 3D field */}
          <div className="relative order-2 hidden lg:order-1 lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-[580px]">
              <div
                aria-hidden="true"
                className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.13),rgba(167,139,250,0.06)_45%,transparent_70%)]"
              />

              {showScene ? (
                <SceneBoundary fallback={<SkillsFallback />}>
                  <SkillsScene
                    activeTier={tier}
                    selected={selected}
                    onSelect={chooseSkill}
                    motionOn={motionOn && !reduce}
                  />
                </SceneBoundary>
              ) : (
                <SkillsFallback />
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-2">
                <div className="glass rounded-xl px-3 py-2">
                  <p className="mono text-[0.5rem] text-white/30">Selected</p>
                  <p className="mt-0.5 text-[11px] text-white/80">{selected}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-white/25">
                  <MousePointer2 className="h-3 w-3" />
                  Click a node
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
              {skillTiers.map((group) => (
                <span key={group.id} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/30">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        group.id === "core" ? "#8FB0FF" : group.id === "applied" ? "#B49CFF" : "#8A93A6",
                    }}
                  />
                  {group.label}
                </span>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------- panels */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="glass-soft rounded-2xl p-5">
                <p className="mono text-[0.52rem] text-white/30">Skill focus</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <p className="font-display text-lg font-medium text-white">{selected}</p>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {selectedTier.label}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                  {selectedTier.description}
                </p>
              </div>
            </Reveal>

            <div className="mt-8 space-y-7">
              {skillTiers.map((group, groupIndex) => {
                const isActive = tier === "all" || tier === group.id;
                return (
                  <Reveal key={group.id} delay={groupIndex * 0.06}>
                    <div
                      className={cn(
                        "transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-40"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setTier(group.id)}
                        className="flex w-full items-center justify-between gap-3 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              backgroundColor:
                                group.id === "core"
                                  ? "#8FB0FF"
                                  : group.id === "applied"
                                    ? "#B49CFF"
                                    : "#8A93A6",
                            }}
                          />
                          <h3 className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/80">
                            {group.label}
                          </h3>
                          <span className="mono text-[0.55rem] text-white/25">
                            {group.skills.length}
                          </span>
                        </div>
                        <span className="text-[9.5px] text-white/25">{group.kicker}</span>
                      </button>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => {
                          const active = selected === skill.name;
                          return (
                            <button
                              key={skill.name}
                              type="button"
                              onClick={() => chooseSkill(skill.name)}
                              className={cn(
                                "rounded-lg border px-2.5 py-1.5 text-[11px] transition-all duration-300",
                                active
                                  ? "border-white/30 bg-white/[0.1] text-white"
                                  : "border-white/[0.08] bg-white/[0.022] text-white/50 hover:border-white/20 hover:text-white/80"
                              )}
                            >
                              {skill.name}
                              {skill.note ? (
                                <span className="ml-1 text-[8.5px] uppercase tracking-[0.1em] text-white/30">
                                  {skill.note}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1} className="mt-8">
              <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                <p className="text-[12px] leading-relaxed text-white/50">{skillStatement}</p>
              </div>
            </Reveal>

            <Reveal delay={0.14} className="mt-6">
              <p className="text-[10px] leading-relaxed text-white/25">
                Anchors: {anchors.join(" · ")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
