"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { useMotionPref } from "@/components/MotionProvider";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  size?: "medium" | "wide";
};

export function ProjectCard({ project, size = "medium" }: Props) {
  const reduce = useReducedMotion();
  const { motionOn } = useMotionPref();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 150,
    damping: 20,
  });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 55%)`;

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !motionOn || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
    gx.set(((event.clientX - rect.left) / rect.width) * 100);
    gy.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
    gx.set(50);
    gy.set(50);
  }

  return (
    <motion.div
      style={{ perspective: 1200 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            "group relative block h-full overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#08080c]",
            "shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-white/25"
          )}
          aria-label={`Open case study: ${project.title}`}
        >
          <div className="relative h-full min-h-[380px]">
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
              <ProjectCover project={project} large={size === "wide"} />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: project.cover.accent }}
                  />
                  {project.category}
                </span>
                <span className="mono text-[0.58rem] text-white/40">{project.index}</span>
              </div>

              <div>
                <h3
                  className={cn(
                    "max-w-xl font-display font-medium leading-[1.03] tracking-[-0.035em] text-white",
                    size === "wide" ? "text-[clamp(1.7rem,3.4vw,2.9rem)]" : "text-[clamp(1.35rem,2.6vw,1.9rem)]"
                  )}
                >
                  {project.title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/[0.045] px-2 py-1 text-[9.5px] text-white/50 backdrop-blur"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 ? (
                    <span className="text-[9.5px] text-white/35">+{project.stack.length - 4}</span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors group-hover:text-white/90">
                    View case study
                    <span className="h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-12 group-hover:bg-white/50" />
                  </span>

                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/30 text-white/70 backdrop-blur transition-all duration-500 group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
              style={{ background: glare }}
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
