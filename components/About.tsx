"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { personal } from "@/content/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About({ hasPortrait }: { hasPortrait: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section id="about" className="section relative">
      <div className="shell">
        <div ref={ref} className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* ------------------------------------------------------- portrait */}
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
            <div
              aria-hidden="true"
              className="absolute -left-8 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18),transparent_65%)]"
            />

            <motion.figure
              initial={reduce ? false : { opacity: 0, y: 40, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="rounded-[26px] border border-white/[0.12] bg-white/[0.035] p-2.5 shadow-[0_50px_100px_-45px_rgba(0,0,0,0.95)] backdrop-blur">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#0a0a11]">
                  {hasPortrait ? (
                    <motion.img
                      src={personal.photography.about}
                      srcSet={`${personal.photography.aboutSmall} 480w, ${personal.photography.about} 900w`}
                      sizes="(max-width: 1023px) 86vw, 500px"
                      alt={personal.photography.aboutAlt}
                      loading="lazy"
                      decoding="async"
                      style={reduce ? undefined : { y: imageY }}
                      className="absolute inset-0 h-[108%] w-full object-cover object-[50%_35%]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(167,139,250,0.2),transparent_60%),linear-gradient(180deg,#0c0b14,#07070c)]">
                      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:40px_40px]" />
                      <span className="font-serif text-[6rem] italic leading-none text-white/25">
                        M
                      </span>
                      <p className="mt-2 text-[10px] tracking-[0.24em] text-white/35">
                        PORTRAIT 02
                      </p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">
                        Off duty
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/90">{personal.displayName}</p>
                    </div>
                    <span className="mono text-[0.55rem] text-white/40">02</span>
                  </div>
                </div>
              </div>

              <figcaption className="mt-4 flex items-center justify-between px-1">
                <span className="mono text-[0.55rem] text-white/30">Portrait — editorial</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-white/40">
                  <MapPin className="h-3 w-3" />
                  {personal.location}
                </span>
              </figcaption>
            </motion.figure>

            {/* floating current-role card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="glass absolute -bottom-8 -right-4 hidden w-[220px] rounded-2xl p-4 sm:block"
            >
              <p className="mono text-[0.52rem] text-white/35">Currently</p>
              <p className="mt-1.5 font-display text-base font-medium text-white">
                {personal.current.employer}
              </p>
              <p className="text-[11px] text-white/45">
                {personal.current.role} · {personal.current.start}—Present
              </p>
              <div className="mt-3 h-px w-full bg-white/10" />
              <p className="mt-2 flex items-center gap-1 text-[10px] text-white/40">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                {personal.current.area.split("/")[0].trim()}
              </p>
            </motion.div>
          </div>

          {/* ----------------------------------------------------------- copy */}
          <div className="pt-2">
            <SectionHeading
              index="01"
              kicker="About"
              title="A technologist who starts with the person using the system."
            />

            <div className="mt-8 space-y-5">
              {personal.intro.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p
                    className={
                      index === 0
                        ? "text-[1.02rem] leading-[1.85] text-white/70"
                        : "text-[0.95rem] leading-[1.85] text-white/55"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-8">
              <blockquote className="border-l border-white/15 pl-5">
                <p className="font-serif text-[1.45rem] italic leading-snug text-white/80">
                  &ldquo;{personal.philosophy}&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.12} className="mt-8">
              <div className="flex flex-wrap gap-2">
                {personal.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] text-white/55 transition hover:border-white/20 hover:text-white/80"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <a
                href="#experience"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45 transition hover:text-white"
              >
                See where I&rsquo;ve applied it
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* ---------------------------------------------------------- values */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-3">
          {personal.values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <div className="group h-full bg-[#07070b] p-7 transition-colors duration-500 hover:bg-[#0a0a10]">
                <div className="flex items-center justify-between">
                  <span className="mono text-[0.55rem] text-white/25">0{index + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15 transition-colors group-hover:bg-electric" />
                </div>
                <h3 className="mt-6 font-display text-[1.05rem] font-medium tracking-[-0.01em] text-white/90">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-white/45">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
