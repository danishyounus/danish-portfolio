"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const reduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string[]>([experience.engagements[0].id]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const beam = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  function toggle(id: string) {
    setOpen((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  return (
    <section id="experience" className="section relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* --------------------------------------------------------- intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="02"
              kicker="Experience"
              title="One employer. Three industries. The same question."
              lede="How do you make a complex system feel obvious? The answer changes by industry — the method doesn't."
            />

            <Reveal delay={0.1} className="mt-10">
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white text-[15px] font-semibold tracking-[-0.04em] text-black">
                      D
                    </span>
                    <div>
                      <p className="font-display text-[1.05rem] font-medium text-white">
                        Deloitte<span className="text-[#86BC25]">.</span>
                      </p>
                      <p className="text-[11px] text-white/40">Technology &amp; Transformation</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white/50">
                    Current
                  </span>
                </div>

                <div className="mt-5 h-px w-full bg-white/[0.08]" />

                <dl className="mt-4 space-y-3 text-[11.5px]">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-white/35">Role</dt>
                    <dd className="text-right text-white/75">{experience.role}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-white/35">Business area</dt>
                    <dd className="max-w-[210px] text-right text-white/75">{experience.area}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-white/35">Duration</dt>
                    <dd className="text-right text-white/75">
                      {experience.start} — {experience.end}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-white/35">Location</dt>
                    <dd className="text-right text-white/75">{experience.location}</dd>
                  </div>
                </dl>

                <p className="mt-5 text-[12.5px] leading-relaxed text-white/45">
                  {experience.summary}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------------- timeline */}
          <div ref={timelineRef} className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.09]"
            />
            <motion.div
              aria-hidden="true"
              style={reduce ? undefined : { scaleY: beam }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-electric via-violet to-transparent"
            />

            <div className="space-y-4">
              {experience.engagements.map((engagement, index) => {
                const isOpen = open.includes(engagement.id);
                return (
                  <Reveal key={engagement.id} delay={index * 0.06}>
                    <article className="group relative pl-8">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-7 grid h-[15px] w-[15px] place-items-center rounded-full border border-white/15 bg-[#08080d] transition-colors duration-500 group-hover:border-white/40"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: engagement.accent,
                            boxShadow: `0 0 12px ${engagement.accent}80`,
                          }}
                        />
                      </span>

                      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.022] transition-colors duration-500 hover:border-white/[0.16] hover:bg-white/[0.04]">
                        <div
                          aria-hidden="true"
                          className="h-px w-full opacity-40"
                          style={{
                            background: `linear-gradient(90deg, ${engagement.accent}, transparent 70%)`,
                          }}
                        />

                        <div className="p-5 md:p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="mono text-[0.55rem] text-white/25">
                                  0{index + 1}
                                </span>
                                <h3 className="font-display text-[1.35rem] font-medium tracking-[-0.025em] text-white">
                                  {engagement.industry}
                                </h3>
                              </div>
                              <p className="mt-1 text-[11px] text-white/35">
                                {engagement.context}
                              </p>
                            </div>

                            <span className="hidden rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white/40 sm:inline-block">
                              Deloitte
                            </span>
                          </div>

                          <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-white/55">
                            {engagement.summary}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {engagement.capabilities.map((capability) => (
                              <span
                                key={capability}
                                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[9.5px] text-white/45"
                              >
                                {capability}
                              </span>
                            ))}
                          </div>

                          <div className="mt-5">
                            <button
                              type="button"
                              onClick={() => toggle(engagement.id)}
                              aria-expanded={isOpen}
                              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/40 transition hover:text-white/80"
                            >
                              <span className="grid h-5 w-5 place-items-center rounded-full border border-white/12">
                                {isOpen ? (
                                  <Minus className="h-3 w-3" />
                                ) : (
                                  <Plus className="h-3 w-3" />
                                )}
                              </span>
                              {isOpen ? "Hide responsibilities" : "View responsibilities"}
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen ? (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                  className="overflow-hidden"
                                >
                                  <ul className="mt-4 space-y-2.5 border-t border-white/[0.07] pt-4">
                                    {engagement.responsibilities.map((item) => (
                                      <li
                                        key={item}
                                        className="flex gap-3 text-[12.5px] leading-relaxed text-white/50"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                                          style={{ backgroundColor: engagement.accent }}
                                        />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <p className="mt-6 pl-8 text-[10px] leading-relaxed text-white/25">
              Client and organisation names are withheld. Engagements are described by industry only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
