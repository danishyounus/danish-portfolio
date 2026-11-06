"use client";

import { BookOpen, GraduationCap, MapPin } from "lucide-react";
import { additionalLearning, education } from "@/content/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="education" className="section relative">
      <div className="shell">
        <SectionHeading
          index="05"
          kicker="Education"
          title="A foundation in computing, applied to real systems."
          lede="Formal study in computer applications, followed by deliberate coursework in data science and analytics."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-white/12 to-transparent md:block"
          />

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {education.map((degree, index) => (
              <Reveal key={degree.id} delay={index * 0.1} className="min-w-0">
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.022] p-6 transition-colors duration-500 hover:border-white/[0.16] hover:bg-white/[0.04] md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70">
                        <GraduationCap className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="mono text-[0.52rem] text-white/30">
                          {index === 0 ? "Postgraduate" : "Undergraduate"}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/45">{degree.short}</p>
                      </div>
                    </div>

                    <span className="shrink-0 font-display text-2xl font-medium tracking-[-0.04em] text-white/25 sm:text-3xl">
                      {degree.year}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[1.3rem] font-medium leading-snug tracking-[-0.025em] text-white">
                    {degree.qualification}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-[12px] text-white/45">
                    {degree.institution}
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {degree.location}
                    </span>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {degree.areas.map((area) => (
                      <span
                        key={area}
                        className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1 text-[9.5px] text-white/40"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------- additional learning */}
        <Reveal delay={0.12} className="mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(110deg,rgba(91,140,255,0.07),rgba(167,139,250,0.05)_45%,transparent)] p-6 md:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-[1.05rem] font-medium text-white">
                      {additionalLearning.title}
                    </h3>
                    <span className="rounded-full border border-white/12 bg-white/[0.04] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white/45">
                      {additionalLearning.kind}
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-white/40">
                    {additionalLearning.provider}
                  </p>
                  <p className="mt-2 max-w-xl text-[11.5px] leading-relaxed text-white/35">
                    {additionalLearning.note}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 md:max-w-[290px] md:justify-end">
                {additionalLearning.modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-md border border-white/[0.09] bg-black/20 px-2.5 py-1 text-[9.5px] text-white/45"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
