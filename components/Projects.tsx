"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { archiveProjects, featuredProjects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

export function Projects() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(archiveProjects[0]?.slug ?? null);

  return (
    <section id="projects" className="section relative">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            kicker="Projects"
            title="Work that turns a question into something you can see."
            lede="Dashboards, models and applications. Each one starts with a problem worth answering."
          />

          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-[10px] text-white/35 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            {featuredProjects.length} featured · {archiveProjects.length} archive
          </div>
        </div>

        {/* --------------------------------------------------------- featured */}
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 0.07}
              className={cn(
                index === 0 && "lg:col-span-7",
                index === 1 && "lg:col-span-5",
                index === 2 && "lg:col-span-12"
              )}
            >
              <div
                className={cn(
                  "h-full",
                  index < 2 ? "lg:h-[460px]" : "lg:h-[350px]"
                )}
              >
                <ProjectCard project={project} size={index === 2 ? "wide" : "medium"} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------------------------------------------------------- archive */}
        <div className="mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="mono text-[0.55rem] text-white/30">Archive</p>
              <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.03em] text-white/90">
                More from the workbench
              </h3>
            </div>
            <span className="mono whitespace-nowrap text-[0.55rem] text-white/25">
              {archiveProjects.length} projects
            </span>
          </div>

          <div className="mt-6 border-y border-white/[0.08]">
            {archiveProjects.map((project) => {
              const isOpen = open === project.slug;
              return (
                <div key={project.slug} className="border-b border-white/[0.08] last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : project.slug)}
                    aria-expanded={isOpen}
                    className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 py-5 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="mono text-[0.55rem] text-white/25">{project.index}</span>

                    <div className="min-w-0">
                      <p className="truncate font-display text-[1rem] font-medium tracking-[-0.01em] text-white/85 transition-colors group-hover:text-white">
                        {project.title}
                      </p>
                      <p className="mt-0.5 text-[10.5px] text-white/35">{project.category}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden flex-wrap justify-end gap-1.5 md:flex">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-white/[0.08] px-1.5 py-0.5 text-[9px] text-white/35"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/45 transition-all duration-300",
                          isOpen && "rotate-180 border-white/25 bg-white/[0.06] text-white"
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 pb-6 pl-12 pr-2 md:grid-cols-[1fr_auto] md:items-end">
                          <div>
                            <p className="max-w-2xl text-[12.5px] leading-relaxed text-white/50">
                              {project.built}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1 text-[9.5px] text-white/40"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Link
                            href={`/projects/${project.slug}`}
                            className="group/link inline-flex items-center gap-2 self-start rounded-full border border-white/12 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 transition hover:border-white/30 hover:text-white md:self-end"
                          >
                            Case study
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </Link>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
